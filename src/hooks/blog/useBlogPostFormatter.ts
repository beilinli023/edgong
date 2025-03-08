
import { BlogPost, BlogTag } from "@/types/blogTypes";

/**
 * Hook to format and localize blog post data
 */
export const useBlogPostFormatter = (post: BlogPost | null, currentLanguage: string) => {
  // Get localized text helper
  const getLocalizedText = (en: string, zh: string): string => {
    return currentLanguage === 'en' ? en : zh;
  };
  
  if (!post) {
    return {
      localizedTitle: '',
      localizedContent: '',
      localizedExcerpt: '',
      backLabel: getLocalizedText('Back to Blogs', '返回博客列表'),
      tagsLabel: getLocalizedText('Tags:', '标签:'),
      featuredImageUrl: '/placeholder.svg',
      getLocalizedText,
      formattedTags: [] as BlogTag[]
    };
  }

  // Process tags to ensure they're all BlogTag objects
  const formattedTags: BlogTag[] = (post.tags || []).map((tag: any) => {
    // If tag is already a BlogTag object
    if (typeof tag === 'object' && tag !== null) {
      return {
        id: tag.id || `tag-${Math.random().toString(36).substr(2, 9)}`,
        name_en: tag.name_en || (currentLanguage === 'en' ? tag.name || '' : ''),
        name_zh: tag.name_zh || (currentLanguage === 'zh' ? tag.name || '' : ''),
        slug: tag.slug || tag.id?.toString().toLowerCase() || '',
        color: tag.color || '#3B82F6'
      };
    }
    // If tag is a string, convert it to a BlogTag object
    return {
      id: `tag-${Math.random().toString(36).substr(2, 9)}`,
      name_en: currentLanguage === 'en' ? String(tag) : '',
      name_zh: currentLanguage === 'zh' ? String(tag) : '',
      slug: String(tag).toLowerCase().replace(/\s+/g, '-'),
      color: '#3B82F6' // Default color
    };
  });

  // Get localized content
  const localizedTitle = getLocalizedText(post.title_en || '', post.title_zh || '');
  const localizedContent = getLocalizedText(post.content_en || '', post.content_zh || '');
  const localizedExcerpt = getLocalizedText(post.excerpt_en || '', post.excerpt_zh || '');
  const backLabel = getLocalizedText('Back to Blogs', '返回博客列表');
  const tagsLabel = getLocalizedText('Tags:', '标签:');
  
  // Handle featured image URL
  const featuredImageUrl = typeof post.featured_image === 'string' 
    ? post.featured_image 
    : post.featured_image?.url || '/placeholder.svg';

  return {
    localizedTitle,
    localizedContent,
    localizedExcerpt,
    backLabel,
    tagsLabel,
    featuredImageUrl,
    getLocalizedText,
    formattedTags
  };
};
