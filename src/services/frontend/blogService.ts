import apiClient from '../api/apiClient';
import { BlogPost, BlogCategory, BlogTag, BlogVideo, BlogHero, BlogContent } from '@/types/blogTypes';
import { extractData } from '../api/responseHelpers';
import localBlogService from '../blog/localBlogService';

// 控制是否使用静态数据（隔离API）
const USE_STATIC_DATA = true;

/**
 * 通用数据获取函数 - 处理静态数据和API回退逻辑
 * @param apiCall API调用函数
 * @param localDataCall 本地数据调用函数
 * @param resourceName 资源名称（用于日志）
 */
const getDataWithFallback = async <T>(
  apiCall: () => Promise<T>,
  localDataCall: () => Promise<T>,
  resourceName: string
): Promise<T> => {
  // 如果启用了静态数据模式，直接返回本地数据
  if (USE_STATIC_DATA) {
    console.log(`Using static data for ${resourceName}`);
    return localDataCall();
  }

  try {
    return await apiCall();
  } catch (error) {
    console.error(`Error fetching ${resourceName}:`, error);
    console.info(`Falling back to local ${resourceName} data`);
    return localDataCall();
  }
};

/**
 * 获取博客内容
 */
export const getBlogContent = async (language = 'en'): Promise<BlogContent> => {
  const getLocalBlogContentData = async () => {
    // 修正：不传递 language 参数给 getLocalBlogPosts，而是使用默认参数
    const posts = await localBlogService.getLocalBlogPosts();
    const settings = await localBlogService.getLocalBlogPageSettings(language);
    const videos = await localBlogService.getLocalBlogVideos(language);
    
    return {
      posts: posts.posts || [],
      hero: settings.hero || {
        title_en: 'View Blog',
        title_zh: '浏览博客',
        background_image: '/images/blog/blog-hero.jpg'
      },
      videos: videos || []
    };
  };

  return getDataWithFallback(
    async () => {
      const response = await apiClient.get('/blog/content', { params: { language } });
      return extractData<BlogContent>(response);
    },
    getLocalBlogContentData,
    'blog content'
  );
};

/**
 * 获取博客文章列表
 */
export const getBlogPosts = async (
  language = 'en', 
  page = 1, 
  limit = 6, 
  category?: string, 
  tag?: string
): Promise<{ posts: BlogPost[]; totalPosts: number; totalPages: number; currentPage: number; }> => {
  const getBlogPostsFromApi = async () => {
    const params = { language, page, limit };
    if (category) Object.assign(params, { category });
    if (tag) Object.assign(params, { tag });
    
    const response = await apiClient.get('/blog/posts', { params });
    const data = extractData<any>(response);
    
    return {
      posts: data.data || [],
      totalPosts: data.meta?.total || 0,
      totalPages: data.meta?.totalPages || 0,
      currentPage: page
    };
  };
  
  const getLocalBlogPostsData = async () => {
    // 修正：正确传递参数给 getLocalBlogPosts 函数
    // 注意：localBlogService.getLocalBlogPosts 不接受 language 参数
    // 参数顺序是 (page, limit, categoryId, tagId)
    console.log(`获取本地博客文章: page=${page}, limit=${limit}, category=${category}, tag=${tag}`);
    const result = await localBlogService.getLocalBlogPosts(page, limit, category, tag);
    
    // 转换数据格式以匹配 API 响应的结构
    return {
      posts: result.posts,
      totalPosts: result.total,
      totalPages: Math.ceil(result.total / limit),
      currentPage: page
    };
  };
  
  return getDataWithFallback(
    getBlogPostsFromApi,
    getLocalBlogPostsData,
    'blog posts'
  );
};

/**
 * 获取特定博客文章（支持通过slug或id）
 */
export const getBlogPostBySlug = async (slugOrId: string, language = 'en'): Promise<BlogPost | null> => {
  const apiCall = async () => {
    console.log(`Fetching blog post with identifier: ${slugOrId}, language: ${language}`);
    
    // Determine if the identifier is likely a slug or an ID
    // If it contains a hyphen, it's probably a slug
    const isSlug = slugOrId.includes('-') || isNaN(Number(slugOrId));
    const endpoint = isSlug 
      ? `/blog/posts/${slugOrId}` 
      : `/blog/posts/id/${slugOrId}`;
    
    const response = await apiClient.get(endpoint, { params: { language } });
    const post = extractData<BlogPost>(response);
    
    // 转换属性
    return post ? {
      ...post,
      title: language === 'en' ? post.title_en : post.title_zh,
      content: language === 'en' ? post.content_en : post.content_zh
    } : null;
  };

  return getDataWithFallback(
    apiCall,
    () => localBlogService.getLocalBlogPostBySlug(slugOrId, language),
    `blog post ${slugOrId}`
  );
};

/**
 * 获取博客分类
 */
export const getBlogCategories = async (language = 'en'): Promise<BlogCategory[]> => {
  // 已移除 - 不再支持博客分类功能
  console.log('博客分类功能已禁用');
  return [];
};

/**
 * 获取博客标签
 */
export const getBlogTags = async (language = 'en'): Promise<BlogTag[]> => {
  // 已移除 - 不再支持博客标签功能
  console.log('博客标签功能已禁用');
  return [];
};

/**
 * 获取博客精选视频
 */
export const getBlogFeaturedVideos = async (language = 'en', limit = 3): Promise<BlogVideo[]> => {
  return getDataWithFallback(
    () => apiClient.get('/blog/featured-videos', { params: { language, limit } }).then(extractData),
    () => localBlogService.getLocalBlogVideos(language),
    'featured videos'
  );
};

/**
 * 获取博客页面设置
 */
export const getBlogPageSettings = async (language = 'en'): Promise<{ hero: BlogHero; featured_categories: BlogCategory[]; social_links: any[]; }> => {
  const getBlogPageSettingsFromApi = async () => {
    const response = await apiClient.get('/blog/page-settings', { params: { language } });
    const data = extractData<any>(response);
    
    // 处理响应数据，确保结构正确
    return {
      hero: data.hero || {
        title_en: data.title_en || 'Blog',
        title_zh: data.title_zh || '博客',
        subtitle_en: data.subtitle_en || '',
        subtitle_zh: data.subtitle_zh || '',
        background_image: data.background_image || ''
      },
      featured_categories: [], // 已移除分类功能，返回空数组
      social_links: data.social_links || []
    };
  };
  
  const getLocalBlogPageSettingsData = async () => {
    // localBlogPageSettings 不需要 language 参数
    const settings = await localBlogService.getLocalBlogPageSettings();
    
    // 转换为兼容 API 响应的格式
    return {
      hero: settings.hero || {},
      featured_categories: [], // 已移除分类功能，返回空数组
      social_links: [] // 由于 BlogContent 中没有 social_links，所以返回空数组
    };
  };
  
  return getDataWithFallback(
    getBlogPageSettingsFromApi,
    getLocalBlogPageSettingsData,
    'blog page settings'
  );
};

export default {
  getBlogContent,
  getBlogPosts,
  getBlogPostBySlug,
  getBlogCategories,
  getBlogTags,
  getBlogFeaturedVideos,
  getBlogPageSettings
};
