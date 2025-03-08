

import apiClient from '../api/apiClient';
import { extractData } from '../api/responseHelpers';
import type { NewsletterSubscription, NewsletterSubscriptionInput } from '@/types/newsletterTypes';
import { toast } from 'sonner';

// 获取表单页面内容
export const getFrontendFormContent = async (language = 'en') => {
  try {
    const response = await apiClient.get('/form-content');
    const data = extractData(response);
    return data;
  } catch (error) {
    console.error('Error fetching form content:', error);
    return null;
  }
};

// 提交规划表单
export const submitPlanningForm = async (formData: any) => {
  try {
    const response = await apiClient.post('/forms/planning', formData);
    return { success: true, data: extractData(response) };
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
    
    const subscriptionData: NewsletterSubscriptionInput = {
      email,
      language,
      status: 'active',
      subscribed_at: new Date().toISOString()
    };

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
      
      toast.success('邮件订阅已更新');
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
        updated_at: new Date().toISOString() // Add the missing updated_at field
      };
      
      mockSubscriptions.push(newSubscription);
      toast.success('邮件订阅已添加');
      return { 
        success: true, 
        data: newSubscription
      };
    }
  } catch (error) {
    console.error('Error submitting newsletter subscription:', error);
    toast.error('订阅失败，请重试');
    return { success: false, error };
  }
};

export default {
  getFrontendFormContent,
  submitPlanningForm,
  submitNewsletterSubscription
};

