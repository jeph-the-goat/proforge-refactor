import fs from 'fs/promises'
import path from 'path'

export type PostMeta = {
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  category: { title: string; href: string };
  slug: string;
};

export type Post = {
  slug: string;
  meta: PostMeta;
};

export async function getAllPosts(): Promise<Post[]> {
  const postsDirectory = path.join(process.cwd(), 'src/posts')
  const files = await fs.readdir(postsDirectory)
  
  const posts = await Promise.all(
    files
      .filter(file => file.endsWith('.mdx'))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, '')
        const { meta } = await import(`@/posts/${file}`)
        
        return {
          slug,
          meta: {
            ...meta,
            slug,
          },
        }
      })
  )

  return posts.sort((a, b) => 
    new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
  )
} 