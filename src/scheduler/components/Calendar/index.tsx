import dayjs from "dayjs";
import { useState } from "react";
import { Months, styles } from "../../helpers/constants";
import { CalanderColumnType } from "../../types/common";
import { Group } from "../../types/datastructure";
import EventItem from "../EventItems";

const Calendar = ({ groups = [] }: any) => {
  const [activeYear] = useState(2024);
  const [dragSample, setDragSample] = useState("");
  const [newPosition, setNewPostion] = useState("01-01-2024");

  const generateDatesByMonth = (): any => {
    const datesByMonth: any = {};

    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(activeYear, month + 1, 0).getDate();
      const dates: CalanderColumnType[] = [];

      for (let day = 1; day <= daysInMonth; day++) {
        dates.push({
          date: new Date(activeYear, month, day),
          isCurrentDay: false,
          isHoliday: false,
        });
      }

      datesByMonth[month] = dates;
    }

    return datesByMonth;
  };



  const datesByMonth: any = generateDatesByMonth();

  console.log({datesByMonth})

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
  console.log(datesByMonth);
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  return (
    <div className="flex flex-col">
      <div className="flex h-[32px]">
        {Object.keys(datesByMonth).map((key) => (
          <div
            key={key}
            style={{
              width: `${datesByMonth[+key]?.length * styles.dayColWidth}px`,
            }}
            className="text-[12px] leading-[14px] font-normal border-t border-b border-r border-[#EDEAE9]"
          >
            <div className="p-2.5">{Months[+key as keyof typeof Months]}</div>
          </div>
        ))}
      </div>

      <div className="flex h-[24px]">
        {Object.keys(datesByMonth).map((key) =>
          datesByMonth[+key]?.map((day: CalanderColumnType) => (
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
      </div>

      <div>
        {groups.map(
          (grp: Group) =>
            checkForRows(grp) && (
              <div key={grp.id} className="flex z-1">
                {Object.keys(datesByMonth).map((key) =>
                  datesByMonth[+key]?.map((day: CalanderColumnType) => (
                    <div
                      key={
                        day.date ? dayjs(day.date).format("DD-MM-YYYY") : "key"
                      }
                      onDragOver={handleDragOver}
                      onDrop={(e) =>
                        handleDrop(e, dayjs(day.date).format("DD-MM-YYYY"))
                      }
                      className="border-b border-r border-[#EDEAE9] h-10 relative z-1 flex items-center"
                      style={{ width: styles.dayColWidth }}
                    >
                      <EventItem
                        activeData={day}
                        group={grp}
                        sampleDate={newPosition}
                        handleDragStart={handleDragStart}
                      />
                    </div>
                  ))
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Calendar;
