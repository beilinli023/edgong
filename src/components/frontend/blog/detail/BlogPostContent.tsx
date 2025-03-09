import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  // 轮播图图片列表
  const images = [
    featuredImage || "/lovable-uploads/singapore-skyline.jpg",
    "/lovable-uploads/ntu-campus.jpg",
    "/lovable-uploads/sentosa-island.jpg",
    "/lovable-uploads/singapore-food.jpg"
  ].filter(Boolean) as string[];

  return (
    <div className="blog-post-content">
      {/* 轮播图 */}
      {showFeaturedImage && images.length > 0 && (
        <div className="mb-8 relative">
          <Carousel 
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                    <img 
                      src={image} 
                      alt={`${imageAlt || "Featured image"} ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/20" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute -left-12 top-1/2 -translate-y-1/2">
              <CarouselPrevious className="h-10 w-10 rounded-full border-2 opacity-70 hover:opacity-100" />
            </div>
            <div className="absolute -right-12 top-1/2 -translate-y-1/2">
              <CarouselNext className="h-10 w-10 rounded-full border-2 opacity-70 hover:opacity-100" />
            </div>
          </Carousel>
        </div>
      )}
      {showFeaturedImage && images.length === 1 && (
        <div className="mb-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
            <img 
              src={images[0]} 
              alt={imageAlt || "Featured image"} 
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
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
          <p className="text-lg">No content available for this post.</p>
        </div>
      )}
    </div>
  );
};

export default BlogPostContent;
