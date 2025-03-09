
import { BlogPost } from "@/types/blogTypes";

// Mock post for fallback
export const mockPost: BlogPost = {
  id: "1",
  title_en: "My Singapore Adventure: A Journey of Learning and Discovery",
  title_zh: "我的新加坡之旅：阳光小岛的冒险！",
  slug: "singapore-adventure-learning-discovery",
  content_en: `<p>Hey everyone! I just got back from Singapore, and this trip was absolutely amazing! I can't wait to share my experience with you all. This journey was filled with learning, exploration, and of course, food! Let me tell you all about it~</p>

<h3>探访南洋理工大学</h3>
<p>We started with an opening ceremony at Nanyang Technological University (NTU), and honestly, this campus is HUGE! We toured around, and the coolest part was taking photos with The Hive building. It looks just like a beehive (that's where the name comes from!), but what shocked me the most was when our student guide told us there are 56 classrooms inside! Can you believe that? I can't even imagine what it's like having classes in such a cool building.</p>

<h3>品尝当地美食</h3>
<p>After the campus tour, we went to try the famous Song Fa Bak Kut Teh. It was my first time trying this dish, and it was... interesting. The dough fritters were great with the soup, but the soup itself was too spicy for me, with a really strong pepper taste. Still, it was fun trying something new!</p>

<p>Oh, and throughout the trip, we tried lots of Malay food too. The flavors were so rich and different from what I usually eat. I'm definitely a Malay food fan now!</p>

<h3>人工智能课程</h3>
<p>Honestly, the AI courses at NTU were pretty interesting too. We discussed AI applications and heard many real-world cases, which really opened my eyes to a whole new world. The best part? After the course, we got to create our own model! Seeing what we learned turn into something real was super fulfilling.</p>

<h3>圣淘沙岛探险</h3>
<p>Now, let me tell you about the most exciting part - Sentosa Island! I didn't know before that Sentosa is actually a separate island. People used to only be able to get there by cable car or car, but a few years ago they built a walkway, making it much more convenient to visit now.</p>

<p>And oh, the roller coasters at Universal Studios were so thrilling! I screamed the whole time, but it was SO much fun! If you go to Sentosa, you absolutely must try them - you won't regret it!</p>

<h3>难忘的旅程</h3>
<p>This trip was truly one of the best experiences I've ever had. I explored a massive university, tried new foods, learned about AI, and had a blast at Sentosa. Singapore is such a sunny, vibrant place full of surprises everywhere you look. If you ever get the chance to go, don't hesitate - just go for it!</p>`,
  content_zh: `<p>大家好！我刚刚从新加坡回来，这趟旅行真的太棒了，我一定要跟你们分享一下！这次旅行有学习、有探索，当然还有美食！下面就来聊聊我的经历吧～</p>

<h3>探访南洋理工大学</h3>
<p>我们一开始参加了南洋理工大学（NTU）的开营仪式，说实话，这个学校真的超级大！我们参观了校园，最酷的是和The Hive大楼拍了照。这栋楼看起来像个蜂巢（名字就是这么来的嘛），但最让我震惊的是，学生导游告诉我们，里面竟然有56间教室！这也太夸张了吧？我完全无法想象在这么酷的建筑里上课是什么感觉。</p>

<h3>品尝当地美食</h3>
<p>参观完校园后，我们去吃了有名的松发肉骨茶。这是我第一次尝试肉骨茶，感觉……挺特别的。油条配汤很好吃，但汤本身对我来说太辣了，胡椒味太重。不过，尝试新东西还是挺有趣的！</p>

<p>对了，整个旅行中我们还吃了很多马来菜，味道超级丰富，和我平时吃的东西很不一样。我现在已经是马来菜的粉丝了！</p>

<h3>人工智能课程</h3>
<p>说实话，NTU的人工智能课程还挺有意思的。我们讨论了AI的应用，听了很多实际案例，感觉打开了新世界的大门。最棒的是，课程结束后我们还自己动手做了一个模型！看到学到的知识变成实际的东西，真的超有成就感。</p>

<h3>圣淘沙岛探险</h3>
<p>现在来说说最开心的部分——圣淘沙岛！我之前都不知道，圣淘沙其实是一个独立的小岛。以前人们只能坐缆车或开车去，但几年前他们建了一条步行道，现在去圣淘沙方便多了。</p>

<p>还有，环球影城的过山车真的太刺激了！我全程尖叫，但真的超级好玩！如果你去圣淘沙，一定要试试，绝对不会后悔！</p>

<h3>难忘的旅程</h3>
<p>这次旅行真的是我经历过最棒的事情之一。我参观了一所超大的大学，尝试了新美食，学习了人工智能，还在圣淘沙玩得超嗨。新加坡真的是一个又阳光、又充满活力的地方，到处都是惊喜。如果你有机会去，千万别犹豫，赶紧出发吧！</p>`,
  excerpt_en: "Join me on my exciting journey through Singapore, where I explored NTU's amazing campus, experienced local cuisine, learned about AI, and had a blast at Sentosa Island!",
  excerpt_zh: "跟随我的新加坡之旅，探索南洋理工大学的精彩校园，品尝当地美食，学习人工智能，在圣淘沙岛尽情玩乐！",
  featured_image: "/lovable-uploads/016e6197-438b-4fe1-9650-ddabcb0eb8db.png",
  status: "published",
  published_at: "2023-06-15",
  author: "Emma Johnson",
  date: "2023-06-15",
  category: "Travel",
  primary_category: {
    id: "2",
    name_en: "Travel",
    name_zh: "旅行",
    slug: "travel"
  },
  tags: [
    {
      id: "2", 
      name_en: "Travel", 
      name_zh: "旅行", 
      slug: "travel", 
      color: "#10B981"
    },
    {
      id: "5", 
      name_en: "Singapore", 
      name_zh: "新加坡", 
      slug: "singapore", 
      color: "#F59E0B"
    },
    {
      id: "6", 
      name_en: "Food", 
      name_zh: "美食",
      slug: "food", 
      color: "#EF4444"
    },
    {
      id: "7", 
      name_en: "Adventure", 
      name_zh: "冒险", 
      slug: "adventure", 
      color: "#8B5CF6"
    }
  ]
};
