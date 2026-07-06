'use client';
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function NotFoundPage() {
  return (
    <section className="page_not_found section-padding">
      <div className="container">
        <div className="row">
          <motion.div
            className="col-xl-7 mx-auto text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 0.8,
            }}
            viewport={{ once: true }}
          >
            
            <Image
              src="/assets/img/404.jpg"
              alt="404"
              width={600}
              height={400}
            />

            <h2>Page not found: /error</h2>
            <p>Please try searching for some other page.</p>

            <Link href="/" className="green_btn">
              <i className="ph ph-house-line"></i>
              <span>Back To Home</span>
            </Link>

          </motion.div>
        </div>
      </div>
    </section>
  );
}