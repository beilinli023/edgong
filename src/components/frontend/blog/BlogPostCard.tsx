import React from "react";
import { Link } from "react-router-dom";
import { BlogPost } from "@/types/blogTypes";
import { format } from "date-fns";
import { getImageUrl } from "@/utils/blogUtils";

/**
 * BlogPostCard组件的属性接口
 * 
 * @interface BlogPostCardProps
 * @property {BlogPost} post - 博客文章数据对象
 * @property {Function} getLocalizedText - 多语言文本获取函数，根据当前语言返回相应的文本
 */
interface BlogPostCardProps {
  post: BlogPost;
  getLocalizedText: (en: string, zh: string) => string;
}

/**
 * 博客文章卡片组件
 * 
 * 该组件用于在博客列表页面展示单篇博客文章的信息卡片。卡片包含文章的特色图片、标题、
 * 发布日期和摘要等信息，并支持点击跳转到文章详情页面。组件支持多语言显示，
 * 会根据传入的getLocalizedText函数自动选择当前语言的文本内容。
 */
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

  // 已移除标签相关代码
    
  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      <Link to={`/blog/${post.slug}`}>
        <div className="h-48 overflow-hidden relative">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-0 left-0 bg-white px-2 py-1 text-xs text-gray-600">
            {formattedDate}
          </div>
        </div>
      </Link>
      
      <div className="p-4 flex-grow flex flex-col">
        <Link to={`/blog/${post.slug}`} className="block">
          <h3 className="text-base font-semibold mb-2 text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {excerpt}
        </p>
        
        {/* 已移除标签显示部分 */}
      </div>
    </div>
  );
};

export default BlogPostCard;
