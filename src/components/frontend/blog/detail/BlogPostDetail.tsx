import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBlogPostDetail } from '@/hooks/useBlogPostDetail';
import BlogPostHeaderNew from './BlogPostHeaderNew';
import BlogPostContent from './BlogPostContent';
import { Skeleton } from '@/components/ui/skeleton';
import { BlogPost, ImageData } from '@/types/blogTypes';
import { useLanguage } from '@/context/LanguageContext';

interface BlogPostDetailProps {
  slug?: string;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ slug }) => {
  const params = useParams<{ slug: string }>();
  const postSlug = slug || params.slug;
  const { currentLanguage } = useLanguage();
  
  // 调试日志
  console.log(`🔍 BlogPostDetail组件渲染: slug=${postSlug}, language=${currentLanguage}`);
  
  const {
    post,
    isLoading,
    error,
    localizedTitle,
    localizedContent,
    localizedExcerpt,
    tagsLabel,
    formattedTags
  } = useBlogPostDetail(postSlug, currentLanguage);
  
  // 组件加载时记录详细信息
  useEffect(() => {
    console.log('🔄 BlogPostDetail组件挂载，数据状态:', {
      postSlug,
      hasPost: !!post,
      isLoading,
      hasError: !!error,
      title: localizedTitle || '无标题'
    });
  }, [postSlug, post, isLoading, error, localizedTitle]);

  // 简单的本地化文本函数
  const getLocalizedText = (en: string, zh: string) => currentLanguage === 'zh' ? zh : en;

  if (isLoading) {
    console.log('⏳ 显示博客文章加载状态');
    return <BlogPostDetailSkeleton />;
  }

  if (error || !post) {
    console.log('❌ 显示博客文章错误状态:', error);
    return <div className="text-center py-10">
      <h2 className="text-xl font-semibold mb-2">{getLocalizedText('Post not found', '未找到文章')}</h2>
      <p>{getLocalizedText('The post you are looking for might have been removed or is temporarily unavailable.', 
        '您查找的文章可能已被删除或暂时不可用。')}</p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {getLocalizedText('Reload', '重新加载')}
      </button>
    </div>;
  }

  // 从post对象中获取视频URL（优先从video_url字段，或从内容中尝试提取）
  const getVideoUrlFromPost = (postData: BlogPost): string | null => {
    if (!postData) return null;
    
    if ('video_url' in postData && typeof postData.video_url === 'string') {
      return postData.video_url;
    }
    
    const extractVideoUrl = (content: string | undefined): string | null => {
      if (!content) return null;
      
      const youtubeMatch = content.match(/https:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
      if (youtubeMatch) return youtubeMatch[0];
      
      const bilibiliMatch = content.match(/https:\/\/(www\.)?bilibili\.com\/video\/(BV[a-zA-Z0-9]+|av\d+)/);
      if (bilibiliMatch) return bilibiliMatch[0];
      
      return null;
    };
    
    const contentEn = 'content_en' in postData ? postData.content_en : undefined;
    const contentZh = 'content_zh' in postData ? postData.content_zh : undefined;
    
    return extractVideoUrl(contentEn) || extractVideoUrl(contentZh) || null;
  };
  
  const videoUrl = getVideoUrlFromPost(post);

  // 处理特色图片
  const getFeaturedImage = (postData: BlogPost): string | undefined => {
    if (!postData || !('featured_image' in postData)) return undefined;
    
    const featuredImage = postData.featured_image;
    
    if (typeof featuredImage === 'string') {
      return featuredImage;
    } else if (
      typeof featuredImage === 'object' && 
      featuredImage !== null
    ) {
      if ('url' in featuredImage && typeof featuredImage.url === 'string') {
        return featuredImage.url;
      }
    }
    
    return undefined;
  };

  const featuredImageUrl = getFeaturedImage(post);

  // 获取本地视频URL
  const getLocalVideoUrl = (postData: BlogPost): string | null => {
    if (!postData) return null;
    
    if ('local_video_url' in postData && typeof postData.local_video_url === 'string') {
      const videoUrl = postData.local_video_url;
      return videoUrl.startsWith('/') ? videoUrl : `/${videoUrl}`;
    }
    
    return null;
  };

  const localVideoUrl = getLocalVideoUrl(post);

  return (
    <div className="container mx-auto px-4 py-8">
      <BlogPostHeaderNew
        title={localizedTitle}
        author={post.author_en || post.author_zh || post.author}
        publishedDate={post.date}
        currentLanguage={currentLanguage}
        primaryCategory={post.primary_category}
        tags={formattedTags}
        tagsLabel={tagsLabel}
        getLocalizedText={getLocalizedText}
      />
      
      <BlogPostContent 
        content={localizedContent}
        featuredImage={featuredImageUrl}
        videoUrl={videoUrl}
        localVideoUrl={localVideoUrl}
      />
    </div>
  );
};

const BlogPostDetailSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="mb-8">
      <Skeleton className="h-12 w-3/4 mb-4" />
      <div className="flex flex-wrap items-center gap-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-48" />
      </div>
    </div>
    
    <div className="mb-8">
      <Skeleton className="h-64 w-full mb-6" />
      <div className="space-y-4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
      </div>
    </div>
  </div>
);

export default BlogPostDetail;