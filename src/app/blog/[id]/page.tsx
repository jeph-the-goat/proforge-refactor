import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  // const post = await getBlogPost(params.id);
  
  return {
    title: `Blog - ${params.id}`,
    description: `Details about blog ${params.id}`,
    openGraph: {
      title: `BLog - ${params.id}`,
      description: `Details about blog ${params.id}`,
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  // const post = await getBlogPost(params.id);

  // if (!post) {
  //   notFound();
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Article de blog: {params.id}
          </h1>
          <div className="text-gray-600">
            <time dateTime="2024-01-01">1er janvier 2024</time>
            <span className="mx-2">•</span>
            <span>5 min de lecture</span>
          </div>
        </header>
        
        <div className="prose prose-lg max-w-none">
          <p>
            Contenu de l'article de blog avec l'ID: {params.id}
          </p>
          <p>
            Ici vous pouvez afficher le contenu complet de l'article de blog.
            Vous pouvez récupérer les données depuis une API, une base de données,
            ou des fichiers markdown selon votre architecture.
          </p>
        </div>
      </article>
    </div>
  );
} 