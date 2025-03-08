
import React from "react";

interface BlogPostContentProps {
  content: string;
  featuredImage?: string;
  imageAlt?: string;
  showFeaturedImage?: boolean;
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({
  content,
  featuredImage,
  imageAlt,
  showFeaturedImage = true
}) => {
  // 调试日志
  console.log("BlogPostContent props:", { 
    contentLength: content?.length || 0,
    featuredImage,
    showFeaturedImage
  });

  return (
    <div className="blog-post-content">
      {/* Featured Image - only shown if requested */}
      {showFeaturedImage && featuredImage && (
        <div className="mb-8">
          <img 
            src={featuredImage} 
            alt={imageAlt || "Featured image"} 
            className="w-full rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Post Content */}
      {content ? (
        <div 
          className="prose prose-lg max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <div className="py-8 text-center text-gray-500">
          {/* 显示无内容提示 */}
          <p className="text-lg">No content available for this post.</p>
        </div>
      )}
    </div>
  );
};

export default BlogPostContent;
