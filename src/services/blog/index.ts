
import * as contentService from './contentService';
import * as postService from './postService';
import * as taxonomyService from './taxonomyService';
import * as mediaService from './mediaService';
import * as utils from './utils';
import * as api from './api';

// 导出各个服务
export {
  contentService,
  postService,
  taxonomyService,
  mediaService,
  utils,
  api
};

// 导出博客服务对象
export const blogService = {
  contentService,
  postService,
  taxonomyService,
  mediaService,
  utils,
  api,
  // 使用正确的函数名称
  getAllBlogPosts: postService.getAllBlogPosts,
  getBlogPostById: postService.getBlogPostById,
  createBlogPost: postService.createBlogPost,
  updateBlogPost: postService.updateBlogPost,
  deleteBlogPost: postService.deleteBlogPost,
  getAllCategories: taxonomyService.getBlogCategories, // 使用正确的函数名
  getAllTags: taxonomyService.getBlogTags, // 使用正确的函数名
  getImageList: mediaService.getImageList,
  getAvailableImages: mediaService.getAvailableImages,
  uploadBlogImage: mediaService.uploadBlogImage,
  getBlogContent: contentService.getBlogContent
};
