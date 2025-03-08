
import React from 'react';
import { Award, Globe, Users, BookOpen, Loader2 } from 'lucide-react';
import { useFrontendWhyChoose } from '@/hooks/useFrontendWhyChoose';

// 图标映射功能
const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'award':
      return <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />;
    case 'globe':
      return <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />;
    case 'users':
      return <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />;
    case 'book':
      return <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />;
    default:
      return <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />;
  }
};

interface WhyChooseSectionProps {
  currentLanguage: 'en' | 'zh';
}

const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({ currentLanguage }) => {
  const { content, isLoading } = useFrontendWhyChoose(currentLanguage);

  if (isLoading) {
    return (
      <div className="py-16 bg-white flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!content) {
    // 如果没有获取到内容，显示一个回退版本
    const fallbackContent = {
      title: currentLanguage === 'en' ? 'Why Choose EdGoing' : '为什么选择EdGoing',
      description: currentLanguage === 'en' 
        ? 'A decade of excellence in international education, trusted by students worldwide.' 
        : '十年国际教育卓越经验，深受全球学生信赖。',
      features: [
        {
          id: 1,
          icon: 'award',
          title: currentLanguage === 'en' ? 'Expertise & Experience' : '专业知识与经验',
          description: currentLanguage === 'en'
            ? 'Expert-designed programs ensuring meaningful learning and cultural immersion.'
            : '专家设计的项目，确保有意义的学习和文化沉浸。'
        },
        {
          id: 2,
          icon: 'globe',
          title: currentLanguage === 'en' ? 'Global Network' : '全球网络',
          description: currentLanguage === 'en'
            ? 'Partnerships with prestigious institutions ensuring quality education worldwide.'
            : '与全球知名机构合作，确保优质教育。'
        },
        {
          id: 3,
          icon: 'users',
          title: currentLanguage === 'en' ? 'Student Success' : '学生成功',
          description: currentLanguage === 'en'
            ? 'Programs foster personal growth, academic excellence, and cultural understanding.'
            : '项目培养个人成长、学术卓越和文化理解。'
        }
      ]
    };

    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{fallbackContent.title}</h2>
            <p className="text-gray-700">{fallbackContent.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fallbackContent.features.map((feature) => (
              <div key={feature.id} className="text-center p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                {getIconComponent(feature.icon)}
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.title}</h2>
          <p className="text-gray-700">{content.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.features.map((feature) => (
            <div key={feature.id} className="text-center p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              {getIconComponent(feature.icon)}
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseSection;
