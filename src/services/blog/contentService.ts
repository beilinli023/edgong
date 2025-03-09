import blogApi from './api';
import { validateResponse } from './utils';
import { BlogContent } from '@/types/blogTypes';
import { defaultContent } from '@/data/blogDefaultData';
import { loadBlogPostsFromFiles, loadCategoriesFromFile, loadTagsFromFile } from './fileService';

// 判断是否使用文件系统数据而不是API
const isFileSystemEnabled = () => {
  return import.meta.env.VITE_USE_FILE_SYSTEM === 'true' ||
         import.meta.env.MODE === 'development' && !import.meta.env.VITE_API_URL;
};

/**
 * 获取博客内容（用于博客页面，包含英雄区、文章列表、视频）
 */
export const getBlogContent = async (locale: string = 'en'): Promise<BlogContent | null> => {
  // 如果配置使用文件系统，从文件加载
  if (isFileSystemEnabled()) {
    console.log('从文件系统加载博客内容...');
    try {
      // 从文件系统加载文章
      const posts = await loadBlogPostsFromFiles();
      
      if (posts && posts.length > 0) {
        console.log(`成功从文件系统加载了 ${posts.length} 篇文章`);
        // 使用默认英雄和视频内容，但替换文章内容
        return {
          ...defaultContent,
          posts
        };
      } else {
        console.warn('文件系统中没有找到文章，使用默认内容');
        return defaultContent;
      }
    } catch (error) {
      console.error('从文件系统加载内容失败:', error);
      return defaultContent;
    }
  }
  
  // 否则尝试从API获取
  try {
    console.log('Fetching blog content for language:', locale);
    const response = await blogApi.get(`/blog/content?locale=${locale}`);
    
    const validatedData = validateResponse<BlogContent>(
      response, 
      '获取博客内容失败'
    );
    
    console.log('Blog content response:', validatedData);
    
    // 如果API返回无效数据，使用默认内容
    if (!validatedData) {
      console.log('Using default content due to invalid API response');
      return defaultContent;
    }
    
    return validatedData;
  } catch (error) {
    console.error('获取博客内容失败:', error);
    console.log('Returning default content due to error');
    return defaultContent;
  }
};
