import React from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Loader2 } from "lucide-react";
import { useFrontendFooter } from "@/hooks/useFrontendFooter";
import { useLanguage } from "@/context/LanguageContext";
import { Logo } from "./Logo";

const FrontendFooter: React.FC = () => {
  const { quickLinks, contactInfo, isLoading } = useFrontendFooter();
  const { currentLanguage } = useLanguage();

  // 过滤掉不需要的链接
  const filteredQuickLinks = quickLinks.filter(link => link.url !== "/why-edgoing");

  // 静态图标数据
  const socialIcons = [
    { name: "Icon 2", src: "/Edgoing/icon/2.png" },
    { name: "Icon 3", src: "/Edgoing/icon/3.png" },
    { name: "Icon 4", src: "/Edgoing/icon/4.png" },
    { name: "Icon 5", src: "/Edgoing/icon/5.png" }
  ];

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
              {/* 导航链接 */}
              <div className="flex flex-col items-center md:items-start md:pl-4">
                <h3 className="text-2xl font-bold uppercase mb-6 tracking-wide text-gray-800">
                  {currentLanguage === 'zh' ? '导航' : 'NAVIGATION'}
                </h3>
                <ul className="space-y-4">
                  {filteredQuickLinks.map((link, index) => (
                    <li key={index}>
                      <Link to={link.url} className="text-base hover:text-blue-600 transition-colors">
                        {currentLanguage === 'zh' ? link.text_zh : link.text_en}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 联系我们 */}
              <div className="flex flex-col items-center md:items-start">
                <h3 className="text-2xl font-bold uppercase mb-6 tracking-wide text-gray-800">
                  {currentLanguage === 'zh' ? '联系我们' : 'CONTACT US'}
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
                    <div className="w-full">
                      <div className="text-base">
                        <span>
                          {currentLanguage === 'zh' ? '地址: ' : 'Address: '}
                        </span>
                        <span className="text-blue-600">
                          {currentLanguage === 'zh' ? '上海市黄埔区' : '18F Tower B,'}
                        </span>
                      </div>
                      <div className="text-base text-blue-600">
                        {currentLanguage === 'zh' ? (
                          '黄陂南路838号 18F B座'
                        ) : (
                          '838 South Huangpi Road'
                        )}
                      </div>
                      <div className="text-base text-blue-600">
                        {currentLanguage === 'zh' ? '' : 'Huangpu District'}
                      </div>
                      <div className="text-base text-blue-600">
                        {currentLanguage === 'zh' ? '' : 'Shanghai, 200025.'}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* 关注我们 */}
              <div className="flex flex-col items-center">
                <h3 className="text-2xl font-bold uppercase mb-6 tracking-wide text-gray-800">
                  {currentLanguage === 'zh' ? '关注我们' : 'FOLLOW US'}
                </h3>
                <div className="flex flex-col items-center">
                  <Logo logoType="footer" />
                  <div className="flex items-center justify-center space-x-4 mt-8">
                    {socialIcons.map((icon, index) => (
                      <div 
                        key={index}
                        className="w-8 h-8 flex items-center justify-center"
                      >
                        <img 
                          src={icon.src} 
                          alt={icon.name}
                          className="w-full h-full object-contain hover:opacity-80 transition-opacity"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-12 pt-8 text-center">
              <p className="text-sm text-gray-500">
                {new Date().getFullYear()} {currentLanguage === 'zh' ? '引里信息咨询（上海）有限公司 版权所有' : 'EdGoing. All rights reserved.'}
              </p>
            </div>
          </>
        )}
      </div>
    </footer>
  );
};

export default FrontendFooter;
