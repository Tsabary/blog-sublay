function stripMarkdown(markdown: string) {
  return markdown
    .replace(/!\[.*?\]\(.*?\)/g, "") // Remove images
    .replace(/\[.*?\]\(.*?\)/g, "") // Remove links
    .replace(/[#>`*_~\-+]+/g, "") // Remove markdown syntax
    .replace(/`{1,3}.*?`{1,3}/g, "") // Remove inline code
    .replace(/\n+/g, " ") // Replace line breaks with space
    .trim();
}

export default function calculateReadingTimeFromMarkdown(markdownText: string) {
  const plainText = stripMarkdown(markdownText);
  const wordsPerMinute = 200;
  const wordCount = plainText.split(/\s+/).length;
  const time = Math.ceil(wordCount / wordsPerMinute);
  return time;
}
