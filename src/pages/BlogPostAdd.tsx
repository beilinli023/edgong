
import React from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import BlogPostEditor from "@/components/blog/BlogPostEditor";

const BlogPostAdd: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <PageHeader
        title="添加新文章"
        description="创建一篇新的博客文章，支持中英文内容"
        backUrl="/admin/blog"
      />

      <div className="mt-6">
        <BlogPostEditor />
      </div>
    </div>
  );
};

export default BlogPostAdd;
