import useAuth from "../../hooks/useAuth";
import { Button } from "../ui/button";

function GoogleAuthButton() {
  const { handleGoogleLogin } = useAuth();

  return (
    <Button
      variant="outline"
      type="button"
      className="w-full"
      onClick={handleGoogleLogin}
    >
      <img src="/google.svg" className="mr-2 h-4 w-4" />
      Google
    </Button>
  );
}

export default GoogleAuthButton;
