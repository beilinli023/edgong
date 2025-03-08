
import React, { useState } from "react";
import { BlogVideo } from "@/types/blogTypes";
import FeaturedVideoCard from "./FeaturedVideoCard";
import { Skeleton } from "@/components/ui/skeleton";
import BlogPagination from "./BlogPagination";

interface FeaturedVideosSectionProps {
  videos: BlogVideo[];
  isLoading: boolean;
  getLocalizedText: (en: string, zh: string) => string;
}

const FeaturedVideosSection: React.FC<FeaturedVideosSectionProps> = ({
  videos,
  isLoading,
  getLocalizedText
}) => {
  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil((videos?.length || 0) / itemsPerPage);
  
  // Get videos for current page
  const paginatedVideos = () => {
    if (!videos || !Array.isArray(videos)) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return videos.slice(startIndex, endIndex) || [];
  };
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Array(2).fill(0).map((_, index) => (
          <div key={index} className="flex flex-col h-full border rounded-lg overflow-hidden">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <Skeleton className="absolute inset-0 w-full h-full rounded-t-lg" />
            </div>
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 mb-3" />
              <Skeleton className="h-4 w-1/2 mb-2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="text-center py-8 border rounded-lg">
        <p className="text-gray-500">{getLocalizedText('No videos available', '暂无视频')}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {paginatedVideos().map((video) => (
          <FeaturedVideoCard key={video.id} video={video} getLocalizedText={getLocalizedText} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="mt-10">
          <BlogPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            goToPage={goToPage}
            getLocalizedText={getLocalizedText}
          />
        </div>
      )}
    </div>
  );
};

export default FeaturedVideosSection;
