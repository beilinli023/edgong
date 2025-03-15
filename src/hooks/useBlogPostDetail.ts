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
  // 添加详细日志记录
  console.log(`🔄 useBlogPostDetail hook 被调用: id=${id}, language=${currentLanguage}`);
  
  // 使用 React Query 的 useBlogPost hook 获取博客文章数据
  const { data: post, isLoading: apiLoading, error: apiError } = useBlogPost(id || '', currentLanguage);
  
  // 添加本地数据回退状态
  const [localPost, setLocalPost] = useState<BlogPost | null>(null);
  const [isUsingLocalData, setIsUsingLocalData] = useState(false);
  const [isLoading, setIsLoading] = useState(apiLoading);
  
  // 确保即使不是从API加载，也会加载本地数据
  useEffect(() => {
    if (id) {
      // 始终尝试加载本地数据，不管API是否出错
      const loadLocalPost = async () => {
        try {
          console.log(`尝试从本地加载博客文章 ID/Slug: ${id}, 语言: ${currentLanguage}`);
          setIsLoading(true);
          
          // 直接使用getLocalBlogPostBySlug根据slug或ID获取博客文章
          const foundPost = await localBlogService.getLocalBlogPostBySlug(id, currentLanguage);
          
          if (foundPost) {
            console.log('✅ 成功从本地加载博客文章:', foundPost.title_en || foundPost.title_zh);
            setLocalPost(foundPost);
            setIsUsingLocalData(true);
          } else {
            console.error(`❌ 未找到ID或slug为 ${id} 的本地博客文章`);
          }
        } catch (localError) {
          console.error("❌ 加载本地博客文章失败:", localError);
        } finally {
          setIsLoading(false);
        }
      };
      
      loadLocalPost();
    }
  }, [id, currentLanguage]);
  
  // 使用本地数据优先于API数据
  const effectivePost = isUsingLocalData ? localPost : post;
  
  // 添加非常详细的调试信息
  console.log(`🔍 博客文章数据来源: ${isUsingLocalData ? '本地数据' : 'API数据'}`);
  console.log('🔍 博客文章数据:', effectivePost);
  
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
  
  // 最终状态记录
  console.log("🔍 博客文章详情状态:", { 
    id, 
    localizedTitle, 
    isLoading: isLoading && !isUsingLocalData, 
    error: apiError && !isUsingLocalData,
    hasData: !!effectivePost,
    featuredImage: featuredImageUrl || '无特色图片',
    carouselImages: carouselImages?.length ? `${carouselImages.length} 张图片` : '无轮播图片'
  });
  
  return {
    post: effectivePost,
    isLoading: isLoading && !isUsingLocalData,
    error: apiError && !isUsingLocalData,
    localizedTitle,
    localizedContent,
    localizedExcerpt,
    backLabel,
    tagsLabel,
    featuredImageUrl,
    carouselImages,
    getLocalizedText,
    formattedTags
  };
};
