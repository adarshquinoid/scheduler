import dayjs from "dayjs";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { dateFormat, styles } from "../../helpers/constants";
import { EventItemProps, EventItemRef } from "../../types/common";

const EventItem = forwardRef<EventItemRef, EventItemProps>(
  (
    {
      activeData,
      group,

      handleDragStart,
      data,
    },
    ref
  ) => {
    console.log(data);
    const eventItemContainerRef = useRef<HTMLDivElement>(null);
    const [dragWidth, setDragWidth] = useState<number>(styles.dayColWidth);
    const [eventContainerHeight, setEventContainerHeight] =
      useState<number>(50);
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
    useEffect(() => {
      if (eventItemContainerRef?.current) {
        setEventContainerHeight(eventItemContainerRef?.current?.clientHeight);
      }
    }, [eventItemContainerRef?.current?.clientHeight]);
    useImperativeHandle(ref, () => ({
      getRowHeight: () => {
        if (eventItemContainerRef?.current) {
          return eventContainerHeight;
        }
        return styles.eventItemHeight;
      },
    }));
   
    return (
      <div
        className="absolute  left-0 "
        // style={{ height: eventContainerHeight }}
      >
        {data?.length > 0 && (
          <div className=" flex flex-col gap-2" ref={eventItemContainerRef}>
            {data.map((_item: any) => (
              <div
                ref={resizeRef}
                draggable
                onMouseEnter={onMouseEnter}
                onTouchStartCapture={onMouseEnter}
                onTouchEnd={onMouseLeave}
                onMouseLeave={onMouseLeave}
                style={{
                  display: `${
                    _item?.[0] ===
                    dayjs(activeData.date, dateFormat).format(dateFormat)
                      ? "flex"
                      : "none"
                  }px`,
                }}
                onDragStart={(e) => handleDragStart(e, activeData)}
                key={activeData}
                id={activeData}
                className={` h-9 rounded-sm overflow-hidden ${
                  resizabe ? "resize-x z-40" : "z-20"
                } bg-red-300 z-40 `}
              >
                EventItem
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

export default EventItem;
