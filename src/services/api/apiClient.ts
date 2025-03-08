
// 导入我们的新API服务
import apiService from './apiService';

// 为了保持向后兼容性，我们简单地导出apiService
export default apiService;

// 添加统一的类型断言辅助函数
// 这个函数帮助我们在使用apiClient时安全地处理返回数据
export const extractData = <T>(response: any): T => {
  // 检查response是否为对象且含有data属性
  if (response && typeof response === 'object' && 'data' in response) {
    return response.data as T;
  }
  // 如果没有data属性，则假设整个response就是数据
  return response as T;
};
