import blogApi from './api';
import { validateResponse } from './utils';
import { BlogPost, BlogPostFormData } from '@/types/blogTypes';
import { loadBlogPostsFromFiles, loadBlogPostFromFile } from './fileService';

// 判断是否使用模拟数据
const isMockDataEnabled = () => {
  return import.meta.env.VITE_USE_MOCK_DATA === 'true';
};

// 判断是否使用文件系统数据而不是API
const isFileSystemEnabled = () => {
  return import.meta.env.VITE_USE_FILE_SYSTEM === 'true' ||
         import.meta.env.MODE === 'development' && !import.meta.env.VITE_API_URL;
};

/**
 * 获取所有博客文章
 */
export const getAllBlogPosts = async (locale: string = 'en') => {
  // 如果配置使用文件系统，从文件加载
  if (isFileSystemEnabled()) {
    console.log('从文件系统加载博客文章...');
    return loadBlogPostsFromFiles();
  }
  
  try {
    console.log('Fetching blog posts...');
    const response = await blogApi.get(`/blog/posts?locale=${locale}`);
    
    const validatedData = validateResponse<BlogPost[]>(
      response, 
      '获取博客文章失败'
    );
    
    console.log('Blog posts response:', validatedData);
    return Array.isArray(validatedData) ? validatedData : [];
  } catch (error) {
    console.error('获取博客文章失败:', error);
    // 如果API调用失败，尝试从文件系统加载
    return loadBlogPostsFromFiles();
  }
};

/**
 * 获取单个博客文章 - 支持通过slug或id获取
 */
export const getBlogPostById = async (idOrSlug: string, locale: string = 'en'): Promise<BlogPost | null> => {
  // 如果配置使用文件系统，从文件加载
  if (isFileSystemEnabled()) {
    console.log(`从文件系统加载博客文章: ${idOrSlug}`);
    return loadBlogPostFromFile(idOrSlug);
  }
  
  try {
    // 判断是通过ID还是slug查询
    const isSlug = idOrSlug.includes('-') || isNaN(Number(idOrSlug));
    const endpoint = isSlug 
      ? `/blog/posts/slug/${idOrSlug}?locale=${locale}` 
      : `/blog/posts/${idOrSlug}?locale=${locale}`;
      
    console.log(`Fetching blog post with ${isSlug ? 'slug' : 'id'}: ${idOrSlug} for language: ${locale}`);
    
    try {
      const response = await blogApi.get(endpoint);
      
      const data = validateResponse<BlogPost>(
        response, 
        `获取博客文章(ID/Slug: ${idOrSlug})失败`
      );
      
      if (data) {
        return {
          id: data.id,
          title_en: data.title_en || (locale === 'en' && data.title ? data.title : ''),
          title_zh: data.title_zh || (locale === 'zh' && data.title ? data.title : ''),
          slug: data.slug || idOrSlug,
          content_en: data.content_en || (locale === 'en' && data.content ? data.content : ''),
          content_zh: data.content_zh || (locale === 'zh' && data.content ? data.content : ''),
          excerpt_en: data.excerpt_en || (locale === 'en' && data.excerpt ? data.excerpt : ''),
          excerpt_zh: data.excerpt_zh || (locale === 'zh' && data.excerpt ? data.excerpt : ''),
          featured_image: data.featured_image,
          status: data.status || 'published',
          published_at: data.published_at || '',
          author: data.author || '',
          date: data.published_at || '',
          category: data.category || (data.primary_category ? typeof data.primary_category === 'string' ? data.primary_category : data.primary_category.slug : ''),
          primary_category: data.primary_category,
          tags: data.tags || [],
          title: data.title,
          content: data.content,
          excerpt: data.excerpt
        };
      }
    } catch (err) {
      console.error(`Primary fetch method failed for: ${idOrSlug}`, err);
    }

    // If we didn't get data with the direct API call, try the alternative endpoint
    if (isSlug) {
      // If we used a slug and it failed, try the search-by-slug endpoint
      console.log(`Trying alternative endpoint for slug: ${idOrSlug}`);
      try {
        const searchResponse = await blogApi.get(`/blog/search?term=${idOrSlug}&locale=${locale}`);
        const searchResults = validateResponse<BlogPost[]>(
          searchResponse,
          `搜索博客文章(Slug: ${idOrSlug})失败`
        );
        
        if (Array.isArray(searchResults) && searchResults.length > 0) {
          // Find a post that matches the slug exactly or contains it
          const matchingPost = searchResults.find(post => 
            post.slug === idOrSlug || 
            post.slug.includes(idOrSlug) || 
            idOrSlug.includes(post.slug)
          );
          
          if (matchingPost) {
            console.log(`Found matching post through search: ${matchingPost.id}`);
            return matchingPost;
          }
        }
      } catch (searchErr) {
        console.error(`Search method also failed for: ${idOrSlug}`, searchErr);
      }
    }
    
    // 如果API调用失败，尝试从文件系统加载
    console.log('API calls failed, trying to load post from file system');
    return loadBlogPostFromFile(idOrSlug);
  } catch (error) {
    console.error(`获取博客文章(ID/Slug: ${idOrSlug})失败:`, error);
    return null;
  }
};

/**
 * 创建博客文章
 */
export const createBlogPost = async (postData: BlogPostFormData) => {
  try {
    console.log('Creating blog post with data:', postData);
    const response = await blogApi.post('/blog/posts', postData);
    return response.data;
  } catch (error) {
    console.error('创建博客文章失败:', error);
    throw error;
  }
};

/**
 * 更新博客文章
 */
export const updateBlogPost = async (id: string, postData: BlogPostFormData) => {
  try {
    console.log(`Updating blog post ID: ${id} with data:`, postData);
    const response = await blogApi.put(`/blog/posts/${id}`, postData);
    return response.data;
  } catch (error) {
    console.error(`更新博客文章(ID: ${id})失败:`, error);
    throw error;
  }
};

/**
 * 删除博客文章
 */
export const deleteBlogPost = async (id: string) => {
  try {
    console.log(`Deleting blog post ID: ${id}`);
    await blogApi.delete(`/blog/posts/${id}`);
    return true;
  } catch (error) {
    console.error(`删除博客文章(ID: ${id})失败:`, error);
    throw error;
  }
};
