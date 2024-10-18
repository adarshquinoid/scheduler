export type SchedulerRef=any;
export type SchedulerProps=any;
export type CalendarProps=any;
export type CalendarRef=any;
export type TopBarProps=any;
export type TopBarRef=any;
export type TreeProps=any;
export type TreeRef=any;
export type MonthYearRendererProps=any;
export type MonthYearRendererRef=any;
export type DateRendererProps=any;
export type DateRendererRef=any;
export type DateYearBodyProps=any;
export type DateYearBodyRef=any;
export type DateYearBodyRowProps=any;
export type DateYearBodyRowRef=any;
export type DateYearBodyColumnProps=any;
export type DateYearBodyColumnRef=any;
export type EventItemProps=any;
export type EventItemRef=any;
export type EventItemContainerProps=any;
export type EventItemContainerRef=any;

export type CalendarColumnType={
    date:Date,
    isHoliday:boolean,
    isCurrentDay:boolean
}

export type SchedulerModes={label:string, id:string}
export type SchedulerContextType = {
    mode: SchedulerModes; 
    setMode: (mode: SchedulerModes) => void; 
    dragItem: any; 
    setDragItem: (item: any) => void; 
    handleSetEventData: (item: any) => void; 
    handleSetGroupData: (item: any) => void; 
    data:any,
    groups:any,

  };
