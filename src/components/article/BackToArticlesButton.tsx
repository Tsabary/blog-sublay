import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";

function BackToArticlesButton() {
  return (
    <div className="mt-8 flex items-center justify-between border-t pt-8">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-1">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </div>
      <Button variant="outline" size="sm" asChild>
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Articles
        </Link>
      </Button>
    </div>
  );
}

export default BackToArticlesButton;
