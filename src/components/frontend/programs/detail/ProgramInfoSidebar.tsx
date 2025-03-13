import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Program } from '@/types/programTypes';
import { Card } from '@/components/ui/card';

// 多语言文本配置
const TEXT = {
  en: {
    programInfo: 'Program Information',
    programType: 'Program Type',
    duration: 'Duration',
    destination: 'Destination',
    gradeLevel: 'Grade Level'
  },
  zh: {
    programInfo: '项目信息',
    programType: '项目类型',
    duration: '时长',
    destination: '目的地',
    gradeLevel: '年级水平'
  }
};

// 信息项组件
interface InfoItemProps {
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <div>
    <h4 className="font-medium text-gray-700">{label}</h4>
    <p className="mt-1 text-gray-600">{value}</p>
  </div>
);

interface ProgramInfoSidebarProps {
  program: Program;
}

const ProgramInfoSidebar: React.FC<ProgramInfoSidebarProps> = ({ program }) => {
  const { currentLanguage } = useLanguage();
  const t = TEXT[currentLanguage as keyof typeof TEXT];
  
  // 获取当前语言的内容，优先使用专用字段，有回退策略
  const getProgramContent = () => {
    // 项目类型
    const programType = currentLanguage === 'en' 
      ? program.program_type_en || program.tags.map(tag => tag.name_en).join(', ')
      : program.program_type_zh || program.tags.map(tag => tag.name_zh).join(', ');
    
    // 目的地
    const destination = currentLanguage === 'en'
      ? program.destination_en || program.location_en
      : program.destination_zh || program.location_zh;
      
    // 时长 - 先尝试使用原始duration字段，再根据当前语言选择显示
    let duration = program.duration;
    
    // 检查是否包含中文字符，如果当前是中文模式但duration是英文，则尝试转换
    if (currentLanguage === 'zh' && duration && !(/[\u4e00-\u9fa5]/.test(duration))) {
      // 将英文时长转为中文时长的简单逻辑
      if (duration.includes('week')) {
        const weeks = duration.replace(/[^0-9]/g, '');
        duration = `${weeks}周`;
      } else if (duration.includes('day')) {
        const days = duration.replace(/[^0-9]/g, '');
        duration = `${days}天`;
      }
    }
      
    // 年级水平 - 根据语言选择合适的年级显示
    const gradeLevel = currentLanguage === 'en'
      ? program.grade_level_en || findSuitableGradeLevel(program.grade_levels, true)
      : program.grade_level_zh || findSuitableGradeLevel(program.grade_levels, false);
    
    return { programType, destination, duration, gradeLevel };
  };
  
  // 辅助函数：根据语言找到合适的年级
  const findSuitableGradeLevel = (gradeLevels: string[], isEnglish: boolean): string => {
    if (!gradeLevels || gradeLevels.length === 0) {
      return '';
    }
    
    // 英文环境查找英文年级，中文环境查找中文年级
    const suitable = isEnglish
      ? gradeLevels.find(level => /[a-zA-Z]/.test(level))
      : gradeLevels.find(level => /[\u4e00-\u9fa5]/.test(level));
    
    // 找不到合适的就用第一个
    return suitable || gradeLevels[0];
  };
  
  const { programType, destination, duration, gradeLevel } = getProgramContent();

  return (
    <Card className="p-6">
      {/* 移除项目信息标题 */}
      <div className="space-y-4">
        <InfoItem label={t.programType} value={programType} />
        <InfoItem label={t.duration} value={duration} />
        <InfoItem label={t.destination} value={destination} />
        <InfoItem label={t.gradeLevel} value={gradeLevel} />
      </div>
    </Card>
  );
};

export default ProgramInfoSidebar;
