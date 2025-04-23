import React from "react";
import Image from "next/image";
import { Entity } from "@replyke/core";

function ArticleImage({ article }: { article: Entity }) {
  return (
    <div className="my-8 aspect-video overflow-hidden rounded-lg">
      <Image
        src={article.attachments[0]?.publicPath || "/placeholder.svg"}
        alt={article.title || "Cover Image"}
        width={1200}
        height={600}
        className="aspect-video object-cover"
      />
    </div>
  );
}

export default ArticleImage;
