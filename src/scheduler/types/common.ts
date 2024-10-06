export type SchedulerRef=any;
export type SchedulerProps=any;
export type CalendarProps=any;
export type CalendarRef=any;
export type TreeProps=any;
export type TreeRef=any;
export type MonthYearRendererProps=any;
export type MonthYearRendererRef=any;
export type DateRendererProps=any;
export type DateRendererRef=any;
export type DateYearBodyProps=any;
export type DateYearBodyRef=any;
export type EventItemProps=any;
export type EventItemRef=any;

export type CalendarColumnType={
    date:Date,
    isHoliday:boolean,
    isCurrentDay:boolean
}

export type SchedulerModes={label:string, id:string}
export type SchedulerContextType = {
    mode: SchedulerModes; 
    setMode: (mode: SchedulerModes) => void; 
  };
