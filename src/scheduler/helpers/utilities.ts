import dayjs, { Dayjs } from "dayjs";
import { CalendarColumnType } from "../types/common";
import { calandar, Group } from "../types/datastructure";
import { dateFormat } from "./constants";
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
    //   console.log(dateRange, activeDate);
    return dateRange.some((item: String) => item === activeDate)?dateRange:[];
  } else return [];
};

export const eventItemData = (
  data: calandar,
  group: Group,
  day: CalendarColumnType
) => {
  let datasOnCyrrentRow = data.filter((item: any) => item.role === group.id);
  const finalData: any = [];
  datasOnCyrrentRow.forEach((item: any) => {
    const dateData = generateActiveColumnDates(
      createDateRange(item),
      dayjs(day.date).format(dateFormat)
    );
    if (dateData.length > 0) {
      finalData.push(dateData);
    }
  });
  return finalData;
};
