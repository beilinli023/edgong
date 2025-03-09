import axios from 'axios';

// 创建专用于博客服务的API实例 - 使用真实API地址
const blogApi = axios.create({
  // 如果有后端API，使用实际URL，否则使用相对路径
  baseURL: import.meta.env.VITE_API_URL || '/api',
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
    
    // 添加调试信息
    console.log(`[Blog API] Requesting: ${config.method?.toUpperCase()} ${config.url}`);
    
    return config;
  },
  (error) => {
    console.error('[Blog API] Request error:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
blogApi.interceptors.response.use(
  (response) => {
    console.log(`[Blog API] Response from ${response.config.url}: Status ${response.status}`);
    return response;
  },
  (error) => {
    // 增强错误处理
    const statusCode = error.response?.status;
    const requestUrl = error.config?.url;
    
    console.error(`[Blog API] Response error: ${statusCode} from ${requestUrl}`, error);
    
    // 可以在这里处理特定错误，例如认证过期
    if (statusCode === 401) {
      // 处理认证失败
      console.warn('[Blog API] Authentication failed, redirecting to login');
      // localStorage.removeItem('token');
      // window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default blogApi;
