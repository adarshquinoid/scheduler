import { forwardRef, useImperativeHandle, useRef } from "react";
import { generateColumnHeight } from "../../../../helpers/utilities";
import {
  CalendarColumnType,
  DateYearBodyColumnRef,
  DateYearBodyRowProps,
  DateYearBodyRowRef,
} from "../../../../types/common";
import { styles } from "../../../../helpers/constants";

const DateYearBodyRow = forwardRef<DateYearBodyRowRef, DateYearBodyRowProps>(
  ({ flattenedDates, data, activeGroup, onResize, onDragEnd ,rowIndex}, ref) => {
    const dateYearBodyColumnRef = useRef<DateYearBodyColumnRef>(null);

    useImperativeHandle(ref, () => ({}));

    return (
      <div
        key={activeGroup.id}
        id={`event-row-${activeGroup.id}`}
        className="flex z-1"
        style={{ height: generateColumnHeight(data, activeGroup) }}
      >

     

          
            {/* <line x1="200" y1="10" x2="200" y2="190" stroke="black" /> */}
            <svg height={styles.dayColHeight} width={styles.dayColWidth*flattenedDates.length}>

        {flattenedDates.map((_day: CalendarColumnType,_i:number) => (
            // <line x1="100" y1="10" x2="100" y2="190" stroke="black" />

            <rect
            x={_i*styles.dayColWidth}
            y={rowIndex*styles.dayColHeight}
            width={40}
            height="40"
            stroke="black"
            fill="none"
          />
         
          // <DateYearBodyColumn
          //   day={day}
          //   key={`cal-row-${activeGroup.id}-col-${dayjs(day.date).format(
          //     dateFormat
          //   )}`}
          //   id={`cal-row-${activeGroup.id}-col-${dayjs(day.date).format(
          //     dateFormat
          //   )}`}
          //   data={data.filter((item: calandar) => item.role === activeGroup.id)}
          //   onResize={onResize}
          //   ref={dateYearBodyColumnRef}
          //   onDragEnd={onDragEnd}
          //   activeGroup={activeGroup}
          // />
        ))}
         </svg>
      </div>
    );
  }
);

export default DateYearBodyRow;
