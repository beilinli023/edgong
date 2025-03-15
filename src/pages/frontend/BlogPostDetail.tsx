import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FrontendLayout from "@/components/frontend/FrontendLayout";
import { BlogPostLoading } from "@/components/frontend/blog/detail/BlogPostLoading";
import BlogPostHero from "@/components/frontend/blog/detail/BlogPostHero";
import BlogPostNavigation from "@/components/frontend/blog/detail/BlogPostNavigation";
import BlogPostContent from "@/components/frontend/blog/detail/BlogPostContent";
import BlogPostHeaderNew from "@/components/frontend/blog/detail/BlogPostHeaderNew";
import BlogPostTags from "@/components/frontend/blog/detail/BlogPostTags";
import BlogPostError from "@/components/frontend/blog/detail/BlogPostError";
import { useLanguage } from "@/context/LanguageContext";
import { useBlogPostDetail } from "@/hooks/useBlogPostDetail";
import { normalizeTags } from "@/utils/blogUtils";
import ErrorMessage from "@/components/frontend/blog/ErrorMessage";
import { BlogPost } from "@/types/blogTypes";
import localBlogService from "@/services/blog/localBlogService";

// 移除无效的blogConfig导入

const BlogPostDetail: React.FC = () => {
  // Get the ID from the URL parameter
  const { id } = useParams<{ id: string }>();
  const { currentLanguage } = useLanguage();
  
  // 添加本地回退数据状态
  const [localPost, setLocalPost] = useState<BlogPost | null>(null);
  const [isUsingLocalData, setIsUsingLocalData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // 本地加载博客文章
  useEffect(() => {
    if (id) {
      const loadLocalPost = async () => {
        try {
          console.log(`📄 BlogPostDetail页面直接加载文章: ${id}`);
          setIsLoading(true);
          
          const post = await localBlogService.getLocalBlogPostBySlug(id, currentLanguage);
          if (post) {
            console.log('✅ 成功加载博客文章:', post.title_en || post.title_zh);
            setLocalPost(post);
            setIsUsingLocalData(true);
          } else {
            console.error(`❌ 未找到ID为${id}的博客文章`);
          }
        } catch (error) {
          console.error('❌ 加载博客文章出错:', error);
        } finally {
          setIsLoading(false);
        }
      };
      
      loadLocalPost();
    }
  }, [id, currentLanguage]);
  
  // Use the hook to fetch and format blog post data
  const {
    post: hookPost,
    isLoading: hookLoading,
    error,
    localizedTitle,
    localizedContent,
    localizedExcerpt,
    backLabel,
    tagsLabel,
    featuredImageUrl,
    carouselImages,
    getLocalizedText
  } = useBlogPostDetail(id, currentLanguage);
  
  // 确定实际使用的文章数据和加载状态
  const post = isUsingLocalData ? localPost : hookPost;
  const actualLoading = isLoading && hookLoading;

  // Set page title when post is loaded
  useEffect(() => {
    if (localizedTitle) {
      document.title = `${localizedTitle} | Edgoing`;
    } else {
      document.title = currentLanguage === 'zh' ? '博客文章 | Edgoing' : 'Blog Post | Edgoing';
    }
  }, [localizedTitle, currentLanguage]);

  // Debug log
  console.log("📄 Blog post detail route param:", { 
    id, 
    post: post ? `文章标题: ${post.title_en || post.title_zh}` : '无文章数据', 
    isLoading: actualLoading, 
    error, 
    localizedTitle,
    isUsingLocalData
  });

  // If loading, show loading state
  if (actualLoading) {
    return <BlogPostLoading />;
  }

  // If error or no post data, show error message
  if (!post) {
    return (
      <BlogPostError 
        error={error?.toString() || (currentLanguage === 'zh' ? '未找到博客文章' : 'Blog post not found')}
        currentLanguage={currentLanguage}
        onRetry={() => window.location.reload()}
        backLabel={backLabel}
      />
    );
  }

  // Ensure tags are always normalized
  const normalizedTags = post ? normalizeTags(post as BlogPost) : [];

  return (
    <FrontendLayout>
      {/* Hero section with title and excerpt */}
      <BlogPostHero 
        title={localizedTitle || ''}
        excerpt={localizedExcerpt || ''}
        featuredImage={featuredImageUrl || '/Edgoing/Blog_Page/Heading1.jpg'}
      />

      {/* Navigation - back to blog list */}
      <BlogPostNavigation backLabel={backLabel} />

      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Show warning if using mock data */}
          {error && (
            <ErrorMessage 
              getLocalizedText={getLocalizedText}
              currentLanguage={currentLanguage}
            />
          )}

          {/* Post header with author and date info */}
          <BlogPostHeaderNew 
            title={localizedTitle || ''}
            date={post.published_at || post.date || new Date().toISOString()}
            author={currentLanguage === 'en' ? post.author_en : post.author_zh || ''}
            grade={currentLanguage === 'en' ? post.grade_en : post.grade_zh || ''}
            projectType={currentLanguage === 'en' ? post.project_type_en : post.project_type_zh || ''}
          />

          {/* Post content */}
          <BlogPostContent content={localizedContent || ''} />

          {/* Tags */}
          <BlogPostTags tags={normalizedTags} label={tagsLabel} />

          {/* Image carousel */}
          {carouselImages && carouselImages.length > 0 && (
            <div className="my-8">
              <h3 className="text-xl font-semibold mb-4">
                {currentLanguage === 'en' ? 'Photo Gallery' : '照片库'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {carouselImages.map((image, index) => (
                  <div key={index} className="rounded overflow-hidden shadow-lg">
                    <img 
                      src={image} 
                      alt={`${localizedTitle} - ${index + 1}`} 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </FrontendLayout>
  );
};

export default BlogPostDetail;
