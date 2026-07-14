import { ProfileCard } from "@/components/profile-card";
import { SocialIcons, type SocialPlatform } from "@/components/social-icons";
import { LinkList, type LinkPlatform } from "@/components/link-list";
import { AnimatedBackground } from "@/components/animated-background";

// Configuração do perfil - edite aqui suas informações
const profile = {
  name: "@ryansantosdg",
  displayName: "Ryan Santos",
  description:
    "Ouça o silêncio da mente. É de lá que vem o verdadeiro crescimento.",
  imageUrl: "/perfil.webp",
};

// Ícones das redes sociais (aparecem abaixo da descrição)
const socialLinks: { platform: SocialPlatform; url: string }[] = [
  { platform: "youtube", url: "https://www.youtube.com/@ryansantosdg" },
  { platform: "instagram", url: "https://www.instagram.com/ryansantosdg" },
  { platform: "tiktok", url: "https://www.tiktok.com/@ryansantosdg" },
  { platform: "linkedin", url: "https://www.linkedin.com/in/ryansantosdg/" },
];

// Lista de links (aparecem como botões)
const links: { title: string; url: string; platform?: LinkPlatform }[] = [
  {
    title: "YouTube",
    url: "https://www.youtube.com/@ryansantosdg",
    platform: "youtube",
  },
  {
    title: "Instagram",
    url: "https://www.instagram.com/ryansantosdg",
    platform: "instagram",
  },
  {
    title: "TikTok",
    url: "https://www.tiktok.com/@ryansantosdg",
    platform: "tiktok",
  },
  {
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/ryansantosdg/",
    platform: "linkedin",
  },
];

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background font-sans">
      {/* Efeito de fundo animado */}
      <AnimatedBackground />

      <main className="relative z-10 flex min-h-screen w-full max-w-md flex-col items-center gap-8 px-6 py-16">
        {/* Foto de perfil e descrição */}
        <div
          className="w-full animate-[fadeSlideUp_0.6s_ease-out_both]"
          style={{ animationDelay: "0ms" }}
        >
          <ProfileCard
            name={profile.name}
            displayName={profile.displayName}
            description={profile.description}
            imageUrl={profile.imageUrl}
          />
        </div>

        {/* Ícones das redes sociais */}
        <div
          className="w-full animate-[fadeSlideUp_0.6s_ease-out_both]"
          style={{ animationDelay: "120ms" }}
        >
          <SocialIcons links={socialLinks} />
        </div>

        {/* Lista de links */}
        <div
          className="w-full animate-[fadeSlideUp_0.6s_ease-out_both]"
          style={{ animationDelay: "220ms" }}
        >
          <LinkList links={links} />
        </div>

        {/* Footer */}
        <footer
          className="mt-auto flex flex-col items-center gap-2 pt-8 text-center text-xs text-muted-foreground animate-[fadeSlideUp_0.6s_ease-out_both]"
          style={{ animationDelay: "380ms" }}
        >
          <img src="/logo-branco.png" alt="Ryan Santos" className="h-10 w-auto opacity-90" />
          <p>© 2026 Ryan Santos — Todos os direitos reservados</p>
        </footer>
      </main>
    </div>
  );
}
