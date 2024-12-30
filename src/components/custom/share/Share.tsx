"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useState } from "react";
import ReactDOM from "react-dom";
import ShareModal from "./ShareModal";

const Share = ({ postId }: { postId: string }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => setShowModal(true)}>
        <Share2 className="mr-2 h-4 w-4" />
        Share
      </Button>
      {showModal &&
        ReactDOM.createPortal(<ShareModal postId={postId} />, document.body)}
    </>
  );
};

export default Share;
