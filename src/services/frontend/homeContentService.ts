import apiClient from '../api/apiClient';
import { extractData } from '../api/responseHelpers';
import { Program } from '@/types/programTypes';

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
    title_en: "STEM Programs",
    title_zh: "STEM 项目",
    subtitle_en: "Molding Tomorrow's Thinkers and Makers.",
    subtitle_zh: "培养未来的思想者与创造者。",
    image_url: "/images/hero-stem.jpg",
    button_text_en: "Learn More",
    button_text_zh: "了解更多",
    button_url: "/about",
    order_index: 1
  },
  {
    id: "3",
    title_en: "Academic Programs",
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
    title_en: "Heritage Cultural Tour",
    title_zh: "文化遗产之旅",
    subtitle_en: "Step into the past, Uncover the stories",
    subtitle_zh: "步入历史长河，探寻精彩故事。",
    image_url: "/images/hero-heritage.jpg",
    button_text_en: "View Programs",
    button_text_zh: "查看项目",
    button_url: "/programs",
    order_index: 3
  },
  {
    id: "5",
    title_en: "Global Citizenship Starts Here",
    title_zh: "全球公民，从这里启航",
    subtitle_en: "Explore the world, embrace cultures, and lead with purpose",
    subtitle_zh: "探索世界，拥抱多元文化，以使命引领前行。",
    image_url: "/images/hero-global.jpg",
    button_text_en: "View Programs",
    button_text_zh: "查看项目",
    button_url: "/programs",
    order_index: 4
  }
];

// 首页轮播图数据接口
interface CarouselSlide {
  id: string;
  title_en: string;
  title_zh: string;
  subtitle_en: string;
  subtitle_zh: string;
  image_url: string;
  button_text_en: string;
  button_text_zh: string;
  button_url: string;
  order_index: number;
}

interface CarouselApiResponse {
  slides: CarouselSlide[];
}

// 转换轮播图数据为当前语言
const transformSlideToLanguage = (slide: CarouselSlide, language: 'en' | 'zh') => ({
  id: slide.id,
  title: language === 'en' ? slide.title_en : slide.title_zh,
  subtitle: language === 'en' ? slide.subtitle_en : slide.subtitle_zh,
  imageUrl: slide.image_url,
  buttonText: language === 'en' ? slide.button_text_en : slide.button_text_zh,
  buttonUrl: slide.button_url,
  order: slide.order_index
});

// 获取首页轮播图
export const getHeroSlides = async (language: 'en' | 'zh' = 'en') => {
  try {
    // 从API获取数据，而不是直接使用硬编码的mockHeroSlides
    const response = await apiClient.get('/api/home/carousel');
    const data = extractData(response);
    
    let slides: CarouselSlide[] = mockHeroSlides;  // 默认使用 mock 数据
    
    // 如果API返回了有效数据，则使用API数据
    if (data && typeof data === 'object' && 'slides' in data && 
        Array.isArray((data as CarouselApiResponse).slides)) {
      slides = (data as CarouselApiResponse).slides;
    }
    
    // 无论是API数据还是mock数据，都进行相同的语言转换
    return slides.map(slide => transformSlideToLanguage(slide, language));
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    // 出错时使用 mock 数据作为后备
    return mockHeroSlides.map(slide => transformSlideToLanguage(slide, language));
  }
};

// Mock student stories data
const mockStudentStories = [
  {
    id: "1",
    image: "/Edgoing/Home_Page/Testimonial1StevenStanley.jpg",
    name_en: "Steven Stanley",
    name_zh: "史蒂文·斯坦利",
    background_en: "High School Student, 17 years old",
    background_zh: "高中生，17 岁",
    program_en: "Cultural Exchange in Kyoto",
    program_zh: "京都的文化交流",
    testimonial_en: "I had an enjoyable time exploring the streets of Kyoto and immersing myself in its rich culture, especially experiencing the powerful beats of Japanese drums and participating in vibrant summer festivals. The tea ceremony workshop, calligraphy classes, and homestay experience with a local family truly deepened my understanding of traditional Japanese values and modern lifestyle.",
    testimonial_zh: "我在京都的街头漫步，沉浸在其丰富的文化中，度过了非常愉快的时光，尤其是体验了日本太鼓的强劲节奏，并参加了充满活力的夏日祭典。茶道工作坊、书法课程以及与当地家庭的寄宿体验，真正加深了我对日本传统价值观与现代生活方式的理解。",
    rating: 5,
    order_index: 0
  },
  {
    id: "2",
    image: "/Edgoing/Home_Page/Testimonial2KhengLeng.jpg",
    name_en: "Kheng Lee",
    name_zh: "李康",
    background_en: "Teacher",
    background_zh: "教师",
    program_en: "STEM Program in Singapore",
    program_zh: "新加坡的STEM项目",
    testimonial_en: "My students couldn't stop sharing their exciting experiences after the trip to Singapore. I, too, thoroughly enjoyed the excursion to Gardens by the Bay, where we marveled at a stunning variety of flora and fauna in the beautiful indoor gardens, creating unforgettable memories.",
    testimonial_zh: "这是我的学生们在新加坡之旅后无法停止分享他们的激动经历。我也非常享受这次滨海湾花园的游览，我们在美丽的室内花园中惊叹于各种令人惊叹的动植物，创造了难忘的回忆。",
    rating: 5,
    order_index: 1
  },
  {
    id: "3",
    image: "/Edgoing/Home_Page/Testimonial3Liwei.jpg",
    name_en: "Li Wei",
    name_zh: "李维",
    background_en: "High School Student, 17 years old",
    background_zh: "高中生，17岁",
    program_en: "Wealth Management Program by Edgoing at SMU",
    program_zh: "Edgoing与新加坡管理大学（SMU）合作的财富管理项目",
    testimonial_en: "I’m Li Wei, 17, from Shanghai. Edgoing’s SMU program ignited my finance passion. Lectures, portfolio tasks, and mentorship honed my skills. The certificate boosted my university applications—I’m set on finance degrees!",
    testimonial_zh: "我是李伟，17岁，来自上海。Edgoing的新加坡管理大学项目点燃了我的金融热情。讲座和投资组合任务提升了我的技能，导师指导让我受益匪浅。结业证书增强了我的大学申请信心，我决心攻读金融学位！",
    rating: 5,
    order_index: 2
  },
  {
    id: "4",
    image: "/Edgoing/Home_Page/Testimonial4Yoyo.jpg",
    name_en: "Yoyo",
    name_zh: "Bruce",
    background_en: "Middle-school student, 13 years old",
    background_zh: "初中生，12岁",
    program_en: "STEM Program in Singapore",
    program_zh: "英国国际学校暑期项目",
    testimonial_en: "This trip transformed my worldview! Hands-on learning, cultural experiences, and incredible friends made it unforgettable. Supportive staff ensured safety. I’m excited for the next program and staying connected with newfound friends.",
    testimonial_zh: "这次旅行改变了我的世界观！实践学习、文化体验和结识的朋友让它难以忘怀。工作人员的支持让我全程感到安全。我期待下一个项目，并希望与新朋友们保持联系。",
    rating: 5,
    order_index: 3
  },
  {
    id: "5",
    image: "/Edgoing/Home_Page/Testimonial5MrsZhang.jpg",
    name_en: "Mrs. Zhang",
    name_zh: "张女士",
    background_en: "Parent of a 15-year-old",
    background_zh: "10岁学生家长",
    program_en: "UK International School Summer Program",
    program_zh: "新加坡 STEM 项目",
    testimonial_en: "I was initially concerned about safety, but the team ensured constant updates, and my child was well cared for. She returned more confident, independent, and globally aware—highly recommend this transformative experience! ",
    testimonial_zh: "起初我担心安全问题，但团队及时沟通，孩子得到了很好的照顾。她回来后更加自信、独立，视野也更开阔了——强烈推荐这次改变人生的经历！",
    rating: 5,
    order_index: 4
  },
  {
    id: "6",
    image: "/Edgoing/Home_Page/Testimonial6Parent.jpg",
    name_en: "Parent of Li Wei",
    name_zh: "陈女士",
    background_en: "Parent",
    background_zh: "家长",
    program_en: "Edgoing's Wealth Management Program at SMU",
    program_zh: "Edgoing在新加坡管理大学举办的财富管理项目",
    testimonial_en: "Edgoing’s SMU program wowed with expert lectures, fintech startup visits, and cultural trips. Li Wei gained skills, clarity, and ambition in finance, blending academics, industry, and culture into an inspiring educational adventure.",
    testimonial_zh: "Edgoing的新加坡管理大学项目令人惊叹，结合专家讲座、金融科技公司参访和文化之旅。李伟提升了技能，明确了方向，激发了金融抱负，将学术、行业与文化融合成一场精彩的教育之旅。",
    rating: 5,
    order_index: 5
  }
];

// 学生故事数据接口
interface StudentStory {
  id: string;
  image: string;
  name: string;
  background: string;
  program: string;
  rating: number;
  testimony: string;
}

// 获取学生故事
export const getStudentStories = async (language: 'en' | 'zh' = 'en') => {
  try {
    return mockStudentStories.map(story => ({
      id: story.id,
      image: story.image,
      name: language === 'en' ? story.name_en : story.name_zh,
      background: language === 'en' ? story.background_en : story.background_zh,
      program: language === 'en' ? story.program_en : story.program_zh,
      rating: story.rating,
      testimony: language === 'en' ? story.testimonial_en : story.testimonial_zh
    }) as StudentStory);
  } catch (error) {
    console.error('Error fetching student stories:', error);
    return [];
  }
};

// Mock featured programs data
const mockFeaturedPrograms = [
  {
    id: "1",
    program_id: "1",
    image: "/images/programs/tokyo-2025.jpg",
    title_en: "2025 Summer Tokyo Anime Cultural Exploration Project",
    title_zh: "2025年夏季日本东京动漫文化探索项目",
    description_en: "Experience the vibrant anime culture in Tokyo",
    description_zh: "体验东京充满活力的动漫文化",
    location_en: "Tokyo",
    location_zh: "日本东京",
    duration: "7 days",
    duration_en: "7 days",
    duration_zh: "7天",
    country: "Japan",
    grade_levels: ["9", "10", "11", "12"]
  },
  {
    id: "2",
    program_id: "2",
    image: "/images/programs/cambridge-2025.jpg",
    title_en: "2025 Cambridge Summit Academic Summer Camp",
    title_zh: "2025年剑桥峰会学术夏令营",
    description_en: "Join the prestigious academic summit at Cambridge",
    description_zh: "参加剑桥大学顶尖学术峰会",
    location_en: "Cambridge",
    location_zh: "英国剑桥",
    duration: "16 days",
    duration_en: "16 days",
    duration_zh: "16天",
    country: "UK",
    grade_levels: ["10", "11", "12"]
  },
  {
    id: "3",
    program_id: "3",
    image: "/images/programs/singapore-2025.jpg",
    title_en: "2025 Singapore Science & Innovation STEM Summer Camp",
    title_zh: "2025年新加坡科学与创新STEM夏令营",
    description_en: "Explore STEM innovation in Singapore",
    description_zh: "在新加坡探索STEM创新",
    location_en: "Singapore",
    location_zh: "新加坡",
    duration: "7 days",
    duration_en: "7 days",
    duration_zh: "7天",
    country: "Singapore",
    grade_levels: ["8", "9", "10", "11", "12"]
  }
];

// 精选项目数据接口
interface FeaturedProgram {
  id: string;
  image: string;
  title_en: string;
  title_zh: string;
  description_en: string;
  description_zh: string;
  location_en: string;
  location_zh: string;
  duration: string;
  duration_en: string;
  duration_zh: string;
  country: string;
}

// 获取精选项目
export const getFeaturedPrograms = async (language: 'en' | 'zh' = 'en') => {
  try {
    const featuredProgramIds = ['3', '6', '7']; // 精选项目的 ID
    const programPromises = featuredProgramIds.map(async (id) => {
      try {
        const response = await fetch(`/content/programs/program${id}.json?t=${new Date().getTime()}`);
        if (!response.ok) {
          console.error(`无法加载精选项目 ${id}: ${response.statusText}`);
          return null;
        }
        
        const programData = await response.json();
        return {
          id: programData.id,
          program_id: programData.program_id || programData.id, // 确保有 program_id
          image: programData.image,
          title_en: programData.title_en,
          title_zh: programData.title_zh,
          description_en: programData.description_en,
          description_zh: programData.description_zh,
          location_en: programData.location_en,
          location_zh: programData.location_zh, 
          duration: programData.duration,
          duration_en: programData.duration_en,
          duration_zh: programData.duration_zh,
          country: programData.country || '',
          grade_levels: programData.grade_levels || [] // 确保有 grade_levels
        };
      } catch (error) {
        console.error(`Error loading featured program ${id}:`, error);
        return null;
      }
    });
    
    const programs = await Promise.all(programPromises);
    const validPrograms = programs.filter(program => program !== null);
    
    if (validPrograms.length > 0) {
      return validPrograms as Program[];
    }
    
    // 如果从 JSON 文件加载失败，则返回模拟数据作为备选
    console.warn('从 JSON 文件加载精选项目失败，使用模拟数据作为备选');
    return mockFeaturedPrograms.map(program => ({
      id: program.id,
      program_id: program.program_id || program.id, // 确保有 program_id
      image: program.image,
      title_en: program.title_en,
      title_zh: program.title_zh,
      description_en: program.description_en,
      description_zh: program.description_zh,
      location_en: program.location_en,
      location_zh: program.location_zh, 
      duration: program.duration,
      duration_en: program.duration_en,
      duration_zh: program.duration_zh,
      country: program.country,
      grade_levels: program.grade_levels || [] // 确保有 grade_levels
    })) as Program[];
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

// 精选项目简介数据接口
interface FeaturedProgramsIntro {
  subtitle: string;
  title: string;
  linkText: string;
  linkUrl: string;
}

// 获取精选项目简介
export const getFeaturedProgramsIntro = async (language: 'en' | 'zh' = 'en') => {
  try {
    // 尝试从本地 JSON 文件加载精选项目简介数据
    try {
      const response = await fetch(`/content/home/featured-programs-intro.json?t=${new Date().getTime()}`);
      if (response.ok) {
        const introData = await response.json();
        return {
          subtitle: language === 'en' ? introData.subtitle_en : introData.subtitle_zh,
          title: language === 'en' ? introData.title_en : introData.title_zh,
          linkText: language === 'en' ? introData.link_text_en : introData.link_text_zh,
          linkUrl: introData.link_url
        } as FeaturedProgramsIntro;
      } else {
        console.error(`无法加载精选项目简介数据: ${response.statusText}`);
      }
    } catch (fileError) {
      console.error('Error loading featured programs intro from file:', fileError);
    }
    
    // 如果从 JSON 文件加载失败，则返回模拟数据作为备选
    console.warn('从 JSON 文件加载精选项目简介数据失败，使用模拟数据作为备选');
    return {
      subtitle: language === 'en' ? mockFeaturedProgramsIntro.subtitle_en : mockFeaturedProgramsIntro.subtitle_zh,
      title: language === 'en' ? mockFeaturedProgramsIntro.title_en : mockFeaturedProgramsIntro.title_zh,
      linkText: language === 'en' ? mockFeaturedProgramsIntro.link_text_en : mockFeaturedProgramsIntro.link_text_zh,
      linkUrl: mockFeaturedProgramsIntro.link_url
    } as FeaturedProgramsIntro;
  } catch (error) {
    console.error('Error fetching featured programs intro:', error);
    return null;
  }
};

// 获取标语部分内容
export const getTaglineSection = async (language: 'en' | 'zh') => {
  try {
    const response = await apiClient.get('/api/tagline-section');
    const data = extractData<{title?: string; description?: string}>(response);
    
    return {
      title: "Explore. Learn. Grow.",
      description: language === 'en' 
        ? 'Every EdGoing program is a carefully crafted adventure, designed to go beyond sightseeing—challenging assumptions, building empathy, and empowering students to see the world, and themselves, in new ways. Through these transformative experiences, we open minds, build bridges, and create memories that last a lifetime.'
        : '每一个 EdGoing 项目都是精心打造的探险之旅，旨在超越简单的观光——挑战固有观念、培养共情能力，并赋予学生以全新的方式看待世界和自我。'
    };
  } catch (error) {
    console.error('Error fetching tagline section:', error);
    return {
      title: "Explore. Learn. Grow.",
      description: language === 'en' 
        ? 'Every EdGoing program is a carefully crafted adventure, designed to go beyond sightseeing—challenging assumptions, building empathy, and empowering students to see the world, and themselves, in new ways. Through these transformative experiences, we open minds, build bridges, and create memories that last a lifetime.'
        : '每一个 EdGoing 项目都是精心打造的探险之旅，旨在超越简单的观光——挑战固有观念、培养共情能力，并赋予学生以全新的方式看待世界和自我。'
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
