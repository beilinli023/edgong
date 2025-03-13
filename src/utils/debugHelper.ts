/**
 * 调试辅助工具
 * 用于在控制台中输出详细的调试信息，帮助排查问题
 */

// 是否启用详细调试日志
const DEBUG_ENABLED = true;

/**
 * 输出详细的调试日志
 * @param context 日志上下文（通常是组件或服务名称）
 * @param message 日志消息
 * @param data 相关数据（可选）
 */
export const debugLog = (context: string, message: string, data?: unknown) => {
  if (!DEBUG_ENABLED) return;
  
  console.group(`🔍 [DEBUG] ${context}`);
  console.log(`📝 ${message}`);
  if (data !== undefined) {
    console.log('📊 数据:', data);
  }
  console.groupEnd();
};

/**
 * 输出错误日志
 * @param context 日志上下文（通常是组件或服务名称）
 * @param message 错误消息
 * @param error 错误对象（可选）
 */
export const errorLog = (context: string, message: string, error?: unknown) => {
  console.group(`❌ [ERROR] ${context}`);
  console.error(`⚠️ ${message}`);
  if (error) {
    console.error('🔥 错误详情:', error);
    if (error instanceof Error) {
      console.error('📋 堆栈:', error.stack);
    }
  }
  console.groupEnd();
};

/**
 * 跟踪数据加载过程
 * @param context 日志上下文
 * @param action 当前动作
 * @param data 相关数据
 */
export const traceDataLoading = (context: string, action: string, data?: unknown) => {
  if (!DEBUG_ENABLED) return;
  
  console.group(`📊 [DATA] ${context}`);
  console.log(`🔄 ${action}`);
  if (data !== undefined) {
    console.log('📦 数据:', data);
  }
  console.groupEnd();
};

export default {
  debugLog,
  errorLog,
  traceDataLoading
};
