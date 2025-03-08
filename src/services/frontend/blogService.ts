
import apiClient from '../api/apiClient';
import { BlogPost, BlogCategory, BlogTag, BlogVideo, BlogHero, BlogContent } from '@/types/blogTypes';
import { extractData } from '../api/responseHelpers';

// 获取博客内容
export const getBlogContent = async (language = 'en'): Promise<BlogContent> => {
  try {
    const response = await apiClient.get('/blog/content', { params: { language } });
    return extractData<BlogContent>(response);
  } catch (error) {
    console.error('Error fetching blog content:', error);
    throw error;
  }
};

// 获取博客文章列表
export const getBlogPosts = async (language = 'en', page = 1, limit = 6, category?: string, tag?: string) => {
  try {
    const params = { page, limit, category, tag, language };
    const response = await apiClient.get('/blog/posts', { params });
    const responseData = extractData<any>(response);
    
    return {
      posts: responseData.posts.map((post: any) => ({
        id: post.id,
        title: language === 'en' ? post.title_en : post.title_zh,
        slug: post.slug,
        excerpt: language === 'en' ? post.excerpt_en : post.excerpt_zh,
        featured_image: post.featured_image,
        published_at: post.published_at,
        author: post.author,
        tags: post.tags || []
      })),
      pagination: responseData.pagination
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return { posts: [], pagination: { total: 0, pages: 0, current: 1 } };
  }
};

// 获取特定博客文章（支持通过slug或id）
export const getBlogPostBySlug = async (slugOrId: string, language = 'en'): Promise<BlogPost | null> => {
  try {
    console.log(`Fetching blog post with identifier: ${slugOrId}, language: ${language}`);
    
    // Determine if the identifier is likely a slug or an ID
    // If it contains a hyphen, it's probably a slug
    const isSlug = slugOrId.includes('-') || isNaN(Number(slugOrId));
    const endpoint = isSlug 
      ? `/blog/posts/slug/${slugOrId}` 
      : `/blog/posts/${slugOrId}`;
    
    const response = await apiClient.get(endpoint, { params: { language } });
    const postData = extractData<any>(response);
    
    if (!postData) {
      console.error(`No data found for blog post with ${isSlug ? 'slug' : 'id'} ${slugOrId}`);
      return null;
    }
    
    console.log(`Blog post data received:`, postData);
    
    // Transform the API data to match the BlogPost type
    return {
      id: postData.id,
      slug: postData.slug || slugOrId,
      title_en: postData.title_en || (language === 'en' && postData.title ? postData.title : ''),
      title_zh: postData.title_zh || (language === 'zh' && postData.title ? postData.title : ''),
      content_en: postData.content_en || (language === 'en' && postData.content ? postData.content : ''),
      content_zh: postData.content_zh || (language === 'zh' && postData.content ? postData.content : ''),
      excerpt_en: postData.excerpt_en || (language === 'en' && postData.excerpt ? postData.excerpt : ''),
      excerpt_zh: postData.excerpt_zh || (language === 'zh' && postData.excerpt ? postData.excerpt : ''),
      featured_image: postData.featured_image,
      published_at: postData.published_at || '',
      author: postData.author || '',
      status: postData.status || 'published',
      date: postData.published_at || '',
      category: postData.category || (postData.primary_category ? postData.primary_category.slug : ''),
      primary_category: postData.primary_category,
      tags: postData.tags || [],
      // Include the original fields for compatibility
      title: postData.title,
      content: postData.content,
      excerpt: postData.excerpt
    };
  } catch (error) {
    console.error(`Error fetching blog post with identifier ${slugOrId}:`, error);
    return null;
  }
};

// 获取博客分类
export const getBlogCategories = async (language = 'en') => {
  try {
    const response = await apiClient.get('/blog/categories', { params: { language } });
    const categories = extractData<any[]>(response);
    
    return categories.map((category: any) => ({
      id: category.id,
      name: language === 'en' ? category.name_en : category.name_zh,
      slug: category.slug,
      description: language === 'en' ? category.description_en : category.description_zh
    }));
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return [];
  }
};

// 获取博客标签
export const getBlogTags = async (language = 'en') => {
  try {
    const response = await apiClient.get('/blog/tags', { params: { language } });
    const tags = extractData<any[]>(response);
    
    return tags.map((tag: any) => ({
      id: tag.id,
      name: language === 'en' ? tag.name_en : tag.name_zh,
      slug: tag.slug,
      color: tag.color
    }));
  } catch (error) {
    console.error('Error fetching blog tags:', error);
    return [];
  }
};

// 获取博客精选视频
export const getBlogFeaturedVideos = async (language = 'en', limit = 3) => {
  try {
    const response = await apiClient.get('/blog/featured-videos', { params: { language, limit } });
    const videos = extractData<any[]>(response);
    
    return videos.map((video: any) => ({
      id: video.id,
      title: language === 'en' ? video.title_en : video.title_zh,
      youtube_url: video.youtube_url,
      thumbnail: video.thumbnail,
      category: video.category
    }));
  } catch (error) {
    console.error('Error fetching featured videos:', error);
    return [];
  }
};

// 获取博客页面设置
export const getBlogPageSettings = async (language = 'en') => {
  try {
    const response = await apiClient.get('/blog/page-settings', { params: { language } });
    const settings = extractData<any>(response);
    
    return {
      hero: {
        title: language === 'en' ? settings.hero.title_en : settings.hero.title_zh,
        subtitle: language === 'en' ? settings.hero.subtitle_en : settings.hero.subtitle_zh,
        background_image: settings.hero.background_image
      },
      seo: {
        title: language === 'en' ? settings.seo.title_en : settings.seo.title_zh,
        description: language === 'en' ? settings.seo.description_en : settings.seo.description_zh
      }
    };
  } catch (error) {
    console.error('Error fetching blog page settings:', error);
    return {
      hero: {
        title: '',
        subtitle: '',
        background_image: ''
      },
      seo: {
        title: '',
        description: ''
      }
    };
  }
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
