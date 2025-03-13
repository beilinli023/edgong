/**
 * 静态API回退机制
 * 提供零侵入式API请求保护，确保前端部署时不依赖后端API可用性
 */
import { AxiosError } from 'axios';
import { ApiResponse } from '@/services/api/apiService';

/**
 * 环境配置
 * 默认启用静态数据回退，确保用户始终有良好的体验
 */
// 静态模式默认启用，避免用户看到错误提示
const STATIC_MODE = true;

// 静态数据存储 - 保持与真实API完全相同的数据结构
const staticData: Record<string, ApiResponse<unknown>> = {
  // 联系信息API
  '/api/contact-info': {
    success: true,
    data: {
      phone: "+86 138-1234-5678",
      email: "contact@younikco.com", 
      address: "上海市浦东新区创新大道123号"
    }
  },
  
  // 导航菜单API
  '/api/navigation': {
    success: true,
    data: {
      menu: [
        { id: "home", label: { en: "Home", zh: "首页" }, url: "/" },
        { id: "about", label: { en: "About", zh: "关于我们" }, url: "/about" },
        { id: "programs", label: { en: "Programs", zh: "项目" }, url: "/programs" },
        { id: "blog", label: { en: "Blog", zh: "博客" }, url: "/blog" },
        { id: "contact", label: { en: "Contact", zh: "联系我们" }, url: "/contact" }
      ]
    }
  },
  
  // 社交媒体API
  '/api/social-media': {
    success: true,
    data: {
      links: [
        { platform: "wechat", url: "#", icon: "wechat" },
        { platform: "weibo", url: "https://weibo.com/younikco", icon: "weibo" },
        { platform: "linkedin", url: "https://linkedin.com/company/younikco", icon: "linkedin" }
      ]
    }
  },

  // 页脚信息API
  '/api/footer': {
    success: true,
    data: {
      copyright: " 2025 YouNiKco Education",
      links: [
        { label: { en: "Terms", zh: "条款" }, url: "/terms" },
        { label: { en: "Privacy", zh: "隐私" }, url: "/privacy" }
      ]
    }
  },
  
  // 首页轮播图API
  '/api/home/carousel': {
    success: true,
    data: {
      slides: [
        {
          id: "1",
          title_en: "Learn Beyond Walls",
          title_zh: "超越课堂边界",
          subtitle_en: "Ignite Curiosity, Inspire Growth, Immerse Yourself",
          subtitle_zh: "点燃好奇心，启发成长，沉浸式探索世界",
          image_url: "/Edgoing/Home_Page/Picture_1.jpg",
          button_text_en: "Explore Programs",
          button_text_zh: "浏览项目",
          button_url: "/programs",
          order_index: 1
        },
        {
          id: "2",
          title_en: "STEM Programs",
          title_zh: "STEM 项目",
          subtitle_en: "Molding Tomorrow's Thinkers and Makers.",
          subtitle_zh: "培养未来的思想者与创造者",
          image_url: "/Edgoing/Home_Page/Picture_2.jpg",
          button_text_en: "Learn More",
          button_text_zh: "了解更多",
          button_url: "/about",
          order_index: 2
        },
        {
          id: "3",
          title_en: "Academic Programs",
          title_zh: "学术项目",
          subtitle_en: "Shaping Global Minds, Inspiring Lifelong Learning.",
          subtitle_zh: "塑造全球化思维，激发终身学习热情",
          image_url: "/Edgoing/Home_Page/Picture_3.jpg",
          button_text_en: "View Programs",
          button_text_zh: "查看项目",
          button_url: "/programs",
          order_index: 3
        },
        {
          id: "4",
          title_en: "Heritage Cultural Tour",
          title_zh: "文化遗产之旅​",
          subtitle_en: "Step into the past, Uncover the stories",
          subtitle_zh: "步入历史长河，探寻精彩故事",
          image_url: "/Edgoing/Home_Page/Picture_4.jpg",
          button_text_en: "View Programs",
          button_text_zh: "查看项目",
          button_url: "/programs",
          order_index: 4
        },
        {
          id: "5",
          title_en: "Global Citizenship Starts Here",
          title_zh: "全球公民，从这里启航",
          subtitle_en: "Explore the world, embrace cultures, and lead with purpose",
          subtitle_zh: "探索世界，拥抱多元文化，以使命引领前行",
          image_url: "/Edgoing/Home_Page/Picture_5.jpg",
          button_text_en: "View Programs",
          button_text_zh: "查看项目",
          button_url: "/programs",
          order_index: 5
        }
      ]
    }
  },
 
  
  // 博客文章列表API
  '/api/blog/posts': {
    success: true,
    data: {
      posts: [
        {
          id: 1,
          title: { en: "Education Trends 2025", zh: "2025年教育趋势" },
          summary: { en: "The future of learning", zh: "学习的未来" },
          author: "张教授",
          date: "2025-02-15",
          imageUrl: "/images/blog/post1.jpg",
          slug: "education-trends-2025"
        },
        {
          id: 2,
          title: { en: "Technology in Classrooms", zh: "课堂中的技术" },
          summary: { en: "Digital tools for teaching", zh: "教学数字工具" },
          author: "李博士",
          date: "2025-01-28",
          imageUrl: "/images/blog/post2.jpg",
          slug: "technology-in-classrooms"
        },
        {
          id: 3,
          title: { en: "Student Success Stories", zh: "学生成功故事" },
          summary: { en: "Inspirational journeys", zh: "励志旅程" },
          author: "王老师",
          date: "2025-01-10",
          imageUrl: "/images/blog/post3.jpg",
          slug: "student-success-stories"
        }
      ]
    }
  },
  
  // 博客文章详情API
  '/api/blog/post/': {
    success: true,
    data: {
      id: 1,
      title: { en: "Education Trends 2025", zh: "2025年教育趋势" },
      content: { 
        en: "This is a detailed article about education trends in 2025...", 
        zh: "这是一篇关于2025年教育趋势的详细文章..." 
      },
      author: "张教授",
      date: "2025-02-15",
      imageUrl: "/images/blog/post1.jpg",
      tags: ["education", "trends", "technology"]
    }
  },
  
  // 快速链接API
  '/api/quick-links': {
    success: true,
    data: {
      links: [
        { 
          id: 1, 
          title: { en: "Student Portal", zh: "学生门户" }, 
          url: "/student-portal", 
          icon: "user-student" 
        },
        { 
          id: 2, 
          title: { en: "Apply Now", zh: "立即申请" }, 
          url: "/apply", 
          icon: "document" 
        },
        { 
          id: 3, 
          title: { en: "FAQ", zh: "常见问题" }, 
          url: "/faq", 
          icon: "question" 
        },
        { 
          id: 4, 
          title: { en: "Contact Us", zh: "联系我们" }, 
          url: "/contact", 
          icon: "mail" 
        }
      ]
    }
  },
};

/**
 * API请求拦截函数
 * 如静态模式启用，则返回静态数据，否则执行原始请求
 */
export function interceptApiRequest<T>(
  apiPath: string, 
  originalRequestFn: () => Promise<T>
): Promise<T> {
  // 标准化API路径
  let finalPath = apiPath;
  let hasAlternativeMatch = false;
  
  // 处理动态路径，例如'/blog/post/123'应该匹配'/blog/post/'规则
  if (!(finalPath in staticData)) {
    // 尝试找到可能匹配的静态数据路径
    for (const staticPath in staticData) {
      if (finalPath.startsWith(staticPath) && staticPath.endsWith('/')) {
        finalPath = staticPath;
        hasAlternativeMatch = true;
        break;
      }
    }
  }
  
  // 如果静态模式启用且找到匹配的静态数据，直接返回静态数据
  if (STATIC_MODE && finalPath && staticData[finalPath]) {
    console.log(`[静态数据] 使用本地数据: ${finalPath}${hasAlternativeMatch ? ` (原始路径: ${apiPath})` : ''}`);
    // 这里需要将 ApiResponse<unknown> 转换为 T
    // 我们假设 T 是一个 ApiResponse 类型，我们需要访问其中的 data 属性
    return Promise.resolve(staticData[finalPath].data as unknown as T);
  }
  
  // 正常发起请求，但在失败时回退到静态数据
  return originalRequestFn().catch((error: AxiosError) => {
    console.error(`[API回退] ${apiPath} 请求失败:`, error.message);
    
    // 如果有匹配的静态数据，返回静态数据
    if (finalPath && staticData[finalPath]) {
      console.log(`[API回退] ${finalPath} 使用静态数据${hasAlternativeMatch ? ` (原始路径: ${apiPath})` : ''}`);
      // 在错误对象中标记这是静态数据回退请求
      if (error.config) {
        error.config.headers = error.config.headers || {};
        // 类型安全地添加标记
        if (typeof error.config.headers === 'object') {
          (error.config.headers as Record<string, string>)['X-Static-Fallback'] = 'true';
        }
      }
      return staticData[finalPath].data as unknown as T;
    }
    
    // 否则继续抛出错误
    throw error;
  });
}

/**
 * 静态数据管理工具
 * 允许在运行时添加/更新静态数据
 */
export const StaticDataManager = {
  // 添加或更新静态数据
  setData: <T>(path: string, data: ApiResponse<T>): void => {
    staticData[path] = data as ApiResponse<unknown>;
  },
  
  // 获取静态数据
  getData: <T>(path: string): ApiResponse<T> | undefined => {
    return staticData[path] as ApiResponse<T> | undefined;
  },
  
  // 检查是否有路径的静态数据
  hasData: (path: string): boolean => {
    return !!staticData[path];
  }
};
