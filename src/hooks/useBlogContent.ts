
import { useLanguage } from "@/context/LanguageContext";
import { useBlogData } from "./useBlogData";
import { useBlogPagination } from "./useBlogPagination";
import { 
  calculateTotalPages, 
  getLocalizedBlogText, 
  getPaginatedPosts, 
  findPostBySlug,
  normalizeTags,
  getNormalizedPost,
  getImageUrl
} from "@/utils/blogUtils";
import { BlogPost, BlogTag } from "@/types/blogTypes";

/**
 * Main hook for blog content that composes other hooks and utilities
 */
export const useBlogContent = () => {
  const { currentLanguage } = useLanguage();
  
  // Fetch blog data from API or default content
  const { blogContent, isLoading, error } = useBlogData({ 
    language: currentLanguage 
  });
  
  // Calculate total pages based on posts with 3 posts per page
  const totalPages = calculateTotalPages(blogContent.posts || [], 3);
  
  // Handle pagination
  const { currentPage, goToNextPage, goToPreviousPage, goToPage } = useBlogPagination({
    totalPages
  });
  
  // Get localized text helper
  const getLocalizedText = (en: string, zh: string) => {
    return getLocalizedBlogText(en, zh, currentLanguage);
  };
  
  // Get posts for current page (3 posts per page)
  const getCurrentPagePosts = () => {
    return getPaginatedPosts(blogContent.posts || [], currentPage, 3);
  };
  
  // Find a specific post by slug
  const findPostBySlugHelper = (slug: string) => {
    return findPostBySlug(blogContent.posts, slug);
  };

  // Get normalized posts with properly formatted tags and images
  const getNormalizedPosts = () => {
    if (!blogContent.posts) return [];
    return blogContent.posts.map(post => getNormalizedPost(post));
  };

  return {
    blogContent,
    currentPagePosts: getCurrentPagePosts(),
    normalizedPosts: getNormalizedPosts(),
    isLoading,
    error,
    getLocalizedText,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    findPostBySlug: findPostBySlugHelper,
    normalizeTags,
    getNormalizedPost,
    getImageUrl
  };
};
