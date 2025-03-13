import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getFooterInfo } from "@/services/frontend/footerService";

export const useFrontendFooter = () => {
  const { currentLanguage } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);  // 默认为 false，避免初始加载状态
  const [contactInfo, setContactInfo] = useState({
    phone: "4001153558",
    email: "Hello@edgoing.com",
    address: {
      en: "18F, Tower B, China Overseas, 838 S. Huangpi Road, Huangpu, Shanghai",
      zh: "上海市黄埔区黄陂南路838号"
    },
    hours: ""
  });
  const [quickLinks, setQuickLinks] = useState<{ text_en: string; text_zh: string; url: string }[]>([
    { text_en: "Explore Programs", text_zh: "探索项目", url: "/programs" },
    { text_en: "Study Abroad", text_zh: "留学", url: "/study-abroad" },
    { text_en: "View Blog", text_zh: "浏览博客", url: "/blog" },
    { text_en: "Meet EdGoing", text_zh: "关于EdGoing", url: "/about" },
    { text_en: "FAQ", text_zh: "常见问题", url: "/learn-how" },
    { text_en: "Let's Plan", text_zh: "开始规划", url: "/start-planning" }
  ]);
  const [socialLinks, setSocialLinks] = useState([
    { name: "Facebook", url: "https://facebook.com/edgoing", icon: "facebook" },
    { name: "LinkedIn", url: "https://linkedin.com/company/edgoing", icon: "linkedin" },
    { name: "Instagram", url: "https://instagram.com/edgoing", icon: "instagram" }
  ]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFooterInfo = async () => {
      try {
        const { contactInfo: newContactInfo, quickLinks: newQuickLinks, socialLinks: newSocialLinks } = await getFooterInfo(currentLanguage);
        
        if (newContactInfo) {
          setContactInfo(newContactInfo);
        }
        
        if (newQuickLinks?.length > 0) {
          setQuickLinks(newQuickLinks);
        }
        
        if (newSocialLinks?.length > 0) {
          setSocialLinks(newSocialLinks);
        }
      } catch (error) {
        console.error("Error fetching footer info:", error);
        setError(error);
      }
    };

    fetchFooterInfo();
  }, [currentLanguage]);

  return {
    contactInfo,
    quickLinks,
    socialLinks,
    isLoading,
    error
  };
};
