// Blog related type definitions

export interface BlogTag {
  id: string | number;
  name_en: string;
  name_zh: string;
  slug: string;
  color?: string;
}

export interface BlogCategory {
  id: string | number;
  name_en: string;
  name_zh: string;
  slug: string;
  description_en?: string;
  description_zh?: string;
}

export interface ImageData {
  id: number | string;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  created_at?: string;
}

export interface BlogPost {
  id: string | number;
  title_en: string;
  title_zh: string;
  slug: string;
  content_en: string;
  content_zh: string;
  excerpt_en: string;
  excerpt_zh: string;
  featured_image: string | ImageData;
  carousel_images?: string[];
  status: 'draft' | 'published';
  published_at: string;
  author: string;
  author_en?: string;
  author_zh?: string;
  date: string; 
  grade_en?: string;
  grade_zh?: string;
  project_type_en?: string;
  project_type_zh?: string;
  category: string | number | BlogCategory;
  primary_category?: BlogCategory;
  tags: (BlogTag | string)[];
  title?: string;
  content?: string;
  excerpt?: string;
}

export interface NormalizedBlogPost extends Omit<BlogPost, 'category' | 'tags'> {
  category: string | number;
  tags: string[];
}

export interface BlogVideo {
  id: string | number;
  title_en: string;
  title_zh: string;
  youtube_url: string;
  thumbnail: string | ImageData;
  category?: BlogCategory;
  file_url?: string; // 本地视频文件路径
}

export interface BlogHero {
  title_en: string;
  title_zh: string;
  subtitle_en: string;
  subtitle_zh: string;
  background_image: string;
}

export interface BlogContent {
  hero?: BlogHero;
  posts?: BlogPost[];
  videos?: BlogVideo[];
}

// 博客文章表单数据结构
export interface BlogPostFormData {
  title_en: string;
  title_zh: string;
  slug: string;
  content_en: string;
  content_zh: string;
  excerpt_en: string;
  excerpt_zh: string;
  featured_image: string;
  status: 'draft' | 'published';
  published_at: string | null;
  author: string;
  category: string;
  tags: string[];
  summary_en: string;
  summary_zh: string;
  date: string;
  category_id: string;
  seo_title_en?: string;
  seo_title_zh?: string;
  seo_description_en?: string;
  seo_description_zh?: string;
  [key: string]: string | string[] | null | undefined; // 使用更具体的类型来替代any
}

export interface BlogPostData {
  post: BlogPost;
  categories: BlogCategory[];
  tags: BlogTag[];
  isLoading: boolean;
  isError: boolean;
}

export interface TaglineData {
  title: string;
  description: string;
}

export interface TaglineContent {
  content: {
    title: string;
    description: string;
  };
  isLoading: boolean;
  error: Error | null;
}
