
import { BlogPost } from "@/types/blogTypes";

// Mock post for fallback
export const mockPost: BlogPost = {
  id: "1",
  title_en: "10 Tips for Studying Abroad",
  title_zh: "留学10个小贴士",
  slug: "10-tips-for-studying-abroad",
  content_en: `<p>Studying abroad can be one of the most exciting and rewarding experiences of your academic career. Here are 10 tips to help you make the most of your time abroad:</p>

<ol>
    <li><strong>Research your destination:</strong> Learn about the culture, customs, and laws of the country you'll be visiting.</li>
    <li><strong>Learn the language basics:</strong> Even if you're studying in an English-speaking country, learning a few local phrases can go a long way.</li>
    <li><strong>Pack smart:</strong> Bring essentials, but don't overpack. You can usually buy what you need once you arrive.</li>
    <li><strong>Stay open-minded:</strong> Embrace new experiences and be willing to step out of your comfort zone.</li>
    <li><strong>Make local friends:</strong> Don't just stick with other international students. Try to connect with locals to truly immerse yourself in the culture.</li>
    <li><strong>Keep a journal or blog:</strong> Document your experiences. You'll appreciate having these memories later.</li>
    <li><strong>Manage your finances:</strong> Create a budget and stick to it. Look for student discounts and free activities.</li>
    <li><strong>Stay safe:</strong> Be aware of your surroundings and take necessary precautions, just as you would at home.</li>
    <li><strong>Travel when you can:</strong> Take advantage of your location to explore nearby cities or countries during breaks.</li>
    <li><strong>Reflect on your experience:</strong> Take time to think about how your time abroad is changing you and shaping your worldview.</li>
</ol>

<p>Remember, studying abroad is what you make of it. Stay positive, be proactive, and make the most of this incredible opportunity!</p>`,
  content_zh: `<p>留学可能是你学术生涯中最激动人心和最有收获的经历之一。以下是10个帮助你充分利用留学时间的小贴士：</p>

<ol>
    <li><strong>研究你的目的地：</strong> 了解你将要访问的国家的文化、习俗和法律。</li>
    <li><strong>学习基本语言：</strong> 即使你在英语国家学习，学习一些当地短语也会有很大帮助。</li>
    <li><strong>聪明打包：</strong> 带上必需品，但不要过度打包。你通常可以在到达后购买所需物品。</li>
    <li><strong>保持开放心态：</strong> 拥抱新体验，并愿意走出你的舒适区。</li>
    <li><strong>结交当地朋友：</strong> 不要只和其他国际学生在一起。尝试与当地人联系，真正融入文化。</li>
    <li><strong>保持日记或博客：</strong> 记录你的经历。你会感谢以后有这些回忆。</li>
    <li><strong>管理你的财务：</strong> 创建预算并坚持执行。寻找学生折扣和免费活动。</li>
    <li><strong>注意安全：</strong> 注意你的周围环境，采取必要的预防措施，就像在家一样。</li>
    <li><strong>有机会就旅行：</strong> 利用你的位置在假期探索附近的城市或国家。</li>
    <li><strong>反思你的经历：</strong> 花时间思考你的留学经历如何改变你，塑造你的世界观。</li>
</ol>

<p>记住，留学是你自己创造的。保持积极，主动出击，充分利用这个难得的机会！</p>`,
  excerpt_en: "Insights and tips for your study abroad journey",
  excerpt_zh: "为您的留学之旅提供见解和建议",
  featured_image: "/lovable-uploads/016e6197-438b-4fe1-9650-ddabcb0eb8db.png",
  status: "published",
  published_at: "2023-06-15",
  author: "Emma Johnson",
  date: "2023-06-15",
  category: "Study Tips",
  primary_category: {
    id: "1",
    name_en: "Study Tips",
    name_zh: "学习技巧",
    slug: "study-tips"
  },
  tags: [
    {
      id: "1", 
      name_en: "Study Abroad", 
      name_zh: "海外留学", 
      slug: "study-abroad", 
      color: "#3B82F6"
    },
    {
      id: "2", 
      name_en: "Travel", 
      name_zh: "旅行", 
      slug: "travel", 
      color: "#10B981"
    },
    {
      id: "3", 
      name_en: "Education", 
      name_zh: "教育",
      slug: "education", 
      color: "#6366F1"
    },
    {
      id: "4", 
      name_en: "Cultural Exchange", 
      name_zh: "文化交流", 
      slug: "cultural-exchange", 
      color: "#EC4899"
    }
  ]
};
