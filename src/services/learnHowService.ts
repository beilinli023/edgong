
import api from './api';
import { LearnHowPage, FaqItemWithCategory } from '@/types/learnHowTypes';

// 获取Learn How页面内容
export const getLearnHowPageContent = async (): Promise<LearnHowPage> => {
  try {
    console.log('API call: Fetching learn-more page content');
    const response = await api.get('/learn-more/content');
    
    // 如果响应不存在或不是对象，返回默认数据
    if (!response || !response.data || typeof response.data !== 'object') {
      console.warn('Invalid response data format, using defaults');
      throw new Error('Invalid response data format');
    }
    
    console.log('API success: Got learn-more page content', response.data);
    // 确保hero和contact_section字段存在
    const data = response.data;
    
    return {
      hero: {
        title_en: data.hero?.title_en || "Learn More",
        title_zh: data.hero?.title_zh || "了解更多",
        subtitle_en: data.hero?.subtitle_en || "Find answers to common questions about our international education programs, activities, and services.",
        subtitle_zh: data.hero?.subtitle_zh || "获取有关我们国际教育项目、活动和服务的常见问题解答。",
        background_image: data.hero?.background_image || "/lovable-uploads/095982ef-a87c-40ba-a4fe-d4d95ab84dae.png"
      },
      contact_section: {
        title_en: data.contact_section?.title_en || "Still Have Questions?",
        title_zh: data.contact_section?.title_zh || "还有疑问？",
        description_en: data.contact_section?.description_en || 
          "If you couldn't find the answer to your question, don't hesitate to reach out to us directly. Our advisors are here to help you with any inquiries you may have.",
        description_zh: data.contact_section?.description_zh || 
          "如果您没有找到问题的答案，请随时直接联系我们。我们的顾问将帮助您解答任何疑问。",
        button_text_en: data.contact_section?.button_text_en || "Ask An Advisor",
        button_text_zh: data.contact_section?.button_text_zh || "咨询顾问",
        button_url: data.contact_section?.button_url || "/contact"
      }
    };
  } catch (error) {
    console.error('获取了解更多页面内容失败:', error);
    // 返回默认数据
    return {
      hero: {
        title_en: "Learn More",
        title_zh: "了解更多",
        subtitle_en: "Find answers to common questions about our international education programs, activities, and services.",
        subtitle_zh: "获取有关我们国际教育项目、活动和服务的常见问题解答。",
        background_image: "/lovable-uploads/095982ef-a87c-40ba-a4fe-d4d95ab84dae.png"
      },
      contact_section: {
        title_en: "Still Have Questions?",
        title_zh: "还有疑问？",
        description_en: "If you couldn't find the answer to your question, don't hesitate to reach out to us directly. Our advisors are here to help you with any inquiries you may have.",
        description_zh: "如果您没有找到问题的答案，请随时直接联系我们。我们的顾问将帮助您解答任何疑问。",
        button_text_en: "Ask An Advisor",
        button_text_zh: "咨询顾问",
        button_url: "/contact"
      }
    };
  }
};

// 获取所有FAQ
export const getAllFaqs = async (): Promise<FaqItemWithCategory[]> => {
  try {
    console.log('API call: Fetching all FAQs');
    const response = await api.get('/faqs');
    
    // 验证返回的数据是否为数组
    if (!response || !response.data || !Array.isArray(response.data)) {
      console.warn('Invalid FAQs response, using mock data');
      return getMockFaqs();
    }
    
    console.log(`API success: Got ${response.data.length} FAQs`);
    return response.data.length > 0 ? response.data : getMockFaqs();
  } catch (error) {
    console.error('获取FAQ失败:', error);
    // 返回默认数据
    return getMockFaqs();
  }
};

// 更新Learn How页面内容
export const updateLearnHowPageContent = async (content: LearnHowPage): Promise<LearnHowPage> => {
  try {
    console.log('API call: Updating learn-more page content');
    const response = await api.put('/learn-more/content', content);
    console.log('API success: Updated learn-more page content');
    return response.data;
  } catch (error) {
    console.error('更新Learn How页面内容失败:', error);
    throw error;
  }
};

// 搜索FAQ
export const searchFaqs = async (query: string): Promise<FaqItemWithCategory[]> => {
  try {
    console.log(`API call: Searching FAQs with query "${query}"`);
    const response = await api.get(`/faqs/search?q=${encodeURIComponent(query)}`);
    
    // 验证返回的数据是否为数组
    if (!response.data || !Array.isArray(response.data)) {
      console.warn('Invalid search response, using local search');
      return [];
    }
    
    console.log(`API success: Found ${response.data.length} FAQ results`);
    return response.data;
  } catch (error) {
    console.error('搜索FAQ失败:', error);
    // 使用本地搜索作为降级方案
    console.log('Falling back to local search');
    const allFaqs = await getAllFaqs();
    return allFaqs.filter(faq => 
      faq.question_en.toLowerCase().includes(query.toLowerCase()) || 
      faq.question_zh.toLowerCase().includes(query.toLowerCase()) || 
      faq.answer_en.toLowerCase().includes(query.toLowerCase()) || 
      faq.answer_zh.toLowerCase().includes(query.toLowerCase())
    );
  }
};

// 提供默认FAQ数据
const getMockFaqs = (): FaqItemWithCategory[] => {
  console.log('Using mock FAQ data');
  return [
    {
      id: 1,
      question_en: "What types of programs do you offer?",
      question_zh: "您提供哪些类型的项目？",
      answer_en: "We offer academic study programs, cultural exchanges, language immersion experiences, internships, and volunteer opportunities across various destinations worldwide.",
      answer_zh: "我们提供学术研究项目、文化交流、语言沉浸体验、实习和全球各地的志愿者机会。",
      category_id: 1,
      category_name_en: "Programs",
      category_name_zh: "项目",
      order: 1,
      is_featured: true
    },
    {
      id: 2,
      question_en: "How long are your study abroad programs?",
      question_zh: "您的留学项目持续多长时间？",
      answer_en: "Our programs range from short-term summer programs (2-8 weeks) to semester-long exchanges (12-16 weeks) and full academic year programs.",
      answer_zh: "我们的项目从短期夏季项目（2-8周）到学期交换（12-16周）和全学年项目不等。",
      category_id: 1,
      category_name_en: "Programs",
      category_name_zh: "项目",
      order: 2,
      is_featured: true
    },
    {
      id: 3,
      question_en: "What support services do you provide to students?",
      question_zh: "您为学生提供哪些支持服务？",
      answer_en: "We provide comprehensive pre-departure orientation, airport pickup, local accommodation arrangements, 24/7 emergency support, cultural adaptation assistance, and academic guidance throughout your program.",
      answer_zh: "我们提供全面的出发前培训、机场接机、当地住宿安排、24/7紧急支持、文化适应援助以及整个项目期间的学术指导。",
      category_id: 2,
      category_name_en: "Support",
      category_name_zh: "支持",
      order: 1,
      is_featured: true
    },
    {
      id: 4,
      question_en: "How much do programs typically cost?",
      question_zh: "项目通常费用是多少？",
      answer_en: "Program costs vary depending on destination, duration, and included services. Short-term programs start from $2,500 while semester programs range from $8,000 to $15,000. Full details are available on each program page.",
      answer_zh: "项目费用根据目的地、持续时间和包含的服务而有所不同。短期项目起价为2,500美元，而学期项目范围为8,000美元至15,000美元。每个项目页面上都有完整详情。",
      category_id: 3,
      category_name_en: "Financial",
      category_name_zh: "财务",
      order: 1,
      is_featured: true
    },
    {
      id: 5,
      question_en: "What are the accommodation options?",
      question_zh: "有哪些住宿选择？",
      answer_en: "We offer various accommodation options including homestays with local families, student dormitories, shared apartments, and hotel arrangements for short programs. Each program page details the specific accommodation options available.",
      answer_zh: "我们提供各种住宿选择，包括与当地家庭寄宿、学生宿舍、共享公寓，以及短期项目的酒店安排。每个项目页面详细说明了可用的具体住宿选择。",
      category_id: 4,
      category_name_en: "Accommodation",
      category_name_zh: "住宿",
      order: 1,
      is_featured: true
    },
    {
      id: 6,
      question_en: "Do I need to know the local language?",
      question_zh: "我需要了解当地语言吗？",
      answer_en: "Most of our programs do not require prior knowledge of the local language, as we provide English-speaking staff and language support. However, basic language learning is encouraged and often included as part of the cultural immersion experience.",
      answer_zh: "我们的大多数项目不需要事先了解当地语言，因为我们提供英语工作人员和语言支持。但是，我们鼓励基本的语言学习，这通常作为文化沉浸体验的一部分。",
      category_id: 5,
      category_name_en: "Language",
      category_name_zh: "语言",
      order: 1,
      is_featured: true
    },
    {
      id: 7,
      question_en: "What safety measures are in place?",
      question_zh: "有哪些安全措施？",
      answer_en: "Student safety is our top priority. We conduct thorough safety assessments of all program locations, provide 24/7 emergency support, comprehensive travel insurance, detailed safety orientations, and maintain communication protocols with local partners and emergency services.",
      answer_zh: "学生安全是我们的首要任务。我们对所有项目地点进行全面的安全评估，提供24/7紧急支持、综合旅行保险、详细的安全指导，并与当地合作伙伴和紧急服务保持沟通协议。",
      category_id: 6,
      category_name_en: "Safety",
      category_name_zh: "安全",
      order: 1,
      is_featured: true
    },
    {
      id: 8,
      question_en: "Can I get academic credit for these programs?",
      question_zh: "我能为这些项目获得学分吗？",
      answer_en: "Many of our programs offer academic credit options through partner institutions. Credits are typically transferable to your home institution, but we recommend checking with your academic advisor about credit transfer policies before enrolling.",
      answer_zh: "我们的许多项目通过合作机构提供学术学分选择。学分通常可以转移到您的母校，但我们建议在注册前向您的学术顾问咨询有关学分转移政策。",
      category_id: 7,
      category_name_en: "Academic",
      category_name_zh: "学术",
      order: 1,
      is_featured: true
    },
    {
      id: 9,
      question_en: "What is the application process?",
      question_zh: "申请流程是什么？",
      answer_en: "The application process includes completing an online application form, submitting required documents (transcripts, recommendation letters, etc.), an interview for select programs, and payment of application fee. Once accepted, you'll receive detailed pre-departure information.",
      answer_zh: "申请流程包括填写在线申请表、提交所需文件（成绩单、推荐信等）、特定项目的面试以及支付申请费。一旦接受，您将收到详细的出发前信息。",
      category_id: 8,
      category_name_en: "Application",
      category_name_zh: "申请",
      order: 1,
      is_featured: true
    },
    {
      id: 10,
      question_en: "Are there any scholarship opportunities?",
      question_zh: "有奖学金机会吗？",
      answer_en: "Yes, we offer various scholarships and financial aid options based on academic merit, financial need, diversity initiatives, and program-specific grants. Details about available scholarships and application deadlines can be found on our Financial Aid page.",
      answer_zh: "是的，我们根据学术成绩、经济需求、多样性计划和特定项目的资助提供各种奖学金和经济援助选择。有关可用奖学金和申请截止日期的详细信息可在我们的经济援助页面上找到。",
      category_id: 3,
      category_name_en: "Financial",
      category_name_zh: "财务",
      order: 2,
      is_featured: true
    }
  ];
};
