import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface BlogPostCarouselProps {
  images: string[];
  imageAlt?: string;
}

/**
 * 博客文章图片轮播组件
 * 用于显示博客文章中的多张图片
 */
const BlogPostCarousel: React.FC<BlogPostCarouselProps> = ({ images, imageAlt }) => {
  // 如果没有图片，不渲染任何内容
  if (!images || images.length === 0) return null;

  // 如果只有一张图片，直接显示单张图片
  if (images.length === 1) {
    return (
      <div className="mb-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
          <img 
            src={images[0]} 
            alt={imageAlt || "博客图片"} 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>
      </div>
    );
  }

  // 多张图片时显示轮播图
  return (
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
                  alt={`${imageAlt || "博客图片"} ${index + 1}`}
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
  );
};

export default BlogPostCarousel;
