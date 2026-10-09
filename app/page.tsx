import Script from "next/script";
import { getLatestVideo } from "@/lib/latest-video";
import { keyboardMarkup } from "./keyboard-markup";

// Revalida o último vídeo a cada hora
export const revalidate = 3600;

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export default async function Home() {
  const video = await getLatestVideo();
  const html = keyboardMarkup({
    href: escapeHtml(video.href),
    title: escapeHtml(video.title),
    isNew: video.isNew,
  });

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Script src="/keyboard.js" strategy="afterInteractive" />
    </>
  );
}
