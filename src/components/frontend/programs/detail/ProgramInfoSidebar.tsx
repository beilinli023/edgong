import React, { useEffect } from 'react';
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
  
  // 调试日志以查看数据
  useEffect(() => {
    console.log('Program data:', program);
    if (program.grade_level_zh) {
      console.log('原始grade_level_zh:', program.grade_level_zh);
    }
    if (program.grade_levels) {
      console.log('原始grade_levels:', program.grade_levels);
    }
  }, [program]);
  
  // 获取当前语言的内容，优先使用专用字段，有回退策略
  const getProgramContent = () => {
    // 项目类型
    let programType = '';
    if (currentLanguage === 'en') {
      if (program.program_type_en && program.program_type_en.length > 0) {
        programType = program.program_type_en.join(', ');
      } else {
        programType = '';
      }
    } else {
      if (program.program_type_zh && program.program_type_zh.length > 0) {
        programType = program.program_type_zh.join(', ');
      } else {
        programType = '';
      }
    }
    
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
    let gradeLevel = '';
    
    if (currentLanguage === 'en') {
      if (program.grade_level_en && program.grade_level_en.length > 0) {
        gradeLevel = program.grade_level_en.join(', ');
      } else {
        gradeLevel = findSuitableGradeLevel(program.grade_levels, true);
      }
    } else {
      // 中文环境：优先使用适当解码后的grade_level_zh
      if (program.grade_level_zh && program.grade_level_zh.length > 0) {
        // 处理每个年级水平字符串
        const processedLevels = program.grade_level_zh.map(level => {
          console.log('处理年级:', level);
          
          // 处理含有分隔符的情况
          if (level.includes('；') || level.includes(';')) {
            const parts = level.split(/[;；]/);
            return parts.map(part => decodeIfUnicode(part.trim())).join('，');
          }
          
          return decodeIfUnicode(level);
        });
        
        gradeLevel = processedLevels.join(', ');
        console.log('最终年级显示:', gradeLevel);
      } else {
        gradeLevel = findSuitableGradeLevel(program.grade_levels, false);
      }
    }
    
    return { programType, destination, duration, gradeLevel };
  };
  
  // 解码Unicode编码字符串的新函数
  const decodeIfUnicode = (text: string): string => {
    if (!text) return '';
    
    console.log('尝试解码:', text);
    
    // 检查是否是Unicode编码（如 u5c0fu5b66）
    if (text === 'u5c0fu5b66') {
      return '小学';
    } else if (text === 'u521du4e2d') {
      return '初中';
    } else if (text === 'u9ad8u4e2d') {
      return '高中';
    }
    
    // 尝试使用正则表达式解码连续的Unicode编码
    if (text.includes('u') && /u[0-9a-f]{4,}/i.test(text)) {
      let result = text;
      
      // 替换所有的Unicode编码
      const unicodePattern = /u([0-9a-f]{4,})/gi;
      result = result.replace(unicodePattern, (match, hexCode) => {
        try {
          const codePoint = parseInt(hexCode, 16);
          if (isNaN(codePoint)) return match;
          return String.fromCodePoint(codePoint);
        } catch (e) {
          console.error('解码失败:', match, e);
          return match;
        }
      });
      
      console.log(`解码结果: ${text} -> ${result}`);
      return result;
    }
    
    return text;
  };
  
  // 辅助函数：根据语言找到合适的年级
  const findSuitableGradeLevel = (gradeLevels: string[], isEnglish: boolean): string => {
    if (!gradeLevels || gradeLevels.length === 0) {
      return '';
    }
    
    console.log('查找年级水平，原始列表:', gradeLevels);
    
    // 处理可能的Unicode编码字符串
    const decodedLevels = gradeLevels.map(level => {
      if (!level) return '';
      
      // 如果是中文模式，尝试解码可能的Unicode
      if (!isEnglish) {
        return decodeIfUnicode(level);
      }
      
      return level;
    });
    
    console.log('处理后的年级水平列表:', decodedLevels);
    
    // 英文环境查找英文年级，中文环境查找中文年级
    const suitable = isEnglish
      ? decodedLevels.find(level => /[a-zA-Z]/.test(level))
      : decodedLevels.find(level => /[\u4e00-\u9fa5]/.test(level));
    
    // 找不到合适的就用第一个
    return suitable || decodedLevels[0] || '';
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
