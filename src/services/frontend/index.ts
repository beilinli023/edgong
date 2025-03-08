
import { getNavigationMenu } from './navigationService';
import { 
  getFooterInfo, 
  getQuickLinks, 
  getSocialMedia, 
  getContactInfo 
} from './footerService';
import {
  getHeroSlides,
  getStudentStories,
  getFeaturedPrograms,
  getFeaturedProgramsIntro,
  getTaglineSection
} from './homeContentService';
import {
  getFrontendFormContent,
  submitPlanningForm,
  submitNewsletterSubscription
} from './formService';
import { 
  getBlogPosts, 
  getBlogPostBySlug, 
  getBlogCategories, 
  getBlogTags,
  getBlogFeaturedVideos,
  getBlogPageSettings
} from './blogService';
import { 
  getStudyAbroadContent, 
  getUniversityById 
} from './studyAbroadService';
import { getAboutPageContent } from './aboutService';

export default {
  // 导航
  getNavigationMenu,
  
  // 页脚
  getFooterInfo,
  getQuickLinks,
  getSocialMedia,
  getContactInfo,
  
  // 首页
  getHeroSlides,
  getStudentStories,
  getFeaturedPrograms,
  getFeaturedProgramsIntro,
  getTaglineSection,
  
  // 表单
  getFrontendFormContent,
  submitPlanningForm,
  submitNewsletterSubscription,
  
  // 博客
  getBlogPosts,
  getBlogPostBySlug,
  getBlogCategories,
  getBlogTags,
  getBlogFeaturedVideos,
  getBlogPageSettings,
  
  // 留学
  getStudyAbroadContent,
  getUniversityById,
  
  // 关于我们
  getAboutPageContent
};
