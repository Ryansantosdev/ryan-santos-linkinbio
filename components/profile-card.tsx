import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeCheck } from "lucide-react";

interface ProfileCardProps {
    name: string;
    displayName?: string;
    description: string;
    imageUrl?: string;
}

export function ProfileCard({ name, displayName, description, imageUrl }: ProfileCardProps) {
    return (
        <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24 border-2 border-border">
                <AvatarImage src={imageUrl} alt={displayName || name} />
                <AvatarFallback className="text-2xl font-semibold">
                    {name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                </AvatarFallback>
            </Avatar>
            <div className="text-center">
                {displayName && (
                    <h1 className="text-xl font-bold text-foreground">{displayName}</h1>
                )}
                <p className="mt-1 flex items-center justify-center gap-1 text-sm font-medium text-muted-foreground">
                    {name}
                    <BadgeCheck className="h-4 w-4 text-primary" aria-label="Verificado" />
                </p>
                <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                    {description}
                </p>
            </div>
        </div>
    );
}
