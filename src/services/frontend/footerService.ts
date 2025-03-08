
import apiClient from '../api/apiClient';
import { extractData } from '../api/responseHelpers';

// 定义接口
interface ContactInfo {
  phone?: string;
  email?: string;
  address?: string;
  hours_en?: string;
  hours_zh?: string;
}

interface QuickLink {
  text_en: string;
  text_zh: string;
  url: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

interface FooterData {
  contactInfo: {
    phone: string;
    email: string;
    address: string;
    hours: string;
  };
  quickLinks: Array<{
    text: string;
    url: string;
  }>;
  socialLinks: SocialLink[];
}

// 获取页脚信息
export const getFooterInfo = async (language = 'en'): Promise<FooterData> => {
  try {
    // 获取联系信息
    const contactResponse = await apiClient.get('/contact-info');
    const contactInfo = extractData<ContactInfo>(contactResponse) || {};
    
    // 获取快速链接
    const linksResponse = await apiClient.get('/quick-links');
    const quickLinksData = extractData<QuickLink[]>(linksResponse);
    const quickLinks = Array.isArray(quickLinksData) 
      ? quickLinksData.map((link: QuickLink) => ({
          text: language === 'en' ? link.text_en : link.text_zh,
          url: link.url
        }))
      : getDefaultQuickLinks(language);
    
    // 获取社交媒体链接
    const socialResponse = await apiClient.get('/social-media');
    const socialLinks = extractData<SocialLink[]>(socialResponse) || [];
    
    return {
      contactInfo: {
        phone: contactInfo.phone || "4001153558",
        email: contactInfo.email || "Hello@edgoing.com",
        address: language === 'en' 
          ? "18F, Tower B, China Overseas, 838 S. Huangpi Road, Huangpu, Shanghai" 
          : "上海市黄埔区黄陂南路838号中海国际B座18楼",
        hours: language === 'en' ? contactInfo.hours_en : contactInfo.hours_zh,
      },
      quickLinks: quickLinks.length > 0 ? quickLinks : getDefaultQuickLinks(language),
      socialLinks
    };
  } catch (error) {
    console.error('Error fetching footer info:', error);
    return {
      contactInfo: {
        phone: "4001153558",
        email: "Hello@edgoing.com",
        address: language === 'en' 
          ? "18F, Tower B, China Overseas, 838 S. Huangpi Road, Huangpu, Shanghai" 
          : "上海市黄埔区黄陂南路838号中海国际B座18楼",
        hours: ""
      },
      quickLinks: getDefaultQuickLinks(language),
      socialLinks: []
    };
  }
};

// 默认快速链接
const getDefaultQuickLinks = (language = 'en') => {
  return [
    {
      text: language === 'en' ? 'Explore Programs' : '探索项目',
      url: '/programs'
    },
    {
      text: language === 'en' ? 'Study Abroad' : '留学',
      url: '/study-abroad'
    },
    {
      text: language === 'en' ? 'View Blog' : '浏览博客',
      url: '/blog'
    },
    {
      text: language === 'en' ? 'About EdGoing' : '关于EdGoing',
      url: '/about'
    },
    {
      text: language === 'en' ? 'FAQ' : 'FAQ',
      url: '/learn-how'
    },
    {
      text: language === 'en' ? 'Start Project' : '开始项目',
      url: '/start-planning'
    }
  ];
};

// 获取联系信息
export const getContactInfo = async (language = 'en'): Promise<{
  phone: string;
  email: string;
  address: string;
  hours: string;
}> => {
  try {
    const response = await apiClient.get('/contact-info');
    const contactInfo = extractData<ContactInfo>(response) || {};
    
    return {
      phone: contactInfo.phone || "4001153558",
      email: contactInfo.email || "Hello@edgoing.com",
      address: language === 'en' 
        ? "18F, Tower B, China Overseas, 838 S. Huangpi Road, Huangpu, Shanghai" 
        : "上海市黄埔区黄陂南路838号中海国际B座18楼",
      hours: language === 'en' ? contactInfo.hours_en : contactInfo.hours_zh,
    };
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return {
      phone: "4001153558",
      email: "Hello@edgoing.com",
      address: language === 'en' 
        ? "18F, Tower B, China Overseas, 838 S. Huangpi Road, Huangpu, Shanghai" 
        : "上海市黄埔区黄陂南路838号中海国际B座18楼",
      hours: ""
    };
  }
};

// 获取快速链接
export const getQuickLinks = async (language = 'en') => {
  try {
    const response = await apiClient.get('/quick-links');
    const quickLinksData = extractData<any[]>(response);
    const quickLinks = Array.isArray(quickLinksData) 
      ? quickLinksData.map((link: any) => ({
          text: language === 'en' ? link.text_en : link.text_zh,
          url: link.url
        }))
      : [];
    
    return quickLinks.length > 0 ? quickLinks : getDefaultQuickLinks(language);
  } catch (error) {
    console.error('Error fetching quick links:', error);
    return getDefaultQuickLinks(language);
  }
};

// 获取社交媒体链接
export const getSocialMedia = async () => {
  try {
    const response = await apiClient.get('/social-media');
    const data = extractData<any[]>(response);
    
    // If the API doesn't return data, use fallback with all 5 platforms
    if (!data || !Array.isArray(data) || data.length === 0) {
      return [
        { id: 1, platform: 'facebook', url: 'https://facebook.com', icon: 'facebook', order: 1 },
        { id: 2, platform: 'linkedin', url: 'https://linkedin.com', icon: 'linkedin', order: 2 },
        { id: 3, platform: 'instagram', url: 'https://instagram.com', icon: 'instagram', order: 3 },
        { id: 4, platform: 'youtube', url: 'https://youtube.com', icon: 'youtube', order: 4 },
        { id: 5, platform: 'wechat', url: '#', icon: 'wechat', order: 5 }
      ];
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching social media links:', error);
    // Fallback with all 5 platforms
    return [
      { id: 1, platform: 'facebook', url: 'https://facebook.com', icon: 'facebook', order: 1 },
      { id: 2, platform: 'linkedin', url: 'https://linkedin.com', icon: 'linkedin', order: 2 },
      { id: 3, platform: 'instagram', url: 'https://instagram.com', icon: 'instagram', order: 3 },
      { id: 4, platform: 'youtube', url: 'https://youtube.com', icon: 'youtube', order: 4 },
      { id: 5, platform: 'wechat', url: '#', icon: 'wechat', order: 5 }
    ];
  }
};

export default {
  getFooterInfo,
  getContactInfo,
  getQuickLinks,
  getSocialMedia
};
