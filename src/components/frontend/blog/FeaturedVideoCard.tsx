
import React from "react";
import { BlogVideo } from "@/types/blogTypes";
import { getImageUrl } from "@/utils/blogUtils";

interface FeaturedVideoCardProps {
  video: BlogVideo;
  getLocalizedText: (en: string, zh: string) => string;
}

const FeaturedVideoCard: React.FC<FeaturedVideoCardProps> = ({
  video,
  getLocalizedText
}) => {
  // 确保获取正确的缩略图URL
  const thumbnailUrl = getImageUrl(video.thumbnail);
  const title = getLocalizedText(video.title_en, video.title_zh);
  
  // 从YouTube URL中提取视频ID
  const getVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  const videoId = getVideoId(video.youtube_url);
  
  // 视频点击处理函数
  const handleVideoClick = () => {
    if (videoId) {
      window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
    }
  };
  
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white h-full flex flex-col">
      <div 
        className="relative cursor-pointer w-full"
        onClick={handleVideoClick}
        style={{ paddingBottom: "56.25%" }} // 16:9 宽高比 (9/16 = 0.5625 = 56.25%)
      >
        <img 
          src={thumbnailUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="white" 
              className="w-6 h-6"
              style={{ marginLeft: "2px" }}
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        
        {video.category && (
          <span className="mt-2 inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
            {getLocalizedText(
              video.category.name_en, 
              video.category.name_zh
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default FeaturedVideoCard;
