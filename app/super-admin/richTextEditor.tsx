"use client";

import Link from "@tiptap/extension-link";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold, Heading2, Italic, Link2, List, ListOrdered, Quote, Redo2,
  RemoveFormatting, Undo2, Unlink,
} from "lucide-react";
import { useEffect, type ReactNode } from "react";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  help?: string;
};

export default function RichTextEditor({ label, value, onChange, help }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ link: false }),
      Link.configure({ openOnClick: false, autolink: true, defaultProtocol: "https" }),
    ],
    content: value || "",
    editorProps: { attributes: { class: "admin-rich-content" } },
    onUpdate: ({ editor: current }) => onChange(current.getHTML()),
  });

  useEffect(() => {
    if (editor && !editor.isFocused && editor.getHTML() !== (value || "<p></p>")) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [editor, value]);

  function setLink() {
    if (!editor) return;
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", previous || "https://");
    if (url === null) return;
    if (!url.trim()) editor.chain().focus().unsetLink().run();
    else editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  }

  return (
    <div className="admin-field full">
      <label>{label}</label>
      {help && <small className="admin-help">{help}</small>}
      <div className="admin-rich-editor">
        <div className="admin-rich-toolbar" aria-label={`${label} formatting toolbar`}>
          <Tool title="Bold" active={editor?.isActive("bold")} onClick={() => editor?.chain().focus().toggleBold().run()}><Bold /></Tool>
          <Tool title="Italic" active={editor?.isActive("italic")} onClick={() => editor?.chain().focus().toggleItalic().run()}><Italic /></Tool>
          <Tool title="Heading" active={editor?.isActive("heading", { level: 2 })} onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 /></Tool>
          <Tool title="Bullet list" active={editor?.isActive("bulletList")} onClick={() => editor?.chain().focus().toggleBulletList().run()}><List /></Tool>
          <Tool title="Numbered list" active={editor?.isActive("orderedList")} onClick={() => editor?.chain().focus().toggleOrderedList().run()}><ListOrdered /></Tool>
          <Tool title="Quote" active={editor?.isActive("blockquote")} onClick={() => editor?.chain().focus().toggleBlockquote().run()}><Quote /></Tool>
          <Tool title="Add link" active={editor?.isActive("link")} onClick={setLink}><Link2 /></Tool>
          <Tool title="Remove link" onClick={() => editor?.chain().focus().unsetLink().run()}><Unlink /></Tool>
          <Tool title="Clear formatting" onClick={() => editor?.chain().focus().clearNodes().unsetAllMarks().run()}><RemoveFormatting /></Tool>
          <Tool title="Undo" onClick={() => editor?.chain().focus().undo().run()}><Undo2 /></Tool>
          <Tool title="Redo" onClick={() => editor?.chain().focus().redo().run()}><Redo2 /></Tool>
        </div>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

function Tool({ title, active, onClick, children }: {
  title: string;
  active?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button type="button" title={title} aria-label={title} className={active ? "active" : ""} onClick={onClick}>
      {children}
    </button>
  );
}
