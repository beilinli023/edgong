
import React from "react";
import FrontendLayout from "@/components/frontend/FrontendLayout";
import { ApiError } from "@/components/ui/api-error";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, RefreshCw } from "lucide-react";

interface BlogPostErrorProps {
  error: string;
  currentLanguage: string;
  onRetry: () => void;
  backLabel: string;
}

const BlogPostError: React.FC<BlogPostErrorProps> = ({
  error,
  currentLanguage,
  onRetry,
  backLabel
}) => {
  return (
    <FrontendLayout>
      <div className="container mx-auto px-4 py-8">
        <Link to="/blog">
          <Button variant="ghost" className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
            <ChevronLeft className="h-4 w-4 mr-1" />
            {backLabel}
          </Button>
        </Link>

        <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg shadow-sm my-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-red-500">
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-red-800">
                {currentLanguage === 'zh' ? "无法加载文章" : "Failed to load article"}
              </h3>
              <p className="text-md text-red-700 mt-1">
                {error}
              </p>
              <div className="mt-4">
                <Button onClick={onRetry} variant="outline" className="flex items-center">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {currentLanguage === 'zh' ? "重试" : "Try again"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FrontendLayout>
  );
};

export default BlogPostError;
