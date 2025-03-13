import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BlogPostCarousel from "./BlogPostCarousel";

interface BlogPostContentProps {
  content: string;
  featuredImage?: string;
  imageAlt?: string;
  showFeaturedImage?: boolean;
  videoUrl?: string;
  localVideoUrl?: string;
  carouselImages?: string[];
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({
  content,
  featuredImage,
  imageAlt,
  showFeaturedImage = true,
  videoUrl,
  localVideoUrl,
  carouselImages = []
}) => {
  // 轮播图图片列表 - 优先使用传入的轮播图图片，如果没有则使用默认图片
  const images = carouselImages && carouselImages.length > 0 
    ? carouselImages 
    : [featuredImage || "/lovable-uploads/singapore-skyline.jpg"].filter(Boolean) as string[];

  // 从YouTube URL中提取视频ID
  const getYoutubeVideoId = (url?: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|\/v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // 解析视频URL
  const videoId = getYoutubeVideoId(videoUrl);
  
  // 检查是否为B站视频
  const isBilibili = videoUrl?.includes('bilibili.com');
  
  // 从B站URL中提取视频ID
  const getBilibiliVideoId = (url?: string) => {
    if (!url || !url.includes('bilibili.com')) return null;
    // 提取B站视频ID (BV号或AV号)
    const bvMatch = url.match(/\/video\/(BV[a-zA-Z0-9]+)/);
    if (bvMatch && bvMatch[1]) return bvMatch[1];
    
    const avMatch = url.match(/\/video\/av(\d+)/);
    if (avMatch && avMatch[1]) return `av${avMatch[1]}`;
    
    return null;
  };
  
  const bilibiliVideoId = getBilibiliVideoId(videoUrl);

  // 格式化文本内容，添加段落间距和排版
  const formatContent = (text: string): string => {
    if (!text) return '';
    
    // 检查内容是否已经包含HTML标签
    const containsHtmlTags = /<\/?[a-z][\s\S]*>/i.test(text);
    
    if (containsHtmlTags) {
      // 如果已经包含HTML标签，只需确保段落之间有足够的间距
      return text.replace(/<p>/g, '<p style="margin-bottom: 2rem;">');
    } else {
      // 如果是纯文本，按换行符分割并添加段落标签和内联样式
      if (text.includes('\n\n')) {
        // 如果有两个换行符，按两个换行符分割
        const paragraphs = text.split('\n\n');
        return paragraphs
          .filter(p => p.trim() !== '')
          .map(p => `<p style="margin-bottom: 2rem;">${p.trim()}</p>`)
          .join('\n');
      } else {
        // 如果没有两个换行符，按句子分割
        const sentenceEnders = ['. ', '! ', '? ', '; ', '.u201D ', '!u201D ', '?u201D '];
        const sentences = [];
        let currentText = text;
        
        // 分割句子
        while (currentText.length > 0) {
          // 找到最靠近的句子结束符
          const endPositions = sentenceEnders
            .map(ender => ({ ender, pos: currentText.indexOf(ender) }))
            .filter(item => item.pos !== -1);
          
          if (endPositions.length === 0) {
            // 如果没有找到句子结束符，直接添加整个文本
            sentences.push(currentText.trim());
            break;
          }
          
          // 找到最靠近的句子结束符
          const nearest = endPositions.reduce((min, item) => 
            (item.pos < min.pos || min.pos === -1) ? item : min, { ender: '', pos: -1 });
          
          // 添加句子并移除句子
          const sentenceEnd = nearest.pos + nearest.ender.length;
          sentences.push(currentText.substring(0, sentenceEnd).trim());
          
          // 移除句子
          currentText = currentText.substring(sentenceEnd);
        }
        
        // 将句子分组为段落
        const paragraphs = [];
        const sentencesPerParagraph = 3; // 每段包含3句
        
        for (let i = 0; i < sentences.length; i += sentencesPerParagraph) {
          const paragraph = sentences.slice(i, i + sentencesPerParagraph).join(' ');
          if (paragraph.trim()) {
            paragraphs.push(paragraph);
          }
        }
        
        // 将段落转换为HTML
        return paragraphs
          .filter(p => p.trim() !== '')
          .map(p => `<p style="margin-bottom: 2rem;">${p.trim()}</p>`)
          .join('\n');
      }
    }
  };

  // 格式化后的内容
  const formattedContent = formatContent(content);

  // 添加自定义CSS样式
  React.useEffect(() => {
    // 创建一个样式标签
    const styleTag = document.createElement('style');
    styleTag.id = 'blog-post-content-styles';
    styleTag.innerHTML = `
      .blog-content p {
        margin-bottom: 2rem !important;
      }
    `;
    
    // 检查是否已经存在这个样式标签
    if (!document.getElementById('blog-post-content-styles')) {
      document.head.appendChild(styleTag);
    }
    
    // 清理函数
    return () => {
      const existingStyle = document.getElementById('blog-post-content-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return (
    <div className="blog-post-content">
      {/* 本地视频播放器 */}
      {localVideoUrl && (
        <div className="mb-8">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
            <video 
              controls
              className="absolute inset-0 w-full h-full"
              preload="metadata"
            >
              <source src={localVideoUrl} type="video/mp4" />
              您的浏览器不支持视频播放。
            </video>
          </div>
        </div>
      )}

      {/* 如果有视频，优先显示视频 */}
      {videoId && !localVideoUrl && (
        <div className="mb-8">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
            <iframe 
              src={`https://www.youtube.com/embed/${videoId}`}
              className="absolute inset-0 w-full h-full"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
      
      {/* B站视频嵌入 */}
      {isBilibili && bilibiliVideoId && !localVideoUrl && (
        <div className="mb-8">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
            <iframe 
              src={`https://player.bilibili.com/player.html?bvid=${bilibiliVideoId}&page=1&high_quality=1&danmaku=0`}
              className="absolute inset-0 w-full h-full"
              title="Bilibili video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* 轮播图 - 只在没有视频时显示 */}
      {showFeaturedImage && images.length > 0 && !videoId && !bilibiliVideoId && !localVideoUrl && (
        <BlogPostCarousel images={images} imageAlt={imageAlt} />
      )}

      {/* Post Content */}
      {content ? (
        <div 
          className="prose prose-lg max-w-none mb-8 blog-content"
          dangerouslySetInnerHTML={{ __html: formattedContent }}
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
