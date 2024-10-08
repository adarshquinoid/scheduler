import dayjs, { Dayjs } from "dayjs";
import { CalendarColumnType } from "../types/common";
import { calandar, Group } from "../types/datastructure";
import { dateFormat, styles } from "./constants";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
export function createDateRange(item: calandar): string[] {
  const startDate: string | Dayjs = item.start;
  const endDate: string | Dayjs = item.end;

  const dates: string[] = [];

  // Ensure both startDate and endDate are parsed correctly as Dayjs objects
  let currentDate: Dayjs = dayjs(startDate, dateFormat); // Parse startDate if it's a string
  const end = dayjs(endDate, dateFormat); // Parse endDate if it's a string

  // Check if the dates are valid
  if (!currentDate.isValid() || !end.isValid()) {
    console.error("Invalid date format");
    return [];
  }

  // Loop through the dates and collect them
  while (currentDate.isBefore(end) || currentDate.isSame(end)) {
    dates.push(currentDate.format(dateFormat)); // Push date in the desired format
    currentDate = currentDate.add(1, "day"); // Move to the next day
  }

  return dates;
}

export const generateActiveColumnDates = (
  dateRange: String[],
  activeDate: String
): String[] => {
  if (dateRange.length > 0) {
    return dateRange.some((item: String) => item === activeDate)
      ? dateRange
      : [];
  } else return [];
};
export const getCurrentRowData = (data: calandar[], group: Group) => {
  return data.filter((item: any) => item.role === group.id);
};
export const eventItemData = (
  data: calandar[],
  group: Group,
  day: CalendarColumnType
) => {
  const datasOnCurrentRow = getCurrentRowData(data, group);

  const finalData: any = [];
  datasOnCurrentRow.forEach((item: any) => {
    const dateData = generateActiveColumnDates(
      createDateRange(item),
      dayjs(day.date).format(dateFormat)
    );
    if (dateData.length > 0) {
      finalData.push({dates:dateData,...item});
    }
  });

  return finalData||[];
};
export const calculateRepeatedRanges = (data: calandar[]): number => {
  const rangeCount: Record<string, number> = {};

  // Generate date ranges and count occurrences
  data.forEach((item: calandar) => {
    const ranges = createDateRange(item);

    ranges.forEach((range) => {
      if (rangeCount[range]) {
        rangeCount[range] += 1; // Increment count if range already exists
      } else {
        rangeCount[range] = 1; // Initialize count if it's a new range
      }
    });
  });

  // Find the range with the largest count
  let maxCount = 0;

  for (const [_range, count] of Object.entries(rangeCount)) {
    if (count > maxCount) {
      maxCount = count;
    }
  }

  // Return the range with the largest count, or null if there are no repeated ranges
  return maxCount > 1 ? maxCount : 1;
};

export const generateColumnHeight = (data: calandar[], group: Group) => {
  let datasOnCurrentRow = getCurrentRowData(data, group);
  let actualLength = calculateRepeatedRanges(datasOnCurrentRow);

  if (actualLength > 1) {
    return (
      styles.eventItemHeight * actualLength +
      (actualLength - 1) * styles.eventItemContainerGap +
      styles.eventItemContainerPadding * 2
    );
  } else {
    return styles.eventItemHeight + styles.eventItemContainerPadding * 2;
  }
};

export const generateDatesByMonth = (
  activeYear: number
): Record<number, CalendarColumnType[]> => {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();
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

export  const generateDatesByYears = (yearArray:number[]) => {
  const datesByYearData: any = {};

  yearArray.forEach((year) => {
    datesByYearData[year] = generateDatesByMonth(year);
  });

  return datesByYearData;
};