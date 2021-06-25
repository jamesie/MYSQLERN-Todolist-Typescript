import React, { FC, useState, useEffect } from "react";
import { FiClock } from "react-icons/fi";

interface OverdueIconProps {
  currentDate: string;
  toBeCompletedBy: string;
}

const OverdueIcon: FC<OverdueIconProps> = ({
  currentDate,
  toBeCompletedBy,
}) => {
  const parsedCurrentDate = Date.parse(currentDate);
  const parsedToBeCompletedBy = Date.parse(toBeCompletedBy);

  const [tagColor, setTagColor] = useState<string>("");
  const [tagMessage, setTagMessage] = useState<string>("");

  useEffect(() => {
    console.log(currentDate, toBeCompletedBy)
    if (parsedCurrentDate === parsedToBeCompletedBy){
      setTagColor("bg-yellow-200 text-yellow-700")
      setTagMessage("Due Today")
    } else if (parsedCurrentDate > parsedToBeCompletedBy) {
      setTagColor("bg-red-200 text-red-700")
      setTagMessage(toBeCompletedBy)
    } else {
      setTagColor("bg-green-200 text-green-700")
      setTagMessage(toBeCompletedBy)
    }

  }, []);

  return (
    <div className={`text-xs flex flex-row font-bold uppercase px-3 py-1 ${tagColor} rounded-full ml-auto`}>
      <FiClock className='w-4 h-4'/>
      <div className='ml-2'>
       {tagMessage}
      </div>
    </div>
  );
};

export default OverdueIcon;
