
export interface ProgramTag {
  name_en: string;
  name_zh: string;
  id?: string; // Make id optional to handle different data sources
}

export interface Program {
  id: number | string;  // Allow both number and string IDs
  title_en: string;
  title_zh: string;
  program_id: string;
  image: string;
  location_en: string;
  location_zh: string;
  duration: string;
  country: string;
  tags: ProgramTag[];
  grade_levels: string[]; // Changed from optional to required
  description_en?: string;
  description_zh?: string;
  highlights_en?: string;
  highlights_zh?: string;
  itinerary_en?: string;
  itinerary_zh?: string;
  features_en?: string;
  features_zh?: string;
  information_en?: string;
  information_zh?: string;
  price?: string;
  gallery_images?: string[]; // 添加轮播图片数组
}

export interface ProgramFilterParams {
  category?: string[];
  region?: string[];
  country?: string[];
  gradeLevel?: string[];
  page?: number;
  limit?: number;
  search?: string;
}

export interface ProgramsResponse {
  data: Program[];
  total: number;
  page: number;
  totalPages: number;
}

export interface FiltersResponse {
  categories: { id: string; name_en: string; name_zh: string }[];
  regions: { id: string; name_en: string; name_zh: string }[];
  countries: { id: string; name_en: string; name_zh: string }[];
  gradeLevels: { id: string; name_en: string; name_zh: string }[];
}

// Updated interface that exactly matches the Supabase database schema
export interface ProgramData {
  id: string;
  program_id: string;
  title_en: string;
  title_zh: string;
  thumbnail: string;
  category_id: string;
  summary_en: string;
  summary_zh: string;
  duration_en?: string;
  duration_zh?: string;
  description_en: string;
  description_zh: string;
  learning_outcomes_en: string;
  learning_outcomes_zh: string;
  requirements_en: string;
  requirements_zh: string;
  instructor_en: string;
  instructor_zh: string;
  price_original: number | null;
  price_discounted?: number | null;
  gallery: string[];
  is_featured?: boolean;
  is_popular?: boolean;
  created_at?: string;
  updated_at?: string;
  program_tags?: ProgramTag[];
  order_index?: number;
}

export interface ProgramFormData {
  id: string;
  title: string; // Chinese title
  titleEn: string; // English title
  thumbnail: string;
  category: string;
  location: string; // Corresponds to summary in database
  duration: string;
  gradeLevel: string;
  tags: string[];
  description: string; // Chinese description
  descriptionEn: string; // English description
  highlights: string; // Chinese learning_outcomes
  highlightsEn: string; // English learning_outcomes
  itinerary: string; // Chinese requirements
  itineraryEn: string; // English requirements
  features: string; // Chinese instructor
  featuresEn: string; // English instructor
  information: string; // Additional information (Chinese)
  informationEn: string; // Additional information (English)
  price: string | number;
  images: string[];
}
