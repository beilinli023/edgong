
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

export interface SocialMedia {
  id: number;
  name: string;
  icon: string;
  url: string;
  platform: string;
  order: number;
}

// Mock service functions
const getSocialMedia = async (): Promise<SocialMedia[]> => {
  // Mock data that includes all 5 social media platforms from the image
  return [
    { id: 1, name: "Facebook", icon: "facebook", url: "https://facebook.com", platform: "facebook", order: 1 },
    { id: 2, name: "LinkedIn", icon: "linkedin", url: "https://linkedin.com", platform: "linkedin", order: 2 },
    { id: 3, name: "Instagram", icon: "instagram", url: "https://instagram.com", platform: "instagram", order: 3 },
    { id: 4, name: "YouTube", icon: "youtube", url: "https://youtube.com", platform: "youtube", order: 4 },
    { id: 5, name: "WeChat", icon: "wechat", url: "#", platform: "wechat", order: 5 }
  ];
};

const saveSocialMediaToServer = async (media: SocialMedia[]): Promise<SocialMedia[]> => {
  // Mock implementation
  console.log("Saving social media:", media);
  return media;
};

const uploadLogoToServer = async (file: File): Promise<{ url: string }> => {
  // Mock implementation
  console.log("Uploading logo:", file.name);
  return { url: "/placeholder.svg" };
};

export const useSocialMedia = () => {
  const queryClient = useQueryClient();
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([]);
  const [newSocialMedia, setNewSocialMedia] = useState<Omit<SocialMedia, "id">>({
    name: "",
    icon: "",
    url: "",
    platform: "",
    order: 0
  });
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [isLogoUploading, setIsLogoUploading] = useState<boolean>(false);

  // 获取社交媒体信息
  const { isLoading } = useQuery({
    queryKey: ['socialMedia'],
    queryFn: getSocialMedia,
    meta: {
      onSuccess: (data: SocialMedia[]) => {
        if (data) {
          setSocialMedia(data);
        }
      }
    },
    staleTime: 1000 * 60 * 5
  });

  // 获取Logo URL
  const { isLoading: isLogoLoading } = useQuery({
    queryKey: ['footerLogo'],
    queryFn: async () => {
      // 这里会替换为真实的API调用，获取Logo URL
      return { url: "/placeholder.svg" };
    },
    meta: {
      onSuccess: (data: { url: string }) => {
        if (data && data.url) {
          setLogoUrl(data.url);
        }
      }
    },
    staleTime: 1000 * 60 * 5
  });

  // 保存社交媒体信息
  const mediaMutation = useMutation({
    mutationFn: saveSocialMediaToServer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['socialMedia'] });
      toast({
        title: "保存成功",
        description: "社交媒体链接已更新",
      });
    },
    onError: () => {
      toast({
        title: "保存失败",
        description: "无法保存社交媒体链接，请稍后重试",
        variant: "destructive"
      });
    }
  });

  // 上传Logo
  const logoMutation = useMutation({
    mutationFn: uploadLogoToServer,
    onMutate: () => {
      setIsLogoUploading(true);
    },
    onSuccess: (data) => {
      setLogoUrl(data?.url || "");
      queryClient.invalidateQueries({ queryKey: ['footerLogo'] });
      toast({
        title: "上传成功",
        description: "页脚Logo已更新",
      });
      setIsLogoUploading(false);
    },
    onError: () => {
      toast({
        title: "上传失败",
        description: "无法上传Logo，请稍后重试",
        variant: "destructive"
      });
      setIsLogoUploading(false);
    }
  });

  const addSocialMedia = () => {
    if (newSocialMedia.name && newSocialMedia.url) {
      // 在真实环境中，ID会由后端生成
      const tempId = Date.now();
      const updatedMedia = [...socialMedia, { id: tempId, ...newSocialMedia }];
      setSocialMedia(updatedMedia);
      mediaMutation.mutate(updatedMedia);
      setNewSocialMedia({ name: "", icon: "", url: "", platform: "", order: 0 });
    }
  };

  const updateSocialMedia = (id: number, updates: Partial<SocialMedia>) => {
    const updatedMedia = socialMedia.map(item => 
      item.id === id ? { ...item, ...updates } : item
    );
    setSocialMedia(updatedMedia);
  };

  const removeSocialMedia = (id: number) => {
    const updatedMedia = socialMedia.filter(item => item.id !== id);
    setSocialMedia(updatedMedia);
  };

  const saveSocialMediaChanges = () => {
    mediaMutation.mutate(socialMedia);
  };

  const handleUploadLogo = (file: File) => {
    logoMutation.mutate(file);
  };

  return {
    socialMedia,
    setSocialMedia,
    newSocialMedia,
    setNewSocialMedia,
    addSocialMedia,
    updateSocialMedia,
    removeSocialMedia,
    saveSocialMedia: saveSocialMediaChanges,
    logoUrl,
    uploadLogo: handleUploadLogo,
    isLoading: isLoading || isLogoLoading,
    isPending: mediaMutation.isPending,
    isLogoUploading
  };
};
