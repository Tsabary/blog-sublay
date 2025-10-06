"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useEntity } from "@replyke/react-js";
import {
  ThreadedStyleCallbacks,
  ThreadedCommentSection,
} from "@replyke/comments-threaded-react-js";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
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

  const callbacks: ThreadedStyleCallbacks = {
    loginRequiredCallback: () => {
      toast("Please log in first");
    },
  };

  const mobileSection = (
    <Drawer
      open={isSheetOpen}
      onOpenChange={(state: boolean) => {
        if (!state) onClose();
      }}
    >
      <DrawerContent className="h-screen overflow-hidden flex flex-col p-0 pt-6 bg-background gap-3">
        <ThreadedCommentSection callbacks={callbacks} />
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
      <SheetContent className="h-screen overflow-hidden flex flex-col p-0 pt-6 bg-background">
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>comment section</SheetTitle>
            <SheetDescription>comment section</SheetDescription>
          </SheetHeader>
        </VisuallyHidden>
        <ThreadedCommentSection callbacks={callbacks} />
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="relative">{isDesktop ? desktopSection : mobileSection}</div>
  );
}

export default DiscussionSheet;
