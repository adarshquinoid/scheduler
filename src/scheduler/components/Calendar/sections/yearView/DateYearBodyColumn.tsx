import dayjs, { Dayjs } from "dayjs";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { dateFormat, styles } from "../../../../helpers/constants";
import { eventItemData } from "../../../../helpers/utilities";
import {
  CalendarColumnType,
  DateYearBodyColumnProps,
  DateYearBodyColumnRef,
  EventItemContainerRef,
} from "../../../../types/common";
import { calandar } from "../../../../types/datastructure";
import EventItemContainer from "../../../EventItems";
dayjs.extend(customParseFormat);
const DateYearBodyColumn = forwardRef<
  DateYearBodyColumnRef,
  DateYearBodyColumnProps
>(({ datesByYear, data, activeGroup, onResize, onDragEnd }, ref) => {
  // const [dragSample, setDragSample] = useState("");
  const [activeDragData, setActiveDragData] = useState<calandar|null>(null);
  const eventItemContainerRef = useRef<EventItemContainerRef>(null);
const [activeDateDifference,setActiveDateDifference]=useState(0)
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    date: string,
    data: calandar,
    diff:number
  ) => {
    setActiveDragData(data);
    setActiveDateDifference(diff)
    // setDragSample(date);
    e.dataTransfer.setData("text/plain", date);
    e.dataTransfer.effectAllowed = "move"; // Optional: Indicate that the move operation is allowed
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, day: string) => {
    e.preventDefault();
    const startDate: Dayjs = dayjs(day, dateFormat);

    const draggedEndDate = startDate.add(activeDateDifference, "day");

    // const draggedDate = e.dataTransfer.getData("text/plain");
    // console.log(`Dropped ${draggedDate} on ${day}`);
    if(activeDragData?.id){
    onDragEnd({ row: activeDragData, start: day, end:dayjs(draggedEndDate).format(dateFormat)  });
  }
    setActiveDragData(null);
    // Handle your drop logic here, e.g., updating state, sending data to a server, etc.
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  useImperativeHandle(ref, () => ({}));
  console.log(data);
  return (
    <>
      {Object.keys(datesByYear).map((yr: any, index: number) => (
        <React.Fragment key={`yr-date-year-body-${index}`}>
          {Object.keys(datesByYear[yr]).map((key) =>
            datesByYear[yr][+key]?.map((day: CalendarColumnType) => (
              <div
                key={day.date ? dayjs(day.date).format(dateFormat) : "key"}
                onDragOver={handleDragOver}
                onDrop={(e) =>
                  handleDrop(e, dayjs(day.date).format(dateFormat))
                }
                style={{
                  background: day.isHoliday
                    ? styles.dayColHolidayBG
                    : styles.dayColColBg,
                  width: styles.dayColWidth,
                  minHeight: styles.dayColHeight,
                  borderColor: styles.dayColBorderColor,
                  height: eventItemContainerRef?.current?.getRowHeight(),
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
                  handleDragStart={handleDragStart}
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
            ))
          )}
        </React.Fragment>
      ))}
    </>
  );
});

export default DateYearBodyColumn;
