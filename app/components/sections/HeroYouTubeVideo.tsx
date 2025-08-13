import HeroVideoDialog from "../magicui/hero-video-dialog";

export function HeroYouTubeVideo() {
  return (
    <div className="relative max-w-5xl mx-auto pb-20">
      <HeroVideoDialog
        animationStyle="top-in-bottom-out"
        videoSrc="https://www.youtube.com/embed/hRuL22reKlY?si=yqaz-ip6HWjp-uxC"
        thumbnailSrc="/hero_video/hero_img.png"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}
