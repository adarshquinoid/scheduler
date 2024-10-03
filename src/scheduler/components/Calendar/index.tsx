import dayjs from "dayjs";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Months, styles } from "../../helpers/constants";
import {
  CalendarColumnType,
  CalendarProps,
  CalendarRef,
} from "../../types/common";
import { Group } from "../../types/datastructure";
import EventItem from "../EventItems";

const Calandar = forwardRef<CalendarRef, CalendarProps>(
  ({ groups = [] }, ref) => {
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth(); // 0-based
    const todayDate = today.getDate();
    const [dragSample, setDragSample] = useState("");
    const [newPosition, setNewPostion] = useState("01-01-2024");
    const [loadedYears,setLoadedYears]=useState([todayYear-1,todayYear,todayYear+1])
    const currentDayRef = useRef<HTMLDivElement>(null);
    const generateDatesByMonth = (
      activeYear: number
    ): Record<number, CalendarColumnType[]> => {
      const datesByMonth: Record<number, CalendarColumnType[]> = {};

      // Get today's date for comparison

      for (let month = 0; month < 12; month++) {
        const daysInMonth = new Date(activeYear, month + 1, 0).getDate(); // Get days in the month
        const dates: CalendarColumnType[] = [];

        for (let day = 1; day <= daysInMonth; day++) {
          const date = new Date(activeYear, month, day);
          const isCurrentDay =
            activeYear === todayYear &&
            month === todayMonth &&
            day === todayDate;
          const isHoliday = date.getDay() === 0 || date.getDay() === 6; // 0 = Sunday, 6 = Saturday

          dates.push({
            date,
            isCurrentDay,
            isHoliday,
          });
        }

        datesByMonth[month] = dates; // Assign array of dates to the month
      }

      return datesByMonth;
    };


    const datesByYear: any = loadedYears.map((item)=>generateDatesByMonth(item));

   

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
      console.log(day);
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
      loadNext: () => {
        setLoadedYears((currentYears) => {
          // Create a new array by incrementing the last year
          const newYears = [...currentYears];
          newYears.push(newYears[newYears.length - 1] + 1); // Add next year
          return newYears;
        });
      },
      loadPrevious: () => {
        setLoadedYears((currentYears) => {
          const newYears = [...currentYears]; // Create a copy of the array
          newYears.unshift(newYears[0] - 1); // Prepend the previous year
          return newYears;
        });
      },
    }));
    return (
      <div className="flex flex-col">
        <div className="flex h-[32px]">
          {datesByYear.map((yr: any) => (
            <>
              {Object.keys(yr).map((key) => (
                <div
                  key={key}
                  style={{
                    width: `${
                      yr[+key]?.length * styles.dayColWidth
                    }px`,
                  }}
                  className="text-[12px] leading-[14px] font-normal border-t border-b border-r border-[#EDEAE9]"
                >
                  <div className="p-2.5">
                    {Months[+key as keyof typeof Months]}
                  </div>
                </div>
              ))}
            </>
          ))}
        </div>

        <div className="flex h-[24px]">
          {datesByYear.map((yr: any) => (
            <>
              {Object.keys(yr).map((key) =>
                yr[+key]?.map((day: CalendarColumnType) => (
                  <div
                    key={day ? dayjs(day.date).format("DD-MM-YYYY") : "key"}
                    className="border-b border-r border-[#EDEAE9]"
                    style={{ width: styles.dayColWidth }}
                  >
                    <div className="h-6 w-10 flex items-center justify-center text-[12px] leading-[14px] font-normal">
                      {day ? dayjs(day.date).format("DD") : ""}
                    </div>
                  </div>
                ))
              )}
            </>
          ))}
        </div>

        <div>
          {groups.map(
            (grp: Group) =>
              checkForRows(grp) && (
                <div key={grp.id} className="flex z-1">
                  {datesByYear.map((yr: any) => (
                    <>
                      {Object.keys(yr).map((key) =>
                        yr[+key]?.map((day: CalendarColumnType) => (
                          <div
                            key={
                              day.date
                                ? dayjs(day.date).format("DD-MM-YYYY")
                                : "key"
                            }
                            onDragOver={handleDragOver}
                            onDrop={(e) =>
                              handleDrop(
                                e,
                                dayjs(day.date).format("DD-MM-YYYY")
                              )
                            }
                            className={`border-b border-r border-[#EDEAE9] h-10 relative z-1 flex items-center justify-center ${
                              day?.isHoliday ? "bg-red-100" : ""
                            }`}
                            style={{ width: styles.dayColWidth }}
                          >
                            {day.isCurrentDay && (
                              <div
                                className="h-full w-1 bg-yellow-200 z-45"
                                ref={currentDayRef}
                              />
                            )}
                            <EventItem
                              activeData={day}
                              group={grp}
                              sampleDate={newPosition}
                              handleDragStart={handleDragStart}
                            />
                          </div>
                        ))
                      )}
                    </>
                  ))}
                </div>
              )
          )}
        </div>
      </div>
    );
  }
);

export default Calandar;
