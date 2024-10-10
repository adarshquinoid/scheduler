import { forwardRef, useImperativeHandle, useRef, useState } from "react";

import {
  CalendarColumnType,
  CalendarProps,
  CalendarRef,
  DateRendererRef,
  DateYearBodyRef,
  MonthYearRendererRef,
} from "../../types/common";

import DateRenderer from "./sections/yearView/DateRenderer";
import DateYearBody from "./sections/yearView/DateYearBody";
import MonthYearRenderer from "./sections/yearView/MonthYearRenderer";
import {
  generateDatesByMonth,
  generateDatesByYears,
} from "../../helpers/utilities";

const Calandar = forwardRef<CalendarRef, CalendarProps>(
  ({ groups = [], data = [], onResize, updateKey, onDragEnd }, ref) => {
    const monthYearRendererRef = useRef<MonthYearRendererRef>(null);
    const dateRendererRef = useRef<DateRendererRef>(null);
    const dateYearBodyRef = useRef<DateYearBodyRef>(null);
    const today = new Date();
    const todayYear = today.getFullYear();

    const [loadedYears, setLoadedYears] = useState([
      todayYear - 1,
      todayYear,
      todayYear + 1,
    ]);

    const datesByYear: any = generateDatesByYears(loadedYears);

    useImperativeHandle(ref, () => ({
      loadNext: () => {
return;
        setLoadedYears((currentYears) => {
          const newYears = [...currentYears];
          newYears.push(newYears[newYears.length - 1] + 1);
          return newYears;
        });
      },
      loadPrevious: () => {
   return;
        setLoadedYears((currentYears) => {
          const newYears = [...currentYears];
          newYears.unshift(newYears[0] - 1);
          return newYears;
        });
      },
    }));
    const flattenedDates: any = Object.values(datesByYear).flatMap(
      (months: any) => Object.values(months).flat()
    );
    console.log(flattenedDates);
    return (
      <div className="flex flex-col over">
        <div>
          <MonthYearRenderer
            datesByYear={datesByYear}
            ref={monthYearRendererRef}
          />
          <DateRenderer datesByYear={datesByYear} ref={dateRendererRef} />
        
           <DateYearBody
            flattenedDates={flattenedDates}
            groups={groups}
            key={updateKey}
            data={data}
            onDragEnd={onDragEnd}
            onResize={onResize}
            ref={dateYearBodyRef}
          />  
        </div>
      </div>
    );
  }
);

export default Calandar;
