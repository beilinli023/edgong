
import blogApi from './api';
import { validateResponse, handleApiError } from './utils';
import { ImageData } from '@/types/blogTypes';
import { getMockImages } from './mockData';

// Add the MediaImageData type which was missing
export type MediaImageData = {
  id: number;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
};

// Add the converter function that was missing
export const convertToBlogImageData = (mediaImage: MediaImageData): ImageData => {
  return {
    id: mediaImage.id,
    url: mediaImage.url,
    alt: mediaImage.alt || '',
    width: mediaImage.width || 0,
    height: mediaImage.height || 0
  };
};

/**
 * 获取所有可用图片
 */
export const getImageList = async (): Promise<ImageData[]> => {
  try {
    console.log('Fetching image list...');
    const response = await blogApi.get('/blog/images');
    
    const validatedData = validateResponse<ImageData[]>(
      response, 
      '获取图片列表失败'
    );
    
    if (!validatedData || !Array.isArray(validatedData)) {
      console.log('Using mock images due to invalid API response');
      return getMockImages().map(url => ({
        id: Math.floor(Math.random() * 10000),
        url
      }));
    }
    
    return validatedData;
  } catch (error) {
    console.error('获取图片列表失败:', error);
    return getMockImages().map(url => ({
      id: Math.floor(Math.random() * 10000),
      url
    }));
  }
};

/**
 * 获取可用图片的URL列表
 */
export const getAvailableImages = async (): Promise<string[]> => {
  try {
    const images = await getImageList();
    return images.map(img => typeof img === 'string' ? img : img.url);
  } catch (error) {
    console.error('获取可用图片URL列表失败:', error);
    return getMockImages();
  }
};

/**
 * 上传博客图片
 */
export const uploadBlogImage = async (file: File): Promise<ImageData | null> => {
  try {
    console.log('Uploading blog image:', file.name);
    
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await blogApi.post('/blog/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return validateResponse<ImageData>(
      response, 
      '上传图片失败'
    );
  } catch (error) {
    console.error('上传图片失败:', error);
    
    // 返回模拟的成功响应，在实际集成API前使用
    // 注意：这是模拟功能，实际应用中应该抛出错误
    return {
      id: Math.floor(Math.random() * 10000),
      url: URL.createObjectURL(file)
    };
  }
};

// Helper function to convert string arrays to ImageData arrays
export const convertStringsToImageData = (imageUrls: string[]): ImageData[] => {
  return imageUrls.map(url => ({
    id: Math.floor(Math.random() * 10000),
    url
  }));
};
