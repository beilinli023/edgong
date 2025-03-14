import React, { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import FrontendLayout from "@/components/frontend/FrontendLayout";
import { Link } from "react-router-dom";
import { getLocalBlogPosts, getLocalBlogVideos } from "@/services/blog/localBlogService";
import { BlogPost, BlogVideo } from "@/types/blogTypes";
import { Card } from "@/components/ui/card";
import FeaturedVideosSection from '@/components/frontend/blog/FeaturedVideosSection';

const BlogPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogVideos, setBlogVideos] = useState<BlogVideo[]>([]);
  const [error, setError] = useState<Error | null>(null);

  // 根据当前语言获取本地化文本
  const getLocalizedText = (en: string, zh: string) => {
    return currentLanguage === 'en' ? en : zh;
  };

  // 加载博客文章数据
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // 获取博客文章
        const { posts } = await getLocalBlogPosts();
        setBlogPosts(posts);
        
        // 获取博客视频
        const videos = await getLocalBlogVideos();
        setBlogVideos(videos);
        
        setError(null);
      } catch (err) {
        console.error("Failed to load blog posts:", err);
        setError(err instanceof Error ? err : new Error("Failed to load blog posts"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // 定义博客卡片的背景颜色
  const cardColors = [
    "bg-blue-600",
    "bg-emerald-600",
    "bg-amber-600",
    "bg-violet-600",
    "bg-rose-600",
  ];

  return (
    <FrontendLayout>
      <div className="min-h-screen">
        {/* 博客页面头部 */}
        <section 
          className="relative pt-20 pb-32 text-white" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/Edgoing/Blog_Page/Heading1.jpg")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="container-fluid w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center mt-24">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                {getLocalizedText('Our Blog', '我们的博客')}
              </h1>
              <p className="text-base max-w-2xl mx-auto opacity-90">
                {getLocalizedText(
                  "Welcome to our blog. This is where we share inspirational stories and insights from our educational journey around the world.",
                  "欢迎来到我们的博客，这里是学习与冒险的交汇之地！在这里，我们分享来自参与者的故事、实用建议和深刻见解，记录他们踏上改变人生的教育之旅的点滴。"
                )}
              </p>
            </div>
          </div>
        </section>

        {/* 博客文章列表部分 */}
        <div className="max-w-[90%] lg:max-w-[85%] mx-auto px-4 py-12">
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">
              {getLocalizedText('Latest Articles', '最新文章')}
            </h2>
            
            {/* 加载状态 */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array(5).fill(0).map((_, index) => (
                  <div key={index} className="flex flex-col h-full rounded-lg overflow-hidden shadow-md">
                    <div className="h-64 bg-gray-200 animate-pulse"></div>
                    <div className="p-4">
                      <div className="h-6 bg-gray-200 rounded animate-pulse mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 错误提示 */}
            {!isLoading && error && (
              <div className="text-center py-8">
                <p className="text-red-500">{getLocalizedText('Failed to load blog posts', '加载博客文章失败')}</p>
                <p className="text-gray-600 mt-2">{error.message}</p>
              </div>
            )}

            {/* 没有文章提示 */}
            {!isLoading && !error && blogPosts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">{getLocalizedText('No articles available', '暂无文章')}</p>
              </div>
            )}

            {/* 博客文章色块列表 */}
            {!isLoading && !error && blogPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.slice(0, 5).map((post, index) => (
                  <Link key={post.id} to={`/blog/${post.slug}`}>
                    <Card className={`h-full overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 ${cardColors[index % cardColors.length]} text-white`}>
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={typeof post.featured_image === 'string' ? post.featured_image : post.featured_image.url} 
                          alt={getLocalizedText(post.title_en, post.title_zh)}
                          className="w-full h-full object-cover opacity-70"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/60 to-transparent">
                          <h3 className="text-xl font-bold mb-2">
                            {getLocalizedText(post.title_en, post.title_zh)}
                          </h3>
                          <div className="flex items-center text-sm">
                            {(post.author_en || post.author_zh) && (
                              <span className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                {currentLanguage === 'en' ? post.author_en : post.author_zh}
                              </span>
                            )}
                            {post.date && (
                              <span className="flex items-center ml-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {new Date(post.date).toLocaleDateString(
                                  currentLanguage === 'en' ? 'en-US' : 'zh-CN',
                                  { year: 'numeric', month: 'short', day: 'numeric' }
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </section>
          
          {/* 特色视频部分 */}
          {!isLoading && !error && blogVideos.length > 0 && (
            <section className="mt-16 mb-10">
              <h2 className="text-2xl font-bold mb-8 text-gray-900">
                {getLocalizedText('Featured Videos', '精选视频')}
              </h2>
              <FeaturedVideosSection 
                videos={blogVideos} 
                isLoading={isLoading} 
                getLocalizedText={getLocalizedText} 
              />
            </section>
          )}
        </div>
      </div>
    </FrontendLayout>
  );
};

export default BlogPage;
