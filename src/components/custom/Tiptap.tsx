import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";

const Tiptap = ({ onChange }: { onChange: (richText: string) => void }) => {
  const editor = useEditor({
    extensions: [StarterKit.configure()],
    editorProps: {
      attributes: {
        class: "rounded-md border min-h-[150px] border-input p-3",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
