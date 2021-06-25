import React, { FC } from "react";
import OverdueIcon from "./OverdueIcon";

export type TaskDate = {
  year: number;
  month: number;
  day: number;
};

interface TaskProps {
  status: boolean;
  toBeCompletedBy?: string | null;
  taskName: string;
  clientsDate: string;
}

const Task: FC<TaskProps> = ({
  status,
  toBeCompletedBy,
  taskName,
  clientsDate,
}) => {
  return (
    <div className="flex flex-row w-full bg-white p-2 rounded-sm border-gray-300 border-2 my-1">
      <div className="">{taskName}</div>
      <OverdueIcon currentDate={clientsDate} toBeCompletedBy={toBeCompletedBy}/>
    </div>
  );
};

export default Task;
