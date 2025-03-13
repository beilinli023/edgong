# 步骤二：内容类型系统整合

**预计时间**：2天  
**目标**：为不同类型内容（博客、项目、留学、FAQ、表单管理、邮件订阅及常规内容）提供结构化管理。

## 0. 已完成部分：基础API实现

已经实现了内容类型系统的基础API路由，使用Express服务器提供以下功能：

- [x] **内容类型API**（`/content-types`）
  - 提供内容类型的创建、查询、更新和删除功能
  - 支持内容类型字段验证
  - 定义了基础内容类型结构

- [x] **分类API**（`/categories`）
  - 提供完整的分类CRUD操作
  - 支持多语言（中英文）分类信息
  - 支持分类层级（父子关系）
  - 提供分类树结构查询
  - 支持按内容类型筛选分类

- [x] **标签API**（`/tags`）
  - 提供标签的CRUD操作
  - 支持批量创建标签
  - 支持按内容类型筛选标签

- [x] **内容项API**（`/contents`）
  - 基于内容类型创建内容项
  - 提供内容分页、排序和复合筛选
  - 支持内容状态管理（发布/草稿/归档）
  - 提供内容搜索功能

所有API端点均已测试工作正常，目前使用内存存储模拟数据库。当前API服务器运行在端口3001上，与Vite开发服务器配合使用。

下一步需要进行：
1. 数据库集成（按照下述步骤创建实际的数据库表）
2. 前端页面与组件开发，连接API

## 1. 数据库结构更新（第一天上午）

### 1.1 创建数据库迁移文件

- [ ] 创建内容类型相关的数据库迁移
  ```bash
  npm run typeorm migration:create -- -n ContentTypeSystem
  ```

- [ ] 在迁移文件中实现以下表结构
  ```typescript
  // 创建内容类型表
  await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS content_types (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(50) NOT NULL,
      schema JSONB NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 修改contents表
  await queryRunner.query(`
    ALTER TABLE contents 
    ADD COLUMN IF NOT EXISTS type_id UUID REFERENCES content_types(id);
  `);
  ```

### 1.2 创建分类和标签系统

- [ ] 在同一迁移文件中添加分类和标签表
  ```typescript
  // 创建分类和标签表
  await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS categories (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name_en VARCHAR(100) NOT NULL,
      name_zh VARCHAR(100) NOT NULL,
      slug VARCHAR(100) UNIQUE NOT NULL,
      description_en TEXT,
      description_zh TEXT,
      parent_id UUID REFERENCES categories(id),
      type VARCHAR(50) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS tags (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name_en VARCHAR(50) NOT NULL,
      name_zh VARCHAR(50) NOT NULL,
      slug VARCHAR(50) UNIQUE NOT NULL,
      color VARCHAR(20),
      type VARCHAR(50) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
  ```

### 1.3 创建关联表

- [ ] 添加内容与分类、标签的关联表
  ```typescript
  await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS content_categories (
      content_id UUID REFERENCES contents(id) ON DELETE CASCADE,
      category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
      PRIMARY KEY (content_id, category_id)
    );

    CREATE TABLE IF NOT EXISTS content_tags (
      content_id UUID REFERENCES contents(id) ON DELETE CASCADE,
      tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
      PRIMARY KEY (content_id, tag_id)
    );
  `);
  ```

### 1.4 执行迁移

- [ ] 运行迁移脚本
  ```bash
  npm run typeorm migration:run
  ```

- [ ] 验证数据库结构
  ```bash
  npm run typeorm schema:log
  ```

## 2. 内容类型字段定义（第一天下午）

### 2.1 设计各内容类型的特定字段

- [ ] 创建博客文章内容类型字段
  ```json
  {
    "name": "BlogPost",
    "schema": {
      "title": { "type": "string", "required": true },
      "summary": { "type": "text" },
      "content": { "type": "rich-text", "required": true },
      "featured_image": { "type": "media", "required": true },
      "publication_date": { "type": "date" },
      "author": { "type": "string" },
      "status": { "type": "enum", "options": ["draft", "published", "archived"] }
    }
  }
  ```
### 博客文章（BlogPost）内容字段对照表

| 网页显示字段 | CMS管理字段 | 字段类型 | 说明 |
|------------|------------|---------|------|
| 文章标题 | title | string | 博客文章的标题，在列表和详情页显示 |
| 文章摘要 | summary | text | 在文章列表中显示的简短描述 |
| 文章内容 | content | rich-text | 支持富文本格式的完整文章内容 |
| 特色图片 | featured_image | media | 在文章列表和详情页顶部显示的主图 |
| 发布日期 | publication_date | date | 文章的发布时间 |
| 作者 | author | string | 文章的作者名称 |
| 文章状态 | status | enum | 控制文章是否可见（草稿/已发布/已归档） |
| 分类 | categories | relation | 关联到分类表，用于文章分类导航 |
| 标签 | tags | relation | 关联到标签表，用于相关文章推荐 |

- [ ] 创建项目内容类型字段
  ```json
  {
    "name": "Program",
    "schema": {
      "title_en": { "type": "string", "required": true },
      "title_zh": { "type": "string", "required": true },
      "program_id": { "type": "string", "required": true },
      "image": { "type": "media", "required": true },
      "location_en": { "type": "string" },
      "location_zh": { "type": "string" },
      "duration": { "type": "string" },
      "country": { "type": "string" },
      "program_type_en": { "type": "string" },
      "program_type_zh": { "type": "string" },
      "destination_en": { "type": "string" },
      "destination_zh": { "type": "string" },
      "grade_level_en": { "type": "string" },
      "grade_level_zh": { "type": "string" },
      "duration_weeks": { "type": "number" },
      "description_en": { "type": "rich-text" },
      "description_zh": { "type": "rich-text", "required": true },
      "highlights_en": { "type": "rich-text" },
      "highlights_zh": { "type": "rich-text" },
      "itinerary_en": { "type": "rich-text" },
      "itinerary_zh": { "type": "rich-text" },
      "features_en": { "type": "rich-text" },
      "features_zh": { "type": "rich-text" },
      "information_en": { "type": "rich-text" },
      "information_zh": { "type": "rich-text" },
      "school_info_en": { "type": "rich-text" },
      "school_info_zh": { "type": "rich-text" },
      "price": { "type": "number" },
      "gallery_images": { "type": "array", "items": { "type": "media" } },
      "grade_levels": { "type": "array", "items": { "type": "string" }, "required": true },
      "tags": { "type": "relation", "relation": "tags" },
      "status": { "type": "enum", "options": ["draft", "published", "archived"] },
      "published_at": { "type": "datetime" }
    }
  }
  ```
### 项目内容（Program）字段对照表

| 网页显示字段 | CMS管理字段 | 字段类型 | 说明 |
|------------|------------|---------|------|
| 项目名称（英文） | title_en | string | 项目的英文名称，必填 |
| 项目名称（中文） | title_zh | string | 项目的中文名称，必填 |
| 项目编号 | program_id | string | 项目的唯一标识符，必填 |
| 项目图片 | image | media | 项目的主图，必填 |
| 项目地点（英文） | location_en | string | 项目所在的地理位置（英文） |
| 项目地点（中文） | location_zh | string | 项目所在的地理位置（中文） |
| 项目时长 | duration | string | 项目的持续时间 |
| 所在国家 | country | string | 项目所在的国家 |
| 项目类型（英文） | program_type_en | string | 项目的类型（英文），如"Study Tour" |
| 项目类型（中文） | program_type_zh | string | 项目的类型（中文），如"游学"、"夏令营" |
| 目的地（英文） | destination_en | string | 目的地（英文） |
| 目的地（中文） | destination_zh | string | 目的地（中文） |
| 年级水平（英文） | grade_level_en | string | 适用年级（英文） |
| 年级水平（中文） | grade_level_zh | string | 适用年级（中文） |
| 时长（周数） | duration_weeks | number | 项目持续的周数 |
| 项目描述（英文） | description_en | rich-text | 项目的详细介绍（英文） |
| 项目描述（中文） | description_zh | rich-text | 项目的详细介绍（中文），必填 |
| 项目亮点（英文） | highlights_en | rich-text | 项目的主要亮点（英文） |
| 项目亮点（中文） | highlights_zh | rich-text | 项目的主要亮点（中文） |
| 行程安排（英文） | itinerary_en | rich-text | 详细的行程安排（英文） |
| 行程安排（中文） | itinerary_zh | rich-text | 详细的行程安排（中文） |
| 项目特色（英文） | features_en | rich-text | 项目的特色功能或服务（英文） |
| 项目特色（中文） | features_zh | rich-text | 项目的特色功能或服务（中文） |
| 项目信息（英文） | information_en | rich-text | 项目附加信息（英文） |
| 项目信息（中文） | information_zh | rich-text | 项目附加信息（中文） |
| 学校介绍（英文） | school_info_en | rich-text | 学校介绍（英文） |
| 学校介绍（中文） | school_info_zh | rich-text | 学校介绍（中文） |
| 价格 | price | number | 项目的价格 |
| 图片集 | gallery_images | array of media | 项目的多张图片，通常以轮播或画廊形式展示 |
| 适用年级 | grade_levels | array of string | 适用年级数组，必填 |
| 标签 | tags | relation | 关联到标签表，用于相关项目推荐 |
| 项目状态 | status | enum | 控制项目是否可见（草稿/已发布/已归档） |
| 发布日期 | published_at | datetime | 项目的发布日期 |

### 网页与CMS字段差异分析

与当前CMS中定义的字段相比，主要差异包括：

1. **多语言支持**：
   - 网页版本中几乎所有文本字段都有英文(_en)和中文(_zh)两个版本
   - CMS版本中没有区分语言版本

2. **字段命名差异**：
   - 网页版本：`gallery_images`
   - CMS版本：`gallery`

3. **额外字段**：网页版本有但CMS版本没有的字段包括：
   - `destination_en/zh`（目的地）
   - `grade_level_en/zh`（年级水平）
   - `grade_levels`（适用年级数组）
   - `information_en/zh`（项目信息）
   - `school_info_en/zh`（学校介绍）
   - `published_at`（发布日期）
   - `duration_weeks`（时长周数）

4. **CMS版本有但网页版本没有的字段**：
   - `age_range`（适用年龄）
   - `categories`（分类关系）



- [ ] 创建留学内容类型字段
  ```json
  {
    "name": "Study",
    "schema": {
      "title": { "type": "string", "required": true },
      "institution": { "type": "string", "required": true },
      "country": { "type": "string", "required": true },
      "degree_type": { "type": "string" },
      "major": { "type": "string" },
      "description": { "type": "rich-text", "required": true },
      "requirements": { "type": "rich-text" },
      "cost": { "type": "rich-text" },
      "image": { "type": "media", "required": true },
      "status": { "type": "enum", "options": ["draft", "published", "archived"] }
    }
  }
  ```

### 留学内容（Study）字段对照表（建议）

| 网页显示字段 | CMS管理字段 | 字段类型 | 说明 |
|------------|------------|---------|------|
| 留学项目名称 | title | string | 留学项目的名称 |
| 院校名称 | institution | string | 留学院校的名称 |
| 国家/地区 | country | string | 留学目的地国家或地区 |
| 学位类型 | degree_type | string | 学士/硕士/博士等 |
| 专业方向 | major | string | 留学专业方向 |
| 项目简介 | description | rich-text | 留学项目的详细介绍 |
| 申请要求 | requirements | rich-text | 申请该项目的条件和要求 |
| 费用信息 | cost | rich-text | 学费、生活费等费用信息 |
| 项目图片 | image | media | 项目的主图 |
| 项目状态 | status | enum | 控制项目是否可见 |


- [ ] 创建FAQ内容类型字段
  ```json
  {
    "name": "FAQ",
    "schema": {
      "question": { "type": "string", "required": true },
      "answer": { "type": "rich-text", "required": true },
      "category": { "type": "relation", "relation": "categories" },
      "order": { "type": "number", "default": 0 },
      "status": { "type": "enum", "options": ["draft", "published", "archived"], "default": "published" }
    }
  }
  ```

### FAQ内容字段对照表（建议）

| 网页显示字段 | CMS管理字段 | 字段类型 | 说明 |
|------------|------------|---------|------|
| 问题 | question | string | FAQ的问题部分 |
| 回答 | answer | rich-text | FAQ的回答部分，支持富文本 |
| 分类 | category | relation | FAQ的分类，如"申请流程"、"签证" |
| 排序 | order | number | 控制FAQ的显示顺序 |
| 状态 | status | enum | 控制FAQ是否可见 |

- [ ] 创建表单设置内容类型字段
  ```json
  {
    "name": "Form",
    "schema": {
      "title": { "type": "string", "required": true },
      "description": { "type": "text" },
      "fields": { "type": "array", "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string", "required": true },
          "label": { "type": "string", "required": true },
          "type": { "type": "enum", "options": ["text", "email", "number", "textarea", "select", "checkbox", "radio"], "required": true },
          "required": { "type": "boolean", "default": false },
          "options": { "type": "array", "items": { "type": "string" } },
          "placeholder": { "type": "string" }
        }
      }, "required": true },
      "submit_button_text": { "type": "string", "default": "提交" },
      "success_message": { "type": "text", "default": "表单提交成功！" },
      "error_message": { "type": "text", "default": "表单提交失败，请重试。" },
      "notification_emails": { "type": "array", "items": { "type": "string" } },
      "status": { "type": "enum", "options": ["active", "inactive"], "default": "active" }
    }
  }
  ```

### 表单设置（Form）字段对照表

| 网页显示字段 | CMS管理字段 | 字段类型 | 说明 |
|------------|------------|---------|------|
| 表单标题 | title | string | 表单的标题 |
| 表单描述 | description | text | 表单的说明文字 |
| 表单字段 | fields | array of object | 表单包含的各个字段定义 |
| 提交按钮文字 | submit_button_text | string | 表单提交按钮上的文字 |
| 成功提示 | success_message | text | 表单提交成功后的提示信息 |
| 错误提示 | error_message | text | 表单提交失败后的错误信息 |
| 通知邮箱 | notification_emails | array of string | 接收表单提交通知的邮箱列表 |
| 状态 | status | enum | 控制表单是否激活 |

- [ ] 创建邮件订阅内容类型字段
  ```json
  {
    "name": "Newsletter",
    "schema": {
      "title": { "type": "string", "required": true },
      "description": { "type": "text" },
      "frequency": { "type": "enum", "options": ["daily", "weekly", "monthly"], "default": "weekly" },
      "template": { "type": "rich-text", "required": true },
      "subscription_groups": { "type": "array", "items": { "type": "string" } },
      "status": { "type": "enum", "options": ["active", "inactive", "draft"], "default": "draft" }
    }
  }
  ```

### 邮件订阅（Newsletter）字段对照表

| 网页显示字段 | CMS管理字段 | 字段类型 | 说明 |
|------------|------------|---------|------|
| 邮件标题 | title | string | 邮件通讯的标题 |
| 邮件描述 | description | text | 邮件通讯的简短描述 |
| 发送频率 | frequency | enum | 邮件发送的频率（每日/每周/每月） |
| 邮件模板 | template | rich-text | 邮件的HTML模板内容 |
| 订阅组 | subscription_groups | array of string | 订阅该邮件的用户组 |
| 状态 | status | enum | 控制邮件是否激活 |

- [ ] 创建通用内容类型字段
  ```json
  {
    "name": "GeneralContent",
    "schema": {
      "title": { "type": "string", "required": true },
      "key": { "type": "string", "required": true },
      "content": { "type": "rich-text" },
      "content_type": { "type": "enum", "options": ["navigation", "footer", "sidebar", "banner", "other"], "required": true },
      "status": { "type": "enum", "options": ["active", "inactive"], "default": "active" }
    }
  }
  ```

### 通用内容（GeneralContent）字段对照表

| 网页显示字段 | CMS管理字段 | 字段类型 | 说明 |
|------------|------------|---------|------|
| 内容标题 | title | string | 内容的标题（管理用） |
| 内容键名 | key | string | 用于程序调用的唯一标识符 |
| 内容正文 | content | rich-text | 内容的具体文本或HTML |
| 内容类型 | content_type | enum | 内容的类型（导航、页脚等） |
| 状态 | status | enum | 控制内容是否激活 |

- [ ] 为其他内容类型创建类似的字段定义
  - 留学内容
  - FAQ内容
  - 表单设置
  - 邮件订阅
  - 通用内容（导航菜单、页脚等）

### 2.2 编写数据库初始化脚本

- [ ] 创建初始内容类型的数据库脚本
  ```typescript
  // src/seeds/contentTypes.seed.ts
  export const contentTypeSeeds = [
    {
      name: "BlogPost",
      schema: {...}
    },
    {
      name: "Program",
      schema: {...}
    },
    // 其他内容类型
  ];

  export async function seedContentTypes() {
    for (const typeData of contentTypeSeeds) {
      // 检查是否已存在
      const existing = await getRepository(ContentType).findOne({ name: typeData.name });
      if (!existing) {
        await getRepository(ContentType).save(typeData);
      }
    }
  }
  ```

## 3. 实现实体与服务（第二天）

### 3.1 创建实体模型

- [ ] 创建内容类型实体
  ```typescript
  // src/entities/contentType.entity.ts
  @Entity('content_types')
  export class ContentType {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('jsonb')
    schema: any;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => Content, content => content.type)
    contents: Content[];
  }
  ```

- [ ] 更新内容实体，关联内容类型
  ```typescript
  // src/entities/content.entity.ts
  @Entity('contents')
  export class Content {
    // 现有字段...

    @ManyToOne(() => ContentType, type => type.contents)
    @JoinColumn({ name: 'type_id' })
    type: ContentType;

    @Column({ name: 'type_id', nullable: true })
    typeId: string;

    @ManyToMany(() => Category)
    @JoinTable({
      name: 'content_categories',
      joinColumn: { name: 'content_id' },
      inverseJoinColumn: { name: 'category_id' }
    })
    categories: Category[];

    @ManyToMany(() => Tag)
    @JoinTable({
      name: 'content_tags',
      joinColumn: { name: 'content_id' },
      inverseJoinColumn: { name: 'tag_id' }
    })
    tags: Tag[];
  }
  ```

### 3.2 创建服务和控制器

- [ ] 创建内容类型服务
  ```typescript
  // src/services/contentTypes.service.ts
  @Injectable()
  export class ContentTypesService {
    constructor(
      @InjectRepository(ContentType)
      private readonly contentTypeRepository: Repository<ContentType>
    ) {}

    async findAll(): Promise<ContentType[]> {
      return this.contentTypeRepository.find();
    }

    async findOne(id: string): Promise<ContentType> {
      const type = await this.contentTypeRepository.findOne({ where: { id } });
      if (!type) {
        throw new NotFoundException(`Content type with ID ${id} not found`);
      }
      return type;
    }

    async create(createDto: CreateContentTypeDto): Promise<ContentType> {
      return this.contentTypeRepository.save(createDto);
    }

    async update(id: string, updateDto: UpdateContentTypeDto): Promise<ContentType> {
      await this.contentTypeRepository.update(id, updateDto);
      return this.findOne(id);
    }
  }
  ```

- [ ] 创建内容类型控制器
  ```typescript
  // src/controllers/contentTypes.controller.ts
  @Controller('content-types')
  export class ContentTypesController {
    constructor(private readonly contentTypesService: ContentTypesService) {}

    @Get()
    async findAll() {
      return this.contentTypesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.contentTypesService.findOne(id);
    }

    @Post()
    async create(@Body() createDto: CreateContentTypeDto) {
      return this.contentTypesService.create(createDto);
    }

    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updateDto: UpdateContentTypeDto
    ) {
      return this.contentTypesService.update(id, updateDto);
    }
  }
  ```

### 3.3 前端集成内容类型

- [ ] 创建内容类型选择器组件
  ```typescript
  // src/components/ContentTypeSelector.tsx
  export const ContentTypeSelector: React.FC<Props> = ({ onChange }) => {
    const { data, isLoading } = useQuery(
      ['contentTypes'],
      () => api.getContentTypes()
    );

    if (isLoading) return <Spinner />;

    return (
      <Select
        options={data.map(type => ({
          value: type.id,
          label: type.name
        }))}
        onChange={onChange}
      />
    );
  };
  ```

- [ ] 创建内容编辑器组件
  ```typescript
  // src/components/ContentEditor.tsx
  export const ContentEditor: React.FC<Props> = ({ contentType, initialData }) => {
    const { mutate } = useMutation(
      (data: ContentData) => api.updateContent(contentType.id, data)
    );

    const [content, setContent] = useState(initialData);
    const [language, setLanguage] = useState<'en' | 'zh'>('en');

    return (
      <div>
        <LanguageSwitch value={language} onChange={setLanguage} />
        <DynamicForm
          schema={contentType.schema}
          value={content[language]}
          onChange={(value) => {
            setContent(prev => ({
              ...prev,
              [language]: value
            }));
          }}
        />
        <Button
          onClick={async () => {
            await mutate(content);
            toast.success('保存成功');
          }}
        >
          保存
        </Button>
      </div>
    );
  };
  ```

## 验证标准

完成本阶段后，应该满足以下条件：

1. 数据库中包含内容类型、分类和标签表
2. 可以通过API创建和管理内容类型
3. 前端可以基于内容类型动态生成表单
4. 可以将内容关联到特定的内容类型

## 下一步

完成内容类型系统后，继续进行[步骤三：表单管理系统整合](./03-form-management.md)。
