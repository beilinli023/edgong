
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import FrontendLayout from "@/components/frontend/FrontendLayout";
import { BlogPostLoading } from "@/components/frontend/blog/detail/BlogPostLoading";
import BlogPostHero from "@/components/frontend/blog/detail/BlogPostHero";
import BlogPostNavigation from "@/components/frontend/blog/detail/BlogPostNavigation";
import BlogPostContent from "@/components/frontend/blog/detail/BlogPostContent";
import BlogPostHeader from "@/components/frontend/blog/detail/BlogPostHeader";
import BlogPostTags from "@/components/frontend/blog/detail/BlogPostTags";
import BlogPostError from "@/components/frontend/blog/detail/BlogPostError";
import { useLanguage } from "@/context/LanguageContext";
import { useBlogPostDetail } from "@/hooks/useBlogPostDetail";
import { normalizeTags } from "@/utils/blogUtils";
import ErrorMessage from "@/components/frontend/blog/ErrorMessage";

const BlogPostDetail: React.FC = () => {
  // Get the ID from the URL parameter
  const { id } = useParams<{ id: string }>();
  const { currentLanguage } = useLanguage();
  
  // Use the hook to fetch and format blog post data
  const {
    post,
    isLoading,
    error,
    localizedTitle,
    localizedContent,
    localizedExcerpt,
    backLabel,
    tagsLabel,
    featuredImageUrl,
    getLocalizedText
  } = useBlogPostDetail(id, currentLanguage);

  // Set page title when post is loaded
  useEffect(() => {
    if (localizedTitle) {
      document.title = `${localizedTitle} | YouNiKco`;
    } else {
      document.title = currentLanguage === 'zh' ? '博客文章 | YouNiKco' : 'Blog Post | YouNiKco';
    }
  }, [localizedTitle, currentLanguage]);

  // Debug log
  console.log("Blog post detail route param:", { 
    id, 
    post: post || 'No post data', 
    isLoading, 
    error, 
    localizedTitle
  });

  // If loading, show loading state
  if (isLoading) {
    return <BlogPostLoading />;
  }

  // If error or no post data, show error message
  if (error && !post) {
    return (
      <BlogPostError 
        error={error || (currentLanguage === 'zh' ? '未找到博客文章' : 'Blog post not found')}
        currentLanguage={currentLanguage}
        onRetry={() => window.location.reload()}
        backLabel={backLabel}
      />
    );
  }

  // Ensure tags are always normalized
  const normalizedTags = normalizeTags(post);

  return (
    <FrontendLayout>
      {/* Hero section with title and excerpt */}
      <BlogPostHero 
        title={localizedTitle || ''}
        excerpt={localizedExcerpt || ''}
        featuredImage={featuredImageUrl || '/placeholder.svg'}
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
          <BlogPostHeader 
            title={localizedTitle || ''}
            author={post?.author || ''}
            publishedDate={post?.published_at || ''}
            primaryCategory={post?.primary_category}
            currentLanguage={currentLanguage}
          />

          {/* Main post content */}
          <BlogPostContent 
            content={localizedContent || ''}
            featuredImage={featuredImageUrl}
            imageAlt={localizedTitle}
            showFeaturedImage={true}
          />

          {/* Tags section */}
          <BlogPostTags 
            tags={normalizedTags}
            tagsLabel={tagsLabel}
            getLocalizedText={getLocalizedText}
          />
        </div>
      </section>
    </FrontendLayout>
  );
};

export default BlogPostDetail;
