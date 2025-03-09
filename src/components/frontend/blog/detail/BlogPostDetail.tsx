import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBlogPostDetail } from '@/hooks/useBlogPostDetail';
import BlogPostHeaderNew from './BlogPostHeaderNew';
import BlogPostContent from './BlogPostContent';
import { Skeleton } from '@/components/ui/skeleton';

interface BlogPostDetailProps {
  slug?: string;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ slug }) => {
  const params = useParams<{ slug: string }>();
  const postSlug = slug || params.slug;
  
  // 添加调试信息显示在页面上
  const debug = true; // 设置为true显示调试信息，之后可以改为false
  
  const currentLanguage = 'zh'; // 硬编码为中文，或从context获取
  
  // 添加清除缓存的功能
  useEffect(() => {
    // 尝试清除Service Worker缓存
    const clearCache = async () => {
      if ('caches' in window) {
        try {
          const cacheNames = await window.caches.keys();
          await Promise.all(
            cacheNames.map(cacheName => {
              console.log('尝试清除缓存:', cacheName);
              return window.caches.delete(cacheName);
            })
          );
          console.log('所有缓存已清除');
        } catch (err) {
          console.error('清除缓存失败:', err);
        }
      }
    };
    
    clearCache();
    
    // 强制刷新
    const forceRefresh = async () => {
      try {
        // 使用时间戳参数请求最新的博客文章
        const timestamp = new Date().getTime();
        const response = await fetch(`/content/blog/${postSlug}.json?_t=${timestamp}`);
        if (response.ok) {
          console.log('强制刷新博客文章成功');
          const data = await response.json();
          console.log('最新博客数据:', data);
        }
      } catch (err) {
        console.error('强制刷新失败:', err);
      }
    };
    
    forceRefresh();
  }, [postSlug]);
  
  console.log('🔄 BlogPostDetail加载文章:', {
    providedSlug: slug,
    routeSlug: params.slug,
    finalSlug: postSlug,
    timestamp: new Date().toISOString()
  });
  
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

  // 简单的本地化文本函数
  const getLocalizedText = (en: string, zh: string) => currentLanguage === 'zh' ? zh : en;

  // 添加清除缓存和强制刷新功能
  const clearCacheAndRefresh = async () => {
    if ('caches' in window) {
      try {
        const cacheNames = await window.caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => {
            console.log('手动清除缓存:', cacheName);
            return window.caches.delete(cacheName);
          })
        );
        console.log('所有缓存已手动清除');
        // 强制刷新整个页面
        setTimeout(() => {
          document.location.reload();
        }, 100);
      } catch (err) {
        console.error('手动清除缓存失败:', err);
        document.location.reload();
      }
    } else {
      // 如果不支持caches API，就直接刷新
      document.location.reload();
    }
  };

  if (isLoading) {
    return <BlogPostDetailSkeleton />;
  }

  if (error || !post) {
    return <div className="text-center py-10">
      <h2 className="text-xl font-semibold mb-2">{getLocalizedText('Post not found', '未找到文章')}</h2>
      <p>{getLocalizedText('The post you are looking for might have been removed or is temporarily unavailable.', 
        '您查找的文章可能已被删除或暂时不可用。')}</p>
    </div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {debug && (
        <div className="bg-yellow-100 p-3 mb-4 text-sm rounded-md">
          <p><strong>调试信息:</strong></p>
          <ul className="list-disc pl-5">
            <li>文章ID: {post.id}</li>
            <li>文章Slug: {post.slug}</li>
            <li>date字段: {post.date}</li>
            <li>published_at字段: {post.published_at}</li>
            <li>最终使用日期: {post.date || post.published_at}</li>
          </ul>
          <button 
            onClick={clearCacheAndRefresh}
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs"
          >
            强制清除缓存并刷新
          </button>
        </div>
      )}
      
      <BlogPostHeaderNew
        title={localizedTitle}
        author={post.author}
        publishedDate={post.date || post.published_at}
        currentLanguage={currentLanguage}
        primaryCategory={post.primary_category}
        tags={formattedTags}
        tagsLabel={tagsLabel}
        getLocalizedText={getLocalizedText}
      />
      
      <BlogPostContent content={localizedContent} />
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