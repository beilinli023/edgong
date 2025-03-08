
import { BlogPost, BlogCategory, BlogTag, BlogVideo, BlogHero } from '@/types/blogTypes';

// Mock Blog Posts
export const getMockBlogPosts = (): BlogPost[] => [
  {
    id: 1,
    title_en: "10 Tips for Studying Abroad",
    title_zh: "留学10个小贴士",
    slug: "10-tips-for-studying-abroad",
    content_en: "<p>Studying abroad can be one of the most exciting experiences of your academic career.</p>",
    content_zh: "<p>留学可能是你学术生涯中最激动人心的经历之一。</p>",
    excerpt_en: "Essential tips for your study abroad journey",
    excerpt_zh: "留学之旅的必备技巧",
    featured_image: "/placeholder.svg",
    status: 'published',
    published_at: "2023-06-15",
    author: "Emma Johnson",
    date: "2023-06-15",
    category: "Study Tips",
    tags: ["Study Abroad", "Travel", "Education"]
  },
  {
    id: 2,
    title_en: "Cultural Exchange Programs in Europe",
    title_zh: "欧洲文化交流项目",
    slug: "cultural-exchange-programs-europe",
    content_en: "<p>Discover the rich cultural experiences awaiting in European exchange programs.</p>",
    content_zh: "<p>探索欧洲交流项目中丰富的文化体验。</p>",
    excerpt_en: "Explore European cultural exchange opportunities",
    excerpt_zh: "探索欧洲文化交流机会",
    featured_image: "/placeholder.svg",
    status: 'published',
    published_at: "2023-05-20",
    author: "Michael Chen",
    date: "2023-05-20",
    category: "Cultural Exchange",
    tags: ["Europe", "Culture", "Exchange Program"]
  },
  {
    id: 3,
    title_en: "How to Prepare for University Applications",
    title_zh: "如何准备大学申请",
    slug: "prepare-university-applications",
    content_en: "<p>A comprehensive guide to preparing for university applications.</p>",
    content_zh: "<p>大学申请准备的综合指南。</p>",
    excerpt_en: "A guide to successful university applications",
    excerpt_zh: "成功大学申请指南",
    featured_image: "/placeholder.svg",
    status: 'draft',
    published_at: "2023-07-10",
    author: "Sarah Williams",
    date: "2023-07-10",
    category: "Academic",
    tags: ["University", "Applications", "Academic"]
  }
];

// Mock Blog Categories
export const getMockCategories = (): BlogCategory[] => [
  {
    id: 1,
    name_en: "Study Tips",
    name_zh: "学习技巧",
    slug: "study-tips",
    description_en: "Helpful tips for academic success",
    description_zh: "学术成功的有用技巧"
  },
  {
    id: 2,
    name_en: "Cultural Exchange",
    name_zh: "文化交流",
    slug: "cultural-exchange",
    description_en: "Experiences in cultural exchange programs",
    description_zh: "文化交流项目中的经历"
  },
  {
    id: 3,
    name_en: "Academic",
    name_zh: "学术",
    slug: "academic",
    description_en: "Academic-related content",
    description_zh: "学术相关内容"
  },
  {
    id: 4,
    name_en: "Travel Guides",
    name_zh: "旅行指南",
    slug: "travel-guides",
    description_en: "Guides for traveling abroad",
    description_zh: "海外旅行指南"
  }
];

// Mock Blog Tags
export const getMockTags = (): BlogTag[] => [
  {
    id: 1,
    name_en: "Study Abroad",
    name_zh: "海外留学",
    slug: "study-abroad",
    color: "#3b82f6"
  },
  {
    id: 2,
    name_en: "Travel",
    name_zh: "旅行",
    slug: "travel",
    color: "#10b981"
  },
  {
    id: 3,
    name_en: "Education",
    name_zh: "教育",
    slug: "education",
    color: "#6366f1"
  },
  {
    id: 4,
    name_en: "University",
    name_zh: "大学",
    slug: "university",
    color: "#f59e0b"
  },
  {
    id: 5,
    name_en: "Europe",
    name_zh: "欧洲",
    slug: "europe",
    color: "#ec4899"
  },
  {
    id: 6,
    name_en: "Culture",
    name_zh: "文化",
    slug: "culture",
    color: "#8b5cf6"
  }
];

// Mock Blog Videos
export const getMockVideos = (): BlogVideo[] => [
  {
    id: 1,
    title_en: "Study Abroad Experience in London",
    title_zh: "伦敦留学体验",
    youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "/placeholder.svg"
  },
  {
    id: 2,
    title_en: "How to Apply for Scholarships",
    title_zh: "如何申请奖学金",
    youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "/placeholder.svg"
  }
];

// Mock Blog Hero
export const getMockHero = (): BlogHero => ({
  title_en: "Our Blog",
  title_zh: "我们的博客",
  subtitle_en: "Insights and Resources for International Education",
  subtitle_zh: "国际教育的见解和资源",
  background_image: "/placeholder.svg"
});

// Helper function to get available images from mock
export const getMockImages = (): string[] => [
  "/lovable-uploads/016e6197-438b-4fe1-9650-ddabcb0eb8db.png",
  "/lovable-uploads/095982ef-a87c-40ba-a4fe-d4d95ab84dae.png",
  "/lovable-uploads/46fca3c1-4f18-4f48-935c-a97e8bb6eeb8.png",
  "/lovable-uploads/871521cd-c1f5-450c-9de9-af23b940745e.png",
  "/lovable-uploads/8938e5c0-ccf2-466d-b9f3-c7e3c0f599ff.png",
  "/lovable-uploads/baa8050a-2b39-4cf4-8add-603763b1c755.png",
  "/lovable-uploads/f0b87c9a-14ef-4e95-ae65-07fe4018b1fc.png",
  "/placeholder.svg"
];
