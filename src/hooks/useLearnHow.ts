import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { LearnHowPage, FaqItemWithCategory } from '@/types/learnHowTypes';
import { getLearnHowPageContent, getAllFaqs, searchFaqs } from '@/services/learnHowService';
import { toast } from 'sonner';

export const useLearnHow = () => {
  const { currentLanguage } = useLanguage();
  const [pageContent, setPageContent] = useState<LearnHowPage | null>(null);
  const [faqs, setFaqs] = useState<FaqItemWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState<FaqItemWithCategory[]>([]);

  // 加载页面内容
  useEffect(() => {
    const loadPageContent = async () => {
      try {
        setLoading(true);
        console.log('Fetching learn-more page content...');
        const content = await getLearnHowPageContent();
        console.log('Fetching FAQs...');
        const faqItems = await getAllFaqs();
        
        setPageContent(content);
        setFaqs(Array.isArray(faqItems) ? faqItems : []);
        setFilteredFaqs(Array.isArray(faqItems) ? faqItems : []);
        setError(null);
      } catch (err) {
        console.error('加载了解更多页面数据失败:', err);
        setError('加载页面内容失败，请稍后重试');
        toast.error(currentLanguage === 'zh' ? '内容加载失败' : 'Failed to load content', {
          description: currentLanguage === 'zh' ? '无法加载页面内容，显示备用内容' : 'Unable to load page content, showing fallback content'
        });
        
        // 确保在错误情况下也有默认数据
        setFaqs([]);
        setFilteredFaqs([]);
      } finally {
        setLoading(false);
      }
    };

    loadPageContent();
  }, [currentLanguage]);

  // 处理搜索
  useEffect(() => {
    const handleSearch = async () => {
      if (!searchQuery.trim()) {
        setFilteredFaqs(Array.isArray(faqs) ? faqs : []);
        return;
      }

      try {
        console.log(`Searching FAQs with query: ${searchQuery}`);
        const results = await searchFaqs(searchQuery);
        setFilteredFaqs(Array.isArray(results) ? results : []);
      } catch (err) {
        console.error('搜索FAQ失败:', err);
        // 使用本地搜索作为降级方案
        if (!Array.isArray(faqs)) {
          setFilteredFaqs([]);
          return;
        }
        
        const filtered = faqs.filter(faq => 
          faq.question_en.toLowerCase().includes(searchQuery.toLowerCase()) || 
          faq.question_zh.toLowerCase().includes(searchQuery.toLowerCase()) || 
          faq.answer_en.toLowerCase().includes(searchQuery.toLowerCase()) || 
          faq.answer_zh.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredFaqs(filtered);
      }
    };

    // 使用防抖处理搜索
    const debounceTimeout = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, faqs]);

  // 根据当前语言获取内容
  const getLocalizedContent = () => {
    // 默认内容
    const defaultContent = {
      hero: {
        title: currentLanguage === 'en' ? "Learn More" : "了解更多",
        subtitle: currentLanguage === 'en' 
          ? "Find answers to common questions about our international education programs, activities, and services" 
          : "获取有关我们国际教育项目、活动和服务的常见问题解答",
        backgroundImage: "/lovable-uploads/095982ef-a87c-40ba-a4fe-d4d95ab84dae.png"
      },
      contactSection: {
        title: currentLanguage === 'en' ? "Still Have Questions?" : "还有疑问？",
        description: currentLanguage === 'en' 
          ? "If you couldn't find the answer to your question, don't hesitate to reach out to us directly. Our advisors are here to help you with any inquiries you may have."
          : "如果您没有找到问题的答案，请随时直接联系我们。我们的顾问将帮助您解答任何疑问。",
        buttonText: currentLanguage === 'en' ? "Ask An Advisor" : "咨询顾问",
        buttonUrl: "/contact"
      }
    };
    
    if (!pageContent) {
      return defaultContent;
    }

    // 确保所有属性都存在，避免由于缺失属性导致的错误
    return {
      hero: {
        title: currentLanguage === 'en' 
          ? (pageContent.hero?.title_en || defaultContent.hero.title) 
          : (pageContent.hero?.title_zh || "了解更多"),
        subtitle: currentLanguage === 'en' 
          ? (pageContent.hero?.subtitle_en || defaultContent.hero.subtitle) 
          : (pageContent.hero?.subtitle_zh || "获取有关我们国际教育项目、活动和服务的常见问题解答"),
        backgroundImage: pageContent.hero?.background_image || defaultContent.hero.backgroundImage
      },
      contactSection: {
        title: currentLanguage === 'en' 
          ? (pageContent.contact_section?.title_en || defaultContent.contactSection.title) 
          : (pageContent.contact_section?.title_zh || defaultContent.contactSection.title),
        description: currentLanguage === 'en' 
          ? (pageContent.contact_section?.description_en || defaultContent.contactSection.description) 
          : (pageContent.contact_section?.description_zh || defaultContent.contactSection.description),
        buttonText: currentLanguage === 'en' 
          ? (pageContent.contact_section?.button_text_en || defaultContent.contactSection.buttonText) 
          : (pageContent.contact_section?.button_text_zh || defaultContent.contactSection.buttonText),
        buttonUrl: pageContent.contact_section?.button_url || defaultContent.contactSection.buttonUrl
      }
    };
  };

  // 获取本地化的FAQ列表
  const getLocalizedFaqs = () => {
    // 确保filteredFaqs是一个数组
    const safeFaqs = Array.isArray(filteredFaqs) ? filteredFaqs : [];
    
    return safeFaqs.map(faq => ({
      id: faq.id,
      question: currentLanguage === 'en' ? faq.question_en : faq.question_zh,
      answer: currentLanguage === 'en' ? faq.answer_en : faq.answer_zh,
      categoryId: faq.category_id,
      categoryName: currentLanguage === 'en' ? faq.category_name_en : faq.category_name_zh,
      order: faq.order,
      isFeatured: faq.is_featured
    }));
  };

  return {
    loading,
    error,
    content: getLocalizedContent(),
    faqs: getLocalizedFaqs(),
    searchQuery,
    setSearchQuery,
    hasResults: Array.isArray(filteredFaqs) && filteredFaqs.length > 0,
    currentLanguage
  };
};
