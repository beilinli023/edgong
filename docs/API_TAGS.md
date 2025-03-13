# 标签API文档

## 概述

标签API提供对系统中所有标签的创建、读取、更新和删除(CRUD)功能。标签用于对内容进行分类和组织，便于内容检索和过滤。

## 数据模型

标签模型包含以下字段:

| 字段名 | 类型 | 描述 |
|-------|------|------|
| id | UUID | 标签唯一标识符 |
| name_en | String | 标签英文名称 |
| name_zh | String | 标签中文名称 |
| slug | String | 标签URL友好名称，唯一 |
| type | String | 标签类型，用于分组标签 |
| created_at | Timestamp | 创建时间 |
| updated_at | Timestamp | 最后更新时间 |

## API端点

### 获取所有标签

获取系统中的所有标签，可选择按类型过滤。

```
GET /api/tags
```

**查询参数:**

| 参数名 | 类型 | 必需 | 描述 |
|-------|------|------|------|
| type | String | 否 | 按标签类型过滤 |

**成功响应:**

```json
{
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name_en": "Technology",
      "name_zh": "技术",
      "slug": "technology",
      "type": "blog",
      "created_at": "2023-01-01T00:00:00.000Z",
      "updated_at": "2023-01-01T00:00:00.000Z"
    },
    ...
  ],
  "success": true
}
```

### 获取单个标签(按ID)

通过ID获取特定标签的详细信息。

```
GET /api/tags/:id
```

**路径参数:**

| 参数名 | 类型 | 描述 |
|-------|------|------|
| id | UUID | 标签ID |

**成功响应:**

```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name_en": "Technology",
    "name_zh": "技术",
    "slug": "technology",
    "type": "blog",
    "created_at": "2023-01-01T00:00:00.000Z",
    "updated_at": "2023-01-01T00:00:00.000Z"
  },
  "success": true
}
```

### 获取单个标签(按Slug)

通过slug获取特定标签的详细信息。

```
GET /api/tags/slug/:slug
```

**路径参数:**

| 参数名 | 类型 | 描述 |
|-------|------|------|
| slug | String | 标签slug |

**成功响应:**

```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name_en": "Technology",
    "name_zh": "技术",
    "slug": "technology",
    "type": "blog",
    "created_at": "2023-01-01T00:00:00.000Z",
    "updated_at": "2023-01-01T00:00:00.000Z"
  },
  "success": true
}
```

### 创建标签

创建一个新的标签。

```
POST /api/tags
```

**请求体:**

```json
{
  "name_en": "Technology",
  "name_zh": "技术",
  "slug": "technology",
  "type": "blog"
}
```

**字段验证:**

- `name_en`, `name_zh`, `slug`, `type`都是必需的
- `slug`必须是唯一的

**成功响应:**

```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name_en": "Technology",
    "name_zh": "技术",
    "slug": "technology",
    "type": "blog",
    "created_at": "2023-01-01T00:00:00.000Z",
    "updated_at": "2023-01-01T00:00:00.000Z"
  },
  "success": true
}
```

### 更新标签

更新现有标签的信息。

```
PUT /api/tags/:id
```

**路径参数:**

| 参数名 | 类型 | 描述 |
|-------|------|------|
| id | UUID | 标签ID |

**请求体:**

```json
{
  "name_en": "Updated Technology",
  "name_zh": "更新的技术",
  "slug": "updated-technology",
  "type": "blog"
}
```

**字段验证:**

- `name_en`, `name_zh`, `slug`, `type`都是必需的
- 如果更改了`slug`，新的`slug`必须是唯一的

**成功响应:**

```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name_en": "Updated Technology",
    "name_zh": "更新的技术",
    "slug": "updated-technology",
    "type": "blog",
    "created_at": "2023-01-01T00:00:00.000Z",
    "updated_at": "2023-01-02T00:00:00.000Z"
  },
  "success": true
}
```

### 删除标签

删除指定的标签。

```
DELETE /api/tags/:id
```

**路径参数:**

| 参数名 | 类型 | 描述 |
|-------|------|------|
| id | UUID | 标签ID |

**限制:**

- 如果标签正在被内容引用，将无法删除

**成功响应:**

```json
{
  "message": "标签已成功删除",
  "success": true
}
```

### 批量创建标签

批量创建多个标签。

```
POST /api/tags/batch
```

**请求体:**

```json
{
  "tags": [
    {
      "name_en": "Technology",
      "name_zh": "技术",
      "slug": "technology"
    },
    {
      "name_en": "Education",
      "name_zh": "教育",
      "slug": "education"
    }
  ],
  "type": "blog"
}
```

**字段验证:**

- `tags`数组和`type`是必需的
- 每个标签的`name_en`和`name_zh`是必需的
- `slug`是可选的，如果不提供会根据`name_en`自动生成
- 所有`slug`必须是唯一的

**成功响应:**

```json
{
  "data": {
    "created": [
      {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "name_en": "Technology",
        "name_zh": "技术",
        "slug": "technology",
        "type": "blog",
        "created_at": "2023-01-01T00:00:00.000Z",
        "updated_at": "2023-01-01T00:00:00.000Z"
      },
      {
        "id": "223e4567-e89b-12d3-a456-426614174000",
        "name_en": "Education",
        "name_zh": "教育",
        "slug": "education",
        "type": "blog",
        "created_at": "2023-01-01T00:00:00.000Z",
        "updated_at": "2023-01-01T00:00:00.000Z"
      }
    ],
    "errors": []
  },
  "success": true
}
```

## 错误处理

API可能返回以下错误状态码:

| 状态码 | 描述 |
|-------|------|
| 400 | 请求参数无效 |
| 404 | 标签不存在 |
| 409 | slug冲突 |
| 500 | 服务器内部错误 |

**错误响应示例:**

```json
{
  "message": "同名slug已存在",
  "success": false
}
```

## 数据库操作

标签API现在使用PostgreSQL数据库进行持久化存储，相比之前的内存存储方式，具有以下优势:

1. 数据持久性 - 服务器重启后数据不会丢失
2. 事务支持 - 特别是在批量操作中确保数据一致性
3. 更好的查询性能 - 特别是对于大量数据
4. 外键约束 - 确保数据完整性，例如防止删除仍被内容引用的标签
