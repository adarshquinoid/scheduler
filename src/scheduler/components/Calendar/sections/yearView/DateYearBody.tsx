import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Group } from "../../../../types/datastructure";
import {
  CalendarColumnType,
  DateYearBodyProps,
  DateYearBodyRef,
  EventItemRef,
} from "../../../../types/common";
import dayjs from "dayjs";
import { dateFormat, styles } from "../../../../helpers/constants";
import EventItem from "../../../EventItems";
import {
  createDateRange,
  eventItemData,
  generateActiveColumnDates,
} from "../../../../helpers/utilities";

const DateYearBody = forwardRef<DateYearBodyRef, DateYearBodyProps>(
  ({ datesByYear, groups, data }, ref) => {
    const [dragSample, setDragSample] = useState("");
    const currentDayRef = useRef<HTMLDivElement>(null);
    const eventItemRef = useRef<EventItemRef>(null);
    const [newPosition, setNewPostion] = useState("03-10-2024");
    const checkForRows = (grp: Group) => {
      const isTopLevel = grp.parent === null;
      const isTopLevelExpanded = groups.find(
        (item: any) => item.parent === null
      )?.expand;
      const isParentExpanded = groups.find(
        (item: any) => item.id === grp.parent
      )?.expand;
      return isTopLevel || (isParentExpanded && isTopLevelExpanded);
    };

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
    const navigateToCurrentDay = () => {
      currentDayRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    };
    useEffect(() => {
      if (currentDayRef?.current) {
        navigateToCurrentDay();
        data?.forEach((item: any) => {
          console.log(`${item.start}:`,createDateRange(item));
        });
      }
    }, []);
    useImperativeHandle(ref, () => ({
      onClick: () => {},
    }));

    return (
      <div>
        {groups.map(
          (grp: Group) =>
            checkForRows(grp) && (
              <div key={grp.id} className="flex z-1">
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
                            height: eventItemRef?.current?.getRowHeight(),
                          }}
                          className={`border-b border-r h-auto relative  z-1 flex items-center justify-center `}
                        >
                          <EventItem
                            activeData={day}
                            ref={eventItemRef}
                            data={eventItemData(data, grp, day)}
                            group={grp}
                            handleDragStart={handleDragStart}
                          />
                          {day.isCurrentDay && (
                            <div
                              style={{
                                background: styles.currentDayIndicatorBGColor,
                                height: `calc(100% + 2px)`,
                              }}
                              className="h-full w-1 z-30"
                              ref={currentDayRef}
                            />
                          )}
                        </div>
                      ))
                    )}
                  </React.Fragment>
                ))}
              </div>
            )
        )}
      </div>
    );
  }
);

export default DateYearBody;
