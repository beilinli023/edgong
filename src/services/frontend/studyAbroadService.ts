
import { getUniversityById, getAllUniversities, getUniversityIndex } from './universityService';
import { StudyAbroadPageContent, PartnerUniversity, StudyAbroadBenefit } from '@/types/studyAbroadTypes';

/**
 * 获取留学页面内容，包括标题、描述和大学数据
 */
export const getStudyAbroadContent = async (language: 'en' | 'zh'): Promise<StudyAbroadPageContent> => {
  try {
    console.log(`Fetching study abroad content for language: ${language}`);
    
    // 获取大学数据（现在从 JSON 文件加载）
    const universities = await getAllUniversities();
    
    // 防止universities为空数组或undefined
    if (!universities || universities.length === 0) {
      console.log('No universities data available, using empty array');
    }
    
    // 转换为 PartnerUniversity 类型（简化版本）
    const partnerUniversities: PartnerUniversity[] = (universities || []).map(uni => uni ? ({
      id: uni.id,
      name_en: uni.name_en || '',
      name_zh: uni.name_zh || '',
      location_en: uni.location_en || '',
      location_zh: uni.location_zh || '',
      programs_en: uni.programs_en || [],
      programs_zh: uni.programs_zh || [],
      image: uni.image || ''
    }) : null).filter(Boolean) as PartnerUniversity[];
    
    // 留学目的与种类数据
    const benefits: StudyAbroadBenefit[] = [
      {
        icon: 'graduation-cap',
        title_en: 'Academic Excellence',
        title_zh: '学术卓越',
        description_en: 'Access to world-class educational institutions and programs that enhance your academic credentials.',
        description_zh: '获取世界一流教育机构和课程，提升您的学术证书。'
      },
      {
        icon: 'globe',
        title_en: 'Global Perspective',
        title_zh: '全球视野',
        description_en: 'Develop a broader worldview and cross-cultural communication skills essential in today\'s global environment.',
        description_zh: '培养更广阔的世界观和跨文化交流能力，这在当今的全球环境中至关重要。'
      },
      {
        icon: 'briefcase',
        title_en: 'Career Advancement',
        title_zh: '职业发展',
        description_en: 'Gain a competitive edge in the job market with international experience and specialized knowledge.',
        description_zh: '通过国际经验和专业知识，在就业市场中获得竞争优势。'
      },
      {
        icon: 'users',
        title_en: 'Cultural Immersion',
        title_zh: '文化深浸',
        description_en: 'Experience different cultures firsthand, building lifelong international friendships and networks.',
        description_zh: '亲身体验不同文化，建立终身的国际友谊和人脉网络。'
      }
    ];
    
    // 构建留学页面完整内容
    const pageContent: StudyAbroadPageContent = {
      title_en: 'Study Abroad: Expand Your Horizons',
      title_zh: '留学：拓展你的视野',
      description_en: 'Embark on a life-changing study abroad journey to explore new cultures, gain a global perspective, and enhance your education. Whether you seek academic excellence, language immersion, or unforgettable experiences, studying abroad opens doors to endless opportunities.',
      description_zh: '踏上改变人生的留学之旅，探索新文化，获得全球视野，并提升你的教育水平。无论你追求学术卓越、语言深浸还是难忘的经历，留学都将为你打开无限机遇的大门。',
      benefits: benefits,
      universities: partnerUniversities,
      cta_title_en: 'Ready to Start Your Journey?',
      cta_title_zh: '准备好开始您的旅程了吗？',
      cta_description_en: 'Contact our advisors to learn more about our study abroad programs and find the perfect fit for your educational goals.',
      cta_description_zh: '联系我们的顾问，了解我们的留学项目，并找到最适合您教育目标的项目。',
      cta_button_text_en: 'Get Started',
      cta_button_text_zh: '开始咨询',
      cta_button_link: '/contact'
    };
    
    return pageContent;
  } catch (error) {
    console.error('Error fetching study abroad content:', error);
    throw error;
  }
};

/**
 * 留学服务模块
 * 整合各个子模块的功能
 */
export {
  getUniversityById,
  getAllUniversities,
  getUniversityIndex
};

// 导出默认对象，兼容之前的导入方式
export default {
  getStudyAbroadContent,
  getUniversityById,
  getAllUniversities,
  getUniversityIndex
};
