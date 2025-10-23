import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Github, Linkedin, Twitter } from "lucide-react";

function Footer() {
  return (
    <footer className="relative border-t text-foreground transition-colors duration-300">
      <div className="container max-w-6xl mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Stay Connected
            </h2>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <a
                href="https://docs.replyke.com"
                className="block transition-colors hover:text-primary"
              >
                Documentation
              </a>
              <a
                href="https://blog.replyke.com"
                className="block transition-colors hover:text-primary"
              >
                Blog
              </a>
              <a
                href="https://roadmap.replyke.com"
                className="block transition-colors hover:text-primary"
              >
                Roadmap
              </a>
              <a
                href="https://support.replyke.com"
                className="block transition-colors hover:text-primary"
              >
                Support
              </a>
              <a
                href="https://discord.com/invite/REKxnCJzPz"
                className="block transition-colors hover:text-primary"
              >
                Discord
              </a>
            </nav>
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href="https://github.com/replyke" target="_blank">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full cursor-pointer"
                      >
                        <Github className="h-4 w-4" />
                        <span className="sr-only">Github</span>
                      </Button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Github</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href="https://x.com/replykejs" target="_blank">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full cursor-pointer"
                      >
                        <Twitter className="h-4 w-4" />
                        <span className="sr-only">Twitter</span>
                      </Button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on X/Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://www.linkedin.com/company/replyke"
                      target="_blank"
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full cursor-pointer"
                      >
                        <Linkedin className="h-4 w-4" />
                        <span className="sr-only">LinkedIn</span>
                      </Button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect with us on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2023-{new Date().getFullYear()} Replyke. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <a
              href="https://replyke.com/privacy-policy.html"
              className="transition-colors hover:text-primary hover:underline"
            >
              Privacy Policy
            </a>
            <a
              href="https://replyke.com/terms-of-service.html"
              className="transition-colors hover:text-primary hover:underline"
            >
              Terms of Service
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
