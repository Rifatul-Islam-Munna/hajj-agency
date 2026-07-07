"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AudioPlayer from "./audioPlayer";

type Track = { title: string; src: string };

export default function AboutClient({ audioTracks }: { audioTracks?: Track[] }) {
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
                <span>About Us</span>
                <h2>The Jamia is the Most Popular Islamic Center</h2>
                <img src="/assets/img/icons/title.svg" alt="Title Icon" />
              </div>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur facilisis sed odio at scelerisque.
                Sed nec felis pellentesque, lacinia dui sed, ultricies sapien. Pellentesque orci lectus, consectetur vel
                sollicitudin sed, dignissim eu nisl. Donec id elementum ex.
              </p>

              <p>
                Consectetur adipisicing elit sed eiusmod tempor ncid parrot withdrew less a darn overheard foolish ran forwards.
                Labore et dolore magna aliqua enim ad minim.
              </p>

              <Link href="/contact" className="green_btn mt-3" data-cms-button="true">
                <span>Ask About Islam</span>
              </Link>
            </motion.div>
          </div>

          <img src="/assets/img/icons/miner.svg" className="miner_icon" alt="Miner Icon" />
        </div>
      </div>
    </section>
  );
}
