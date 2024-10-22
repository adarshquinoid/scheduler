import React, { useEffect, useState } from "react";
import { styles } from "../../../../../helpers/constants";
import { useScheduler } from "../../../../../providers/SchedulerProvider";

const EventGroups: React.FC<any> = ({ gridSize,ind, eventLength,groupIndex, gridHeight }) => {

    const [position, setPosition] = useState({
        top: groupIndex * gridHeight + 5,
        left: ind * gridSize,
      });
      useEffect(() => {
        setPosition({ top: groupIndex * gridHeight + 5, left: ind * gridSize });
      }, [ind, groupIndex, gridHeight, gridSize]);

    return (
    <div  style={{
   
        left: position.left,
        top: position.top,
        height:gridHeight
      }} className="absolute flex items-center ml-[1px]">
    <div
      className="h-[11px]   indicator rounded-t-[6px]"
      style={{
        width: gridSize * eventLength - 2,
   

      }}
    />
    </div>
  );
};

export default EventGroups;
