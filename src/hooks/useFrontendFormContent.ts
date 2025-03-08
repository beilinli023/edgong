
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getFrontendFormContent } from "@/services/frontend/formService";

export type FormOption = {
  id: string;
  label: string;
};

export type FormContent = {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
  };
  formSection: {
    title: string;
    responseTimeText: string;
    phoneContact: string;
  };
  options: {
    roles: FormOption[];
    gradeLevels: FormOption[];
    provinces: FormOption[];
    cities: FormOption[];
    programTypes: FormOption[];
    destinations: FormOption[];
    interests: FormOption[];
  };
  contactSection?: {
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
  };
};

const defaultFormContent: FormContent = {
  hero: {
    title: "",
    subtitle: "",
    backgroundImage: "/lovable-uploads/47bf9bbe-157b-4ebd-8119-331c7101bce3.png",
  },
  formSection: {
    title: "",
    responseTimeText: "",
    phoneContact: "",
  },
  options: {
    roles: [],
    gradeLevels: [],
    provinces: [],
    cities: [],
    programTypes: [],
    destinations: [],
    interests: [],
  }
};

export const useFrontendFormContent = () => {
  const { currentLanguage } = useLanguage();
  const [content, setContent] = useState<FormContent>(defaultFormContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.info("Fetching form page content...");
        const data = await getFrontendFormContent(currentLanguage);
        
        if (data) {
          console.info("Form content loaded successfully");
          // Map the API response to our internal FormContent format
          const mappedContent = mapApiResponseToFormContent(data);
          setContent(mappedContent);
        } else {
          console.warn("Invalid form content format, using defaults");
          // Populate with default data based on language
          setContent(getDefaultFormContent(currentLanguage));
        }
      } catch (err) {
        console.error("Error fetching form content:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
        setContent(getDefaultFormContent(currentLanguage));
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [currentLanguage]);

  // Helper function to map API response to our FormContent type
  const mapApiResponseToFormContent = (apiResponse: any): FormContent => {
    // Default structure to ensure all required fields exist
    const formContent: FormContent = {
      hero: {
        title: apiResponse.title || "",
        subtitle: apiResponse.subtitle || "",
        backgroundImage: apiResponse.backgroundImage || defaultFormContent.hero.backgroundImage,
      },
      formSection: {
        title: apiResponse.title || "",
        responseTimeText: apiResponse.responseTime || "",
        phoneContact: apiResponse.phoneContact || "",
      },
      options: {
        roles: apiResponse.options?.roles || [],
        gradeLevels: apiResponse.options?.gradeLevels || [],
        provinces: apiResponse.options?.provinces || [],
        cities: apiResponse.options?.cities || [],
        programTypes: apiResponse.options?.programTypes || [],
        destinations: apiResponse.options?.destinations || [],
        interests: apiResponse.options?.interests || [],
      },
    };

    // Add optional contactSection if available
    if (apiResponse.contactSection) {
      formContent.contactSection = {
        title: apiResponse.contactSection.title || "",
        description: apiResponse.contactSection.description || "",
        buttonText: apiResponse.contactSection.buttonText || "",
        buttonUrl: apiResponse.contactSection.buttonUrl || "",
      };
    }

    return formContent;
  };

  const getDefaultFormContent = (lang: string): FormContent => {
    return {
      hero: {
        title: lang === 'en' ? "Start Your Planning" : "开始计划",
        subtitle: lang === 'en' 
          ? "Ready to begin your educational journey? Let us help you create the perfect study abroad experience." 
          : "准备开始您的教育之旅？让我们帮助您创造完美的海外学习体验。",
        backgroundImage: "/lovable-uploads/47bf9bbe-157b-4ebd-8119-331c7101bce3.png",
      },
      formSection: {
        title: lang === 'en' ? "Need help with assistance, or just have a question for us?" : "需要帮助或有任何问题？",
        responseTimeText: lang === 'en' ? "Fill out our form and we'll respond within 2 business days." : "填写我们的表单，我们将在2个工作日内回复。",
        phoneContact: lang === 'en' ? "Or Call Us @ 400-400-400" : "或致电 400-400-400",
      },
      options: {
        roles: [
          { id: "student", label: lang === 'en' ? "Student" : "学生" },
          { id: "parent", label: lang === 'en' ? "Parent" : "家长" },
          { id: "teacher", label: lang === 'en' ? "Teacher" : "教师" },
          { id: "other", label: lang === 'en' ? "Other" : "其他" }
        ],
        gradeLevels: [
          { id: "elementary", label: lang === 'en' ? "Elementary School (Grades 1-5)" : "小学 (1-5年级)" },
          { id: "middleSchool", label: lang === 'en' ? "Middle School (Grades 6-8)" : "初中 (6-8年级)" },
          { id: "highSchool", label: lang === 'en' ? "High School (Grades 9-12)" : "高中 (9-12年级)" },
          { id: "undergraduate", label: lang === 'en' ? "Undergraduate" : "本科" },
          { id: "graduate", label: lang === 'en' ? "Graduate" : "研究生" },
          { id: "other", label: lang === 'en' ? "Other" : "其他" }
        ],
        provinces: [
          { id: "beijing", label: lang === 'en' ? "Beijing" : "北京" },
          { id: "shanghai", label: lang === 'en' ? "Shanghai" : "上海" },
          { id: "guangdong", label: lang === 'en' ? "Guangdong" : "广东" },
          { id: "other", label: lang === 'en' ? "Other" : "其他" }
        ],
        cities: [
          { id: "beijing", label: lang === 'en' ? "Beijing" : "北京" },
          { id: "shanghai", label: lang === 'en' ? "Shanghai" : "上海" },
          { id: "guangzhou", label: lang === 'en' ? "Guangzhou" : "广州" },
          { id: "shenzhen", label: lang === 'en' ? "Shenzhen" : "深圳" },
          { id: "other", label: lang === 'en' ? "Other" : "其他" }
        ],
        programTypes: [
          { id: "shortTerm", label: lang === 'en' ? "Short-term Study" : "短期学习" },
          { id: "semester", label: lang === 'en' ? "Semester Exchange" : "学期交换" },
          { id: "degree", label: lang === 'en' ? "Degree Program" : "学位项目" },
          { id: "summerCamp", label: lang === 'en' ? "Summer Camp" : "夏令营" },
          { id: "winterCamp", label: lang === 'en' ? "Winter Camp" : "冬令营" },
          { id: "language", label: lang === 'en' ? "Language Course" : "语言课程" },
          { id: "other", label: lang === 'en' ? "Other" : "其他" }
        ],
        destinations: [
          { id: "usa", label: "USA" },
          { id: "uk", label: "UK" },
          { id: "canada", label: lang === 'en' ? "Canada" : "加拿大" },
          { id: "australia", label: lang === 'en' ? "Australia" : "澳大利亚" },
          { id: "newZealand", label: lang === 'en' ? "New Zealand" : "新西兰" },
          { id: "japan", label: lang === 'en' ? "Japan" : "日本" },
          { id: "singapore", label: lang === 'en' ? "Singapore" : "新加坡" },
          { id: "other", label: lang === 'en' ? "Other" : "其他" }
        ],
        interests: [
          { id: "history", label: lang === 'en' ? "History & Civics" : "历史与公民" },
          { id: "stem", label: lang === 'en' ? "STEM/Science" : "STEM/科学" },
          { id: "culture", label: lang === 'en' ? "Cultural Exploration" : "文化探索" },
          { id: "religion", label: lang === 'en' ? "Religion & Faith" : "宗教与信仰" },
          { id: "arts", label: lang === 'en' ? "Performing Arts" : "表演艺术" },
          { id: "language", label: lang === 'en' ? "Language Intensive" : "语言强化" },
          { id: "community", label: lang === 'en' ? "Community Engagement" : "社区参与" },
          { id: "sports", label: lang === 'en' ? "Sports" : "体育" },
          { id: "specialty", label: lang === 'en' ? "Specialty" : "专业" },
          { id: "academic", label: lang === 'en' ? "Academic" : "学术" },
          { id: "others", label: lang === 'en' ? "Others" : "其他" }
        ]
      }
    };
  };

  return {
    content,
    loading,
    error,
    currentLanguage
  };
};
