
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
    image: "/placeholder.svg",
    name_en: "Kheng Lee",
    name_zh: "李康",
    background_en: "Teacher",
    background_zh: "教师",
    program_en: "STEM Program in Singapore",
    program_zh: "新加坡的STEM项目",
    testimonial_en: "My students couldn't stop sharing about their experiences after the trip to Singapore. I, too, enjoyed the excursion to Gardens by the Bay, where we saw a variety of flora and fauna in the indoor gardens.",
    testimonial_zh: "我的学生们在从新加坡回来后，忍不住分享他们的经历。我也非常喜欢参观滨海湾花园的行程，我们在室内花园里看到了各种各样的植物和动物。",
    rating: 5,
    order_index: 1
  },
  {
    id: "3",
    image: "/placeholder.svg",
    name_en: "Li Wei",
    name_zh: "李维",
    background_en: "High School Student, 17 years old",
    background_zh: "高中生，17岁",
    program_en: "Wealth Management Program by Edgoing at SMU",
    program_zh: "Edgoing与新加坡管理大学（SMU）合作的财富管理项目",
    testimonial_en: "I'm Li Wei, 17, from Shanghai. The Wealth Management Program by Edgoing at Singapore Management University (SMU) ignited my passion for finance. Lecturers made complex topics accessible—their interactive lectures on stock markets and personal budgeting were eye-opening! Assignments, like analyzing mock portfolios, and group presentations on risk management taught me teamwork and critical thinking. Presenting our case study to SMU lecturers, who gave personalized feedback, was nerve-wracking but rewarding. Earning the Certificate of Completion boosted my university applications—now I'm determined to pursue finance degrees. For pre-university students: Edgoing and SMU's blend of mentorship and real-world challenges is the perfect academic launchpad!",
    testimonial_zh: "我是李维，17岁，来自上海。Edgoing与新加坡管理大学（SMU）合作的财富管理项目点燃了我对金融的热情。讲师们将复杂的主题讲解得通俗易懂——他们关于股票市场和个人预算的互动课程让我大开眼界！作业，比如分析模拟投资组合，以及关于风险管理的小组展示，教会了我团队合作和批判性思维。向SMU讲师展示我们的案例研究时，虽然紧张，但他们的个性化反馈让我受益匪浅。获得结业证书为我的大学申请增添了亮点——现在我决心攻读金融学位。对于大学预科生来说，Edgoing和SMU的导师指导与现实挑战相结合，是完美的学术起点！",
    rating: 5,
    order_index: 2
  },
  {
    id: "4",
    image: "/placeholder.svg",
    name_en: "Yoyo",
    name_zh: "Bruce",
    background_en: "Middle-school student, 13 years old",
    background_zh: "初中生，12岁",
    program_en: "STEM Program in Singapore",
    program_zh: "英国国际学校暑期项目",
    testimonial_en: "This trip changed how I see the world! The hands-on learning, cultural experiences, and amazing friends made it unforgettable. The staff was supportive, and I felt safe every step of the way.",
    testimonial_zh: "这次旅行改变了我看世界的方式！动手学习、文化体验和结识新朋友让这段经历难忘。工作人员非常关心我们，我在整个旅程中都感到安全放心。",
    rating: 5,
    order_index: 3
  },
  {
    id: "5",
    image: "/placeholder.svg",
    name_en: "Mrs. Zhang",
    name_zh: "张女士",
    background_en: "Parent of a 15-year-old",
    background_zh: "10岁学生家长",
    program_en: "UK International School Summer Program",
    program_zh: "新加坡 STEM 项目",
    testimonial_en: "I was worried about safety, but the team kept us informed, and my child was in great hands. She returned more confident, independent, and globally aware. Highly recommend!",
    testimonial_zh: "我本来担心安全问题，但团队始终与我们保持沟通，孩子也得到了很好的照顾。她回来后变得更自信、独立，并具备了更广阔的国际视野。强烈推荐！",
    rating: 5,
    order_index: 4
  },
  {
    id: "6",
    image: "/placeholder.svg",
    name_en: "Parent of Li Wei",
    name_zh: "陈女士",
    background_en: "Parent",
    background_zh: "家长",
    program_en: "Edgoing's Wealth Management Program at SMU",
    program_zh: "Edgoing在新加坡管理大学举办的财富管理项目",
    testimonial_en: "Edgoing's Wealth Management Program at Singapore Management University amazed me with its depth. Beyond lectures by SMU professors like Professor Chen and Dr. Wong, Edgoing arranged a visit to a fintech startup, where students witnessed AI-driven investing—bridging theory with practice. Cultural excursions to Gardens by the Bay and Little India's markets showcased Singapore's economic diversity. Edgoing's blend of academics, industry exposure, and cultural immersion gave Li Wei clarity. She returned with a certificate, polished skills, and a newfound ambition in finance, inspired by her startup pitch experience. For parents: Edgoing turns education into an adventure.",
    testimonial_zh: "Edgoing在新加坡管理大学举办的财富管理项目让我印象深刻。除了SMU教授陈教授和黄博士的讲座外，Edgoing还安排了一次金融科技初创企业的参观，学生们亲眼见证了人工智能驱动的投资——将理论与实践相结合。文化游览如滨海湾花园和小印度市场，展示了新加坡的经济多样性。Edgoing将学术、行业实践和文化沉浸相结合，为李伟带来了清晰的未来方向。她带着证书、提升的技能和对金融的新抱负回到了家，并特别提到了她的初创企业提案经历。对于家长们来说，Edgoing将教育变成了一场冒险。",
    rating: 5,
    order_index: 5
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
      program: language === 'en' ? story.program_en : story.program_zh,
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
    const data = extractData<{title?: string; description?: string}>(response);
    
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
