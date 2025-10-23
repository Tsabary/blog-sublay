import { Button } from "../ui/button";

function GitHubAuthButton() {
  const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  const url = BASE_URL + "/auth/github";

  return (
    <Button variant="outline" type="button" className="w-full" asChild>
      <a href={url}>
        <img src="/github.svg" className="mr-2 h-4 w-4" />
        GitHub
      </a>
    </Button>
  );
}

export default GitHubAuthButton;
