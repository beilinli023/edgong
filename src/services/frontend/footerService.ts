
import apiClient from '../api/apiClient';
import { extractData } from '../api/responseHelpers';

// 获取页脚信息
export const getFooterInfo = async (language = 'en') => {
  try {
    // 获取联系信息
    const contactResponse = await apiClient.get('/contact-info');
    const contactInfo = extractData<any>(contactResponse) || {};
    
    // 获取快速链接
    const linksResponse = await apiClient.get('/quick-links');
    const quickLinksData = extractData<any[]>(linksResponse);
    const quickLinks = Array.isArray(quickLinksData) 
      ? quickLinksData.map((link: any) => ({
          text: language === 'en' ? link.text_en : link.text_zh,
          url: link.url
        }))
      : getDefaultQuickLinks(language);
    
    // 获取社交媒体链接
    const socialResponse = await apiClient.get('/social-media');
    const socialLinks = extractData<any[]>(socialResponse) || [];
    
    return {
      contactInfo: {
        phone: contactInfo.phone || "400-400-400",
        email: contactInfo.email || "info@younicko.com",
        address: language === 'en' 
          ? "330 Congress Street Suite 5 Boston, MA 02210" 
          : "330 Congress Street Suite 5 波士顿, MA 02210",
        hours: language === 'en' ? contactInfo.hours_en : contactInfo.hours_zh,
      },
      quickLinks: quickLinks.length > 0 ? quickLinks : getDefaultQuickLinks(language),
      socialLinks
    };
  } catch (error) {
    console.error('Error fetching footer info:', error);
    return {
      contactInfo: {
        phone: "400-400-400",
        email: "info@younicko.com",
        address: language === 'en' 
          ? "330 Congress Street Suite 5 Boston, MA 02210" 
          : "330 Congress Street Suite 5 波士顿, MA 02210",
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
      text: language === 'en' ? 'View Blog' : '浏览博客',
      url: '/blog'
    },
    {
      text: language === 'en' ? 'Meet YouNiKco' : '认识YouNiKco',
      url: '/about'
    },
    {
      text: language === 'en' ? 'Learn How' : '学习指南',
      url: '/learn-how'
    },
    {
      text: language === 'en' ? 'Let\'s Plan' : '开始计划',
      url: '/start-planning'
    }
  ];
};

// 获取联系信息
export const getContactInfo = async (language = 'en') => {
  try {
    const response = await apiClient.get('/contact-info');
    const contactInfo = extractData<any>(response) || {};
    
    return {
      phone: contactInfo.phone || "400-400-400",
      email: contactInfo.email || "info@younicko.com",
      address: language === 'en' 
        ? "330 Congress Street Suite 5 Boston, MA 02210" 
        : "330 Congress Street Suite 5 波士顿, MA 02210",
      hours: language === 'en' ? contactInfo.hours_en : contactInfo.hours_zh,
    };
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return {
      phone: "400-400-400",
      email: "info@younicko.com",
      address: language === 'en' 
        ? "330 Congress Street Suite 5 Boston, MA 02210" 
        : "330 Congress Street Suite 5 波士顿, MA 02210",
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
