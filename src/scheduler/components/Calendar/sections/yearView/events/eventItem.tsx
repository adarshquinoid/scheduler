import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { dateFormat, styles } from "../../../../../helpers/constants";
import { generateNewDateByDifference } from "../../../../../helpers/utilities";

const EventItem: React.FC<any> = ({
  gridSize,
  eventLength,
  gridHeight,
  ind,
  groupIndex,
  background,
  data = [],
  //req
  onResize,
  onDragEnd,
  row
  
}) => {
  const resizeRef = useRef<HTMLDivElement>(null);
  const [resizabe, setResizable] = useState<boolean>(false);
  const [position, setPosition] = useState({
    top: groupIndex * gridHeight + 5,
    left: ind * gridSize,
  });
  const [calculatedWidth, setCalculatedWidth] = useState<number>(
    styles.dayColWidth
  );
  const [dragWidth, setDragWidth] = useState<number>(styles.dayColWidth);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const handleDragStart = (e: any) => {
    // e.dataTransfer.setData("text/plain", activeDate);
    e.dataTransfer.effectAllowed = "move";
    const { clientX, clientY } = e;
    setInitialPosition({
      x: clientX - position.left,
      y: clientY - position.top,
    });

    // setDragItem({
    //   selection: activeDate,
    //   row: data,
    //   length: calculatedWidth / styles.dayColWidth - 1,
    // });
  };

  const handleDrag = (e: any) => {
    if (e.clientX === 0 && e.clientY === 0) return; // Prevents issues when dragging outside
    const newLeft = e.clientX - initialPosition.x;
    // const newTop = e.clientY - initialPosition.y;
    setPosition((c) => ({
      ...c,
      left: newLeft,
      // top:newTop
    }));
  };

  const handleDragEnd = (e: any) => {
    const initPostition = ind * gridSize;
    if (e.clientX === 0 && e.clientY === 0) return; // Prevents issues when dragging outside
    const newLeft = e.clientX - initialPosition.x;
    // const newTop = e.clientY - initialPosition.y;
    setPosition((c) => ({
      ...c,
      left: newLeft,
      // top:newTop
    }));

    const actualDifference = newLeft - initPostition;
    if (actualDifference !== 0) {
      const action = actualDifference < 0 ? "subtract" : "add";
      const difference =
        actualDifference > 0 ? actualDifference : actualDifference * -1;

      const mod = difference % gridSize;

      const calculatedDifference = difference + (gridSize - mod);


      const newStartDate = generateNewDateByDifference(
        row?.start,
        action,
        actualDifference>0?(calculatedDifference / gridSize)-1:(calculatedDifference / gridSize)
      );
      const newEndDate = dayjs(newStartDate).add(eventLength-1,"day")

      
      onDragEnd?.({start:newStartDate,end:newEndDate,row});
    }

   
  };
  useEffect(() => {
    setPosition({ top: groupIndex * gridHeight + 5, left: ind * gridSize });
  }, [ind, groupIndex, gridHeight, gridSize]);

  const onMouseEnter = () => {
    setResizable(true);
  };

  const onMouseLeave = () => {
    setResizable(false);
    onResizeEnd();
  };
  const onResizeEnd = () => {
    const newWidth = dragWidth;
if (dragWidth !== calculatedWidth) {
      const remainingWidtthToFill = newWidth % styles.dayColWidth;
      let eventWidth;
      if (remainingWidtthToFill !== 0) {
        eventWidth = dragWidth - remainingWidtthToFill + styles.dayColWidth;
      } else {
        eventWidth = newWidth;
      }
      const differenceFromStartDate = eventWidth / styles.dayColWidth;

      const actualDifference = differenceFromStartDate - 1;

      const endDate: Dayjs = dayjs(row?.start, dateFormat);

      const draggedEndDate = endDate.add(actualDifference, "day");

      onResize({ id: row.id, newDate: draggedEndDate });
    }
  };
  useEffect(() => {
    console.log('Setting up ResizeObserver');
    const resizeObserver = new ResizeObserver((entries) => {
      console.log('ResizeObserver callback');
      for (const entry of entries) {
        console.log('Resized:', entry.contentRect.width);
        setDragWidth(entry.contentRect.width);
      }
    });
  
    if (resizeRef.current) {
      console.log('Observing element');
      resizeObserver.observe(resizeRef.current);
    } else {
      console.log('resizeRef.current is null');
    }
  
    return () => {
      console.log('Disconnecting ResizeObserver');
      resizeObserver.disconnect();
    };
  }, []);
  useEffect(() => {
    const handleResize = () => {
      console.log('Window resized');
    };
  
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div
      className="absolute z-20  "
      draggable
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      style={{
        // width: gridSize * eventLength,
        height: gridHeight - 10,
        left: position.left,
        borderRadius: 6,

        top: position.top,
      }}
    >
      <div
        className={`px-2 z-20 flex items-center justify-start relative  overflow-hidden ml-[1px] ${
          resizabe ? "resize-x z-40" : "z-20"
        } `}
        onMouseEnter={onMouseEnter}
        ref={resizeRef}
        onMouseLeave={onMouseLeave}
        style={{
          width: gridSize * eventLength - 2,
          height: gridHeight - 10,
          borderRadius: 6,
          background: background,
        }}
      >
        {/* /// */}
        <div style={{ height: 32 }} className="flex justify-start">
          <div className=" ">
            <div
              className=" relative flex gap-1 max-w-[64px]"
              style={{
                width: data?.length > 3 ? 64 : (data?.length / 3) * 64,
              }}
            >
              {data?.length > 3 && (
                <div
                  className=" flex justify-center items-center absolute w-8 h-8 rounded-full bg-black bg-opacity-50 text-white"
                  style={{ left: `0px`, zIndex: 99 }}
                >
                  {data?.length - 3}
                </div>
              )}
              {data?.map((item: any, index: number) => {
                if (index > 2) {
                  return null;
                }
                return (
                  <div
                    className="absolute h-8"
                    key={index}
                    style={{
                      left: `${index * 16}px`,
                      zIndex: 3 - index,
                    }}
                  >
                    <img
                      src={item?.image}
                      alt=""
                      className=" w-8 h-8 rounded-full object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className="text-white h-8 flex justify-start items-center absolute truncate"
            style={{
              left: data?.length > 3 ? 64 + 8 : (data?.length / 3) * 64 + 8,
            }}
          >
            {data?.map((item: any, i: number) => (
              <>
                {i !== 0 && <div>{","}</div>}
                <div>{item?.name}</div>
              </>
            ))}
          </div>
        </div>
        {/* /// */}
      </div>
    </div>
  );
};

export default EventItem;
