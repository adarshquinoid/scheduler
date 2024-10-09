import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { dateFormat, styles } from "../../../../helpers/constants";
import { eventItemData } from "../../../../helpers/utilities";
import {
  DateYearBodyColumnProps,
  DateYearBodyColumnRef,
  EventItemContainerRef
} from "../../../../types/common";
import { calandar } from "../../../../types/datastructure";
import EventItemContainer from "../../../EventItems";
import { useScheduler } from "../../../../providers/SchedulerProvider";
dayjs.extend(customParseFormat);
const DateYearBodyColumn = forwardRef<
  DateYearBodyColumnRef,
  DateYearBodyColumnProps
>(({ day, data, activeGroup, onResize, onDragEnd }, ref) => {
  // const [dragSample, setDragSample] = useState("");
  const {dragItem,setDragItem } = useScheduler();
  const eventItemContainerRef = useRef<EventItemContainerRef>(null);


  const handleDrop = (e: React.DragEvent<HTMLDivElement>, target: string) => {
    e.preventDefault();
    console.log(dragItem)
    if(dragItem){
    const startDate: Dayjs = dayjs(target, dateFormat);

    const draggedEndDate = startDate.add(dragItem.length, "day");


    if (dragItem?.row?.id) {

      onDragEnd({
        row: dragItem?.row,
        start: target,
        end: dayjs(draggedEndDate).format(dateFormat),
      });
    }
    setDragItem(null);}
    // Handle your drop logic here, e.g., updating state, sending data to a server, etc.
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  useImperativeHandle(ref, () => ({}));

  return (
    
      <div
        key={day.date ? dayjs(day.date).format(dateFormat) : "key"}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, dayjs(day.date).format(dateFormat))}
        style={{
          background: day.isHoliday
            ? styles.dayColHolidayBG
            : styles.dayColColBg,
          width: styles.dayColWidth,
          minHeight: styles.dayColHeight,
          borderColor: styles.dayColBorderColor,
          height: eventItemContainerRef?.current?.getRowHeight() || undefined,
        }}
        className={`border-b border-r h-auto relative  z-1 flex items-center justify-center `}
      >
        <EventItemContainer
          activeData={day}
          onResize={onResize}
          actualData={data}
          ref={eventItemContainerRef}
          groupedData={eventItemData(data, activeGroup, day)}
          group={activeGroup}
    
        />
        {day.isCurrentDay && (
          <div
            style={{
              background: styles.currentDayIndicatorBGColor,
              height: `calc(100% + 2px)`,
            }}
            className="h-full w-1 z-30"
          />
        )}
      </div>
    
  );
});

export default DateYearBodyColumn;
