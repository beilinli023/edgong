
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/context/LanguageContext";

interface BlogHeroProps {
  isLoading: boolean;
  backgroundImage: string;
}

const BlogHero: React.FC<BlogHeroProps> = ({
  isLoading,
  backgroundImage
}) => {
  const { currentLanguage } = useLanguage();
  return (
    <section 
      className="relative pt-32 pb-24 text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="container-fluid w-full max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {isLoading ? (
            <>
              <Skeleton className="h-12 w-3/4 mx-auto mb-4 bg-gray-300/50" />
              <Skeleton className="h-6 w-full mx-auto bg-gray-300/50" />
              <Skeleton className="h-6 w-2/3 mx-auto mt-2 bg-gray-300/50" />
            </>
          ) : (
            <>
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                {currentLanguage === 'en' ? 'Our Blog' : '我们的博客'}
              </h1>
              <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
                {currentLanguage === "en" 
                  ? "Welcome to our blog, where learning meets adventure! Here, we share inspiring stories, tips, and insights from participants who've embarked on life-changing educational journeys around the world."
                  : "欢迎来到我们的博客，这里是学习与冒险的交汇之地！在这里，我们分享来自参与者的故事、实用建议和深刻见解，记录他们踏上改变人生的教育之旅的点滴。"
                }
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
