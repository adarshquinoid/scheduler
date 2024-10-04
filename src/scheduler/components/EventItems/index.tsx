import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { styles } from "../../helpers/constants";

const EventItem: React.FC<any> = ({
  activeData,
  group,

  handleDragStart,
  data,
}) => {
  console.log(data);
  const [dragWidth, setDragWidth] = useState<number>(styles.dayColWidth);
  const [calcukatedWidth, setCalculatedWidth] = useState<number>(
    styles.dayColWidth
  );
  const resizeRef = useRef<HTMLDivElement>(null);
  const [resizabe, setResizable] = useState<boolean>(true);
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDragWidth(entry.contentRect.width);
      }
    });

    if (resizeRef.current) {
      resizeObserver.observe(resizeRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const onMouseEnter = () => {
    setResizable(true);
  };

  const onMouseLeave = () => {
    setResizable(false);
    setCalculateDragWidth();
  };
  const setCalculateDragWidth = () => {
    const remainingWidtth = dragWidth % styles.dayColWidth;
    if (remainingWidtth !== 0) {
      setCalculatedWidth(dragWidth - remainingWidtth + styles.dayColWidth);
    } else {
      setCalculatedWidth(dragWidth);
    }
  };
  console.log(data);
  return (
    <>
      {data?.length > 0 && (
        <>
          {data.map((_item: any) => (
            <div
              ref={resizeRef}
              draggable
              onMouseEnter={onMouseEnter}
              onTouchStartCapture={onMouseEnter}
              onTouchEnd={onMouseLeave}
              onMouseLeave={onMouseLeave}
              style={{ width: `${calcukatedWidth}px` }}
              onDragStart={(e) => handleDragStart(e, activeData)}
              key={activeData}
              id={activeData}
              className={`absolute  left-0  h-9 rounded-sm overflow-hidden ${
                resizabe ? "resize-x z-40" : "z-20"
              } bg-red-300 z-40 `}
            >
              EventItem
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default EventItem;
