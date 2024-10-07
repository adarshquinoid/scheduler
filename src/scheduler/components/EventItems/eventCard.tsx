import dayjs from "dayjs";
import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { dateFormat, styles } from "../../helpers/constants";
import { EventItemProps, EventItemRef } from "../../types/common";

const EventItem = forwardRef<EventItemRef, EventItemProps>(
  ({ activeData, item, handleDragStart }, ref) => {
    const startDateItem = item[0];
    const [dayCount,setDayCount]=useState(item.length);
    const activeDate: String = dayjs(activeData.date).format(dateFormat);
    const eventItemContainerRef = useRef<HTMLDivElement>(null);
    const [dragWidth, setDragWidth] = useState<number>(styles.dayColWidth);
    const [eventContainerHeight, setEventContainerHeight] =
      useState<number>(50);
    const [calculatedWidth, setCalculatedWidth] = useState<number>(
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
    useEffect(() => {
      if (item.length > 1) {
        setCalculatedWidth(styles.dayColWidth * item.length);
      } else {
        setCalculatedWidth(styles.dayColWidth);
      }
    }, [item]);

    return (
      <>
        {activeDate === startDateItem && (
          <div
            ref={resizeRef}
            draggable
            onMouseEnter={onMouseEnter}
            onTouchStartCapture={onMouseEnter}
            onTouchEnd={onMouseLeave}
            onMouseLeave={onMouseLeave}
            style={{
              width: calculatedWidth,
            }}
            onDragStart={(e) => handleDragStart(e, activeData)}
            id={`event-item-${activeDate}`}
            key={`event-item-${activeDate}`}
            className={` h-9 rounded-sm overflow-hidden ${
              resizabe ? "resize-x z-40" : "z-20"
            } bg-red-300 z-40 `}
          >
            EventItem
          </div>
        )}
      </>
    );
  }
);

export default EventItem;
