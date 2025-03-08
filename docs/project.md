EdGoing网站架构概览
我已整理了网站的整体设计结构和文件目录，以帮助你了解项目的组织方式。

项目技术栈
前端框架: React + TypeScript
构建工具: Vite
样式: Tailwind CSS + Shadcn UI组件
状态管理: React Query
后端集成: Supabase
路由: React Router
目录结构
主要目录
CopyInsert
/
├── public/                 # 静态资源
├── src/                    # 源代码
│   ├── components/         # 组件
│   ├── context/            # React上下文
│   ├── data/               # 静态数据
│   ├── hooks/              # 自定义Hook
│   ├── integrations/       # 第三方集成
│   ├── lib/                # 通用库
│   ├── pages/              # 页面组件
│   ├── services/           # API服务
│   ├── types/              # TypeScript类型定义
│   └── utils/              # 工具函数
├── supabase/               # Supabase配置与迁移
└── ...配置文件
核心页面结构
前端页面都位于 src/pages/frontend/ 目录下:

HomePage.tsx - 网站首页
ProgramsPage.tsx - 探索项目页面
ProgramDetailPage.tsx - 项目详情页面
StudyAbroadPage.tsx - 精彩留学页面
UniversityDetailPage.tsx - 大学详情页面
AboutPage.tsx - 关于我们页面
ContactPage.tsx - 联系页面
LearnHowPage.tsx - 了解更多页面
StartPlanningPage.tsx - 开始计划页面
BlogPage.tsx - 博客页面
BlogPostDetail.tsx - 博客文章详情页面
PrivacyPolicyPage.tsx - 隐私政策页面
核心组件结构
网站的组件按功能分类组织在 src/components/ 目录下:

frontend/ - 前端界面组件
FrontendNavbar.tsx - 导航栏组件
FrontendLayout.tsx - 布局组件
home/ - 首页相关组件，包括轮播图等
blog/ - 博客相关组件
其他前端专用组件
ui/ - 通用UI组件(基于Shadcn)
按钮、表单、导航等基础组件
content/ - 内容管理组件
NavigationManager.tsx - 导航管理组件
其他内容管理相关组件
服务层结构
API服务和数据处理位于 src/services/ 目录:

api/ - API客户端
apiClient.ts - 封装的Axios实例
apiService.ts - API服务类
frontend/ - 前端专用服务
navigationService.ts - 导航服务
footerService.ts - 页脚服务
blogService.ts - 博客服务
homeContentService.ts - 首页内容服务
studyAbroadService.ts - 留学服务
其他前端数据服务
自定义Hook
业务逻辑封装在 src/hooks/ 目录的自定义Hook中:

useFrontendNavigation.ts - 导航数据Hook
useFrontendHeroSlider.ts - 首页轮播图Hook
其他业务逻辑Hook
Supabase集成
根据之前的记忆，项目已完成了Supabase的集成，包括:

环境配置 (URL和API密钥)
认证与权限管理
文件上传功能
内容管理API
博客管理API
混合模式API服务器
数据流程
用户界面 → 组件通过自定义Hook获取数据
自定义Hook → 调用相应的服务进行API请求
服务层 → 处理与后端的交互，使用apiClient发送请求
API客户端 → 负责请求/响应拦截、错误处理和认证
多语言支持
网站支持中英文切换功能:

使用 LanguageContext 管理语言状态
各组件根据当前语言加载相应文本
导航栏提供语言切换按钮
以上就是EdGoing网站的整体架构概览。这个结构清晰地将UI组件、业务逻辑和数据服务分离，便于维护和扩展。如果你需要深入了解某个特定部分，我可以为你提供更详细的信息。