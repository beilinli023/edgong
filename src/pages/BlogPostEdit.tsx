
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import BlogPostEditor from "@/components/blog/BlogPostEditor";

const BlogPostEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <PageHeader
        title="编辑文章"
        description="修改博客文章内容，支持中英文"
        backUrl="/admin/blog"
      />

      <div className="mt-6">
        <BlogPostEditor postId={id} />
      </div>
    </div>
  );
};

export default BlogPostEdit;
