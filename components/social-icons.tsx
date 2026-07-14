"use client";

import { Button } from "@/components/ui/button";
import { track } from "@vercel/analytics";
import {
    Youtube,
    Instagram,
    Linkedin,
    Twitter,
    Github,
    Facebook,
    type LucideIcon,
} from "lucide-react";

export type SocialPlatform =
    | "youtube"
    | "instagram"
    | "linkedin"
    | "twitter"
    | "github"
    | "facebook"
    | "tiktok";

interface SocialLink {
    platform: SocialPlatform;
    url: string;
}

interface SocialIconsProps {
    links: SocialLink[];
}

const iconMap: Record<SocialPlatform, LucideIcon | React.FC<{ className?: string }>> = {
    youtube: Youtube,
    instagram: Instagram,
    linkedin: Linkedin,
    twitter: Twitter,
    github: Github,
    facebook: Facebook,
    tiktok: TikTokIcon,
};

// TikTok não existe no Lucide, então criamos um ícone customizado
function TikTokIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
    );
}

export function SocialIcons({ links }: SocialIconsProps) {
    return (
        <div className="flex items-center justify-center gap-2">
            {links.map((link) => {
                const Icon = iconMap[link.platform];
                return (
                    <Button
                        key={link.platform}
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full hover:bg-accent"
                        asChild
                    >
                        <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.platform}
                            onClick={() =>
                                track("social_click", {
                                    platform: link.platform,
                                    url: link.url,
                                })
                            }
                        >
                            <Icon className="h-5 w-5" />
                        </a>
                    </Button>
                );
            })}
        </div>
    );
}
