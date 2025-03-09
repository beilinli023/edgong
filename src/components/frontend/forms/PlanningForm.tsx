
import React, { useState } from "react";
import { toast } from "sonner";
import { submitPlanningForm } from "@/services/frontend/formService";
import { FormContent } from "@/hooks/useFrontendFormContent";
import PersonalInfoSection from "./sections/PersonalInfoSection";
import EducationInfoSection from "./sections/EducationInfoSection";
import ProgramInterestsSection from "./sections/ProgramInterestsSection";
import FormFooterSection from "./sections/FormFooterSection";

interface PlanningFormProps {
  content: FormContent;
  currentLanguage: string;
}

const PlanningForm: React.FC<PlanningFormProps> = ({ content, currentLanguage }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 表单状态
  const [formData, setFormData] = useState({
    role: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    schoolName: "",
    gradeLevel: "",
    province: "",
    city: "",
    programTypes: [] as string[],
    destinations: [] as string[],
    interests: [] as string[],
    questions: "",
    agreeToReceiveInfo: false,
    agreeToPrivacyPolicy: false
  });

  // 本地化文本
  const text = {
    yourRole: currentLanguage === 'en' ? "Your Role" : "您的角色",
    firstName: currentLanguage === 'en' ? "First Name" : "名",
    lastName: currentLanguage === 'en' ? "Last Name" : "姓",
    email: currentLanguage === 'en' ? "Email" : "电子邮箱",
    phoneNumber: currentLanguage === 'en' ? "Phone Number" : "电话号码",
    schoolName: currentLanguage === 'en' ? "School Name" : "学校名称",
    gradeLevel: currentLanguage === 'en' ? "Grade Level" : "年级",
    province: currentLanguage === 'en' ? "Province" : "省份",
    city: currentLanguage === 'en' ? "City" : "城市",
    programTypes: currentLanguage === 'en' ? "Interested Program Types (Multiple Choice)" : "感兴趣的项目类型（多选）",
    destinations: currentLanguage === 'en' ? "Preferred Destinations (Multiple Choice)" : "首选目的地（多选）",
    interests: currentLanguage === 'en' ? "I WANT TO LEARN ABOUT" : "感兴趣的项目",
    questions: currentLanguage === 'en' ? "Your Questions or Requirements" : "您的问题或要求",
    questionsPlaceholder: currentLanguage === 'en' ? "Please describe your specific needs or questions" : "请描述您的具体需求或问题",
    agreeToReceive: currentLanguage === 'en' 
      ? "I agree to receive educational information and activity notifications from EdGoing. I understand that I can unsubscribe at any time." 
      : "我同意接收来自EdGoing的教育信息和活动通知。我了解我可以随时取消订阅。",
    privacyPolicy: currentLanguage === 'en'
      ? "I have read and agree to the Privacy Policy"
      : "我已阅读并同意隐私政策",
    submitButton: currentLanguage === 'en' ? "Submit" : "提交",
    selectYourRole: currentLanguage === 'en' ? "Select your role" : "选择您的角色",
    selectYourGradeLevel: currentLanguage === 'en' ? "Select your grade level" : "选择您的年级",
    selectYourProvince: currentLanguage === 'en' ? "Select your province" : "选择您的省份",
    selectYourCity: currentLanguage === 'en' ? "Select your city" : "选择您的城市",
    submitting: currentLanguage === 'en' ? "Submitting..." : "提交中..."
  };

  // 处理文本输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 处理选择框变化
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 处理复选框变化
  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentValues = [...(prev[field as keyof typeof prev] as string[])];
      
      if (checked) {
        return { ...prev, [field]: [...currentValues, value] };
      } else {
        return { ...prev, [field]: currentValues.filter(item => item !== value) };
      }
    });
  };

  // 处理同意接收信息复选框
  const handleAgreeChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, agreeToReceiveInfo: checked }));
  };

  // 处理隐私政策同意复选框
  const handlePrivacyPolicyChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, agreeToPrivacyPolicy: checked }));
  };

  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 基本验证
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast.error(currentLanguage === 'en' ? "Please fill in all required fields" : "请填写所有必填字段");
      return;
    }

    // 验证隐私政策是否勾选
    if (!formData.agreeToPrivacyPolicy) {
      toast.error(
        currentLanguage === 'en' 
          ? "You must agree to the Privacy Policy to submit the form" 
          : "您必须同意隐私政策才能提交表单"
      );
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // 实际API请求
      await submitPlanningForm(formData);
      
      // 成功提交
      toast.success(
        currentLanguage === 'en' 
          ? "Form submitted successfully! We'll contact you within 2 business days." 
          : "表单提交成功！我们将在2个工作日内与您联系。"
      );
      
      // 重置表单
      setFormData({
        role: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        schoolName: "",
        gradeLevel: "",
        province: "",
        city: "",
        programTypes: [],
        destinations: [],
        interests: [],
        questions: "",
        agreeToReceiveInfo: false,
        agreeToPrivacyPolicy: false
      });
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        currentLanguage === 'en' 
          ? "An error occurred while submitting the form. Please try again." 
          : "提交表单时出错。请重试。"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 个人信息部分 */}
      <PersonalInfoSection 
        formData={formData}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        roles={content.options.roles}
        text={text}
        currentLanguage={currentLanguage}
      />

      {/* 教育信息部分 */}
      <EducationInfoSection 
        formData={formData}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        gradeLevels={content.options.gradeLevels || []}
        provinces={content.options.provinces || []}
        cities={content.options.cities || []}
        text={text}
        currentLanguage={currentLanguage}
      />

      {/* 项目兴趣部分 */}
      <ProgramInterestsSection 
        formData={formData}
        handleInputChange={handleInputChange}
        handleCheckboxChange={handleCheckboxChange}
        options={content.options}
        text={text}
      />

      {/* 表单底部部分 */}
      <FormFooterSection 
        formData={formData}
        handleAgreeChange={handleAgreeChange}
        handlePrivacyPolicyChange={handlePrivacyPolicyChange}
        isSubmitting={isSubmitting}
        text={text}
        currentLanguage={currentLanguage}
      />
    </form>
  );
};

export default PlanningForm;
