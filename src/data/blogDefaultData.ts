
import { BlogContent, BlogTag, BlogCategory, BlogPost, BlogVideo, BlogHero } from "@/types/blogTypes";

// 定义默认的博客标签
const defaultTags: BlogTag[] = [
  { id: "1", name_en: "Academic", name_zh: "学术", slug: "academic", color: "blue" },
  { id: "2", name_en: "Culture", name_zh: "文化", slug: "culture", color: "green" },
  { id: "3", name_en: "Travel", name_zh: "旅行", slug: "travel", color: "amber" },
  { id: "4", name_en: "Experience", name_zh: "体验", slug: "experience", color: "purple" }
];

// 定义默认的博客分类
const defaultCategories: BlogCategory[] = [
  { id: "1", name_en: "Study Abroad", name_zh: "海外学习", slug: "study-abroad", description_en: "All about studying in foreign countries", description_zh: "关于在国外学习的一切" },
  { id: "2", name_en: "Cultural Exchange", name_zh: "文化交流", slug: "cultural-exchange", description_en: "Cultural experiences and exchanges", description_zh: "文化体验与交流" },
  { id: "3", name_en: "Travel Tips", name_zh: "旅行贴士", slug: "travel-tips", description_en: "Tips for travelers", description_zh: "旅行者贴士" }
];

// 默认的博客文章
const defaultPosts: BlogPost[] = [
  {
    id: "1",
    title_en: "The Ultimate Guide to Studying in Europe",
    title_zh: "欧洲留学完全指南",
    slug: "ultimate-guide-studying-europe",
    content_en: "This comprehensive guide covers everything you need to know about studying in Europe, from application processes to daily life and cultural adaptation.",
    content_zh: "这份全面的指南涵盖了你需要了解的有关在欧洲学习的所有内容，从申请流程到日常生活和文化适应。",
    excerpt_en: "Discover everything you need to know about studying in European universities, from applications to cultural adaptation.",
    excerpt_zh: "了解在欧洲大学学习所需知道的一切，从申请到文化适应。",
    featured_image: "/lovable-uploads/8938e5c0-ccf2-466d-b9f3-c7e3c0f599ff.png",
    status: "published",
    published_at: "2023-08-15",
    author: "Sarah Johnson",
    date: "2023-08-15",
    category: "Study Abroad",
    primary_category: defaultCategories[0],
    tags: [defaultTags[0], defaultTags[1], defaultTags[2], defaultTags[3]]
  },
  {
    id: "2",
    title_en: "How to Prepare for Your First Cultural Exchange Program",
    title_zh: "如何准备你的第一个文化交流项目",
    slug: "prepare-first-cultural-exchange-program",
    content_en: "Learn how to prepare mentally, emotionally, and practically for your first cultural exchange experience, with tips from program alumni.",
    content_zh: "了解如何在心理上、情感上和实际上为您的第一次文化交流体验做准备，附有项目校友的建议。",
    excerpt_en: "Practical advice for making the most of your cultural exchange program, with insights from past participants.",
    excerpt_zh: "充分利用文化交流项目的实用建议，附有往届参与者的见解。",
    featured_image: "/lovable-uploads/095982ef-a87c-40ba-a4fe-d4d95ab84dae.png",
    status: "published",
    published_at: "2023-09-05",
    author: "Miguel Rodriguez",
    date: "2023-09-05",
    category: "Cultural Exchange",
    primary_category: defaultCategories[1],
    tags: [defaultTags[1], defaultTags[3]]
  },
  {
    id: "3",
    title_en: "10 Essential Packing Tips for Long-Term International Students",
    title_zh: "长期国际留学生的10个必备行李打包技巧",
    slug: "essential-packing-tips-international-students",
    content_en: "Avoid common packing mistakes with these essential tips for international students preparing for long-term stays abroad.",
    content_zh: "通过这些针对准备长期出国留学的国际学生的基本提示，避免常见的行李打包错误。",
    excerpt_en: "What to bring (and what to leave behind) when moving abroad for your studies.",
    excerpt_zh: "出国留学时应带什么（以及应留下什么）。",
    featured_image: "/lovable-uploads/f0b87c9a-14ef-4e95-ae65-07fe4018b1fc.png",
    status: "published",
    published_at: "2023-10-20",
    author: "Jessica Wong",
    date: "2023-10-20",
    category: "Travel Tips",
    primary_category: defaultCategories[2],
    tags: [defaultTags[0], defaultTags[2]]
  }
];

// 默认的博客视频
const defaultVideos: BlogVideo[] = [
  {
    id: "1",
    title_en: "A Day in the Life: International Student in Paris",
    title_zh: "一天的生活：巴黎国际学生",
    youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "/lovable-uploads/46fca3c1-4f18-4f48-935c-a97e8bb6eeb8.png",
    category: defaultCategories[0]
  },
  {
    id: "2",
    title_en: "How to Apply for Student Visas: Expert Tips",
    title_zh: "如何申请学生签证：专家提示",
    youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "/lovable-uploads/baa8050a-2b39-4cf4-8add-603763b1c755.png",
    category: defaultCategories[0]
  }
];

// 默认的博客英雄部分
const defaultHero: BlogHero = {
  title_en: "YouNiKco Education Blog",
  title_zh: "YouNiKco教育博客",
  subtitle_en: "Insights, Tips, and Stories from International Education",
  subtitle_zh: "国际教育的见解、提示和故事",
  background_image: "/lovable-uploads/871521cd-c1f5-450c-9de9-af23b940745e.png"
};

// 导出默认内容
export const defaultContent: BlogContent = {
  hero: defaultHero,
  posts: defaultPosts,
  videos: defaultVideos
};
