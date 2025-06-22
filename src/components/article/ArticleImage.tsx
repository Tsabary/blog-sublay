import React from "react";
import Image from "next/image";
import { Entity } from "@replyke/core";
import { convertFilesToProxiedUrl } from "../../lib/convert-files-to-proxied-url";

function ArticleImage({ article }: { article: Entity }) {
  const image = article.attachments[0]?.publicPath
    ? convertFilesToProxiedUrl(article.attachments[0]?.publicPath)
    : "/placeholder.svg";

  return (
    <div className="my-8 aspect-video overflow-hidden rounded-lg">
      <Image
        src={image}
        alt={article.title || "Cover Image"}
        width={1200}
        height={600}
        className="aspect-video object-cover"
      />
    </div>
  );
}

export default ArticleImage;
