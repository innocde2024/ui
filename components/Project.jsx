/* eslint-disable lines-around-directive */
/* eslint-disable import/no-unresolved */
"use client";

import { useState } from "react";
import Title from "./Title";
import Description from "./Description";
import { dataProject } from "../libs/data-project";

const Project = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="absolute z-10 w-full">
      <Title data={dataProject} setSelectedProject={setSelected} />
      <Description data={dataProject} selected={selected} />
    </div>
  );
};
export default Project;
