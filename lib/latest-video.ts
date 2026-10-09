// Último vídeo do canal: lido da página /videos (o feed RSS do YouTube está instável).
// Qualquer falha cai no fallback (lista de vídeos, sem LED "NOVO").
const CHANNEL_VIDEOS = "https://www.youtube.com/@ryansantosdg/videos";

export type LatestVideo = { href: string; title: string; isNew: boolean };

const FALLBACK: LatestVideo = { href: CHANNEL_VIDEOS, title: "", isNew: false };

export async function getLatestVideo(): Promise<LatestVideo> {
  try {
    const page = await fetch(CHANNEL_VIDEOS, {
      headers: { "User-Agent": "Mozilla/5.0", "Accept-Language": "pt-BR" },
      next: { revalidate: 3600 },
    });
    if (!page.ok) return FALLBACK;
    const html = await page.text();

    const id = html.match(/"videoId":"([\w-]{11})"/)?.[1];
    if (!id) return FALLBACK;
    const href = `https://www.youtube.com/watch?v=${id}`;

    // "há 3 dias" logo depois do primeiro vídeo → novo se tiver menos de 7 dias
    const after = html.slice(html.indexOf(`"videoId":"${id}"`));
    const age = after.match(/"content":"há (\d+) (minuto|hora|dia|semana|mês|meses|ano)/);
    const isNew = !!age && (age[2] === "minuto" || age[2] === "hora" || (age[2] === "dia" && Number(age[1]) < 7));

    const oembed = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(href)}&format=json`,
      { next: { revalidate: 3600 } }
    );
    const title = oembed.ok ? String((await oembed.json()).title ?? "") : "";

    return { href, title, isNew };
  } catch {
    return FALLBACK;
  }
}
