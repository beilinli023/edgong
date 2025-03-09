import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

// 多语言文本配置
const TEXT = {
  en: {
    title: 'Program Not Found',
    message: 'The program you are looking for does not exist or has been removed.',
    errorDetails: 'Error details:',
    backButton: 'Back to Programs'
  },
  zh: {
    title: '未找到项目',
    message: '您查找的项目不存在或已被移除。',
    errorDetails: '错误详情:',
    backButton: '返回项目列表'
  }
};

interface ProgramDetailErrorProps {
  error?: string;
}

const ProgramDetailError: React.FC<ProgramDetailErrorProps> = ({ error }) => {
  const { currentLanguage } = useLanguage();
  const t = TEXT[currentLanguage as keyof typeof TEXT];
  
  return (
    <div className="container mx-auto py-20 text-center">
      <div className="flex flex-col items-center mb-6">
        <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-2xl md:text-3xl font-bold mb-4">{t.title}</h1>
      </div>
      
      <p className="text-gray-600 mb-8 max-w-md mx-auto">{t.message}</p>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-8 max-w-lg mx-auto">
          <p className="text-red-700 text-sm font-medium mb-1">{t.errorDetails}</p>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
      
      <Link to="/programs">
        <Button className="px-6">{t.backButton}</Button>
      </Link>
    </div>
  );
};

export default ProgramDetailError;
