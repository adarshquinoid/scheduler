import { forwardRef, useImperativeHandle, useRef, useState } from "react";

import {
  CalendarColumnType,
  CalendarProps,
  CalendarRef,
  DateRendererRef,
  DateYearBodyRef,
  MonthYearRendererRef,
} from "../../types/common";

import MonthYearRenderer from "./sections/yearView/MonthYearRenderer";
import DateRenderer from "./sections/yearView/DateRenderer";
import DateYearBody from "./sections/yearView/DateYearBody";

const Calandar = forwardRef<CalendarRef, CalendarProps>(
  ({ groups = [] }, ref) => {
    const monthYearRendererRef = useRef<MonthYearRendererRef>(null);
    const dateRendererRef = useRef<DateRendererRef>(null);
    const dateYearBodyRef = useRef<DateYearBodyRef>(null);
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();

    const [loadedYears, setLoadedYears] = useState([
      todayYear - 1,
      todayYear,
      todayYear + 1,
    ]);

    const generateDatesByMonth = (
      activeYear: number
    ): Record<number, CalendarColumnType[]> => {
      const datesByMonth: Record<number, CalendarColumnType[]> = {};

      for (let month = 0; month < 12; month++) {
        const daysInMonth = new Date(activeYear, month + 1, 0).getDate();
        const dates: CalendarColumnType[] = [];

        for (let day = 1; day <= daysInMonth; day++) {
          const date = new Date(activeYear, month, day);
          const isCurrentDay =
            activeYear === todayYear &&
            month === todayMonth &&
            day === todayDate;
          const isHoliday = date.getDay() === 0 || date.getDay() === 6;
          dates.push({
            date,
            isCurrentDay,
            isHoliday,
          });
        }

        datesByMonth[month] = dates;
      }

      return datesByMonth;
    };

    const generateDatesByYears = () => {
      const datesByYearData: any = {};

      loadedYears.forEach((year) => {
        datesByYearData[year] = generateDatesByMonth(year);
      });

      return datesByYearData;
    };

    const datesByYear: any = generateDatesByYears();


    useImperativeHandle(ref, () => ({
      loadNext: () => {
        setLoadedYears((currentYears) => {
          const newYears = [...currentYears];
          newYears.push(newYears[newYears.length - 1] + 1);
          return newYears;
        });
      },
      loadPrevious: () => {
        setLoadedYears((currentYears) => {
          const newYears = [...currentYears];
          newYears.unshift(newYears[0] - 1);
          return newYears;
        });
      },
    }));
    return (
      <div className="flex flex-col">
        <MonthYearRenderer
          datesByYear={datesByYear}
          ref={monthYearRendererRef}
        />
        <DateRenderer datesByYear={datesByYear} ref={dateRendererRef} />
        <DateYearBody
          datesByYear={datesByYear}
          groups={groups}
          ref={dateYearBodyRef}
        />
      </div>
    );
  }
);

export default Calandar;
