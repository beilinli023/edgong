
import React from "react";
import FrontendLayout from "@/components/frontend/FrontendLayout";
import { useLanguage } from "@/context/LanguageContext";
import { Separator } from "@/components/ui/separator";

const PrivacyPolicyPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  
  const title = currentLanguage === 'en' ? 'Privacy Policy' : '隐私政策';
  const lastUpdated = currentLanguage === 'en' 
    ? 'Last Updated: June 1, 2023' 
    : '最后更新: 2023年6月1日';

  return (
    <FrontendLayout>
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
            {title}
          </h1>
          <p className="text-gray-600 text-center">
            {lastUpdated}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
          {currentLanguage === 'en' ? (
            <>
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                <p className="mb-4">
                  YouNiKco ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
                <p>
                  Please read this Privacy Policy carefully. By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy.
                </p>
              </section>

              <Separator className="my-6" />

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                <p className="mb-4">We may collect the following types of information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Personal Information:</strong> Names, email addresses, phone numbers, educational background, and other information you provide when filling out forms on our website.</li>
                  <li><strong>Usage Data:</strong> Information about how you use our website, including pages visited, time spent on pages, and other statistics.</li>
                  <li><strong>Device Information:</strong> Information about your device, IP address, browser type, and operating system.</li>
                </ul>
              </section>

              <Separator className="my-6" />

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                <p className="mb-4">We may use the information we collect for various purposes, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Providing, maintaining, and improving our services</li>
                  <li>Processing your program applications and inquiries</li>
                  <li>Communicating with you about our programs and services</li>
                  <li>Analyzing usage patterns to enhance user experience</li>
                  <li>Compliance with legal obligations</li>
                </ul>
              </section>

              <Separator className="my-6" />

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Sharing Your Information</h2>
                <p className="mb-4">We may share your information with:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Educational Partners:</strong> Schools, universities, and other educational institutions that are part of our programs.</li>
                  <li><strong>Service Providers:</strong> Third-party vendors who assist us in providing our services.</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights.</li>
                </ul>
              </section>

              <Separator className="my-6" />

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Your Choices</h2>
                <p className="mb-4">You have certain rights regarding your personal information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access and update your personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request deletion of your personal information (subject to legal obligations)</li>
                </ul>
              </section>

              <Separator className="my-6" />

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p>
                  If you have questions or concerns about this Privacy Policy, please contact us at privacy@younikco.com.
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">引言</h2>
                <p className="mb-4">
                  YouNiKco（"我们"或"我们的"）致力于保护您的隐私。本隐私政策解释了我们在您访问我们的网站或使用我们的服务时如何收集、使用、披露和保护您的信息。
                </p>
                <p>
                  请仔细阅读本隐私政策。通过访问或使用我们的服务，您确认您已阅读、理解并同意受本隐私政策所有条款的约束。
                </p>
              </section>

              <Separator className="my-6" />

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">我们收集的信息</h2>
                <p className="mb-4">我们可能收集以下类型的信息：</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>个人信息：</strong>姓名、电子邮件地址、电话号码、教育背景以及您在填写我们网站上的表格时提供的其他信息。</li>
                  <li><strong>使用数据：</strong>有关您如何使用我们网站的信息，包括访问的页面、在页面上花费的时间和其他统计数据。</li>
                  <li><strong>设备信息：</strong>有关您的设备、IP地址、浏览器类型和操作系统的信息。</li>
                </ul>
              </section>

              <Separator className="my-6" />

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">我们如何使用您的信息</h2>
                <p className="mb-4">我们可能将收集的信息用于各种目的，包括：</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>提供、维护和改进我们的服务</li>
                  <li>处理您的项目申请和咨询</li>
                  <li>就我们的项目和服务与您沟通</li>
                  <li>分析使用模式以提升用户体验</li>
                  <li>遵守法律义务</li>
                </ul>
              </section>

              <Separator className="my-6" />

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">分享您的信息</h2>
                <p className="mb-4">我们可能与以下各方共享您的信息：</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>教育合作伙伴：</strong>我们项目中的学校、大学和其他教育机构。</li>
                  <li><strong>服务提供商：</strong>协助我们提供服务的第三方供应商。</li>
                  <li><strong>法律要求：</strong>法律要求或为保护我们的权利时。</li>
                </ul>
              </section>

              <Separator className="my-6" />

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">您的选择</h2>
                <p className="mb-4">您对您的个人信息有某些权利：</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>访问和更新您的个人信息</li>
                  <li>选择不接收营销通信</li>
                  <li>要求删除您的个人信息（受法律义务约束）</li>
                </ul>
              </section>

              <Separator className="my-6" />

              <section>
                <h2 className="text-2xl font-semibold mb-4">联系我们</h2>
                <p>
                  如果您对本隐私政策有任何疑问或疑虑，请通过privacy@younikco.com与我们联系。
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </FrontendLayout>
  );
};

export default PrivacyPolicyPage;
