import HeroVideoDialog from "../magicui/hero-video-dialog";

export function HeroYouTubeVideo() {
  return (
    <div className="relative max-w-5xl mx-auto pb-20">
      <HeroVideoDialog
        animationStyle="top-in-bottom-out"
        videoSrc="https://youtu.be/hRuL22reKlY"
        thumbnailSrc="/hero_video/hero_img.png"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}
