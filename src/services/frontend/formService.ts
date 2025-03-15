// import apiClient from '../api/apiClient';
// import { extractData } from '../api/responseHelpers';
import type { NewsletterSubscription, NewsletterSubscriptionInput } from '@/types/newsletterTypes';
import { toast } from 'sonner';
import type { FormContent, PlanningFormData, FormOption } from '@/types/formTypes';
import { getCompatibleProvinces, getCompatibleCities } from '@/data/chinaRegions';
import subscriptionService from '@/data/subscriptions/emailSubscriptions';

// 获取表单页面内容
export const getFrontendFormContent = async (language = 'en'): Promise<FormContent | null> => {
  try {
    // 模拟API响应延迟
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 返回模拟的表单内容
    return {
      hero: {
        title: language === 'en' ? "Start Your Planning" : "开始计划",
        subtitle: language === 'en' 
          ? "Ready to begin your educational journey? Let us help you create the perfect study abroad experience." 
          : "准备开始您的教育之旅？让我们帮助您创造完美的海外学习体验。",
        backgroundImage: "/lovable-uploads/47bf9bbe-157b-4ebd-8119-331c7101bce3.png",
      },
      formSection: {
        title: language === 'en' ? "Need help with assistance, or just have a question for us?" : "需要帮助或有任何问题？",
        responseTimeText: language === 'en' ? "Fill out our form and we'll respond within 2 business days." : "填写我们的表单，我们将在2个工作日内回复。",
        phoneContact: language === 'en' ? "Or Call Us @ 400-115-3558 (Email: Hello@edgoing.com)" : "或致电 400-115-3558（邮件：Hello@edgoing.com）",
      },
      options: {
        roles: [
          { id: "student", label: language === 'en' ? "Student" : "学生" },
          { id: "parent", label: language === 'en' ? "Parent" : "家长" },
          { id: "teacher", label: language === 'en' ? "Teacher" : "教师" },
          { id: "other", label: language === 'en' ? "Other" : "其他" }
        ],
        gradeLevels: [
          { id: "elementary", label: language === 'en' ? "Elementary School" : "小学" },
          { id: "middle", label: language === 'en' ? "Middle School" : "初中" },
          { id: "high", label: language === 'en' ? "High School" : "高中" },
          { id: "university", label: language === 'en' ? "University" : "大学" },
          { id: "graduate", label: language === 'en' ? "Graduate School" : "研究生" },
          { id: "other", label: language === 'en' ? "Other" : "其他" }
        ],
        // 使用从chinaRegions模块导入的数据
        provinces: getCompatibleProvinces(language),
        cities: getCompatibleCities(language),
        programTypes: [
          { id: "summer", label: language === 'en' ? "Summer Program" : "夏季项目" },
          { id: "semester", label: language === 'en' ? "Semester Program" : "学期项目" },
          { id: "year", label: language === 'en' ? "Year-long Program" : "全年项目" },
          { id: "language", label: language === 'en' ? "Language Program" : "语言项目" },
          { id: "university", label: language === 'en' ? "University Program" : "大学项目" }
        ],
        destinations: [
          { id: "usa", label: language === 'en' ? "United States" : "美国" },
          { id: "uk", label: language === 'en' ? "United Kingdom" : "英国" },
          { id: "canada", label: language === 'en' ? "Canada" : "加拿大" },
          { id: "australia", label: language === 'en' ? "Australia" : "澳大利亚" },
          { id: "europe", label: language === 'en' ? "Europe" : "欧洲" },
          { id: "singapore", label: language === 'en' ? "Singapore" : "新加坡" },
          { id: "malaysia", label: language === 'en' ? "Malaysia" : "马来西亚" },
          { id: "japan", label: language === 'en' ? "Japan" : "日本" }
        ],
        interests: [
          { id: "academic", label: language === 'en' ? "Academic Enrichment" : "学术拓展" },
          { id: "heritage", label: language === 'en' ? "Heritage & Arts Exploration" : "传统与艺术探索" },
          { id: "performing", label: language === 'en' ? "Performing Arts" : "表演艺术" },
          { id: "lifestyle", label: language === 'en' ? "Language & Lifestyle" : "语言与生活" },
          { id: "language", label: language === 'en' ? "Language Intensive" : "语言强化" },
          { id: "history", label: language === 'en' ? "History & Civic" : "历史与公民" },
          { id: "stem", label: language === 'en' ? "STEM & Science" : "STEM与科学创新" },
          { id: "religion", label: language === 'en' ? "Religion & Belief" : "宗教与信仰" },
          { id: "community", label: language === 'en' ? "Community Service" : "社区服务" },
          { id: "sports", label: language === 'en' ? "Sports" : "体育" },
          { id: "courses", label: language === 'en' ? "Academic Courses" : "专业发展" }
        ]
      }
    };
  } catch (error) {
    console.error('Error fetching form content:', error);
    return null;
  }
};

// 提交规划表单
export const submitPlanningForm = async (formData: PlanningFormData) => {
  try {
    // 模拟API请求成功
    console.log('提交表单数据:', formData);
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // 返回模拟的成功响应
    return { 
      success: true, 
      data: { 
        id: Math.floor(Math.random() * 1000),
        message: 'Form submitted successfully',
        submittedAt: new Date().toISOString()
      } 
    };
  } catch (error) {
    console.error('Error submitting planning form:', error);
    return { success: false, error };
  }
};

// Mock newsletter subscriptions data
const mockSubscriptions: NewsletterSubscription[] = [];

// 提交邮件订阅
export const submitNewsletterSubscription = async (email: string, language = 'en') => {
  try {
    console.log('Submitting newsletter subscription:', { email, language });
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const subscriptionData: NewsletterSubscriptionInput = {
      email,
      language,
      status: 'active',
      subscribed_at: new Date().toISOString()
    };

    // 将邮件保存到表格文件中
    try {
      const savedSubscription = subscriptionService.saveSubscription(email, 'footer-form');
      console.log('邮件已保存到订阅表格:', savedSubscription);
    } catch (err) {
      console.error('保存邮件到订阅表格失败:', err);
      // 即使文件保存失败，也继续处理内存中的订阅，保持原功能不变
    }

    // Check if email already exists in mock data
    const existingIndex = mockSubscriptions.findIndex(sub => sub.email === email);
    
    if (existingIndex >= 0) {
      // Update existing subscription
      mockSubscriptions[existingIndex] = {
        ...mockSubscriptions[existingIndex],
        language,
        status: 'active',
        updated_at: new Date().toISOString()
      };
      
      toast.success(language === 'zh' ? '邮件订阅已更新' : 'Subscription updated successfully');
      return { 
        success: true, 
        data: mockSubscriptions[existingIndex]
      };
    } else {
      // Create new subscription
      const newSubscription: NewsletterSubscription = {
        id: Math.random().toString(36).substring(2, 11),
        ...subscriptionData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      mockSubscriptions.push(newSubscription);
      toast.success(language === 'zh' ? '邮件订阅已添加' : 'Subscription added successfully');
      return { 
        success: true, 
        data: newSubscription
      };
    }
  } catch (error) {
    console.error('Error submitting newsletter subscription:', error);
    toast.error(language === 'zh' ? '订阅失败，请重试' : 'Subscription failed, please try again');
    return { success: false, error };
  }
};

export default {
  getFrontendFormContent,
  submitPlanningForm,
  submitNewsletterSubscription
};
