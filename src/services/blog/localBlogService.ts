import { BlogPost, BlogCategory, BlogTag, BlogContent, BlogVideo, BlogHero } from '@/types/blogTypes';

/**
 * 获取本地博客文章列表
 * 当API请求失败时作为备选数据源
 */
export const getLocalBlogPosts = async (page = 1, limit = 10, categoryId?: string, tagId?: string): Promise<{ posts: BlogPost[], total: number }> => {
  try {
    let posts = await loadAllPosts();
    
    // 如果提供了分类ID，过滤文章
    if (categoryId) {
      posts = posts.filter(post => {
        const category = post.category;
        return typeof category === 'object' && category !== null && category.id === categoryId;
      });
    }
    
    // 如果提供了标签ID，过滤文章
    if (tagId) {
      posts = posts.filter(post => 
        post.tags && post.tags.some(tag => 
          typeof tag === 'object' && tag !== null && tag.id === tagId
        )
      );
    }
    
    // 计算分页
    const total = posts.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = posts.slice(startIndex, endIndex);
    
    return { posts: paginatedPosts, total };
  } catch (error) {
    console.error('Error fetching local blog posts:', error);
    return { posts: [], total: 0 };
  }
};

/**
 * 通过slug获取本地博客文章
 */
export const getLocalBlogPostBySlug = async (slug: string, language = 'en'): Promise<BlogPost | null> => {
  try {
    const posts = await loadAllPosts();
    const post = posts.find(post => post.slug === slug);
    
    if (!post) {
      console.log(`未找到slug为${slug}的博客文章`);
      return null;
    }
    
    // 根据语言选择返回相应的内容
    const localizedPost = {
      ...post,
      title: language === 'en' ? post.title_en : post.title_zh,
      content: language === 'en' ? post.content_en : post.content_zh
    };
    
    console.log(`成功加载博客文章: ${localizedPost.title}`);
    return localizedPost;
  } catch (error) {
    console.error('Error fetching local blog post by slug:', error);
    return null;
  }
};

/**
 * 获取本地博客分类
 */
export const getLocalBlogCategories = async (): Promise<BlogCategory[]> => {
  // 已删除 - 不再需要获取博客分类数据
  console.log('博客分类数据已不再需要');
  return [];
};

/**
 * 获取本地博客标签
 */
export const getLocalBlogTags = async (): Promise<BlogTag[]> => {
  // 已删除 - 不再需要获取博客标签数据
  console.log('博客标签数据已不再需要');
  return [];
};

/**
 * 获取本地博客页面设置
 */
export const getLocalBlogPageSettings = async (): Promise<BlogContent> => {
  try {
    // 加载博客页面设置
    const url = `/content/blog/index.json`;
    console.log('获取博客页面设置:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
    
    if (!response.ok) {
      console.error('获取博客页面设置失败:', response.status, response.statusText);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('成功获取博客页面设置');
    
    // 加载博客文章
    const { posts } = await getLocalBlogPosts();
    
    // 加载视频
    const videos = await getLocalBlogVideos();
    
    const hero: BlogHero = {
      title_en: 'Blog',
      title_zh: '博客',
      subtitle_en: 'Latest News and Updates',
      subtitle_zh: '最新动态和更新',
      background_image: '/Edgoing/Blog_Page/Heading1.jpg'
    };
    
    return {
      hero: data.hero || hero,
      posts,
      videos
    };
  } catch (error) {
    console.error('Error fetching local blog page settings:', error);
    
    // 返回默认值
    const defaultHero: BlogHero = {
      title_en: 'Blog',
      title_zh: '博客',
      subtitle_en: 'Latest News and Updates',
      subtitle_zh: '最新动态和更新',
      background_image: '/Edgoing/Blog_Page/Heading1.jpg'
    };
    
    return {
      hero: defaultHero,
      posts: [],
      videos: []
    };
  }
};

/**
 * 获取本地博客视频
 */
export const getLocalBlogVideos = async (): Promise<BlogVideo[]> => {
  // 硬编码视频数据，因为没有本地视频数据文件
  const videos: BlogVideo[] = [
    {
      id: '1',
      title_en: 'Introduction to Our Programs',
      title_zh: '我们项目的介绍',
      youtube_url: '',
      thumbnail: '/Edgoing/video/thumbnails/video1.jpg',
      file_url: '/Edgoing/video/162.mp4'
    },
    {
      id: '2',
      title_en: 'Cultural Exchange Program',
      title_zh: '文化交流项目',
      youtube_url: '',
      thumbnail: '/Edgoing/video/thumbnails/video2.jpg',
      file_url: '/Edgoing/video/164.mp4'
    }
  ];
  
  return videos;
};

/**
 * 辅助函数：加载所有博客文章
 * @returns 所有博客文章的数组
 */
async function loadAllPosts(): Promise<BlogPost[]> {
  try {
    // 先从index.json加载博客文章引用列表
    console.log('尝试加载博客文章索引文件: /content/blog/index.json');
    
    // 加载索引文件
    const url = `/content/blog/index.json`;
    console.log('获取博客文章索引文件:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
    
    if (!response.ok) {
      console.error('加载博客索引失败:', response.status, response.statusText);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const indexData = await response.json();
    console.log('成功加载博客索引文件', indexData);
    
    // 确保索引文件包含posts数组
    if (!indexData.posts || !Array.isArray(indexData.posts)) {
      console.error('博客索引文件格式错误，缺少posts数组:', indexData);
      return [];
    }
    
    // 使用索引中的文件列表
    const postFiles = indexData.posts.map(file => `/content/blog/${file}`);
    console.log('从索引中读取到的博客文章文件列表:', postFiles);
    
    const postsPromises = postFiles.map(async (file, index) => {
      try {
        console.log(`尝试加载文章 ${index + 1}:`, file);
        
        const response = await fetch(file, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          }
        });
        
        if (!response.ok) {
          console.error(`加载文章失败 ${file}:`, response.status, response.statusText);
          return null;
        }
        
        const data = await response.json();
        console.log(`成功加载文章 ${file}`);
        return data.post;
      } catch (error) {
        console.error(`加载文章失败 ${file}:`, error);
        return null;
      }
    });
    
    const posts = await Promise.all(postsPromises);
    return posts.filter((post): post is BlogPost => post !== null);
  } catch (error) {
    console.error('加载所有博客文章失败:', error);
    return [];
  }
}

export default {
  getLocalBlogPosts,
  getLocalBlogPostBySlug,
  getLocalBlogCategories,
  getLocalBlogTags,
  getLocalBlogPageSettings,
  getLocalBlogVideos
};
