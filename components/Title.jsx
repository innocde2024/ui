/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import {
  useMotionTemplate,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import { useRef } from "react";

const TitleList = ({ data, setSelectedProject }) => (
  <div className="w-full border-t border-solid border-t-[#b7ab98]/25">
    {data.map((project, index) => (
      <Title
        key={index}
        data={{ ...project, index }}
        setSelectedProject={setSelectedProject}
      />
    ))}
  </div>
);

const Title = ({ data, setSelectedProject }) => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", `${25 / data.speed}vw end`],
  });

  const clipProgress = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const clip = useMotionTemplate`inset(0 ${clipProgress}% 0 0)`;

  return (
    <div
      ref={container}
      className="border-b border-solid border-b-[#b7ab98]/25 cursor-default relative z-[2]"
    >
      <div
        className="inline-block pl-[10%]"
        onMouseOver={() => {
          setSelectedProject(data.index);
        }}
        onMouseLeave={() => {
          setSelectedProject(null);
        }}
      >
        <motion.p
          className="inline-block text-white uppercase font-bold text-[6vw] leading-[7.5vw] relative z-[2] m-0 peer-[:nth-of-type(2)]:block peer-[:nth-of-type(2)]:absolute peer-[:nth-of-type(2)]:text-[#1c1c1c] peer-[:nth-of-type(2)]:top-0 peer-[:nth-of-type(2)]:z-[1]"
          style={{ clipPath: clip }}
        >
          {data.title}
        </motion.p>
      </div>
    </div>
  );
};

export default TitleList;
