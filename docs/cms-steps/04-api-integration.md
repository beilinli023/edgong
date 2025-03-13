# 步骤四：API服务整合

**预计时间**：2天  
**目标**：开发和整合针对各内容类型的RESTful API服务，确保前端能实时获取CMS数据。

## 0. 已完成部分：内容类型系统API基础实现

在步骤二中，我们已实现了内容类型系统的基础API端点，使用Express服务器实现：

- [x] 内容类型API（`/content-types`）
  - 提供内容类型的创建、查询、更新和删除
  - 支持内容类型字段验证

- [x] 分类API（`/categories`）
  - 提供分类的CRUD操作
  - 支持多语言（中英文）
  - 支持分类树结构
  - 按内容类型筛选功能

- [x] 标签API（`/tags`）
  - 提供标签的CRUD操作
  - 支持批量创建标签
  - 按内容类型筛选功能

- [x] 内容项API（`/contents`）
  - 基于内容类型创建内容
  - 提供分页、排序和筛选
  - 内容状态管理（发布/草稿/归档）
  - 内容搜索功能
  - 已集成PostgreSQL数据库存储

**测试结果**：

所有API端点都已在本地进行了测试，正常返回预期的JSON响应。API服务器运行在端口3001，避免与现有服务冲突。

## 1. 第一天：核心API开发

### 1.1 内容类型系统API完善

- [ ] 完善内容与内容类型的关联
  ```typescript
  // src/services/contents.service.ts
  @Injectable()
  export class ContentsService {
    constructor(
      @InjectRepository(Content)
      private readonly contentRepository: Repository<Content>,
      @InjectRepository(ContentType)
      private readonly contentTypeRepository: Repository<ContentType>
    ) {}

    async findByType(typeId: string, query: FindContentDto): Promise<Content[]> {
      const { language, status, categoryId, tagId, limit, offset } = query;
      
      const queryBuilder = this.contentRepository.createQueryBuilder('content')
        .where('content.typeId = :typeId', { typeId });
      
      if (language) {
        queryBuilder.andWhere('content.language = :language', { language });
      }
      
      if (status) {
        queryBuilder.andWhere('content.status = :status', { status });
      }
      
      if (categoryId) {
        queryBuilder.innerJoin('content.categories', 'category')
          .andWhere('category.id = :categoryId', { categoryId });
      }
      
      if (tagId) {
        queryBuilder.innerJoin('content.tags', 'tag')
          .andWhere('tag.id = :tagId', { tagId });
      }
      
      if (limit) {
        queryBuilder.limit(limit);
      }
      
      if (offset) {
        queryBuilder.offset(offset);
      }
      
      return queryBuilder
        .orderBy('content.createdAt', 'DESC')
        .getMany();
    }

    async createWithType(
      typeId: string,
      createDto: CreateContentDto
    ): Promise<Content> {
      const contentType = await this.contentTypeRepository.findOne({
        where: { id: typeId }
      });
      
      if (!contentType) {
        throw new NotFoundException(`Content type with ID ${typeId} not found`);
      }
      
      const content = this.contentRepository.create({
        ...createDto,
        typeId
      });
      
      return this.contentRepository.save(content);
    }
  }
  ```

- [ ] 为内容类型API添加控制器方法
  ```typescript
  // src/controllers/contents.controller.ts
  @Controller('contents')
  export class ContentsController {
    constructor(private readonly contentsService: ContentsService) {}

    @Get('by-type/:typeId')
    async findByType(
      @Param('typeId') typeId: string,
      @Query() query: FindContentDto
    ) {
      return this.contentsService.findByType(typeId, query);
    }

    @Post('by-type/:typeId')
    async createWithType(
      @Param('typeId') typeId: string,
      @Body() createDto: CreateContentDto
    ) {
      return this.contentsService.createWithType(typeId, createDto);
    }
  }
  ```

### 1.2 分类和标签API开发

- [ ] 实现分类管理API
  ```typescript
  // src/controllers/categories.controller.ts
  @Controller('categories')
  export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    async findAll(@Query('type') type?: string) {
      return this.categoriesService.findAll(type);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.categoriesService.findOne(id);
    }

    @Post()
    async create(@Body() createDto: CreateCategoryDto) {
      return this.categoriesService.create(createDto);
    }

    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updateDto: UpdateCategoryDto
    ) {
      return this.categoriesService.update(id, updateDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
      return this.categoriesService.remove(id);
    }
  }
  ```

- [x] 实现标签管理API
  ```javascript
  // server/routes/tags.mjs
  import express from 'express';
  import { query, transaction } from '../db/index.mjs';

  const router = express.Router();

  // 获取所有标签
  router.get('/', async (req, res) => {
    try {
      // 支持按类型过滤
      const { type } = req.query;
      
      let sql = 'SELECT * FROM tags';
      const params = [];
      
      if (type) {
        sql += ' WHERE type = $1';
        params.push(type);
      }
      
      sql += ' ORDER BY name_en';
      
      const result = await query(sql, params);
      
      res.json({
        data: result.rows,
        success: true
      });
    } catch (error) {
      console.error('获取标签失败:', error);
      res.status(500).json({
        message: '获取标签失败',
        success: false,
        error: error.message
      });
    }
  });
  ```

  **新增功能**: 实现了标签API的PostgreSQL数据库集成，包括：
  * 所有存储从内存存储转换为使用PostgreSQL数据库
  * 使用数据库事务确保数据完整性
  * 在删除标签之前检查引用关系
  * 支持所有CRUD操作和批量创建标签功能

### 1.3 通用内容管理API开发

- [ ] 实现导航菜单管理API
  ```typescript
  // src/controllers/navigation.controller.ts
  @Controller('navigation')
  export class NavigationController {
    constructor(private readonly navigationService: NavigationService) {}

    @Get()
    async findAll(@Query('language') language: string = 'en') {
      return this.navigationService.findAll(language);
    }

    @Post()
    async create(@Body() createDto: CreateNavigationItemDto) {
      return this.navigationService.create(createDto);
    }

    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updateDto: UpdateNavigationItemDto
    ) {
      return this.navigationService.update(id, updateDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
      return this.navigationService.remove(id);
    }

    @Post('reorder')
    async reorder(@Body() reorderDto: ReorderNavigationDto) {
      return this.navigationService.reorder(reorderDto.items);
    }
  }
  ```

- [ ] 实现社交媒体链接API
  ```typescript
  // src/controllers/socialMedia.controller.ts
  @Controller('social-media')
  export class SocialMediaController {
    constructor(private readonly socialMediaService: SocialMediaService) {}

    @Get()
    async findAll() {
      return this.socialMediaService.findAll();
    }

    @Post()
    async create(@Body() createDto: CreateSocialMediaDto) {
      return this.socialMediaService.create(createDto);
    }

    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updateDto: UpdateSocialMediaDto
    ) {
      return this.socialMediaService.update(id, updateDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
      return this.socialMediaService.remove(id);
    }
  }
  ```

## 2. 第二天：特定内容类型API和前端集成

### 2.1 博客系统API

- [ ] 实现博客相关API
  ```typescript
  // src/controllers/blog.controller.ts
  @Controller('blog')
  export class BlogController {
    constructor(private readonly blogService: BlogService) {}

    @Get('posts')
    async findPosts(@Query() query: FindBlogPostsDto) {
      return this.blogService.findPosts(query);
    }

    @Get('posts/:id')
    async findPost(@Param('id') id: string) {
      return this.blogService.findPost(id);
    }

    @Get('categories')
    async findCategories() {
      return this.blogService.findCategories();
    }

    @Get('tags')
    async findTags() {
      return this.blogService.findTags();
    }

    @Get('settings')
    async getSettings() {
      return this.blogService.getSettings();
    }

    @Put('settings')
    async updateSettings(@Body() updateDto: UpdateBlogSettingsDto) {
      return this.blogService.updateSettings(updateDto);
    }
  }
  ```

### 2.2 项目内容API

- [ ] 实现项目管理API
  ```typescript
  // src/controllers/programs.controller.ts
  @Controller('programs')
  export class ProgramsController {
    constructor(private readonly programsService: ProgramsService) {}

    @Get()
    async findAll(@Query() query: FindProgramsDto) {
      return this.programsService.findAll(query);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.programsService.findOne(id);
    }

    @Post()
    async create(@Body() createDto: CreateProgramDto) {
      return this.programsService.create(createDto);
    }

    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updateDto: UpdateProgramDto
    ) {
      return this.programsService.update(id, updateDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
      return this.programsService.remove(id);
    }

    @Get('categories')
    async getCategories() {
      return this.programsService.getCategories();
    }

    @Get('tags')
    async getTags() {
      return this.programsService.getTags();
    }
  }
  ```

### 2.3 前端数据获取逻辑调整

- [ ] 创建API客户端
  ```typescript
  // src/lib/api.ts
  export class ApiClient {
    private baseUrl: string;
    
    constructor(baseUrl: string) {
      this.baseUrl = baseUrl;
    }
    
    async fetchContentTypes() {
      const response = await fetch(`${this.baseUrl}/content-types`);
      return response.json();
    }
    
    async fetchContentByType(typeId: string, params: any = {}) {
      const queryParams = new URLSearchParams();
      
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
      
      const url = `${this.baseUrl}/contents/by-type/${typeId}?${queryParams.toString()}`;
      const response = await fetch(url);
      return response.json();
    }
    
    async createContent(typeId: string, data: any) {
      const response = await fetch(`${this.baseUrl}/contents/by-type/${typeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return response.json();
    }
    
    async updateContent(id: string, data: any) {
      const response = await fetch(`${this.baseUrl}/contents/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return response.json();
    }
    
    // 添加其他API方法...
  }
  
  // 导出实例
  export const api = new ApiClient(process.env.NEXT_PUBLIC_API_URL || '/api');
  ```

- [ ] 使用React Query进行数据获取
  ```typescript
  // src/hooks/useContent.ts
  import { useQuery } from 'react-query';
  import { api } from '../lib/api';

  export function useContentByType(typeId: string, params: any = {}) {
    return useQuery(
      ['content', typeId, params],
      () => api.fetchContentByType(typeId, params),
      {
        enabled: !!typeId,
        staleTime: 5 * 60 * 1000, // 5分钟
      }
    );
  }

  export function useContentTypes() {
    return useQuery(
      'contentTypes',
      () => api.fetchContentTypes(),
      {
        staleTime: 30 * 60 * 1000, // 30分钟
      }
    );
  }
  ```

### 2.4 数据接口一致性检查

- [ ] 创建数据接口一致性检查文档
  ```markdown
  # 数据接口一致性检查

  ## 目标
  确保网页端和CMS端的数据接口格式一致，解决潜在的数据结构差异问题。

  ## 检查范围
  1. 内容字段格式（特别是多语言字段）
  2. API响应结构
  3. 数据验证规则
  4. 错误处理方式

  ## 内容API字段一致性

  | 字段名 | 网页端格式 | CMS端格式 | 是否一致 | 调整建议 |
  |-------|-----------|----------|---------|--------|
  | title | string    | {title_en: string, title_zh: string} | ❌ | 统一使用双语字段格式 |
  | content | string  | {content_en: string, content_zh: string} | ❌ | 统一使用双语字段格式 |
  | excerpt | string  | {excerpt_en: string, excerpt_zh: string} | ❌ | 统一使用双语字段格式 |
  | slug   | string    | string    | ✅ | 无需调整 |
  | status | string    | string    | ✅ | 无需调整 |
  ```

- [ ] 实现数据适配工具
  ```javascript
  // utils/data-adapter.js
  /**
   * 将旧格式数据转换为新的双语格式
   * @param {Object} content - 旧格式的内容对象
   * @returns {Object} - 转换后的双语格式内容对象
   */
  export function adaptLegacyContent(content) {
    const result = { ...content };
    
    // 处理title字段
    if (typeof content.title === 'string') {
      result.title_en = content.title;
      result.title_zh = content.title;
      delete result.title;
    }
    
    // 处理content字段
    if (typeof content.content === 'string') {
      result.content_en = content.content;
      result.content_zh = content.content;
      delete result.content;
    }
    
    // 处理excerpt字段
    if (typeof content.excerpt === 'string') {
      result.excerpt_en = content.excerpt;
      result.excerpt_zh = content.excerpt;
      delete result.excerpt;
    }
    
    // 处理description字段
    if (typeof content.description === 'string') {
      result.description_en = content.description;
      result.description_zh = content.description;
      delete result.description;
    }
    
    return result;
  }

  /**
   * 根据请求的语言返回适当的内容
   * @param {Object} content - 包含双语字段的内容对象
   * @param {string} language - 请求的语言代码（'en'或'zh'）
   * @returns {Object} - 本地化后的内容对象
   */
  export function getLocalizedContent(content, language = 'en') {
    const result = { ...content };
    
    // 处理所有双语字段
    Object.keys(content).forEach(key => {
      if (key.endsWith('_en') || key.endsWith('_zh')) {
        const baseKey = key.substring(0, key.length - 3);
        const langSuffix = key.substring(key.length - 2);
        
        // 如果是请求的语言或者没有指定语言
        if (!language || langSuffix === language) {
          if (!result[baseKey]) {
            result[baseKey] = content[key];
          }
        }
      }
    });
    
    // 删除原始的双语字段，保持响应简洁
    Object.keys(result).forEach(key => {
      if (key.endsWith('_en') || key.endsWith('_zh')) {
        delete result[key];
      }
    });
    
    return result;
  }
  
  /**
   * 测试数据适配器功能
   * 使用方法：
   * node scripts/test-data-adapter.mjs
   */
  ```

- [ ] 创建CMS表单设计规范
  ```markdown
  # CMS表单设计规范

  ## 多语言字段处理

  1. **标签页分离**：所有多语言字段应使用标签页分离中英文输入
  2. **预览功能**：提供预览功能对比中英文内容
  3. **字段验证**：实现字段验证，确保两种语言都有值

  ## 表单布局

  1. **分组显示**：相关字段应分组显示
  2. **必填标记**：必填字段应明确标记
  3. **帮助文本**：复杂字段应提供帮助文本
  ```

### 2.5 联调测试

- [ ] 实现API检查脚本
  ```typescript
  // scripts/api-healthcheck.ts
  import fetch from 'node-fetch';

  async function checkEndpoint(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);
      if (response.ok) {
        console.log(`✅ ${url} - ${response.status} OK`);
        return true;
      } else {
        console.error(`❌ ${url} - ${response.status} Failed`);
        return false;
      }
    } catch (error) {
      console.error(`❌ ${url} - Error: ${error.message}`);
      return false;
    }
  }

  async function runHealthcheck() {
    const baseUrl = process.env.API_URL || 'http://localhost:3000/api';
    const endpoints = [
      '/content-types',
      '/contents',
      '/categories',
      '/tags',
      '/forms/types',
      '/navigation',
      '/social-media',
      '/blog/posts',
      '/programs'
    ];
    
    console.log('正在检查API端点...');
    
    const results = await Promise.all(
      endpoints.map(endpoint => checkEndpoint(`${baseUrl}${endpoint}`))
    );
    
    const totalEndpoints = endpoints.length;
    const successfulEndpoints = results.filter(result => result).length;
    
    console.log(`\n健康检查结果: ${successfulEndpoints}/${totalEndpoints} 端点正常工作`);
    
    if (successfulEndpoints !== totalEndpoints) {
      console.error('部分API端点未正常响应，请检查日志获取详情。');
      process.exit(1);
    }
    
    console.log('所有API端点正常响应！');
  }

  runHealthcheck().catch(error => {
    console.error('健康检查脚本执行失败:', error);
    process.exit(1);
  });
  ```

- [ ] 创建前后端联调测试页面
  ```typescript
  // src/pages/api-test.tsx
  import { useState, useEffect } from 'react';
  import { useContentTypes, useContentByType } from '../hooks/useContent';

  export default function ApiTestPage() {
    const { data: contentTypes, isLoading: typesLoading } = useContentTypes();
    const [selectedTypeId, setSelectedTypeId] = useState<string>('');
    const { data: contents, isLoading: contentsLoading } = useContentByType(
      selectedTypeId,
      { limit: 10 }
    );

    return (
      <div className="container p-4">
        <h1 className="text-2xl font-bold mb-4">API测试页面</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">内容类型</h2>
          {typesLoading ? (
            <p>加载中...</p>
          ) : (
            <select
              className="border p-2 rounded"
              value={selectedTypeId}
              onChange={(e) => setSelectedTypeId(e.target.value)}
            >
              <option value="">选择内容类型</option>
              {contentTypes?.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          )}
        </div>
        
        {selectedTypeId && (
          <div>
            <h2 className="text-xl font-semibold mb-2">内容列表</h2>
            {contentsLoading ? (
              <p>加载中...</p>
            ) : contents?.length ? (
              <ul className="border rounded divide-y">
                {contents.map((content) => (
                  <li key={content.id} className="p-3">
                    <p className="font-medium">{content.title || content.id}</p>
                    <p className="text-sm text-gray-500">
                      创建时间: {new Date(content.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>暂无内容</p>
            )}
          </div>
        )}
      </div>
    );
  }
  ```

## 验证标准

完成本阶段后，应该满足以下条件：

1. 所有内容类型都有对应的CRUD API接口
2. 可以通过API进行内容的查询、筛选与分页
3. 前端可以使用API客户端获取不同类型的内容
4. API健康检查脚本可以验证所有端点
5. 联调测试页面可以验证前后端数据流通

## 代码重构：实现MVC模式的API架构

随着项目规模的增长，当前的API路由文件可能变得过于庞大和复杂。为了提高代码的可维护性和可读性，我们推荐采用MVC（Model-View-Controller）模式对API代码进行渐进式重构。

### 重构目标

- 将路由定义与业务逻辑分离
- 提高代码的可读性和可维护性
- 便于单元测试和功能扩展
- 保持现有功能的稳定性

### 建议的目录结构

```
server/
├── controllers/          # 控制器目录
│   ├── contents/         # 内容相关控制器
│   │   ├── create.mjs      # 创建内容
│   │   ├── retrieve.mjs    # 获取内容
│   │   ├── update.mjs      # 更新内容
│   │   ├── delete.mjs      # 删除内容
│   │   ├── search.mjs      # 搜索内容
│   │   └── index.mjs       # 导出所有控制器
│   ├── categories/       # 分类相关控制器
│   ├── tags/             # 标签相关控制器
│   └── contentTypes/     # 内容类型相关控制器
├── routes/               # 路由定义
│   ├── contents.mjs      # 内容路由
│   ├── categories.mjs    # 分类路由
│   └── ...
└── services/             # 服务层(可选)
    ├── database.mjs      # 数据库服务
    └── ...
```

### 渐进式重构策略

为了确保系统稳定性，我们采用渐进式的方式进行重构：

1. **准备阶段**
   - 创建控制器目录结构
   - 分析现有路由文件中的功能点

2. **创建控制器**
   - 将路由处理函数提取为独立的控制器函数
   - 按功能分类组织控制器文件

3. **并行测试**
   - 创建新的路由文件（如 `contents-refactored.mjs`）
   - 在测试环境中验证新的实现

4. **切换实现**
   - 确认新实现正常后，替换原有文件
   - 进行集成测试确保功能正常

### 实现示例

**1. 控制器文件示例（`server/controllers/contents/create.mjs`）**

```javascript
import { query } from '../../db/index.mjs';

/**
 * 创建新内容
 * @param {Object} req - Express请求对象
 * @param {Object} res - Express响应对象
 */
export async function createContent(req, res) {
  const {
    typeId,
    title,
    slug,
    content,
    excerpt,
    featuredImage,
    status = 'draft',
    categoryIds = [],
    tagIds = [],
    metadata = {}
  } = req.body;

  // 验证必填字段
  if (!typeId || !title || !slug) {
    return res.status(400).json({
      message: '类型ID、标题和slug是必填项',
      success: false
    });
  }

  try {
    // 创建内容记录
    const contentResult = await query(
      'INSERT INTO contents (type_id, title, slug, content, excerpt, featured_image, status, metadata, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW()) RETURNING *',
      [typeId, title, slug, content, excerpt, featuredImage, status, metadata]
    );
    
    // 返回创建的内容对象
    res.status(201).json({
      data: contentResult.rows[0],
      success: true
    });
  } catch (error) {
    console.error('创建内容失败:', error);
    res.status(500).json({
      message: '创建内容失败',
      success: false,
      error: error.message
    });
  }
}
```

**2. 控制器索引文件（`server/controllers/contents/index.mjs`）**

```javascript
// 导出所有内容控制器
export { createContent } from './create.mjs';
export { getAllContents, getContentById, getContentBySlug } from './retrieve.mjs';
export { searchContents } from './search.mjs';
```

**3. 重构后的路由文件（`server/routes/contents-refactored.mjs`）**

```javascript
import express from 'express';
import { 
  createContent, 
  getAllContents, 
  getContentById, 
  getContentBySlug,
  searchContents 
} from '../controllers/contents/index.mjs';

const router = express.Router();

// 内容搜索 - 使用特定路径确保不会被其他路由拦截
router.get('/api-search', searchContents);

// 获取所有内容项（支持分页、筛选和排序）
router.get('/', getAllContents);

// 根据ID获取内容
router.get('/:id([0-9]+)', getContentById);

// 根据slug获取内容
router.get('/:slug', getContentBySlug);

// 创建新内容
router.post('/', createContent);

export default router;
```

### 测试和验证

重构完成后，进行以下测试确保功能正常：

1. **单元测试**
   - 测试每个控制器函数
   - 验证输入验证和错误处理

2. **集成测试**
   - 测试完整的API路由
   - 验证所有端点的响应

3. **性能测试**
   - 比较重构前后的响应时间
   - 确保没有性能下降

### 注意事项

- 采用渐进式方法，确保系统稳定性
- 保持充分的测试覆盖率
- 添加详细的代码注释和文档
- 确保与现有代码风格一致

## 下一步

完成API整合和代码重构后，继续进行[步骤五：集成验收](./05-integration-testing.md)。
