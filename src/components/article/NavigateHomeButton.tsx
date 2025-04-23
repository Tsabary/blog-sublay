import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

function NavigateHomeButton() {
  return (
    <Button variant="ghost" size="sm" className="gap-1 px-0" asChild>
      <Link href="/">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
    </Button>
  );
}

export default NavigateHomeButton;
