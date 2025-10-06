import React from "react";
import { Entity } from "@replyke/react-js";
import { Calendar, Clock } from "lucide-react";
import { formatDate2 } from "../../lib/time-formatters";
import calculateReadingTimeFromMarkdown from "../../helpers/calculateReadingTimeFromMarkdown";
import UserAvatar from "../Layout/Header/UserAvatar";

function ArticleDetails({ article }: { article: Entity }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium">
          {article.metadata.category}
        </span>
      </div>
      <h1 className="text-4xl font-bold lg:text-5xl tracking-tight">
        {article.title}
      </h1>
      <h2 className="text-lg lg:text-xl tracking-tight text-gray-500">
        {article.metadata.excerpt}
      </h2>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <UserAvatar user={article.user!} size={40} />
          <div>
            <p className="text-sm font-medium">{article.user!.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{formatDate2(new Date(article.createdAt))}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>
            {calculateReadingTimeFromMarkdown(article.content || "")} min read
          </span>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetails;
