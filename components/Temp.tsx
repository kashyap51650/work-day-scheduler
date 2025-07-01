import { fetchTasks } from "@/services/taskService";
import React, { use } from "react";

const Temp = () => {
  const task = use(fetchTasks());
  console.log(task);
  return <div>Temp</div>;
};

export default Temp;
