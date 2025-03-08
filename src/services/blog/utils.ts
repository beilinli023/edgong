
import { AxiosResponse } from 'axios';

/**
 * 验证API响应，确保返回的是有效数据
 * @param response Axios响应对象
 * @param errorMessage 错误消息
 * @returns 有效的响应数据或null
 */
export const validateResponse = <T>(response: AxiosResponse, errorMessage: string): T | null => {
  try {
    // 检查是否有响应数据
    if (!response || !response.data) {
      console.error(`${errorMessage}: 没有响应数据`);
      return null;
    }

    // 检查响应是否为HTML（通常表示API错误或重定向）
    if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
      console.error(`${errorMessage}: API返回了HTML而不是JSON数据`);
      return null;
    }

    // 检查响应是否包含success字段且为false
    if (response.data.success === false) {
      console.error(`${errorMessage}: ${response.data.message || '未知错误'}`);
      return null;
    }

    // 获取实际数据，一些API会将数据包裹在data字段中
    const actualData = response.data.data !== undefined ? response.data.data : response.data;
    
    return actualData as T;
  } catch (error) {
    console.error(`${errorMessage}: ${error}`);
    return null;
  }
};

/**
 * 处理API错误，提供一致的错误处理方式
 * @param error 错误对象
 * @param errorMessage 错误消息
 * @returns 处理后的错误对象
 */
export const handleApiError = (error: any, errorMessage: string): Error => {
  console.error(`${errorMessage}:`, error);
  
  // 获取错误消息
  let message = errorMessage;
  
  if (error.response) {
    // 服务器响应了，但状态码不在2xx范围内
    message = `${errorMessage}: ${error.response.status} - ${error.response.data?.message || '未知错误'}`;
  } else if (error.request) {
    // 请求已发出，但没有收到响应
    message = `${errorMessage}: 服务器无响应`;
  }
  
  return new Error(message);
};

/**
 * 格式化日期字符串为更友好的显示格式
 * @param dateString 日期字符串
 * @returns 格式化后的日期字符串
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('日期格式化错误:', error);
    return dateString;
  }
};

/**
 * 生成随机ID字符串
 * @returns 随机ID字符串
 */
export const generateRandomId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

/**
 * 从URL中提取YouTube视频ID
 * @param url YouTube视频URL
 * @returns YouTube视频ID或null
 */
export const extractYouTubeVideoId = (url: string): string | null => {
  if (!url) return null;
  
  try {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  } catch (error) {
    console.error('提取YouTube视频ID错误:', error);
    return null;
  }
};
