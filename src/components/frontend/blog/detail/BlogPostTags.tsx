
import React from "react";
import { Badge } from "@/components/ui/badge";
import { BlogTag } from "@/types/blogTypes";
import { Link } from "react-router-dom";

interface BlogPostTagsProps {
  tags: BlogTag[]; // This explicitly requires BlogTag[] type
  tagsLabel?: string;
  getLocalizedText: (en: string, zh: string) => string;
  className?: string;
  showHeader?: boolean;
}

const BlogPostTags: React.FC<BlogPostTagsProps> = ({
  tags,
  tagsLabel,
  getLocalizedText,
  className = "mt-12 pt-6 border-t border-gray-200",
  showHeader = true
}) => {
  if (!tags || tags.length === 0) return null;
  
  return (
    <div className={className}>
      {showHeader && tagsLabel && (
        <h3 className="text-lg font-semibold mb-3">{tagsLabel}</h3>
      )}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag: BlogTag) => (
          <Link to={`/blog/tag/${tag.slug}`} key={tag.id}>
            <Badge 
              variant="outline" 
              className="px-3 py-1 text-sm hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
            >
              {getLocalizedText(tag.name_en, tag.name_zh)}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPostTags;
