
import { BlogContent, BlogTag, BlogCategory, BlogPost, BlogVideo, BlogHero } from "@/types/blogTypes";

// 定义默认的博客标签
const defaultTags: BlogTag[] = [
  { id: "1", name_en: "Academic", name_zh: "学术", slug: "academic", color: "blue" },
  { id: "2", name_en: "Culture", name_zh: "文化", slug: "culture", color: "green" },
  { id: "3", name_en: "Travel", name_zh: "旅行", slug: "travel", color: "amber" },
  { id: "4", name_en: "Experience", name_zh: "体验", slug: "experience", color: "purple" }
];

// 定义默认的博客分类
const defaultCategories: BlogCategory[] = [
  { id: "1", name_en: "Study Abroad", name_zh: "海外学习", slug: "study-abroad", description_en: "All about studying in foreign countries", description_zh: "关于在国外学习的一切" },
  { id: "2", name_en: "Cultural Exchange", name_zh: "文化交流", slug: "cultural-exchange", description_en: "Cultural experiences and exchanges", description_zh: "文化体验与交流" },
  { id: "3", name_en: "Travel Tips", name_zh: "旅行贴士", slug: "travel-tips", description_en: "Tips for travelers", description_zh: "旅行者贴士" }
];

// 默认的博客文章
const defaultPosts: BlogPost[] = [
  {
    id: "1",
    title_en: "My Singapore Adventure: A Journey of Learning and Discovery",
    title_zh: "我的新加坡之旅：阳光小岛的冒险！",
    slug: "singapore-adventure-learning-discovery",
    content_en: `Hey everyone! I just got back from Singapore, and this trip was absolutely amazing! I can't wait to share my experience with you all. This journey was filled with learning, exploration, and of course, food! Let me tell you all about it~

We started with an opening ceremony at Nanyang Technological University (NTU), and honestly, this campus is HUGE! We toured around, and the coolest part was taking photos with The Hive building. It looks just like a beehive (that's where the name comes from!), but what shocked me the most was when our student guide told us there are 56 classrooms inside! Can you believe that? I can't even imagine what it's like having classes in such a cool building.

After the campus tour, we went to try the famous Song Fa Bak Kut Teh. It was my first time trying this dish, and it was... interesting. The dough fritters were great with the soup, but the soup itself was too spicy for me, with a really strong pepper taste. Still, it was fun trying something new! Oh, and throughout the trip, we tried lots of Malay food too. The flavors were so rich and different from what I usually eat. I'm definitely a Malay food fan now!

Honestly, the AI courses at NTU were pretty interesting too. We discussed AI applications and heard many real-world cases, which really opened my eyes to a whole new world. The best part? After the course, we got to create our own model! Seeing what we learned turn into something real was super fulfilling.

Now, let me tell you about the most exciting part - Sentosa Island! I didn't know before that Sentosa is actually a separate island. People used to only be able to get there by cable car or car, but a few years ago they built a walkway, making it much more convenient to visit now. And oh, the roller coasters at Universal Studios were so thrilling! I screamed the whole time, but it was SO much fun! If you go to Sentosa, you absolutely must try them - you won't regret it!

This trip was truly one of the best experiences I've ever had. I explored a massive university, tried new foods, learned about AI, and had a blast at Sentosa. Singapore is such a sunny, vibrant place full of surprises everywhere you look. If you ever get the chance to go, don't hesitate - just go for it!`,
    content_zh: `大家好！我刚刚从新加坡回来，这趟旅行真的太棒了，我一定要跟你们分享一下！这次旅行有学习、有探索，当然还有美食！下面就来聊聊我的经历吧～我们一开始参加了南洋理工大学（NTU）的开营仪式，说实话，这个学校真的超级大！我们参观了校园，最酷的是和The Hive大楼拍了照。这栋楼看起来像个蜂巢（名字就是这么来的嘛），但最让我震惊的是，学生导游告诉我们，里面竟然有56间教室！这也太夸张了吧？我完全无法想象在这么酷的建筑里上课是什么感觉。参观完校园后，我们去吃了有名的松发肉骨茶。这是我第一次尝试肉骨茶，感觉……挺特别的。油条配汤很好吃，但汤本身对我来说太辣了，胡椒味太重。不过，尝试新东西还是挺有趣的！对了，整个旅行中我们还吃了很多马来菜，味道超级丰富，和我平时吃的东西很不一样。我现在已经是马来菜的粉丝了！说实话，NTU的人工智能课程还挺有意思的。我们讨论了AI的应用，听了很多实际案例，感觉打开了新世界的大门。最棒的是，课程结束后我们还自己动手做了一个模型！看到学到的知识变成实际的东西，真的超有成就感。现在来说说最开心的部分——圣淘沙岛！我之前都不知道，圣淘沙其实是一个独立的小岛。以前人们只能坐缆车或开车去，但几年前他们建了一条步行道，现在去圣淘沙方便多了。还有，环球影城的过山车真的太刺激了！我全程尖叫，但真的超级好玩！如果你去圣淘沙，一定要试试，绝对不会后悔！这次旅行真的是我经历过最棒的事情之一。我参观了一所超大的大学，尝试了新美食，学习了人工智能，还在圣淘沙玩得超嗨。新加坡真的是一个又阳光、又充满活力的地方，到处都是惊喜。如果你有机会去，千万别犹豫，赶紧出发吧！​`,
    excerpt_en: "Join me on my exciting journey through Singapore, where I explored NTU's amazing campus, experienced local cuisine, learned about AI, and had a blast at Sentosa Island!",
    excerpt_zh: "跟随我的新加坡之旅，探索南洋理工大学的精彩校园，品尝当地美食，学习人工智能，在圣淘沙岛尽情玩乐！",
    featured_image: "/lovable-uploads/8938e5c0-ccf2-466d-b9f3-c7e3c0f599ff.png",
    status: "published",
    published_at: "2025-03-09",
    author: "Emma Chen",
    date: "2025-03-09",
    category: "Study Abroad",
    primary_category: defaultCategories[0],
    tags: [defaultTags[0], defaultTags[1], defaultTags[2], defaultTags[3]]
  },
  {
    id: "2",
    title_en: "How to Prepare for Your First Cultural Exchange Program",
    title_zh: "如何准备你的第一个文化交流项目",
    slug: "prepare-first-cultural-exchange-program",
    content_en: "Learn how to prepare mentally, emotionally, and practically for your first cultural exchange experience, with tips from program alumni.",
    content_zh: "了解如何在心理上、情感上和实际上为您的第一次文化交流体验做准备，附有项目校友的建议。",
    excerpt_en: "Practical advice for making the most of your cultural exchange program, with insights from past participants.",
    excerpt_zh: "充分利用文化交流项目的实用建议，附有往届参与者的见解。",
    featured_image: "/lovable-uploads/095982ef-a87c-40ba-a4fe-d4d95ab84dae.png",
    status: "published",
    published_at: "2023-09-05",
    author: "Miguel Rodriguez",
    date: "2023-09-05",
    category: "Cultural Exchange",
    primary_category: defaultCategories[1],
    tags: [defaultTags[1], defaultTags[3]]
  },
  {
    id: "3",
    title_en: "10 Essential Packing Tips for Long-Term International Students",
    title_zh: "长期国际留学生的10个必备行李打包技巧",
    slug: "essential-packing-tips-international-students",
    content_en: "Avoid common packing mistakes with these essential tips for international students preparing for long-term stays abroad.",
    content_zh: "通过这些针对准备长期出国留学的国际学生的基本提示，避免常见的行李打包错误。",
    excerpt_en: "What to bring (and what to leave behind) when moving abroad for your studies.",
    excerpt_zh: "出国留学时应带什么（以及应留下什么）。",
    featured_image: "/lovable-uploads/f0b87c9a-14ef-4e95-ae65-07fe4018b1fc.png",
    status: "published",
    published_at: "2023-10-20",
    author: "Jessica Wong",
    date: "2023-10-20",
    category: "Travel Tips",
    primary_category: defaultCategories[2],
    tags: [defaultTags[0], defaultTags[2]]
  }
];

// 默认的博客视频
const defaultVideos: BlogVideo[] = [
  {
    id: "1",
    title_en: "A Day in the Life: International Student in Paris",
    title_zh: "一天的生活：巴黎国际学生",
    youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "/lovable-uploads/46fca3c1-4f18-4f48-935c-a97e8bb6eeb8.png",
    category: defaultCategories[0]
  },
  {
    id: "2",
    title_en: "How to Apply for Student Visas: Expert Tips",
    title_zh: "如何申请学生签证：专家提示",
    youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "/lovable-uploads/baa8050a-2b39-4cf4-8add-603763b1c755.png",
    category: defaultCategories[0]
  }
];

// 默认的博客英雄部分
const defaultHero: BlogHero = {
  title_en: "YouNiKco Education Blog",
  title_zh: "YouNiKco教育博客",
  subtitle_en: "Insights, Tips, and Stories from International Education",
  subtitle_zh: "国际教育的见解、提示和故事",
  background_image: "/lovable-uploads/871521cd-c1f5-450c-9de9-af23b940745e.png"
};

// 导出默认内容
export const defaultContent: BlogContent = {
  hero: defaultHero,
  posts: defaultPosts,
  videos: defaultVideos
};
