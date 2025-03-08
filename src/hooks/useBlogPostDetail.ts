
import { useFetchBlogPost } from "./blog/useFetchBlogPost";
import { useBlogPostFormatter } from "./blog/useBlogPostFormatter";
import { normalizeTags } from "@/utils/blogUtils";

/**
 * Hook for blog post detail that composes fetch and formatting functionality
 */
export const useBlogPostDetail = (id: string | undefined, currentLanguage: string) => {
  // Fetch the blog post - passing id as the slug parameter since they're the same in our route structure
  const { post, isLoading, error } = useFetchBlogPost(id, currentLanguage);
  
  // Format the blog post content
  const {
    localizedTitle,
    localizedContent,
    localizedExcerpt,
    backLabel,
    tagsLabel,
    featuredImageUrl,
    getLocalizedText,
    formattedTags
  } = useBlogPostFormatter(post, currentLanguage);

  // 调试日志
  console.log("Blog post detail hook:", { 
    id, 
    post: post || 'No post data', 
    isLoading, 
    error, 
    localizedTitle, 
    localizedContent: localizedContent ? 'Content exists' : 'No content' 
  });

  // Ensure tags are properly normalized
  const normalizedTags = post ? normalizeTags(post) : [];

  return {
    post,
    isLoading,
    error,
    localizedTitle,
    localizedContent,
    localizedExcerpt,
    backLabel,
    tagsLabel,
    featuredImageUrl,
    getLocalizedText,
    formattedTags: normalizedTags
  };
};
