# Agile Content Nest - 教育内容管理系统

## 项目概述

**Agile Content Nest**是一个面向教育机构的现代化内容管理系统，专注于提供丰富的教育资源展示和管理功能。系统支持多语言（中文和英文），为用户提供直观、高效的内容浏览和管理体验。

### 核心功能

- **首页内容管理**：动态展示机构特色、最新课程和教育理念
- **课程管理系统**：展示和管理各类教育课程，支持详细介绍和分类筛选
- **留学服务模块**：展示合作大学、留学优势和相关服务
- **博客内容系统**：发布和管理教育相关文章和资讯
- **管理后台**：提供内容编辑、媒体管理和用户管理功能
- **多语言支持**：完整支持中文和英文内容切换

## 技术架构

### 前端技术栈

- **框架**：React 18 + TypeScript
- **构建工具**：Vite
- **UI组件**：shadcn-ui (基于Radix UI)
- **样式方案**：Tailwind CSS
- **状态管理**：React Context API + React Query
- **路由管理**：React Router
- **富文本编辑**：TipTap编辑器

### 项目结构

```
src/
├── components/       # UI组件
│   ├── frontend/     # 前台展示组件
│   ├── ui/           # 通用UI组件
│   └── ...           # 其他功能组件
├── pages/            # 页面组件
│   ├── frontend/     # 前台页面
│   └── ...           # 管理页面
├── services/         # 服务层
│   ├── frontend/     # 前台数据服务
│   └── ...           # 其他服务
├── hooks/            # 自定义Hooks
├── context/          # 上下文管理
├── types/            # TypeScript类型定义
└── utils/            # 工具函数
```

### 数据管理

- **内容存储**：同时支持JSON文件存储和PostgreSQL数据库
  - JSON文件存储在`public/content/`目录
  - PostgreSQL数据库用于更高性能的存储和检索
- **数据获取**：通过服务层API获取和处理数据
- **状态管理**：使用React Context和自定义Hooks管理全局状态

### 数据库架构

- **数据库类型**：PostgreSQL
- **表结构**：
  - `content_types`：内容类型信息
  - `categories`：分类信息，支持嵌套层级
  - `tags`：标签信息
  - `contents`：存储所有内容
  - `content_categories`：内容与分类的关联
  - `content_tags`：内容与标签的关联
- **数据操作**：使用`pg`模块进行原生查询和事务操作

## 开发指南

### 环境准备

确保您的开发环境满足以下要求：
- Node.js 16.x 或更高版本
- npm 8.x 或更高版本
- PostgreSQL 14.x 或更高版本

### 本地开发

```sh
# 克隆仓库
git clone https://github.com/beilinli023/edgong.git

# 进入项目目录
cd agile-content-nest-24-main

# 安装依赖
npm install
```

### 数据库配置

1. 创建 PostgreSQL 数据库

```sh
# 登录 PostgreSQL
psql -U postgres

# 创建数据库
CREATE DATABASE cms_db;

# 退出
\q
```

2. 初始化数据库结构

```sh
# 运行初始化SQL脚本
psql -U postgres -d cms_db -f server/db/init.sql
```

3. 如需要，可运行数据迁移脚本，将JSON数据迁移到数据库

```sh
# 运行数据迁移脚本
node server/db/migrate-data.mjs
```

### 启动开发服务器

```sh
# 启动开发服务器
npm run dev
```

### 测试数据库集成

```sh
# 运行数据库集成测试脚本
node scripts/test-db-integration.mjs
```

### 构建部署

```sh
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

### 部署到Vercel

1. **准备工作**
   - 确保项目根目录包含`vercel.json`文件，内容如下：
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```
   - 此配置确保客户端路由正常工作，避免直接访问路由（如`/privacy-policy`）时出现404错误

2. **部署步骤**
   - 安装Vercel CLI（可选）
   ```sh
   npm install -g vercel
   ```
   
   - 使用Vercel CLI部署
   ```sh
   # 登录Vercel
   vercel login
   
   # 部署项目
   vercel
   ```
   
   - 或直接通过Vercel网站部署
     - 在[Vercel](https://vercel.com)注册并登录
     - 导入GitHub/GitLab/Bitbucket仓库
     - 配置项目（框架预设选择"Vite"）
     - 点击"Deploy"按钮

3. **部署后配置**
   - 在Vercel项目设置中配置环境变量（如有需要）
   - 配置自定义域名（如有需要）
   - 检查所有页面路由是否正常工作，特别是直接访问`/privacy-policy`等路径

4. **常见问题排查**
   - 如果出现404错误，检查`vercel.json`文件是否正确配置
   - 如果API请求失败，检查API路径是否正确，可能需要配置代理或CORS

### 部署到阿里云OSS

1. 安装阿里云OSS命令行工具
```sh
curl -o ossutilmac64 http://gosspublic.alicdn.com/ossutil/1.7.7/ossutilmac64
chmod 755 ossutilmac64
```

2. 配置OSS工具
```sh
./ossutilmac64 config
```

3. 上传构建文件
```sh
./ossutilmac64 cp -r ./dist/ oss://your-bucket-name/ --update
```

## 内容管理指南

### 添加新课程

1. 在`public/content/programs/`目录创建新的JSON文件
2. 在`public/content/programs/index.json`中添加新课程引用
3. 按照现有格式填写课程信息

### 添加新大学

1. 在`public/content/universities/`目录创建新的JSON文件
2. 在`public/content/universities/index.json`中添加新大学引用

### 多语言内容

所有内容支持中英文版本，请确保在JSON文件中同时提供`title`和`title_en`等字段。

## 贡献指南

### 代码规范

- 遵循TypeScript和React最佳实践
- 使用Tailwind CSS进行样式开发
- 组件采用函数式组件和Hooks
- 确保代码有适当的注释和文档

### 开发流程

1. 创建功能分支
2. 开发并测试新功能
3. 提交代码并创建Pull Request
4. 代码审查后合并到主分支

## 数据库开发最佳实践与经验教训

在开发数据库相关功能时，请遵循以下最佳实践，这些来自项目实际开发过程中的经验教训：

### 基本原则

1. **先验证数据库结构再编写代码**
   - 在编写SQL语句前，始终验证表结构和列名
   - 使用以下查询检查表结构：
     ```sql
     SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'your_table_name'
     ```

2. **从错误消息中获取更多信息**
   - 错误消息通常包含关键线索，如“column X of relation Y does not exist”
   - 仔细分析错误消息，而不是立即尝试修改代码

3. **简单解决方案优先**
   - 先确保基本功能正常工作，再添加复杂特性
   - 先测试简单查询，确保连接和基本操作正常

4. **直接测试而非间接推断**
   - 使用直接的数据库查询来检查表结构
   - 编写小型测试脚本验证数据库操作

5. **增量式开发和测试**
   - 采用更小的增量步骤来开发和测试
   - 每次只修改一小部分代码，然后立即测试

### 实践建议

1. **数据库操作的最佳实践**
   - 使用参数化查询防止SQL注入
   - 在复杂操作中使用事务确保数据一致性
   - 在日志中记录SQL查询和参数，便于调试

2. **错误处理策略**
   - 详细记录错误信息，包括SQL语句和参数
   - 实现更细粒度的错误处理，区分不同类型的错误
   - 在开发环境中提供更详细的错误信息

3. **测试驱动开发**
   - 先编写测试用例，然后实现功能
   - 使用单元测试验证各个组件
   - 使用集成测试验证整个系统

4. **代码组织和模块化**
   - 将数据访问逻辑与业务逻辑分离
   - 创建可重用的数据库操作函数
   - 使用事务确保数据一致性，但先确保基本操作正常

### 实际案例教训

在本项目开发过程中，我们遇到了一个内容创建 API 失败的问题。错误消息显示："column \"category_ids\" of relation \"contents\" does not exist"。初步尝试修改 SQL 语法，但问题持续存在。

最终解决方案是：
1. 直接查询数据库表结构，确认实际列名
2. 简化内容创建 API，移除复杂的事务和关联表操作
3. 确保 SQL 语句中的列名与数据库表结构完全匹配

这个经验提醒我们，在处理数据库相关问题时，直接验证和简单方法往往比复杂的推断更有效。先确保基础正确，再构建复杂功能，这是数据库开发中的关键原则。

## 联系与支持

如有任何问题或建议，请联系项目维护团队。

---

## 原始项目信息

**URL**: https://lovable.dev/projects/7f2dc520-8d40-44e5-8f4f-f94bfac4df5b
