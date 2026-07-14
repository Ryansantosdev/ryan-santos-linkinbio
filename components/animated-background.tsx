"use client";

// Tile SVG com caracteres ASCII pequenos, repetido como textura halftone
const asciiTile = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">
  <text x="1" y="12" font-family="monospace" font-size="8" fill="#B6F6FF">01</text>
  <text x="28" y="24" font-family="monospace" font-size="8" fill="#B6F6FF">@</text>
  <text x="6" y="38" font-family="monospace" font-size="8" fill="#B6F6FF">#</text>
  <text x="32" y="44" font-family="monospace" font-size="8" fill="#B6F6FF">*</text>
</svg>
`);

// 2 faixas de scan defasadas (uma sempre a meio caminho da outra),
// varrendo sempre na mesma direção, bem lento e em loop contínuo
const asciiScans = [
    { delay: "0s" },
    { delay: "-27.5s" },
];

export function AnimatedBackground() {
    return (
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
            {/* Grade de linhas verticais */}
            <div className="absolute inset-0 flex justify-center">
                <div className="flex w-full max-w-7xl">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="relative flex-1 border-x border-white/[0.03]"
                        >
                            {/* Linha animada descendo */}
                            <div
                                className="absolute top-0 h-32 w-px bg-gradient-to-b from-transparent via-[#B6F6FF]/20 to-transparent"
                                style={{
                                    left: "50%",
                                    animation: `lineDown ${8 + i * 2}s linear infinite`,
                                    animationDelay: `${i * 1.5}s`,
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Linhas horizontais sutis */}
            <div className="absolute inset-0">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
                        style={{
                            top: `${25 + i * 20}%`,
                        }}
                    />
                ))}
            </div>

            {/* Brilhos suaves flutuantes */}
            <div
                className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#0C3F4F]/10 blur-3xl"
                style={{
                    animation: "float 20s ease-in-out infinite",
                }}
            />
            <div
                className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-[#B6F6FF]/5 blur-3xl"
                style={{
                    animation: "float 25s ease-in-out infinite reverse",
                }}
            />

            {/* Textura halftone de ASCII, pequena e sutil, com scan lento em loop */}
            {asciiScans.map((scan, i) => (
                <div
                    key={i}
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,${asciiTile}")`,
                        backgroundSize: "48px 48px",
                        backgroundRepeat: "repeat",
                        WebkitMaskImage:
                            "linear-gradient(115deg, transparent 44%, black 50%, transparent 56%)",
                        maskImage:
                            "linear-gradient(115deg, transparent 44%, black 50%, transparent 56%)",
                        WebkitMaskSize: "250% 250%",
                        maskSize: "250% 250%",
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        animation: "asciiScan 55s linear infinite",
                        animationDelay: scan.delay,
                    }}
                />
            ))}

            {/* Gradiente radial central sutil */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.02] via-transparent to-transparent" />

            {/* Estilos de animação */}
            <style jsx>{`
        @keyframes lineDown {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(calc(100vh + 100%));
            opacity: 0;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(10%, 10%) scale(1.05);
          }
          50% {
            transform: translate(-5%, 20%) scale(0.95);
          }
          75% {
            transform: translate(-10%, 5%) scale(1.02);
          }
        }

        @keyframes asciiScan {
          0% {
            -webkit-mask-position: -40% -40%;
            mask-position: -40% -40%;
          }
          100% {
            -webkit-mask-position: 140% 140%;
            mask-position: 140% 140%;
          }
        }
      `}</style>
        </div>
    );
}
