export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Skin notes" | "Design notes" | "Rituals";
  date: string;
  readTime: string;
  tone: "clay" | "forest" | "chalk";
  intro: string;
  sections: { heading: string; body: string }[];
};

// Notes are coming soon. The type stays so the journal routes keep compiling.
export const journalPosts: JournalPost[] = [];

export function getJournalPost(slug: string) {
  return journalPosts.find((post) => post.slug === slug);
}
