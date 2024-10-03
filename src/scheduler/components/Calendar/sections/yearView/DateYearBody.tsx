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
} from "../../../../types/common";
import dayjs from "dayjs";
import { styles } from "../../../../helpers/constants";
import EventItem from "../../../EventItems";

const DateYearBody = forwardRef<DateYearBodyRef, DateYearBodyProps>(
  ({ datesByYear, groups }, ref) => {
    const [dragSample, setDragSample] = useState("");
    const currentDayRef = useRef<HTMLDivElement>(null);
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
      console.log(`Dropped ${draggedDate} on ${day}`);
      setNewPostion(day);

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
                              ? dayjs(day.date).format("DD-MM-YYYY")
                              : "key"
                          }
                          onDragOver={handleDragOver}
                          onDrop={(e) =>
                            handleDrop(e, dayjs(day.date).format("DD-MM-YYYY"))
                          }
                          className={`border-b border-r border-[#EDEAE9] h-10 relative z-1 flex items-center justify-center ${
                            day?.isHoliday ? "bg-red-100" : ""
                          }`}
                          style={{ width: styles.dayColWidth }}
                        >
                          <EventItem
                            activeData={day}
                            group={grp}
                            sampleDate={newPosition}
                            handleDragStart={handleDragStart}
                          />
                          {day.isCurrentDay && (
                            <div
                              className="h-full w-1 bg-yellow-200 z-40"
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
