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
    { name: "Icon 2", src: "/Edgoing/icon/2.png", url: "https://www.linkedin.com/feed/update/urn:li:activity:7305866085268889600" },
    { name: "Icon 3", src: "/Edgoing/icon/3.png", url: "https://www.instagram.com/edgoing_global?igsh=MTQwb3M2NHl2YjFjMA%3D%3D&utm_source=qr" },
    { name: "Icon 4", src: "/Edgoing/icon/4.png", url: "https://mp.weixin.qq.com/s/5MthyqojmOut9rg8zoBH6Q" },
    { name: "Icon 5", src: "/Edgoing/icon/5.png", url: "https://www.xiaohongshu.com/user/profile/5d402d9b000000001203ce50?xsec_token=YB3thkt5dHkUpr6M0y2eZrTOxC0gq8U25n7T4_zQ6USk0=&xsec_source=app_share&xhsshare=CopyLink&appuid=5d402d9b000000001203ce50&apptime=1742017280&share_id=d68757aa651049e18d2402a31c575cfc" }
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16 px-4 md:px-12 lg:px-24">
              {/* 导航链接 */}
              <div className="flex flex-col items-center md:items-start md:self-start md:justify-between h-full">
                <div>
                  <h3 className="text-2xl font-bold uppercase mb-6 tracking-wide text-gray-800">
                    {currentLanguage === 'zh' ? '导航' : 'NAVIGATION'}
                  </h3>
                  <ul className="space-y-3">
                    {filteredQuickLinks.map((link, index) => (
                      <li key={index}>
                        <Link to={link.url} className="text-base hover:text-blue-600 transition-colors">
                          {currentLanguage === 'zh' 
                            ? (link.text_zh === "开始规划" ? "开始项目" : link.text_zh) 
                            : (link.text_en === "Start Planning" ? "Let's Plan" : link.text_en)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 联系我们 */}
              <div className="flex flex-col items-center md:items-start md:self-start md:justify-between h-full">
                <div>
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
                      <div>
                        <span className="text-base">
                          {currentLanguage === 'zh' ? '地址: ' : 'Address: '}
                        </span>
                        <span className="text-base">
                          {currentLanguage === 'zh' ? (
                            <div className="flex flex-col">
                              <span>上海市黄埔区黄陂南路838号</span>
                              <span>中海国际B座18楼</span>
                            </div>
                          ) : (
                            <div className="flex flex-col">
                              <span>18F, Tower B,</span>
                              <span>838 South Huangpi Road</span>
                              <span>Huangpu District</span>
                              <span>Shanghai, 200025.</span>
                            </div>
                          )}
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 关注我们 */}
              <div className="flex flex-col items-center md:items-start md:self-start md:justify-between h-full">
                <div>
                  <h3 className="text-2xl font-bold uppercase mb-6 tracking-wide text-gray-800">
                    {currentLanguage === 'zh' ? '关注我们' : 'FOLLOW US'}
                  </h3>
                  <div className="w-full mb-4">
                    <p className="text-base mb-4">
                      {currentLanguage === 'zh' 
                        ? '通过社交媒体关注我们，了解最新动态和教育资讯' 
                        : 'Follow us on social media for updates and educational insights'}
                    </p>
                    <div className="flex items-center justify-center md:justify-start space-x-5 mb-6">
                      {socialIcons.map((icon, index) => (
                        <div 
                          key={index}
                          className="w-9 h-9 flex items-center justify-center"
                        >
                          <a href={icon.url} target="_blank" rel="noopener noreferrer">
                            <img 
                              src={icon.src} 
                              alt={icon.name}
                              className="w-full h-full object-contain hover:opacity-80 transition-opacity"
                            />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="md:self-start opacity-80">
                    <Logo logoType="footer" className="h-14 w-auto" />
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
