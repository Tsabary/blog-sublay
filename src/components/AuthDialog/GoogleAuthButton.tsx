import { Button } from "../ui/button";

function GoogleAuthButton() {
  const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  const url = BASE_URL + "/auth/google";

  return (
    <Button variant="outline" type="button" className="w-full" asChild>
      <a href={url}>
        <img src="/google.svg" className="mr-2 h-4 w-4" />
        Google
      </a>
    </Button>
  );
}

export default GoogleAuthButton;
