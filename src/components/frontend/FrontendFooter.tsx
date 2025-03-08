import React from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Loader2 } from "lucide-react";
import { useFrontendFooter } from "@/hooks/useFrontendFooter";
import { useLanguage } from "@/context/LanguageContext";
import { Logo } from "./Logo";

const FrontendFooter: React.FC = () => {
  const { quickLinks, contactInfo, socialLinks, isLoading } = useFrontendFooter();
  const { currentLanguage } = useLanguage();

  return (
    <footer className="bg-white text-gray-600 border-t border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 py-12">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:px-8 lg:px-16">
              {/* 快速链接 */}
              <div className="flex flex-col items-center md:items-start md:pl-4">
                <h3 className="text-2xl font-bold uppercase mb-6 tracking-wide text-gray-800">
                  {currentLanguage === 'zh' ? '快速链接' : 'QUICK LINKS'}
                </h3>
                <ul className="space-y-4">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <Link to={link.url} className="text-base hover:text-blue-600 transition-colors">
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 需要帮助? */}
              <div className="flex flex-col items-center md:items-start">
                <h3 className="text-2xl font-bold uppercase mb-6 tracking-wide text-gray-800">
                  {currentLanguage === 'zh' ? '需要帮助?' : 'NEED HELP?'}
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-2 items-start">
                    <div>
                      <span className="text-base">
                        {currentLanguage === 'zh' ? '联系电话: ' : 'Call Us: '}
                      </span>
                      <span className="text-base text-blue-600">{contactInfo.phone}</span>
                    </div>
                  </li>
                  <li className="flex gap-2 items-start">
                    <div>
                      <span className="text-base">
                        {currentLanguage === 'zh' ? '邮箱: ' : 'Email: '}
                      </span>
                      <a href={`mailto:${contactInfo.email}`} className="text-base text-blue-600 hover:underline">
                        {contactInfo.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-2 items-start">
                    <div>
                      <div className="text-base mb-1">
                        {currentLanguage === 'zh' ? '地址:' : 'Address:'}
                      </div>
                      <address className="not-italic text-base text-blue-600 leading-relaxed text-left">
                        {currentLanguage === 'zh' ? (
                          <>
                            <div>上海市黄埔区黄陂南路838号</div>
                            <div>中海国际B座18楼</div>
                          </>
                        ) : (
                          <>
                            <div>18F, Tower B, China Overseas,</div>
                            <div>838 S. Huangpi Road, Huangpu, Shanghai</div>
                          </>
                        )}
                      </address>
                    </div>
                  </li>
                </ul>
              </div>

              {/* 联系我们 */}
              <div className="flex flex-col items-center md:pr-4">
                <h3 className="text-2xl font-bold uppercase mb-6 tracking-wide text-gray-800">
                  {currentLanguage === 'zh' ? '联系我们' : 'CONNECT WITH US'}
                </h3>

                <div className="flex flex-col items-center">
                  <div className="flex justify-center mb-6">
                    <Logo className="h-14 w-auto" />
                  </div>
                  
                  <div className="flex space-x-5 justify-center mb-2">
                    <a href="https://www.facebook.com/edgoing" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    </a>
                    <a href="https://www.linkedin.com/company/edgoing" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                    <a href="https://www.instagram.com/edgoing.official" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </a>
                    <a href="https://www.youtube.com/channel/edgoing" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-200 text-center text-sm">
              <p> 2025 引里信息咨询（上海）有限公司 保留所有权</p>
            </div>
          </>
        )}
      </div>
    </footer>
  );
};

export default FrontendFooter;
