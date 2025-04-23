"use client"

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useEntity } from "@replyke/react-js";
import {
  SocialStyleCallbacks,
  useSocialComments,
  useSocialStyle,
} from "@replyke/comments-social-react-js";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function DiscussionSheet({
  isSheetOpen,
  onClose,
}: {
  isSheetOpen: boolean;
  onClose: () => void;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { entity } = useEntity();

  const callbacks: SocialStyleCallbacks = {
    loginRequiredCallback: () => {
      toast("Please log in first");
    },
  };
  const styleConfig = useSocialStyle();

  const { CommentSectionProvider, SortByButton, CommentsFeed, NewCommentForm } =
    useSocialComments({
      entityId: entity?.id,
      styleConfig,
      callbacks,
    });

  const sortByOptions = (
    <div className="flex px-6 items-center gap-1">
      <h4 className="font-semibold text-base flex-1">Comments</h4>
      <SortByButton
        priority="top"
        activeView={
          <div className="bg-black py-1 px-2 rounded-md text-white text-xs">
            Top
          </div>
        }
        nonActiveView={
          <div className="bg-gray-200 py-1 px-2 rounded-md text-xs">Top</div>
        }
      />

      <SortByButton
        priority="new"
        activeView={
          <div className="bg-black py-1 px-2 rounded-md text-white text-xs">
            New
          </div>
        }
        nonActiveView={
          <div className="bg-gray-200 py-1 px-2 rounded-md text-xs">New</div>
        }
      />
      <SortByButton
        priority="old"
        activeView={
          <div className="bg-black py-1 px-2 rounded-md text-white text-xs">
            Old
          </div>
        }
        nonActiveView={
          <div className="bg-gray-200 py-1 px-2 rounded-md text-xs">Old</div>
        }
      />
    </div>
  );

  const mobileSection = (
    <Drawer
      open={isSheetOpen}
      onOpenChange={(state: boolean) => {
        if (!state) onClose();
      }}
    >
      <DrawerContent className="h-screen overflow-hidden flex flex-col p-0 pt-6 bg-white gap-3">
        <CommentSectionProvider>
          {sortByOptions}
          <div className="flex-1 flex flex-col overflow-hidden">
            <ScrollArea className="flex-1 bg-white">
              <CommentsFeed />
              <div className="w-full h-4" />
            </ScrollArea>
            <div className="border-t">{isSheetOpen && <NewCommentForm />}</div>
          </div>
        </CommentSectionProvider>
      </DrawerContent>
    </Drawer>
  );

  const desktopSection = (
    <Sheet
      open={isSheetOpen}
      onOpenChange={(state: boolean) => {
        if (!state) onClose();
      }}
    >
      <SheetContent className="h-screen overflow-hidden flex flex-col p-0 pt-6 bg-white">
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>comment section</SheetTitle>
            <SheetDescription>comment section</SheetDescription>
          </SheetHeader>
        </VisuallyHidden>
        <CommentSectionProvider>
          {sortByOptions}
          <div className="relative flex-1 flex flex-col overflow-hidden">
            <ScrollArea className="flex-1 bg-white">
              <CommentsFeed />
              <div className="w-full h-4" />
            </ScrollArea>
            <div className="border-t">{isSheetOpen && <NewCommentForm />}</div>
          </div>
        </CommentSectionProvider>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="relative">{isDesktop ? desktopSection : mobileSection}</div>
  );
}

export default DiscussionSheet;
