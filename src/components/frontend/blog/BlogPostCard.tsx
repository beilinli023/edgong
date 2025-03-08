
import React from "react";
import { Link } from "react-router-dom";
import { BlogPost, BlogTag } from "@/types/blogTypes";
import { format } from "date-fns";
import { getImageUrl } from "@/utils/blogUtils";

interface BlogPostCardProps {
  post: BlogPost;
  getLocalizedText: (en: string, zh: string) => string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, getLocalizedText }) => {
  if (!post) return null;

  // 使用帮助函数确保我们获得正确的URL
  const imageUrl = getImageUrl(post.featured_image);
  const title = getLocalizedText(post.title_en, post.title_zh);
  const excerpt = getLocalizedText(post.excerpt_en, post.excerpt_zh);
  
  // 格式化日期
  const formattedDate = post.date 
    ? format(new Date(post.date), "yyyy-MM-dd")
    : "";

  // 获取标签
  const tags = Array.isArray(post.tags) 
    ? post.tags
    : [];
    
  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
      <Link to={`/blog/${post.slug}`}>
        <div className="h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="text-sm text-gray-500 mb-2">
          {formattedDate}
        </div>
        
        <Link to={`/blog/${post.slug}`} className="block">
          <h3 className="text-xl font-semibold mb-2 text-gray-900 hover:text-blue-600 transition-colors">
            {title}
          </h3>
        </Link>
        
        <p className="text-gray-600 mb-4 flex-grow">
          {excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.slice(0, 2).map((tag, index) => {
            const tagName = typeof tag === 'string' 
              ? tag 
              : getLocalizedText(tag.name_en, tag.name_zh);
              
            return (
              <span 
                key={index} 
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
              >
                {tagName}
              </span>
            );
          })}
          
          {tags.length > 2 && (
            <span className="inline-block text-gray-500 text-xs px-2 py-1">
              +{tags.length - 2}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
