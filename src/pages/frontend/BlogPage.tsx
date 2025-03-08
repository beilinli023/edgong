
import React from "react";
import { useBlogContent } from "@/hooks/useBlogContent";
import BlogHero from "@/components/frontend/blog/BlogHero";
import LatestBlogPosts from "@/components/frontend/blog/LatestBlogPosts";
import BlogPagination from "@/components/frontend/blog/BlogPagination";
import FeaturedVideosSection from "@/components/frontend/blog/FeaturedVideosSection";
import ErrorMessage from "@/components/frontend/blog/ErrorMessage";
import FrontendLayout from "@/components/frontend/FrontendLayout";

const BlogPage = () => {
  const {
    blogContent,
    currentPagePosts,
    isLoading,
    error,
    getLocalizedText,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    getImageUrl
  } = useBlogContent();

  // Updated to use all posts directly without separating featured post
  const postsToDisplay = currentPagePosts;

  return (
    <FrontendLayout>
      <div className="min-h-screen bg-gray-50">
        {/* 博客页面头部 */}
        <BlogHero 
          title={blogContent.hero?.title_en || ""}
          subtitle={blogContent.hero?.subtitle_en || ""}
          backgroundImage={blogContent.hero?.background_image || ""}
          isLoading={isLoading}
        />

        {/* 如果API错误，显示错误提示 */}
        {error && (
          <ErrorMessage 
            getLocalizedText={getLocalizedText}
          />
        )}

        <div className="container mx-auto px-4 py-12">
          {/* 最新文章 */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              {getLocalizedText('Latest Articles', '最新文章')}
            </h2>
            
            <LatestBlogPosts 
              posts={postsToDisplay}
              isLoading={isLoading}
              getLocalizedText={getLocalizedText}
            />
            
            {/* 分页控制 */}
            {!isLoading && totalPages > 1 && (
              <div className="mt-10">
                <BlogPagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  goToNextPage={goToNextPage}
                  goToPreviousPage={goToPreviousPage}
                  goToPage={goToPage}
                  getLocalizedText={getLocalizedText}
                />
              </div>
            )}
          </section>

          {/* 特色视频 */}
          {blogContent.videos && blogContent.videos.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                {getLocalizedText('Featured Videos', '精选视频')}
              </h2>
              
              <FeaturedVideosSection 
                videos={blogContent.videos}
                isLoading={isLoading}
                getLocalizedText={getLocalizedText}
              />
            </section>
          )}
        </div>
      </div>
    </FrontendLayout>
  );
};

export default BlogPage;
