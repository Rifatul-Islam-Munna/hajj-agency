"use client";
import { motion } from "framer-motion";

export default function PillarOfIslam() {
  return (
    <section className="pillar_of_islam pb-100">
      <div className="container">

        <div className="row">
          <div className="col-12">
            <motion.div
              className="section-heading text-center mb-30"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <span>Pillar of Islam</span>
              <h2>Five Pillars of Islam</h2>
              <img src="/assets/img/icons/title.svg" alt="Title Icon" />
            </motion.div>
          </div>
          {/* End Col */}
        </div>
        {/* End Row */}

        <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 justify-content-center">

          <div className="col">
            <motion.div
              className="single-pillar"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <img src="/assets/img/pillars/1.png" alt="Pillar Image" />
              <h3>Shahada</h3>
              <p>
                is the First Pillar of <br /> Islam
              </p>
              <div className="pl_btm">Shahada</div>
            </motion.div>
          </div>

          <div className="col">
            <motion.div
              className="single-pillar"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <img src="/assets/img/pillars/2.png" alt="Pillar Image" />
              <h3>Salah</h3>
              <p>
                is the Second Pillar of <br /> Islam
              </p>
              <div className="pl_btm">Salah</div>
            </motion.div>
          </div>

          <div className="col">
            <motion.div
              className="single-pillar"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <img src="/assets/img/pillars/3.png" alt="Pillar Image" />
              <h3>Zakat</h3>
              <p>
                is the Third Pillar of <br /> Islam
              </p>
              <div className="pl_btm">Zakat</div>
            </motion.div>
          </div>

          <div className="col">
            <motion.div
              className="single-pillar"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <img src="/assets/img/pillars/4.png" alt="Pillar Image" />
              <h3>Sawm</h3>
              <p>
                is the Fourth Pillar of <br /> Islam
              </p>
              <div className="pl_btm">Sawm</div>
            </motion.div>
          </div>

          <div className="col">
            <motion.div
              className="single-pillar"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              viewport={{ once: true }}
            >
              <img src="/assets/img/pillars/5.png" alt="Pillar Image" />
              <h3>Hajj</h3>
              <p>
                is the Fifth Pillar of <br /> Islam
              </p>
              <div className="pl_btm">Hajj</div>
            </motion.div>
          </div>

        </div>
        {/* End Row */}

      </div>
    </section>
  );
}