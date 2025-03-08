
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getFooterInfo } from "@/services/frontend/footerService";

export const useFrontendFooter = () => {
  const { currentLanguage } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [contactInfo, setContactInfo] = useState({
    phone: "400-400-400",
    email: "info@younicko.com",
    address: "330 Congress Street\nSuite 5 Boston, MA 02210",
    hours: ""
  });
  const [quickLinks, setQuickLinks] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFooterInfo = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const { contactInfo, quickLinks, socialLinks } = await getFooterInfo(currentLanguage);
        
        if (contactInfo) {
          setContactInfo({
            phone: contactInfo.phone || "400-400-400",
            email: contactInfo.email || "info@younicko.com",
            address: contactInfo.address || "330 Congress Street\nSuite 5 Boston, MA 02210",
            hours: contactInfo.hours || ""
          });
        }
        
        setQuickLinks(quickLinks || []);
        setSocialLinks(socialLinks || []);
      } catch (error) {
        console.error("Error fetching footer info:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFooterInfo();
  }, [currentLanguage]);
  
  return {
    isLoading,
    error,
    contactInfo,
    quickLinks,
    socialLinks
  };
};
