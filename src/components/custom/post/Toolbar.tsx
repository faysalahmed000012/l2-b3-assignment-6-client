"use client";

import { type Editor } from "@tiptap/react";
import { Bold, Italic, List } from "lucide-react";
import { Button } from "../../ui/button";

type Props = {
  editor: Editor | null;
};

const Toolbar = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }
  return (
    <div className="col-span-3 border rounded-md">
      <div className="flex border-b p-2 gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          disabled={!editor?.can().chain().focus().toggleBold().run()}
          className={editor?.isActive("bold") ? "bg-secondary" : ""}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          disabled={!editor?.can().chain().focus().toggleItalic().run()}
          className={editor?.isActive("italic") ? "bg-secondary" : ""}
        >
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          disabled={!editor?.can().chain().focus().toggleBulletList().run()}
          className={editor?.isActive("bulletList") ? "bg-secondary" : ""}
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
