import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { toast } from 'sonner';
import { z } from 'zod';

/**
 * 标准化API响应格式
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

/**
 * API错误类型
 */
export enum ApiErrorType {
  VALIDATION = 'validation_error',
  AUTHENTICATION = 'authentication_error',
  AUTHORIZATION = 'authorization_error',
  NOT_FOUND = 'not_found',
  SERVER_ERROR = 'server_error',
  NETWORK_ERROR = 'network_error',
  UNKNOWN = 'unknown_error'
}

/**
 * 自定义API错误类
 */
export class ApiError extends Error {
  type: ApiErrorType;
  statusCode?: number;
  errors?: Record<string, string[]>;
  
  constructor(message: string, type: ApiErrorType, statusCode?: number, errors?: Record<string, string[]>) {
    super(message);
    this.name = 'ApiError';
    this.type = type;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

/**
 * 统一的API服务类
 */
export class ApiService {
  private client: AxiosInstance;
  private language: string = 'en';
  
  constructor(baseURL: string = '/api') {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    this.setupInterceptors();
  }
  
  /**
   * 设置当前语言（用于错误消息本地化）
   */
  setLanguage(lang: string): void {
    this.language = lang;
  }
  
  /**
   * 获取本地化的错误消息
   */
  private getLocalizedErrorMessage(error: ApiError): string {
    if (this.language === 'zh') {
      switch (error.type) {
        case ApiErrorType.VALIDATION:
          return '表单验证失败，请检查您的输入';
        case ApiErrorType.AUTHENTICATION:
          return '身份验证失败，请重新登录';
        case ApiErrorType.AUTHORIZATION:
          return '您没有权限执行此操作';
        case ApiErrorType.NOT_FOUND:
          return '请求的资源不存在';
        case ApiErrorType.SERVER_ERROR:
          return '服务器错误，请稍后再试';
        case ApiErrorType.NETWORK_ERROR:
          return '网络错误，请检查您的连接';
        default:
          return error.message || '发生未知错误';
      }
    } else {
      switch (error.type) {
        case ApiErrorType.VALIDATION:
          return 'Validation failed, please check your input';
        case ApiErrorType.AUTHENTICATION:
          return 'Authentication failed, please log in again';
        case ApiErrorType.AUTHORIZATION:
          return 'You are not authorized to perform this action';
        case ApiErrorType.NOT_FOUND:
          return 'The requested resource was not found';
        case ApiErrorType.SERVER_ERROR:
          return 'Server error, please try again later';
        case ApiErrorType.NETWORK_ERROR:
          return 'Network error, please check your connection';
        default:
          return error.message || 'An unknown error occurred';
      }
    }
  }
  
  /**
   * 设置请求/响应拦截器
   */
  private setupInterceptors(): void {
    // 请求拦截器
    this.client.interceptors.request.use(
      (config) => {
        // 从localStorage获取令牌
        const token = localStorage.getItem('auth_token');
        
        // 如果存在令牌，添加到请求头
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
      },
      (error) => {
        return Promise.reject(this.handleError(error));
      }
    );
    
    // 响应拦截器
    this.client.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        const apiError = this.handleError(error);
        
        // 检查是否是来自静态数据回退的请求
        const isStaticFallbackRequest = error.config?.headers?.['X-Static-Fallback'] === 'true';
        
        // 仅当不是静态数据回退请求时才显示错误
        if (!isStaticFallbackRequest) {
          // 显示错误提示
          const errorMessage = this.getLocalizedErrorMessage(apiError);
          toast.error(errorMessage);
          
          // 处理特定类型的错误
          if (apiError.type === ApiErrorType.AUTHENTICATION) {
            localStorage.removeItem('auth_token');
            // 如果在管理后台页面，重定向到登录页
            if (window.location.pathname.startsWith('/admin') || 
                window.location.pathname.startsWith('/content') ||
                window.location.pathname === '/login') {
              window.location.href = '/login';
            }
          }
        }
        
        return Promise.reject(apiError);
      }
    );
  }
  
  /**
   * 处理API错误，转换为统一格式
   */
  private handleError(error: any): ApiError {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<any>;
      
      if (axiosError.response) {
        const statusCode = axiosError.response.status;
        const responseData = axiosError.response.data;
        
        // 处理不同状态码
        switch (statusCode) {
          case 400:
            return new ApiError(
              responseData?.message || 'Bad Request',
              ApiErrorType.VALIDATION,
              statusCode,
              responseData?.errors
            );
          case 401:
            return new ApiError(
              responseData?.message || 'Unauthorized',
              ApiErrorType.AUTHENTICATION,
              statusCode
            );
          case 403:
            return new ApiError(
              responseData?.message || 'Forbidden',
              ApiErrorType.AUTHORIZATION,
              statusCode
            );
          case 404:
            return new ApiError(
              responseData?.message || 'Not Found',
              ApiErrorType.NOT_FOUND,
              statusCode
            );
          case 422:
            return new ApiError(
              responseData?.message || 'Validation Error',
              ApiErrorType.VALIDATION,
              statusCode,
              responseData?.errors
            );
          case 500:
          case 502:
          case 503:
            return new ApiError(
              responseData?.message || 'Server Error',
              ApiErrorType.SERVER_ERROR,
              statusCode
            );
          default:
            return new ApiError(
              responseData?.message || `Error ${statusCode}`,
              ApiErrorType.UNKNOWN,
              statusCode
            );
        }
      } else if (axiosError.request) {
        // 请求已发送但未收到响应
        return new ApiError(
          'Network error, unable to connect to server',
          ApiErrorType.NETWORK_ERROR
        );
      }
    }
    
    // 其他错误
    return new ApiError(
      error?.message || 'An unknown error occurred',
      ApiErrorType.UNKNOWN
    );
  }
  
  /**
   * 使用Zod验证API响应数据
   */
  private validateResponse<T>(data: any, schema: z.ZodType<T>): T {
    try {
      return schema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Data validation error:', error.format());
        throw new ApiError(
          'Invalid data format received from server',
          ApiErrorType.VALIDATION,
          undefined,
          this.formatZodErrors(error)
        );
      }
      throw error;
    }
  }
  
  /**
   * 格式化Zod错误为统一格式
   */
  private formatZodErrors(error: z.ZodError): Record<string, string[]> {
    const errors: Record<string, string[]> = {};
    
    error.errors.forEach(err => {
      const path = err.path.join('.');
      if (!errors[path]) {
        errors[path] = [];
      }
      errors[path].push(err.message);
    });
    
    return errors;
  }
  
  /**
   * 发送GET请求
   */
  async get<T>(url: string, config?: AxiosRequestConfig, schema?: z.ZodType<T>): Promise<T> {
    try {
      const response = await this.client.get<any, any>(url, config);
      
      if (schema) {
        return this.validateResponse(response.data, schema);
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  /**
   * 发送POST请求
   */
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig, schema?: z.ZodType<T>): Promise<T> {
    try {
      const response = await this.client.post<any, any>(url, data, config);
      
      if (schema) {
        return this.validateResponse(response.data, schema);
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  /**
   * 发送PUT请求
   */
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig, schema?: z.ZodType<T>): Promise<T> {
    try {
      const response = await this.client.put<any, any>(url, data, config);
      
      if (schema) {
        return this.validateResponse(response.data, schema);
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  /**
   * 发送DELETE请求
   */
  async delete<T>(url: string, config?: AxiosRequestConfig, schema?: z.ZodType<T>): Promise<T> {
    try {
      const response = await this.client.delete<any, any>(url, config);
      
      if (schema) {
        return this.validateResponse(response.data, schema);
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
}

// 创建并导出默认的API服务实例
const apiService = new ApiService();

export default apiService;
