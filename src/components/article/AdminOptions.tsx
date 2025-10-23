"use client";

import { useState } from "react";
import Link from "next/link";
import { useEntity } from "@replyke/react-js";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getArticleSlug } from "../../helpers/getArticlePath";
import DeleteArticleDialog from "./DeleteArticleDialog";

export function AdminOptions() {
  const { entity } = useEntity();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (!entity) return null;
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4 text-gray-400" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link
              href={`/articles/${getArticleSlug({ title: entity.title })}-${
                entity.shortId
              }/edit`}
            >
              Edit article
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => setShowDeleteDialog(true)}
          >
            Delete article
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteArticleDialog
        showDeleteDialog={showDeleteDialog}
        setShowDeleteDialog={setShowDeleteDialog}
      />
    </>
  );
}
