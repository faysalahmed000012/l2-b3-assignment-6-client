import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "next-share";

const SocialShare = ({ postId }: { postId: string }) => {
  const quote = "Crunch Social";
  const url = `${window.location.href}recipe/${postId}`;

  return (
    <div className="w-full flex items-center justify-evenly">
      <FacebookShareButton url={url} quote={quote}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <WhatsappShareButton url={url} title={quote} separator=":: ">
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <TelegramShareButton url={url} title={quote}>
        <TelegramIcon size={32} round />
      </TelegramShareButton>
      <TwitterShareButton url={url} title={quote}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
    </div>
  );
};

export default SocialShare;
