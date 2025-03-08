
import apiClient from '../api/apiClient';
import { extractData } from '../api/responseHelpers';

// Mock hero slides data
const mockHeroSlides = [
  {
    id: "1",
    title_en: "Learn Beyond Walls",
    title_zh: "超越课堂边界",
    subtitle_en: "Ignite Curiosity, Inspire Growth, Immerse Yourself",
    subtitle_zh: "点燃好奇心、启发成长、沉浸式探索世界",
    image_url: "/images/hero-education.jpg",
    button_text_en: "Explore Programs",
    button_text_zh: "浏览项目",
    button_url: "/programs",
    order_index: 0
  },
  {
    id: "2",
    title_en: "STEM Programs ​",
    title_zh: "STEM 项目",
    subtitle_en: "Molding Tomorrow’s Thinkers and Makers.​",
    subtitle_zh: "培养未来的思想者与创造者。",
    image_url: "/images/hero-stem.jpg",
    button_text_en: "Learn More",
    button_text_zh: "了解更多",
    button_url: "/about",
    order_index: 1
  },
  {
    id: "3",
    title_en: "AAcademic Programs",
    title_zh: "学术项目",
    subtitle_en: "Shaping Global Minds, Inspiring Lifelong Learning.",
    subtitle_zh: "塑造全球化思维，激发终身学习热情。",
    image_url: "/images/hero-academic.jpg",
    button_text_en: "View Programs",
    button_text_zh: "查看项目",
    button_url: "/programs",
    order_index: 2
  },
  {
    id: "4",
    title_en: "Heritage Cultural Tour ",
    title_zh: "文化遗产之旅​",
    subtitle_en: "Step into the past, Uncover the stories ",
    subtitle_zh: "步入历史长河，探寻精彩故事。",
    image_url: "/images/hero-heritage.jpg",
    button_text_en: "View Programs",
    button_text_zh: "查看项目",
    button_url: "/programs",
    order_index: 2
  },
  {
    id: "5",
    title_en: "Global Citizenship Starts Here",
    title_zh: "全球公民，从这里启航",
    subtitle_en: "Explore the world, embrace cultures, and lead with purpose",
    subtitle_zh: "探索世界，拥抱多元文化，以使命引领前行。​",
    image_url: "/images/hero-global.jpg",
    button_text_en: "View Programs",
    button_text_zh: "查看项目",
    button_url: "/programs",
    order_index: 2
  }
];

// 获取首页轮播图
export const getHeroSlides = async (language = 'en') => {
  try {
    // Return mock data
    return mockHeroSlides.map(slide => ({
      id: slide.id,
      title: language === 'en' ? slide.title_en : slide.title_zh,
      subtitle: language === 'en' ? slide.subtitle_en : slide.subtitle_zh,
      imageUrl: slide.image_url,
      buttonText: language === 'en' ? slide.button_text_en : slide.button_text_zh,
      buttonUrl: slide.button_url,
      order: slide.order_index
    }));
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    return [];
  }
};

// Mock student stories data
const mockStudentStories = [
  {
    id: "1",
    image: "/placeholder.svg",
    name_en: "John Smith",
    name_zh: "约翰·史密斯",
    background_en: "High School Student, USA",
    background_zh: "美国高中学生",
    testimonial_en: "This program changed my perspective on global education.",
    testimonial_zh: "这个项目改变了我对全球教育的看法。",
    rating: 5,
    order_index: 0
  },
  {
    id: "2",
    image: "/placeholder.svg",
    name_en: "Emma Johnson",
    name_zh: "艾玛·约翰逊",
    background_en: "Middle School Student, Canada",
    background_zh: "加拿大初中学生",
    testimonial_en: "I learned so much about different cultures and made lasting friendships.",
    testimonial_zh: "我学到了很多关于不同文化的知识，并建立了持久的友谊。",
    rating: 4,
    order_index: 1
  }
];

// 获取学生故事
export const getStudentStories = async (language = 'en') => {
  try {
    return mockStudentStories.map(story => ({
      id: story.id,
      image: story.image,
      name: language === 'en' ? story.name_en : story.name_zh,
      background: language === 'en' ? story.background_en : story.background_zh,
      rating: story.rating,
      testimony: language === 'en' ? story.testimonial_en : story.testimonial_zh
    }));
  } catch (error) {
    console.error('Error fetching student stories:', error);
    return [];
  }
};

// Mock featured programs data
const mockFeaturedPrograms = [
  {
    id: "1",
    image: "/placeholder.svg",
    title_en: "Academic Excellence Program",
    title_zh: "学术卓越项目",
    description_en: "Enhance your academic skills with renowned educators",
    description_zh: "与知名教育者一起提升您的学术技能",
    location_en: "United States",
    location_zh: "美国",
    duration: "2 weeks"
  },
  {
    id: "2",
    image: "/placeholder.svg",
    title_en: "Cultural Exchange Program",
    title_zh: "文化交流项目",
    description_en: "Immerse yourself in diverse cultural experiences",
    description_zh: "沉浸在多元文化体验中",
    location_en: "Japan",
    location_zh: "日本",
    duration: "3 weeks"
  }
];

// 获取精选项目
export const getFeaturedPrograms = async (language = 'en') => {
  try {
    return mockFeaturedPrograms.map(program => ({
      id: program.id,
      image: program.image,
      title: language === 'en' ? program.title_en : program.title_zh,
      description: language === 'en' ? program.description_en : program.description_zh,
      location: language === 'en' ? program.location_en : program.location_zh, 
      duration: program.duration,
      country: program.location_en // 使用location_en作为country
    }));
  } catch (error) {
    console.error('Error fetching featured programs:', error);
    return [];
  }
};

// Mock featured programs intro data
const mockFeaturedProgramsIntro = {
  subtitle_en: "Featured Educational Programs",
  subtitle_zh: "精选教育项目",
  title_en: "Explore Our Featured Programs",
  title_zh: "探索我们的精选项目",
  link_text_en: "View All Programs",
  link_text_zh: "查看所有项目",
  link_url: "/programs"
};

// 获取精选项目简介
export const getFeaturedProgramsIntro = async (language = 'en') => {
  try {
    return {
      subtitle: language === 'en' ? mockFeaturedProgramsIntro.subtitle_en : mockFeaturedProgramsIntro.subtitle_zh,
      title: language === 'en' ? mockFeaturedProgramsIntro.title_en : mockFeaturedProgramsIntro.title_zh,
      linkText: language === 'en' ? mockFeaturedProgramsIntro.link_text_en : mockFeaturedProgramsIntro.link_text_zh,
      linkUrl: mockFeaturedProgramsIntro.link_url
    };
  } catch (error) {
    console.error('Error fetching featured programs intro:', error);
    return null;
  }
};

// 获取标语部分内容
export const getTaglineSection = async (language: 'en' | 'zh') => {
  try {
    const response = await apiClient.get('/tagline-section');
    const data = extractData<any>(response);
    
    return {
      title: "Explore. Learn. Grow.",
      description: language === 'en' 
        ? 'Your Lifetime Itinerary Awaits.'
        : '您的终身行程等待着您。'
    };
  } catch (error) {
    console.error('Error fetching tagline section:', error);
    return {
      title: "Explore. Learn. Grow.",
      description: language === 'en' 
        ? 'Your Lifetime Itinerary Awaits.'
        : '您的终身行程等待着您。'
    };
  }
};

export default {
  getHeroSlides,
  getStudentStories,
  getFeaturedPrograms,
  getFeaturedProgramsIntro,
  getTaglineSection
};
