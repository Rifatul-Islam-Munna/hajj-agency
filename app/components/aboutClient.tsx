"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AudioPlayer from "./audioPlayer";
import type { CmsSection } from "../lib/cms-db";
import { sanitizeRichHtml } from "../lib/rich-text";

type Track = { title: string; src: string };
const fallbackDescription = `
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur facilisis sed odio at scelerisque.
  Sed nec felis pellentesque, lacinia dui sed, ultricies sapien. Pellentesque orci lectus, consectetur vel
  sollicitudin sed, dignissim eu nisl. Donec id elementum ex.</p>
  <p>Consectetur adipisicing elit sed eiusmod tempor ncid parrot withdrew less a darn overheard foolish ran forwards.
  Labore et dolore magna aliqua enim ad minim.</p>
`;

export default function AboutClient({ section, audioTracks }: { section?: CmsSection; audioTracks?: Track[] }) {
  const eyebrow = section?.eyebrow || "About Us";
  const title = section?.title || "The Jamia is the Most Popular Islamic Center";
  const description = sanitizeRichHtml(section?.description || fallbackDescription);
  const buttonText = section?.button_text || "Ask About Islam";
  const buttonUrl = section?.button_url || "/contact";

  return (
    <section className="about-area section-padding">
      <div className="container">
        <div className="row g-4 align-items-center position-relative">
          <div className="col-lg-6 col-12">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <AudioPlayer tracks={audioTracks} />
            </motion.div>
          </div>

          <div className="col-lg-6 col-12">
            <motion.div
              className="about-content about-content-two"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="section-heading mb-30">
                <span data-cms-eyebrow>{eyebrow}</span>
                <h2 data-cms-title>{title}</h2>
                <img src="/assets/img/icons/title.svg" alt="Title Icon" />
              </div>

              <div data-cms-description className="cms-rich-content" dangerouslySetInnerHTML={{ __html: description }} />

              <Link href={buttonUrl} className="green_btn mt-3" data-cms-button="true">
                <span>{buttonText}</span>
              </Link>
            </motion.div>
          </div>

          <img src="/assets/img/icons/miner.svg" className="miner_icon" alt="Miner Icon" />
        </div>
      </div>
    </section>
  );
}
