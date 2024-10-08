import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { dateFormat, styles } from "../../helpers/constants";
import { EventItemProps, EventItemRef } from "../../types/common";
import { useScheduler } from "../../providers/SchedulerProvider";
dayjs.extend(customParseFormat);
const EventItem = forwardRef<EventItemRef, EventItemProps>(
  ({ activeData, data,  onResize }, ref) => {
    const {setDragItem } = useScheduler();
    const startDateItem = data?.["dates"]?.[0];
    const dayCount: number = data?.["dates"].length;

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

        const endDate: Dayjs = dayjs(startDateItem, dateFormat);

        const draggedEndDate = endDate.add(actualDifference, "day");

        onResize({ id: data.id, newDate: draggedEndDate });
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
      if (dayCount > 1) {
        setCalculatedWidth(styles.dayColWidth * dayCount);
      } else {
        setCalculatedWidth(styles.dayColWidth);
      }
    }, [dayCount, data]);
const handleDragStart=(e:any)=>{
  e.dataTransfer.setData("text/plain", activeDate);
  e.dataTransfer.effectAllowed = "move";

  setDragItem({selection:activeDate,
    row:data,
    length:calculatedWidth / styles.dayColWidth - 1})

}
    return (
      <>
        {activeDate === startDateItem && (
          <div
            ref={resizeRef}
            draggable
            onMouseEnter={onMouseEnter}
            onTouchStart={onMouseEnter}
            onTouchEnd={onMouseLeave}
            onMouseLeave={onMouseLeave}
            style={{
              width: calculatedWidth,
              background: data?.background,
            }}
            onDragStart={handleDragStart}
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
