import Image from "next/image";
import Link from "next/link";
import React from "react";

function RelatedArticles() {
  const entities: any[] = [];
  return (
    <section className="w-full border-t bg-muted/50 py-12">
      <div className="container">
        <h2 className="mb-8 text-2xl font-bold">Related Articles</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {entities.map((relatedPost) => (
            <Link
              key={relatedPost.id}
              href={`/posts/${relatedPost.id}`}
              className="group"
            >
              <div className="overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md">
                <div className="aspect-video w-full overflow-hidden">
                  <Image
                    src={relatedPost.coverImage || "/placeholder.svg"}
                    alt={relatedPost.title}
                    width={300}
                    height={200}
                    className="aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{relatedPost.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {relatedPost.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RelatedArticles;
