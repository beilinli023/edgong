
import blogApi from './api';
import { validateResponse, handleApiError } from './utils';
import { BlogContent } from '@/types/blogTypes';
import { defaultContent } from '@/data/blogDefaultData';

/**
 * 获取博客内容（用于博客页面，包含英雄区、文章列表、视频）
 */
export const getBlogContent = async (locale: string = 'en'): Promise<BlogContent | null> => {
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
