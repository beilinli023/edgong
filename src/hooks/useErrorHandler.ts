import { useCallback } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

/**
 * 错误类型枚举
 */
export enum ErrorType {
  NETWORK = 'NETWORK',
  NOT_FOUND = 'NOT_FOUND',
  SERVER = 'SERVER',
  UNKNOWN = 'UNKNOWN',
}

/**
 * 错误处理配置接口
 */
interface ErrorHandlerConfig {
  showNotification?: boolean;
  fallbackData?: unknown;
  retryable?: boolean;
}

/**
 * 统一的错误处理 Hook
 * @param result - React Query 的查询结果
 * @param config - 错误处理配置
 * @returns 处理后的数据和错误状态
 */
export function useErrorHandler<T>(
  result: UseQueryResult<T>,
  config: ErrorHandlerConfig = {}
) {
  const { showNotification = true, fallbackData, retryable = true } = config;

  const getErrorType = useCallback((error: Error | AxiosError | null): ErrorType => {
    if (!error) return ErrorType.UNKNOWN;

    if (error instanceof Error && 'isAxiosError' in error) {
      const axiosError = error as AxiosError;
      if (!axiosError.response) return ErrorType.NETWORK;
      switch (axiosError.response.status) {
        case 404:
          return ErrorType.NOT_FOUND;
        case 500:
          return ErrorType.SERVER;
        default:
          return ErrorType.UNKNOWN;
      }
    }

    return ErrorType.UNKNOWN;
  }, []);

  const getErrorMessage = useCallback((error: Error | AxiosError | null): string => {
    const errorType = getErrorType(error);
    switch (errorType) {
      case ErrorType.NETWORK:
        return '网络连接错误，请检查您的网络连接';
      case ErrorType.NOT_FOUND:
        return '请求的资源不存在';
      case ErrorType.SERVER:
        return '服务器错误，请稍后重试';
      default:
        return '发生未知错误，请稍后重试';
    }
  }, [getErrorType]);

  const { isLoading, error, data } = result;

  // 如果有错误且配置了显示通知
  if (error && showNotification) {
    const errorMessage = getErrorMessage(error);
    // TODO: 集成通知系统，显示错误消息
    console.error(errorMessage);
  }

  return {
    isLoading,
    error,
    errorType: error ? getErrorType(error) : null,
    errorMessage: error ? getErrorMessage(error) : null,
    data: error && fallbackData !== undefined ? fallbackData : data,
    canRetry: retryable && !!error,
  };
}
