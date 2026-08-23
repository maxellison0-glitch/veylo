import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getJournalPost, journalPosts } from "@/lib/journal";

export function generateStaticParams() { return journalPosts.map((post) => ({ slug: post.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getJournalPost((await params).slug);
  return post ? { title: post.title, description: post.excerpt, openGraph: { type: "article", title: post.title, description: post.excerpt } } : {};
}

export default async function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getJournalPost((await params).slug);
  if (!post) notFound();
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: post.title, description: post.excerpt, author: { "@type": "Organization", name: "Veylo" }, publisher: { "@type": "Organization", name: "Veylo" } };
  return (
    <main className="article-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <header className="article-header"><div className="site-container"><Link className="article-back" href="/journal"><ArrowLeft size={15} /> Back to notes</Link><span className="eyebrow">{post.category} · {post.readTime}</span><h1>{post.title}</h1><p>{post.excerpt}</p><div><span>{post.date}</span><span>Written by Veylo</span></div></div></header>
      <article className="article-body"><p className="article-intro">{post.intro}</p>{post.sections.map((section, index) => <section key={section.heading}><span>0{index + 1}</span><h2>{section.heading}</h2><p>{section.body}</p></section>)}</article>
    </main>
  );
}
