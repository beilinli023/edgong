
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogHeroProps {
  isLoading: boolean;
  backgroundImage: string;
  title: string;
  subtitle: string;
}

const BlogHero: React.FC<BlogHeroProps> = ({
  isLoading,
  backgroundImage,
  title,
  subtitle
}) => {
  return (
    <section 
      className="relative py-20 text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {isLoading ? (
            <>
              <Skeleton className="h-12 w-3/4 mx-auto mb-4 bg-gray-300/50" />
              <Skeleton className="h-6 w-full mx-auto bg-gray-300/50" />
              <Skeleton className="h-6 w-2/3 mx-auto mt-2 bg-gray-300/50" />
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                {title}
              </h1>
              <p className="mt-6 text-lg md:text-xl text-white">
                {subtitle}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
