
import React from "react";

interface BlogPostHeroProps {
  title: string;
  excerpt: string;
  featuredImage: string;
}

const BlogPostHero: React.FC<BlogPostHeroProps> = ({
  title,
  excerpt,
  featuredImage
}) => {
  return (
    <section 
      className="relative h-80 md:h-96 bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${featuredImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl">{excerpt}</p>
      </div>
    </section>
  );
};

export default BlogPostHero;
