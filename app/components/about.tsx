import { getCmsPage } from "../lib/cms-db";
import AboutClient from "./aboutClient";

function parseAudioTracks(value?: string) {
  try {
    const parsed = JSON.parse(value || "{}") as { audio_title?: string; audio_url?: string };
    return parsed.audio_url ? [{ title: parsed.audio_title || "Listen To Quran Audio", src: parsed.audio_url }] : undefined;
  } catch {
    return undefined;
  }
}

export default async function AboutSection() {
  const page = await getCmsPage("home").catch(() => null);
  const about = page?.sections.find((section) => section.section_key === "about");
  const audioTracks = parseAudioTracks(about?.extra_json);
  return <AboutClient audioTracks={audioTracks} />;
}
