import fs from 'fs/promises'
import path from 'path'

export type CaseStudyMeta = {
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  industry: { title: string; href: string };
  results: string[];
  slug: string;
};

export type CaseStudy = {
  slug: string;
  meta: CaseStudyMeta;
};

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  const caseStudiesDirectory = path.join(process.cwd(), 'src/case-studies')
  const files = await fs.readdir(caseStudiesDirectory)
  
  const caseStudies = await Promise.all(
    files
      .filter(file => file.endsWith('.mdx'))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, '')
        const { meta } = await import(`@/case-studies/${file}`)
        
        return {
          slug,
          meta: {
            ...meta,
            slug,
          },
        }
      })
  )

  return caseStudies.sort((a, b) => 
    new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
  )
} 