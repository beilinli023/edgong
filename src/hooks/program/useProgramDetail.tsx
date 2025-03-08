
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Program } from '@/types/programTypes';
import { useLanguage } from '@/context/LanguageContext';

// Mock program data for development
const mockProgram: Program = {
  id: '33333333-3333-3333-3333-333333333333',
  title_en: 'Art and Culture Exploration',
  title_zh: '伦敦艺术与文化探索',
  program_id: 'art-culture-exploration',
  image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=1470&auto=format&fit=crop',
  location_en: 'United Kingdom',
  location_zh: '英国',
  duration: '3 weeks / 3周',
  country: 'UK',
  tags: [
    { id: '1', name_en: 'Academic', name_zh: '学术' },
    { id: '2', name_en: 'Cultural', name_zh: '文化' }
  ],
  grade_levels: ['High School', 'University'],
  description_en: 'Experience the rich art and cultural heritage of London with our specialized program designed for students interested in the arts. This immersive experience will take you through the finest museums, galleries, and cultural institutions in London.',
  description_zh: '通过我们为对艺术感兴趣的学生设计的专业项目，体验伦敦丰富的艺术和文化遗产。这种沉浸式体验将带您游览伦敦最优秀的博物馆、画廊和文化机构。',
  highlights_en: '<ul><li>Develop an understanding of art history and cultural movements</li><li>Enhance critical thinking skills through art analysis</li><li>Build connections between historical and contemporary art forms</li></ul>',
  highlights_zh: '<ul><li>发展对艺术史和文化运动的理解</li><li>通过艺术分析提高批判性思维能力</li><li>建立历史和当代艺术形式之间的联系</li></ul>',
  itinerary_en: '<h3>FAQ</h3><div><h4>What are the accommodation options?</h4><p>Students will be accommodated in university dormitories with single rooms.</p></div><div><h4>Do I need to know the local language?</h4><p>No, all program activities are conducted in English with translation available.</p></div>',
  itinerary_zh: '<h3>常见问题</h3><div><h4>住宿选择有哪些？</h4><p>学生将住在大学宿舍的单人房间。</p></div><div><h4>我需要懂当地语言吗？</h4><p>不需要，所有课程活动都用英语进行，并提供翻译。</p></div>',
  features_en: '<h3>Program Features</h3><p>Expert instructors from top UK art institutions will guide students through galleries and studios. Small groups of maximum 12 students ensure personalized attention.</p>',
  features_zh: '<h3>项目特色</h3><p>来自英国顶尖艺术机构的专家讲师将指导学生参观画廊和工作室。最多12名学生的小组确保个性化关注。</p>',
  gallery_images: [
    'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1470&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=1470&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1470&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1503152394-c571994fd383?q=80&w=1470&auto=format&fit=crop'
  ]
};

// Add more mock programs for testing different IDs
const mockPrograms: Record<string, Program> = {
  '1': {
    ...mockProgram,
    id: '1',
    title_en: 'Summer in Paris',
    title_zh: '巴黎的夏天',
    program_id: 'summer-paris',
    location_en: 'France',
    location_zh: '法国',
    country: 'France',
  },
  '2': {
    ...mockProgram,
    id: '2',
    title_en: 'Tech Innovation in Silicon Valley',
    title_zh: '硅谷技术创新',
    program_id: 'tech-silicon-valley',
    location_en: 'United States',
    location_zh: '美国',
    country: 'USA',
  },
  'art-culture-exploration': mockProgram
};

export function useProgramDetail() {
  const { id } = useParams<{ id: string }>();
  const { currentLanguage } = useLanguage();
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProgram = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (!id) {
          throw new Error(currentLanguage === 'en' ? 'Program ID is required' : '项目ID是必需的');
        }
        
        // Look up the program by ID from our mock data
        const foundProgram = mockPrograms[id];
        
        if (!foundProgram) {
          throw new Error(currentLanguage === 'en' ? 'Program not found' : '未找到项目');
        }
        
        setProgram(foundProgram);
      } catch (error: any) {
        console.error('Error fetching program:', error);
        setError(error.message || (currentLanguage === 'en' ? 'Failed to load program' : '加载项目失败'));
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchProgram();
    }
  }, [id, currentLanguage]);

  return {
    id,
    program,
    loading,
    error
  };
}
