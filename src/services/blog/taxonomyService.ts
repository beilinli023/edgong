
import blogApi from './api';
import { validateResponse } from './utils';
import { getMockCategories, getMockTags } from './mockData';

/**
 * 获取所有博客分类
 */
export const getBlogCategories = async (locale: string = 'en') => {
  try {
    console.log('Fetching blog categories for language:', locale);
    const response = await blogApi.get(`/blog/categories?locale=${locale}`);
    
    const validatedData = validateResponse<any[]>(
      response, 
      '获取博客分类失败'
    );
    
    return Array.isArray(validatedData) ? validatedData : getMockCategories();
  } catch (error) {
    console.error('获取博客分类失败:', error);
    return getMockCategories();
  }
};

/**
 * 获取所有博客标签
 */
export const getBlogTags = async (locale: string = 'en') => {
  try {
    console.log('Fetching blog tags for language:', locale);
    const response = await blogApi.get(`/blog/tags?locale=${locale}`);
    
    const validatedData = validateResponse<any[]>(
      response, 
      '获取博客标签失败'
    );
    
    return Array.isArray(validatedData) ? validatedData : getMockTags();
  } catch (error) {
    console.error('获取博客标签失败:', error);
    return getMockTags();
  }
};
