
import React from "react";
import { BlogPost } from "@/types/blogTypes";
import BlogPostCard from "./BlogPostCard";
import { Skeleton } from "@/components/ui/skeleton";

interface LatestBlogPostsProps {
  posts: BlogPost[];
  isLoading: boolean;
  getLocalizedText: (en: string, zh: string) => string;
}

const LatestBlogPosts: React.FC<LatestBlogPostsProps> = ({
  posts,
  isLoading,
  getLocalizedText
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array(6).fill(0).map((_, index) => (
          <div key={index} className="flex flex-col h-full">
            <Skeleton className="w-full h-48 rounded-t-lg" />
            <div className="p-4 border border-t-0 rounded-b-lg flex-grow">
              <Skeleton className="h-6 w-3/4 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-4/5 mb-4" />
              <div className="flex gap-2 mt-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-8 border rounded-lg">
        <p className="text-gray-500">{getLocalizedText('No articles available', '暂无文章')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <BlogPostCard key={post.id} post={post} getLocalizedText={getLocalizedText} />
      ))}
    </div>
  );
};

export default LatestBlogPosts;
