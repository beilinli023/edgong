
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormOption } from "@/hooks/useFrontendFormContent";

interface EducationInfoSectionProps {
  formData: {
    schoolName: string;
    gradeLevel: string;
    province: string;
    city: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  gradeLevels: FormOption[];
  provinces: FormOption[];
  cities: FormOption[];
  text: {
    schoolName: string;
    gradeLevel: string;
    province: string;
    city: string;
    selectYourGradeLevel: string;
    selectYourProvince: string;
    selectYourCity: string;
  };
  currentLanguage: string;
}

const EducationInfoSection: React.FC<EducationInfoSectionProps> = ({
  formData,
  handleInputChange,
  handleSelectChange,
  gradeLevels,
  provinces,
  cities,
  text,
  currentLanguage
}) => {
  return (
    <>
      {/* 学校名称 */}
      <div>
        <label className="block text-sm font-medium mb-1">
          {text.schoolName}
        </label>
        <Input 
          name="schoolName"
          value={formData.schoolName}
          onChange={handleInputChange}
          placeholder={currentLanguage === 'en' ? "Enter your school name (optional)" : "输入您的学校名称（可选）"}
        />
      </div>

      {/* 年级 */}
      <div>
        <label className="block text-sm font-medium mb-1">
          {text.gradeLevel}
        </label>
        <Select 
          name="gradeLevel" 
          value={formData.gradeLevel} 
          onValueChange={(value) => handleSelectChange("gradeLevel", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder={text.selectYourGradeLevel} />
          </SelectTrigger>
          <SelectContent>
            {gradeLevels.map(level => (
              <SelectItem key={level.id} value={level.id}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 省份和城市 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">
            {text.province}
          </label>
          <Select 
            name="province" 
            value={formData.province} 
            onValueChange={(value) => handleSelectChange("province", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={text.selectYourProvince} />
            </SelectTrigger>
            <SelectContent>
              {provinces.map(province => (
                <SelectItem key={province.id} value={province.id}>
                  {province.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            {text.city}
          </label>
          <Select 
            name="city" 
            value={formData.city} 
            onValueChange={(value) => handleSelectChange("city", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={text.selectYourCity} />
            </SelectTrigger>
            <SelectContent>
              {cities.map(city => (
                <SelectItem key={city.id} value={city.id}>
                  {city.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};

export default EducationInfoSection;
