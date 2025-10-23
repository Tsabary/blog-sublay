"use client";

import { useEffect, useRef, useState } from "react";
import {
  Entity,
  handleError,
  useFetchEntityByShortId,
  useUpdateEntity,
  useUploadFile,
  useUser,
} from "@replyke/react-js";
import dynamic from "next/dynamic";
import { Loader2, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";
import { redirect, useParams, useRouter } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Layout from "@/components/Layout";
import { getArticlePath } from "@/helpers/getArticlePath";
import { ACCEPTED_IMAGE_TYPES, CATEGORIES } from "../../../../constants";

// Prevent SSR issues with the markdown editor
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((m) => m.default),
  { ssr: false }
);

export default function EditPost() {
  const { slugAndId } = useParams();
  const fetchEntityByShortId = useFetchEntityByShortId();

  const { user } = useUser();
  const router = useRouter();
  const updateEntity = useUpdateEntity();
  const uploadFile = useUploadFile();

  const [entity, setEntity] = useState<Entity>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const [initialImage, setInitialImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [activeTab, setActiveTab] = useState("write");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleContentChange = (value?: string) => {
    setFormData((prev) => ({ ...prev, content: value || "" }));
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && ACCEPTED_IMAGE_TYPES.includes(selectedFile.type)) {
      setFile(selectedFile);
      setInitialImage(null);
    }
    // if user cancels, e.target.files will be empty – so we do nothing and keep the previous one
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && ACCEPTED_IMAGE_TYPES.includes(droppedFile.type)) {
      setFile(droppedFile);
      setInitialImage(null);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!entity) return;

    // Validate form
    if (!formData.title.trim()) {
      toast.error("Please add a title for your blog post");
      return;
    }

    if (!formData.content.trim()) {
      toast.error("Your blog post needs some content");
      return;
    }

    if (!formData.category) {
      toast.error("Your blog post needs a category");
      return;
    }

    if (!formData.excerpt.trim()) {
      toast.error("Your blog post needs an excerpt");
      return;
    }

    if (!file && !initialImage) {
      toast.error("Your blog post needs an image");
      return;
    }

    const { title, content, excerpt, category } = formData;
    setIsSubmitting(true);

    try {
      const updatePayload: any = {};
      if (title !== entity.title) updatePayload.title = formData.title;
      if (content !== entity.content) updatePayload.content = formData.content;

      updatePayload.metadata = {
        ...(updatePayload.metadata ?? {}),
        excerpt: formData.excerpt,
        category: formData.category,
      };

      // if they've picked a new file, compress & upload it, then send attachments
      if (file) {
        const compressed: File | Blob = await imageCompression(file, {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
          fileType: "image/webp",
        });
        const uploadable =
          compressed instanceof File
            ? compressed
            : new File([compressed], file.name.replace(/\.\w+$/, ".webp"), {
                type: compressed.type,
              });
        const uploadResp = await uploadFile(uploadable, ["blog"]);
        updatePayload.attachments = [{ ...uploadResp }];
      }

      let updated: Entity = entity;
      if (Object.keys(updatePayload)?.length ?? 0 > 0) {
        updated = await updateEntity({
          entityId: entity.id,
          update: updatePayload,
        });
      }

      toast("Success! Your blog post has been updated");
      const path = getArticlePath({
        title: updated.title,
        shortId: updated.shortId,
      });
      router.push(path);
    } catch (error) {
      handleError(error, "Failed to update article");
      toast.error(
        "Something went wrong. Your post couldn't be published. Please try again."
      );
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (!user || !["admin", "editor"].includes(user.role)) router.push("/");
  }, [user]);

  useEffect(() => {
    if (!slugAndId) return;

    const handleFetchEntity = async () => {
      const hyphen = slugAndId.lastIndexOf("-");
      if (hyphen < 0) {
        return redirect("/");
      }
      const shortId = slugAndId.slice(hyphen + 1);

      if (typeof shortId !== "string") {
        return redirect("/");
      }

      try {
        const entity = await fetchEntityByShortId({ shortId });
        setEntity(entity);
        setFormData({
          title: entity.title || "",
          excerpt: entity.metadata.excerpt,
          content: entity.content || "",
          category: entity.metadata.category,
        });

        if (entity.attachments?.[0]?.publicPath) {
          setInitialImage(entity.attachments?.[0]?.publicPath);
        }
      } catch (err) {
        handleError(err, "Fetching entity failed");
      }
    };

    handleFetchEntity();
  }, [slugAndId]);

  return (
    <Layout>
      <div className="container py-10 max-w-5xl pt-30">
        <h1 className="text-3xl font-bold mb-8">Edit Blog Post</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Post Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter a compelling title..."
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    placeholder="Write a short summary of your post..."
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    maxLength={160}
                  />
                  <p className="text-sm text-muted-foreground text-right">
                    {formData.excerpt?.length ?? 0}/160
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem
                          value={category}
                          className="capitalize"
                          key={category}
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Featured Image</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={handleClick}
                    >
                      <ImageIcon className="h-4 w-4" />
                      <span>Upload</span>
                    </Button>
                  </div>

                  <div
                    onClick={handleClick}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    className={cn(
                      "border-2 border-dashed rounded-md p-8 text-center transition-colors cursor-pointer",
                      dragOver ? "border-primary bg-muted/50" : "border-muted"
                    )}
                  >
                    {file ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Selected"
                        className="mx-auto max-h-48 rounded-md object-contain"
                      />
                    ) : initialImage ? (
                      <img
                        src={initialImage}
                        alt="Current featured"
                        className="mx-auto max-h-48 rounded-md object-contain"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Drag and drop an image, or click the upload button
                      </p>
                    )}
                  </div>

                  <input
                    type="file"
                    ref={inputRef}
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={handleFileChange}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs
                  defaultValue="write"
                  value={activeTab}
                  onValueChange={setActiveTab}
                >
                  <TabsList className="mb-4">
                    <TabsTrigger value="write">Write</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>

                  <TabsContent value="write" className="min-h-[400px]">
                    <div data-color-mode="light">
                      <MDEditor
                        value={formData.content}
                        onChange={handleContentChange}
                        height={400}
                        preview="edit"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="preview" className="min-h-[400px]">
                    {formData.content ? (
                      <div className="border rounded-md p-4">
                        <div className="prose max-w-none dark:prose-invert">
                          <h1>{formData.title}</h1>
                          <div data-color-mode="light">
                            <MDEditor
                              value={formData.content}
                              preview="preview"
                              hideToolbar={true}
                              visibleDragbar={false}
                              height={400}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-[400px] border rounded-md">
                        <p className="text-muted-foreground">
                          Nothing to preview yet
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>

              <CardFooter className="flex justify-between">
                {/* <Button variant="outline" type="button">
                  Save Draft
                </Button> */}
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Update...
                    </>
                  ) : (
                    "Update Post"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </div>
    </Layout>
  );
}
