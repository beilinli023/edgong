
import axios from 'axios';

// 创建专用于博客服务的API实例
const blogApi = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// 请求拦截器
blogApi.interceptors.request.use(
  (config) => {
    // 添加认证令牌
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Blog API request error:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
blogApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Blog API response error:', error);
    return Promise.reject(error);
  }
);

export default blogApi;
