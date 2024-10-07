"use client";

import CopyIcon from "@/assets/images/copy.jpg";
import ShareIcon from "@/assets/images/share.png";
import Image from "next/image";
import { useEffect } from "react";
import { toast } from "sonner";
import SocialShare from "./SocialShare";

const ShareModal = ({ postId, setShowModal }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);
  function copy() {
    toast.success("Copied to Clipboard");
    navigator.clipboard.writeText(`${window.location.href}recipe/${postId}`);
  }
  return (
    <>
      <div
        className="bg-black/60 fixed left-0 right-0 bottom-0 top-0"
        onClick={() => setShowModal(false)}
      >
        {" "}
      </div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-lg bg-white flex flex-col items-center  justify-center p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <Image width={30} height={30} src={ShareIcon} alt="share icon" />
          <input
            className="bg-gray-300 rounded-3xl p-2 mx-3 text-md"
            type="text"
            disabled
            value={`${window.location.href}recipe/${postId}`}
          />
          <button
            className="active:motion-safe:animate-ping"
            onClick={() => copy()}
          >
            <Image width={40} height={40} src={CopyIcon} alt="copy icon" />
          </button>
        </div>
        <div className="h-[2px] w-full my-3 border border-gray-400"></div>
        <SocialShare postId={postId} />
      </div>
    </>
  );
};

export default ShareModal;
