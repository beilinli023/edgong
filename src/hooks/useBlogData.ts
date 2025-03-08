
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { BlogContent } from "@/types/blogTypes";
import { blogService } from "@/services/blog";
import { defaultContent } from "@/data/blogDefaultData";

interface UseBlogDataProps {
  language: string;
}

export const useBlogData = ({ language }: UseBlogDataProps) => {
  const [blogContent, setBlogContent] = useState<BlogContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        console.log("Fetching blog content for language:", language);
        const data = await blogService.contentService.getBlogContent(language);
        
        if (data && Object.keys(data).length > 0) {
          console.log("Successfully fetched blog content:", data);
          setBlogContent(data);
          setError(null);
        } else {
          console.log("No data from API, using default content");
          setBlogContent(defaultContent);
          toast.error(language === 'zh' ? "使用默认内容" : "Using default content", {
            description: language === 'zh' ? "无法从服务器获取博客内容，显示默认内容" : "Unable to fetch blog content from server, displaying default content"
          });
        }
      } catch (err) {
        console.error("Error fetching blog content:", err);
        setBlogContent(defaultContent);
        setError("Failed to load blog page content from API, using defaults");
        toast.error(language === 'zh' ? "加载失败" : "Loading Failed", {
          description: language === 'zh' ? "无法从服务器获取博客内容，显示默认内容" : "Unable to fetch blog content from server, displaying default content"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [language]);

  return {
    blogContent,
    isLoading,
    error
  };
};
