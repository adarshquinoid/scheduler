import dayjs from "dayjs";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import { dateFormat, styles } from "../../../../helpers/constants";
import {
  eventItemData
} from "../../../../helpers/utilities";
import {
  CalendarColumnType,
  DateYearBodyColumnProps,
  DateYearBodyColumnRef,
  EventItemContainerRef
} from "../../../../types/common";
import EventItemContainer from "../../../EventItems";
  
  const DateYearBodyColumn = forwardRef<DateYearBodyColumnRef, DateYearBodyColumnProps>(
    ({ datesByYear, data ,activeGroup}, ref) => {
      const [dragSample, setDragSample] = useState("");

      const eventItemContainerRef = useRef<EventItemContainerRef>(null);
   
  
      const handleDragStart = (
        e: React.DragEvent<HTMLDivElement>,
        date: string
      ) => {
        setDragSample(date);
        e.dataTransfer.setData("text/plain", date);
        e.dataTransfer.effectAllowed = "move"; // Optional: Indicate that the move operation is allowed
      };
  
      const handleDrop = (e: React.DragEvent<HTMLDivElement>, day: string) => {
        e.preventDefault();
  
        const draggedDate = e.dataTransfer.getData("text/plain");
        // console.log(`Dropped ${draggedDate} on ${day}`);
  
        // Handle your drop logic here, e.g., updating state, sending data to a server, etc.
      };
  
      const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // Necessary to allow dropping
      };

      // useEffect(() => {
      //   if (currentDayRef?.current) {
      //     navigateToToday();
   
      //   }
      // }, []);
      useImperativeHandle(ref, () => ({
   
      }));
  
      return (
       <>
                  {Object.keys(datesByYear).map((yr: any, index: number) => (
                    <React.Fragment key={`yr-date-year-body-${index}`}>
                      {Object.keys(datesByYear[yr]).map((key) =>
                        datesByYear[yr][+key]?.map((day: CalendarColumnType) => (
                          <div
                            key={
                              day.date
                                ? dayjs(day.date).format(dateFormat)
                                : "key"
                            }
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
                              ref={eventItemContainerRef}
                              data={eventItemData(data, activeGroup, day)}
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
    }
  );
  
  export default DateYearBodyColumn;
  