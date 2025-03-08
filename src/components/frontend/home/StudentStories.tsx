
import React from 'react';
import { Star, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useFrontendStudentStories } from '@/hooks/useFrontendStudentStories';

interface StudentStoriesProps {
  currentLanguage: 'en' | 'zh';
}

const StudentStories: React.FC<StudentStoriesProps> = ({ currentLanguage }) => {
  const [currentStory, setCurrentStory] = React.useState(0);
  const { stories, isLoading } = useFrontendStudentStories(currentLanguage);

  const nextStory = () => {
    if (stories.length > 0) {
      setCurrentStory((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
    }
  };

  const prevStory = () => {
    if (stories.length > 0) {
      setCurrentStory((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
    }
  };

  if (isLoading) {
    return (
      <div className="py-16 bg-white flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // 如果没有获取到故事数据，显示一个回退版本
  if (!stories || stories.length === 0) {
    const fallbackStories = [
      {
        id: 1,
        name: "Sarah Chen",
        image: "/placeholder.svg",
        background: currentLanguage === 'en' ? "UCLA Cognitive Science Major" : "加州大学洛杉矶分校认知科学专业",
        rating: 5,
        testimony: currentLanguage === 'en' 
          ? "I had an enjoyable time exploring the streets of Kyoto and immersing myself in its rich culture, especially experiencing the powerful beats of Japanese drums and participating in vibrant summer festivals."
          : "我在京都的街头漫步，沉浸在其丰富的文化中，度过了非常愉快的时光，尤其是体验了日本太鼓的强劲节奏，并参加了充满活力的夏日祭典。"
      },
      {
        id: 2,
        name: "David Wang",
        image: "/placeholder.svg",
        background: currentLanguage === 'en' ? "Princeton University" : "普林斯顿大学",
        rating: 4,
        testimony: currentLanguage === 'en'
          ? "The academic research program helped me clarify my career goals and gave me hands-on experience in my field of interest."
          : "学术研究项目帮助我明确了职业目标，并让我在感兴趣的领域获得了实践经验。"
      },
      {
        id: 3,
        name: "Sophie Lin",
        image: "/placeholder.svg",
        background: currentLanguage === 'en' ? "Phillips Exeter Academy" : "菲利普斯埃克塞特学院",
        rating: 5,
        testimony: currentLanguage === 'en'
          ? "I never thought I could gain so much confidence in just two weeks. The cultural immersion program was incredible."
          : "我从未想过可以在短短两周内获得如此多的自信。文化沉浸项目令人难以置信。"
      }
    ];

    return renderContent(fallbackStories);
  }

  return renderContent(stories);

  // 渲染内容的辅助函数
  function renderContent(storiesData: any[]) {
    if (storiesData.length === 0) return null;

    const story = storiesData[currentStory % storiesData.length];

    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-6">
            <h2 className="text-3xl font-bold mb-2">{currentLanguage === 'en' ? 'Student Stories' : '学生故事'}</h2>
            <p className="text-gray-600">
              {currentLanguage === 'en' 
                ? 'Hear from our students about their transformative experiences abroad.'
                : '聆听我们的学生分享他们在国外的转变体验。'}
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div className="py-8 px-4 relative">
              <div className="text-center mb-8">
                <p className="text-lg font-italic mb-6">"{story.testimony}"</p>
                <div className="flex justify-center mb-2">
                  <img 
                    src={story.image} 
                    alt={story.name} 
                    className="w-16 h-16 rounded-full object-cover mb-3"
                  />
                </div>
                <h3 className="font-semibold text-gray-900">{story.name}</h3>
                <p className="text-sm text-gray-600">{story.background}</p>
                <p className="text-sm text-blue-600 mt-1 font-medium">{story.program}</p>
                
                <div className="flex items-center justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < story.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center mt-4">
                {storiesData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStory(index)}
                    className={`w-2 h-2 mx-1 rounded-full transition-colors ${
                      index === currentStory ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to story ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {storiesData.length > 1 && (
              <>
                <button 
                  onClick={prevStory}
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Previous story"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button 
                  onClick={nextStory}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Next story"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default StudentStories;
