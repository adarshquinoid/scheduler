import dayjs from "dayjs";
import React, { useEffect, useRef } from "react";

const EventItem: React.FC<any> = ({ activeData, group ,sampleDate,handleDragStart}) => {
  const resizeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // Call on resize here
        console.log(entry.contentRect.width);
      }
    });

    if (resizeRef.current) {
      resizeObserver.observe(resizeRef.current);
    }

    // Cleanup on unmount
    return () => {
      if (resizeRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        resizeObserver.unobserve(resizeRef.current);
      }
    };
  }, []);

  if (
    group.id === 1 &&
    dayjs(activeData?.date).format("DD-MM-YYYY") ===  sampleDate
  ) {
    return (
      <div
        ref={resizeRef}
        draggable
        onDragStart={(e) => handleDragStart(e, activeData)}
        key={activeData}
        id={activeData}
        className="absolute  left-0  h-9 rounded-sm overflow-hidden resize-x bg-red-300 z-40 item-resize"
      >
        EventItem
      </div>
    );
  }
  return null;
};

export default EventItem;
