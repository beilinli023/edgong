
import { getStudyAbroadContent } from './studyAbroadContentService';
import { getUniversityById } from './universityService';

/**
 * 留学服务模块
 * 整合各个子模块的功能
 */
export {
  getStudyAbroadContent,
  getUniversityById
};

// 导出默认对象，兼容之前的导入方式
export default {
  getStudyAbroadContent,
  getUniversityById
};
