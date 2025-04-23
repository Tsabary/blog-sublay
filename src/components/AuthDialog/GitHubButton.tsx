import React from "react";
import { Button } from "../ui/button";

function GitHubButton() {
  const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  const url = BASE_URL + "/api/v1/clients-auth/github";

  return (
    <Button variant="outline" type="button" className="w-full" asChild>
      <a href={url}>
        <img src="/github.svg" className="mr-2 h-4 w-4" />
        GitHub
      </a>
    </Button>
  );
}

export default GitHubButton;
