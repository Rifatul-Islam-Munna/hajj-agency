import { getCmsPage, getContentRecords } from "../lib/cms-db";
import AboutClient from "./aboutClient";

type AudioTrack = { title: string; src: string };

function parseAudioTracks(value?: string) {
  try {
    const parsed = JSON.parse(value || "{}") as {
      audio_title?: string;
      audio_url?: string;
      audio_tracks?: { title?: string; src?: string; url?: string }[];
    };
    const tracks = Array.isArray(parsed.audio_tracks)
      ? parsed.audio_tracks
          .map((track) => ({
            title: track.title || "Listen To Quran Audio",
            src: track.src || track.url || "",
          }))
          .filter((track) => track.src.trim())
      : [];

    if (tracks.length) return tracks;
    return parsed.audio_url ? [{ title: parsed.audio_title || "Listen To Quran Audio", src: parsed.audio_url }] : undefined;
  } catch {
    return undefined;
  }
}

export default async function AboutSection({ pageSlug = "home" }: { pageSlug?: "home" | "about" } = {}) {
  const [page, records] = await Promise.all([
    getCmsPage(pageSlug).catch(() => null),
    getContentRecords({ collection: "audio" }).catch(() => []),
  ]);
  const about = page?.sections.find((section) => section.section_key === "about");
  const dbTracks: AudioTrack[] = records
    .map((item) => ({ title: item.title || "Listen To Quran Audio", src: item.link_url }))
    .filter((track) => track.src.trim());
  const audioTracks = dbTracks.length ? dbTracks : parseAudioTracks(about?.extra_json);
  return <AboutClient section={about || undefined} audioTracks={audioTracks} />;
}
