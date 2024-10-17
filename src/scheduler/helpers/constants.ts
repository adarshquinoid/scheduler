export const Months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
} as const;
export const dateFormat="DD-MM-YYYY"
export const styles = {
  dayColWidth: 40,
  dayColHeight:50,
  dayColHolidayBG:"#F5F3F3",
  dayColHeaderBG:"#FFF",
  dayColHeaderColor:"#1E1F21",
  dayColHeaderFontSize:"12px",
  dayColHeaderBorderColor:"#EDEAE9",
  currentDayColHeaderBorderColor:"#ff1010",
  dayColColBg:"#F9F8F8",
  dayColBorderColor:"#EDEAE9",
  eventItemHeight:40,
  eventItemContainerPadding:5,
  eventItemContainerGap:5,
  
  currentDayIndicatorBGColor:"#ff1010",
  currentDayIndicatorColor:"#ffffff"
} as const;

export const modes = {
  YEAR: { label: "Year", id: "YEAR" },
  MONTH: { label: "Month", id: "MONTH" },
  WEEK: { label: "Week", id: "WEEK" },

} as const;

export const eventTypes = {
  TENENT: "TENENT",
  CATEGORY: "CATEGORY",
  RANK: "RANK",
};
