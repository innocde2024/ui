'use client';

import { motion } from 'framer-motion';
import { TypingText } from '../components';

import styles from '../styles';
import { fadeIn, staggerContainer } from '../utils/motion';

const About = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <div className="gradient-02 z-0" />
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <TypingText title="| Về FPT Education" textStyles="text-center" />

      <motion.p
        variants={fadeIn('up', 'tween', 0.2, 1)}
        className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-white"
      >
        <span className="font-extrabold text-white">FPT Education</span> là hệ thống giáo dục thuộc Tập đoàn FPT, một trong những tập đoàn công nghệ lớn nhất Việt Nam.{' '}
        <span className="font-extrabold text-white">
          FPT Education
        </span>{' '}
        cung cấp các chương trình{' '}
        <span className="font-extrabold text-white">đào tạo</span> từ bậc tiểu học,
        trung học, đại học đến sau đại học, với mục tiêu đào tạo{' '}
        <span className="font-extrabold text-white">nguồn nhân lực</span> nguồn nhân lực
        chất lượng cao
      </motion.p>

      <motion.img
        variants={fadeIn('up', 'tween', 0.3, 1)}
        src="/arrow-down.svg"
        alt="arrow down"
        className="w-[18px] h-[28px] object-contain mt-[28px]"
      />
    </motion.div>
  </section>
);

export default About;
