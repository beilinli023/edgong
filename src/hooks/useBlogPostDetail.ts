import { useBlogPost } from "./useBlog";
import { useBlogPostFormatter } from "./blog/useBlogPostFormatter";
import { normalizeTags } from "@/utils/blogUtils";
import { useEffect, useState } from "react";
import { BlogPost } from "@/types/blogTypes";
import localBlogService from "@/services/blog/localBlogService";

/**
 * Hook for blog post detail that composes fetch and formatting functionality
 */
/**
 * Hook for blog post detail that composes React Query fetch and formatting functionality
 * 兼容旧版实现，保留原有格式化逻辑，同时利用 React Query 的缓存机制
 * 增加本地数据回退功能，当API不可用时自动使用本地数据
 */
export const useBlogPostDetail = (id: string | undefined, currentLanguage: string) => {
  // 使用 React Query 的 useBlogPost hook 获取博客文章数据
  const { data: post, isLoading, error } = useBlogPost(id || '', currentLanguage);
  
  // 添加本地数据回退状态
  const [localPost, setLocalPost] = useState<BlogPost | null>(null);
  const [isUsingLocalData, setIsUsingLocalData] = useState(false);
  
  // 当API请求出错时尝试加载本地数据
  useEffect(() => {
    if (error && !isUsingLocalData && id) {
      const loadLocalPost = async () => {
        try {
          console.log(`API错误，尝试从本地加载博客文章 ID/Slug: ${id}...`);
          // 直接使用getLocalBlogPostBySlug根据slug或ID获取博客文章
          const foundPost = await localBlogService.getLocalBlogPostBySlug(id, currentLanguage);
          
          if (foundPost) {
            console.log('成功从本地加载博客文章:', foundPost.title_en || foundPost.title_zh);
            setLocalPost(foundPost);
            setIsUsingLocalData(true);
          } else {
            console.log(`未找到ID或slug为 ${id} 的本地博客文章`);
          }
        } catch (localError) {
          console.error("加载本地博客文章失败:", localError);
        }
      };
      
      loadLocalPost();
    }
  }, [error, isUsingLocalData, id, currentLanguage]);
  
  // 使用API数据或本地数据
  const effectivePost = isUsingLocalData ? localPost : post;
  
  // 添加非常详细的调试信息
  console.log('🔍 Original post data:', JSON.stringify(effectivePost, null, 2));
  
  if (effectivePost) {
    console.log('🔍 日期字段详情:', { 
      post_id: effectivePost.id,
      slug: effectivePost.slug,
      published_at: effectivePost.published_at, 
      date: effectivePost.date,
      timestamps: {
        now: new Date().toISOString(),
        cache_buster: `_t=${new Date().getTime()}`
      }
    });
  }
  
  // Format the blog post content
  const {
    localizedTitle,
    localizedContent,
    localizedExcerpt,
    backLabel,
    tagsLabel,
    featuredImageUrl,
    carouselImages,
    getLocalizedText,
    formattedTags
  } = useBlogPostFormatter(effectivePost, currentLanguage);

  // 调试日志
  console.log("Blog post detail hook:", { 
    id, 
    post: effectivePost || 'No post data', 
    isLoading: isLoading && !isUsingLocalData, 
    error: error && !isUsingLocalData, 
    localizedTitle, 
    localizedContent: localizedContent ? 'Content exists' : 'No content',
    isUsingLocalData,
    carouselImages: carouselImages?.length ? `${carouselImages.length} images` : 'No carousel images'
  });

  // Ensure tags are properly normalized
  const normalizedTags = effectivePost ? normalizeTags(effectivePost) : [];

  return {
    post: effectivePost,
    isLoading: isLoading && !isUsingLocalData,
    error: error && !isUsingLocalData,
    localizedTitle,
    localizedContent,
    localizedExcerpt,
    backLabel,
    tagsLabel,
    featuredImageUrl,
    carouselImages,
    getLocalizedText,
    formattedTags: normalizedTags
  };
};
