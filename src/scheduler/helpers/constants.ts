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

export const styles = {
  dayColWidth: 40,
} as const;

export const modes = {
  YEAR: { label: "Year", id: "YEAR" },
  MONTH: { label: "Month", id: "MONTH" },
  WEEK: { label: "Week", id: "WEEK" },
  DAY: { label: "Day", id: "DAY" },
} as const;

export const eventTypes = {
  TENENT: "TENENT",
  CATEGORY: "CATEGORY",
  RANK: "RANK",
};
