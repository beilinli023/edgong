import { BlogPost, BlogCategory, BlogTag } from '@/types/blogTypes';

// 添加时间戳以防止缓存
const addCacheBuster = (url: string): string => {
  const cacheBuster = `_t=${new Date().getTime()}`;
  return url.includes('?') ? `${url}&${cacheBuster}` : `${url}?${cacheBuster}`;
};

// 从文件系统加载博客文章列表
export const loadBlogPostsFromFiles = async (): Promise<BlogPost[]> => {
  try {
    // 尝试加载文章列表文件
    const response = await fetch(addCacheBuster('/content/blog/index.json'));
    
    if (!response.ok) {
      console.error('无法加载博客文章索引文件');
      return [];
    }
    
    const postIndexes = await response.json();
    
    // 加载所有文章内容
    const postsPromises = postIndexes.map(async (filename: string) => {
      try {
        const postResponse = await fetch(addCacheBuster(`/content/blog/${filename}`));
        if (!postResponse.ok) {
          console.error(`无法加载博客文章: ${filename}`);
          return null;
        }
        
        return await postResponse.json();
      } catch (error) {
        console.error(`加载博客文章失败: ${filename}`, error);
        return null;
      }
    });
    
    const posts = await Promise.all(postsPromises);
    return posts.filter((post): post is BlogPost => post !== null);
  } catch (error) {
    console.error('加载博客文章列表失败:', error);
    return [];
  }
};

// 从文件系统加载单个博客文章
export const loadBlogPostFromFile = async (idOrSlug: string): Promise<BlogPost | null> => {
  try {
    // 首先尝试通过ID或slug直接加载
    try {
      const response = await fetch(addCacheBuster(`/content/blog/${idOrSlug}.json`));
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log(`直接通过ID/Slug查找失败: ${idOrSlug}`);
    }
    
    // 如果直接查找失败，则加载索引文件
    const indexResponse = await fetch(addCacheBuster('/content/blog/index.json'));
    if (!indexResponse.ok) {
      console.error('无法加载博客文章索引文件');
      return null;
    }
    
    const filenames = await indexResponse.json();
    
    // 遍历所有文章，查找匹配的ID或slug
    for (const filename of filenames) {
      try {
        const postResponse = await fetch(addCacheBuster(`/content/blog/${filename}`));
        if (!postResponse.ok) continue;
        
        const post = await postResponse.json();
        
        // 检查是否匹配
        if (
          post.id.toString() === idOrSlug || 
          post.slug === idOrSlug ||
          post.slug.includes(idOrSlug)
        ) {
          return post;
        }
      } catch (error) {
        console.error(`检查文章失败: ${filename}`, error);
      }
    }
    
    console.log(`未找到匹配的博客文章: ${idOrSlug}`);
    return null;
  } catch (error) {
    console.error(`加载博客文章失败: ${idOrSlug}`, error);
    return null;
  }
};

// 从文件系统加载分类
export const loadCategoriesFromFile = async (): Promise<BlogCategory[]> => {
  try {
    const response = await fetch(addCacheBuster('/content/blog/categories.json'));
    if (!response.ok) {
      console.error('无法加载博客分类文件');
      return [];
    }
    
    return await response.json();
  } catch (error) {
    console.error('加载博客分类失败:', error);
    return [];
  }
};

// 从文件系统加载标签
export const loadTagsFromFile = async (): Promise<BlogTag[]> => {
  try {
    const response = await fetch(addCacheBuster('/content/blog/tags.json'));
    if (!response.ok) {
      console.error('无法加载博客标签文件');
      return [];
    }
    
    return await response.json();
  } catch (error) {
    console.error('加载博客标签失败:', error);
    return [];
  }
}; 