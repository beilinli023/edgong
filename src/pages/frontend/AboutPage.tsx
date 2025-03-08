import React from "react";
import { 
  Globe, 
  BookOpen, 
  UserPlus, 
  Shield, 
  CheckCircle, 
  User,
  Globe2
} from "lucide-react";
import FrontendLayout from "../../components/frontend/FrontendLayout";
import { useFrontendAbout } from "@/hooks/useFrontendAbout";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

// 创建一个图标映射以根据名称渲染正确的图标
const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="h-8 w-8 text-blue-500" />,
  Globe2: <Globe2 className="h-8 w-8 text-blue-500" />,
  BookOpen: <BookOpen className="h-8 w-8 text-blue-500" />,
  UserPlus: <UserPlus className="h-8 w-8 text-blue-500" />,
  Shield: <Shield className="h-8 w-8 text-blue-500" />,
  CheckCircle: <CheckCircle className="h-8 w-8 text-blue-500" />,
  User: <User className="h-8 w-8 text-blue-500" />
};

const AboutPage: React.FC = () => {
  const { content, isLoading, error, getLocalizedText } = useFrontendAbout();
  
  // 处理错误
  React.useEffect(() => {
    if (error) {
      console.error("Error loading about page content:", error);
      toast.error(getLocalizedText(
        'Error loading about page content, showing fallback data',
        '加载"关于我们"页面内容时出错，显示备用内容'
      ));
    }
  }, [error, getLocalizedText]);

  // 确保内容始终可用，即使content为undefined
  const safeContent = content || {
    hero: {
      title_en: "About YOUNIKCO",
      title_zh: "关于 YOUNIKCO",
      subtitle_en: "Empowering global education and cultural exchange",
      subtitle_zh: "赋能全球教育和文化交流",
      background_image: "/lovable-uploads/f0b87c9a-14ef-4e95-ae65-07fe4018b1fc.png"
    },
    mission: {
      title_en: "Our Mission", 
      title_zh: "我们的使命",
      content_en: "At YOUNIKCO, we are dedicated to empowering the younger generation.",
      content_zh: "在YOUNIKCO，我们致力于赋能年轻一代。",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070"
    },
    values: []
  };

  // 计算核心价值观的布局
  const valuesCount = safeContent?.values?.length || 0;
  const topRowValues = valuesCount > 3 ? 3 : valuesCount;
  const bottomRowValues = valuesCount - topRowValues;

  return (
    <FrontendLayout>
      {/* Hero Section */}
      <div className="relative pt-32 pb-24 bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
        <div className="container-fluid w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            {getLocalizedText(safeContent?.hero?.title_en || '', safeContent?.hero?.title_zh || '')}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 text-center">
            {getLocalizedText(safeContent?.hero?.subtitle_en || '', safeContent?.hero?.subtitle_zh || '')}
          </p>
        </div>
      </div>

      {/* Mission Statement Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-10 w-3/5 mb-4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold mb-6">
                    {getLocalizedText(safeContent?.mission?.title_en || '', safeContent?.mission?.title_zh || '')}
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    {safeContent?.mission?.content_en && safeContent?.mission?.content_zh && (
                      <div className="text-gray-700">
                        {getLocalizedText(safeContent.mission.content_en, safeContent.mission.content_zh)
                          .split('\n\n')
                          .map((paragraph, i) => (
                            <p key={i} className="mb-4">{paragraph}</p>
                          ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="md:w-1/2">
              {isLoading ? (
                <Skeleton className="w-full h-72 rounded-lg" />
              ) : (
                safeContent?.mission?.image && (
                  <img 
                    src={safeContent.mission.image} 
                    alt={getLocalizedText("Our Mission", "我们的使命")} 
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - 重新设计布局 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {getLocalizedText("Our Core Values", "我们的核心价值观")}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {getLocalizedText(
                "The principles that guide everything we do",
                "指导我们一切行动的原则"
              )}
            </p>
          </div>

          {isLoading ? (
            // 加载时显示骨架屏
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Array(5).fill(0).map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex flex-col items-center text-center">
                    <Skeleton className="h-12 w-12 rounded-full mb-4" />
                    <Skeleton className="h-6 w-4/5 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* 上面3个项目 */}
              {topRowValues > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  {safeContent.values.slice(0, topRowValues).map((value) => (
                    <div key={value.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                      <div className="mb-4">
                        {iconMap[value.icon] || <div className="h-8 w-8 bg-blue-500 rounded-full"></div>}
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        {getLocalizedText(value.title_en, value.title_zh)}
                      </h3>
                      <p className="text-gray-600">
                        {getLocalizedText(value.description_en, value.description_zh)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              
              {/* 下面2个项目居中 */}
              {bottomRowValues > 0 && (
                <div className="flex justify-center gap-8">
                  {safeContent.values.slice(topRowValues).map((value) => (
                    <div key={value.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center w-full md:w-1/3">
                      <div className="mb-4">
                        {iconMap[value.icon] || <div className="h-8 w-8 bg-blue-500 rounded-full"></div>}
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        {getLocalizedText(value.title_en, value.title_zh)}
                      </h3>
                      <p className="text-gray-600">
                        {getLocalizedText(value.description_en, value.description_zh)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </FrontendLayout>
  );
};

export default AboutPage;
