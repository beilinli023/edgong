
import apiClient, { extractData } from '../api/apiClient';
import { AboutContent } from "@/types/aboutTypes";

// 默认数据，在API请求失败时使用
const defaultAboutContent: AboutContent = {
  hero: {
    title_en: "About EdGoing",
    title_zh: "关于 EdGoing",
    subtitle_en: "Empowering global education and cultural exchange",
    subtitle_zh: "赋能全球教育和文化交流",
    background_image: "/lovable-uploads/f0b87c9a-14ef-4e95-ae65-07fe4018b1fc.png"
  },
  mission: {
    title_en: "Our Mission",
    title_zh: "我们的使命",
    content_en: "At EdGoing, we are dedicated to empowering the younger generation to explore the world, experience diverse cultures, and achieve personal growth through transformative educational programs and cultural exchanges.\n\nWe believe that by fostering understanding and appreciation for different cultures, we can contribute to a more connected and compassionate world.",
    content_zh: "在EdGoing，我们致力于赋能年轻一代探索世界，体验多元文化，并通过变革性的教育项目和文化交流实现个人成长。\n\n我们相信，通过培养对不同文化的理解和欣赏，我们可以为建立一个更紧密联系和更有同情心的世界做出贡献。",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070"
  },
  values: [
    {
      id: "1",
      icon: "Globe",
      title_en: "Cultural Respect",
      title_zh: "文化尊重",
      description_en: "Fostering understanding and appreciation",
      description_zh: "培养理解与欣赏"
    },
    {
      id: "2",
      icon: "BookOpen",
      title_en: "Educational Excellence",
      title_zh: "教育卓越",
      description_en: "Providing high-quality learning experiences",
      description_zh: "提供高质量的学习体验"
    },
    {
      id: "3",
      icon: "UserPlus",
      title_en: "Personal Growth",
      title_zh: "个人成长",
      description_en: "Encouraging individual development",
      description_zh: "鼓励个人发展"
    },
    {
      id: "4",
      icon: "Shield",
      title_en: "Safety and Support",
      title_zh: "安全与支持",
      description_en: "Ensuring well-being of our participants",
      description_zh: "确保参与者的健康福祉"
    },
    {
      id: "5",
      icon: "Globe2",
      title_en: "Global Citizenship",
      title_zh: "全球公民意识",
      description_en: "Nurturing responsible world citizens",
      description_zh: "培养负责任的世界公民"
    }
  ]
};

// 获取关于我们页面全部内容
export const getAboutPageContent = async (language = 'en'): Promise<AboutContent> => {
  try {
    const response = await apiClient.get('/about-page');
    const responseData = extractData<AboutContent>(response);
    
    // 确保返回数据是有效的且格式正确
    if (responseData && typeof responseData === 'object') {
      // 验证返回的数据结构是否符合预期
      if (responseData.hero && responseData.mission && Array.isArray(responseData.values)) {
        return responseData;
      } else {
        console.error('Incomplete data structure received from API:', responseData);
        return defaultAboutContent;
      }
    } else {
      console.error('Invalid data format received from API:', response);
      return defaultAboutContent;
    }
  } catch (error) {
    console.error('Error fetching about page content:', error);
    // 返回备用数据
    return defaultAboutContent;
  }
};
