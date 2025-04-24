import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function NavigateHomeButton() {
  return (
    <Link href="/" className="flex items-center gap-1 text-sm font-medium">
      <ArrowLeft className="h-4 w-4" />
      Back to Home
    </Link>
  );
}

export default NavigateHomeButton;
