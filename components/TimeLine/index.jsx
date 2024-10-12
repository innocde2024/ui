/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

export const TimeLine = () => (
  <div>
    <VerticalTimeline>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{ color: "#fff" }}
        contentArrowStyle={{ borderRight: "7px solid " }}
        iconStyle={{ background: "rgb(8, 77, 154)", color: "#fff" }}
        date="1999"
        dateClassName="font-bold"
      >
        <h3 className="vertical-timeline-element-title text-[#F17737] font-bold flex items-center justify-center ">
          FPT Aptech (software programming training center)
        </h3>
        <div className="mt-[30px] flex items-center justify-center">
          <img src="25-1.jpeg" />
        </div>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="2006"
        iconStyle={{ background: "rgb(8, 77, 154)", color: "#fff" }}
      >
        <h3 className="vertical-timeline-element-title text-[#F17737] font-bold flex items-center justify-center ">
          FPT University
        </h3>
        <div className="mt-[30px] flex items-center justify-center">
          <img src="25-2.jpg" />
        </div>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="2009"
        iconStyle={{ background: "rgb(8, 77, 154)", color: "#fff" }}
      >
        <h3 className="vertical-timeline-element-title text-[#F17737] font-bold flex items-center justify-center ">
          FPT Greenwich (UK Degree programs) & FPT School of Business
        </h3>
        <div className="mt-[30px] flex items-center justify-center">
          <img src="25-3.jpg" />
        </div>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="2010"
        iconStyle={{ background: "rgb(234, 109, 34)", color: "#fff" }}
      >
        <h3 className="vertical-timeline-element-title text-[#F17737] font-bold flex items-center justify-center ">
          FPT Polytechnic (vocational training college)
        </h3>
        <div className="mt-[30px] flex items-center justify-center">
          <img src="25-4.jpg" />
        </div>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        date="2011"
        iconStyle={{ background: "rgb(234, 109, 34)", color: "#fff" }}
      >
        <h3 className="vertical-timeline-element-title text-[#F17737] font-bold flex items-center justify-center ">
          FPT Jetking (hardware and networking programs)
        </h3>
        <div className="mt-[30px] flex items-center justify-center">
          <img src="25-5.jpg" />
        </div>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        date="2013"
        iconStyle={{ background: "rgb(234, 109, 34)", color: "#fff" }}
      >
        <h3 className="vertical-timeline-element-title text-[#F17737] font-bold flex items-center justify-center ">
          FPT High School
        </h3>
        <div className="mt-[30px] flex items-center justify-center">
          <img src="25-6.jpg" />
        </div>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        date="2015"
        iconStyle={{ background: "#4EB146", color: "#fff" }}
      >
        <h3 className="vertical-timeline-element-title text-[#F17737] font-bold flex items-center justify-center ">
          FUNiX (online university)
        </h3>
        <div className="mt-[30px] flex items-center justify-center">
          <img src="25-7.jpg" />
        </div>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        date="2016"
        iconStyle={{ background: "#4EB146", color: "#fff" }}
      >
        <h3 className="vertical-timeline-element-title text-[#F17737] font-bold flex items-center justify-center ">
          FPT International Student Exchange Center (student mobility programs)
        </h3>
        <div className="mt-[30px] flex items-center justify-center">
          <img src="25-8.webp" />
        </div>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        date="2017"
        iconStyle={{ background: "#4EB146", color: "#fff" }}
      >
        <h3 className="vertical-timeline-element-title text-[#F17737] font-bold flex items-center justify-center ">
          FPT Primary school, FPT BTEC (UK Higher Diploma), FPT-UBD Innovation
          Lab (intensive software development training in Brunei) & UBD-FPT
          Global Center (English Language training center)
        </h3>
        <div className="mt-[30px] flex items-center justify-center">
          <img src="25-9.jpg" />
        </div>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        date="2018"
        iconStyle={{ background: "#084D9A", color: "#fff" }}
      >
        <h3 className="vertical-timeline-element-title text-[#F17737] font-bold flex items-center justify-center ">
          FPT Skillking (Digital Marketing certificate program)
        </h3>
        <div className="mt-[30px] flex items-center justify-center">
          <img src="25-10.webp" />
        </div>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        iconStyle={{ background: "#084D9A", color: "#fff" }}
        date="Now"
      />
    </VerticalTimeline>
  </div>
);
