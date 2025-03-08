
import { BlogPost, BlogTag, ImageData, BlogCategory } from "@/types/blogTypes";

/**
 * Calculate total pages based on posts count and items per page
 */
export const calculateTotalPages = (posts: BlogPost[], itemsPerPage: number = 6): number => {
  return Math.ceil(posts?.length || 0 / itemsPerPage);
};

/**
 * Get localized text based on current language
 */
export const getLocalizedBlogText = (en: string, zh: string, currentLanguage: string): string => {
  return currentLanguage === 'en' ? en : zh;
};

/**
 * Get posts for a specific page
 */
export const getPaginatedPosts = (
  posts: BlogPost[],
  currentPage: number,
  itemsPerPage: number = 6
): BlogPost[] => {
  if (!posts || !Array.isArray(posts)) return [];
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return posts.slice(startIndex, endIndex) || [];
};

/**
 * Find a specific post by slug
 */
export const findPostBySlug = (posts: BlogPost[] | undefined, slug: string): BlogPost | undefined => {
  if (!posts || !Array.isArray(posts)) return undefined;
  return posts.find(post => post.slug === slug);
};

/**
 * Normalize blog post tags to ensure consistent format
 */
export const normalizeTags = (post: BlogPost | undefined): BlogTag[] => {
  if (!post) return [];
  if (!post.tags || !Array.isArray(post.tags)) return [];

  return post.tags.map((tag) => {
    if (typeof tag === 'string') {
      // Convert string tag to BlogTag object
      return {
        id: `tag-${Math.random().toString(36).substr(2, 9)}`,
        name_en: tag,
        name_zh: tag,
        slug: tag.toLowerCase().replace(/\s+/g, '-'),
        color: '#3B82F6' // Default color
      };
    }
    
    // If it's already a BlogTag but might be missing some properties, ensure all required properties exist
    return {
      id: tag.id || `tag-${Math.random().toString(36).substr(2, 9)}`,
      name_en: tag.name_en || '',
      name_zh: tag.name_zh || '',
      slug: tag.slug || String(tag.id).toLowerCase().replace(/\s+/g, '-'),
      color: tag.color || '#3B82F6'
    } as BlogTag;
  });
};

/**
 * Get normalized blog post with properly formatted tags
 */
export const getNormalizedPost = (post: BlogPost | undefined): BlogPost | undefined => {
  if (!post) return undefined;
  
  return {
    ...post,
    tags: normalizeTags(post)
  };
};

/**
 * Convert string image URLs to ImageData objects if needed
 */
export const normalizeImage = (image: string | ImageData | undefined): ImageData => {
  if (!image) {
    return { id: 0, url: "/placeholder.svg" };
  }
  
  if (typeof image === 'string') {
    return { 
      id: Math.floor(Math.random() * 10000),
      url: image
    };
  }
  
  return image;
};

/**
 * Get image URL from either string or ImageData
 */
export const getImageUrl = (image: string | ImageData | undefined): string => {
  if (!image) return "/placeholder.svg";
  if (typeof image === 'string') return image;
  return image.url;
};

/**
 * Convert ImageData to string URL
 */
export const imageDataToString = (image: string | ImageData | undefined): string => {
  if (!image) return "/placeholder.svg";
  if (typeof image === 'string') return image;
  return image.url || "/placeholder.svg";
};

/**
 * Convert string URL to ImageData
 */
export const stringToImageData = (url: string): ImageData => {
  return {
    id: Math.floor(Math.random() * 10000),
    url: url || "/placeholder.svg"
  };
};

/**
 * Ensure category is always a string
 */
export const normalizeCategory = (category: string | number | BlogCategory | undefined): string => {
  if (!category) return "";
  if (typeof category === 'string') return category;
  if (typeof category === 'number') return category.toString();
  if (typeof category === 'object' && category !== null) {
    return category.name_en || ""; // Use name_en which exists on BlogCategory
  }
  return "";
};

/**
 * 处理图片类型转换，兼容多种类型的图片数据
 */
export const handleImageConversion = {
  urlToImageData: (url: string): ImageData => stringToImageData(url),
  imageDataToUrl: (image: ImageData | string | undefined): string => imageDataToString(image),
  stringToImageObject: (url: string): ImageData => ({
    id: Math.floor(Math.random() * 10000),
    url: url || "/placeholder.svg"
  })
};
