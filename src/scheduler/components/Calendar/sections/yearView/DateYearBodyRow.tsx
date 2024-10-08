import dayjs from "dayjs";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { dateFormat } from "../../../../helpers/constants";
import { generateColumnHeight } from "../../../../helpers/utilities";
import {
  CalendarColumnType,
  DateYearBodyColumnRef,
  DateYearBodyRowProps,
  DateYearBodyRowRef,
} from "../../../../types/common";
import { calandar } from "../../../../types/datastructure";
import DateYearBodyColumn from "./DateYearBodyColumn";

const DateYearBodyRow = forwardRef<DateYearBodyRowRef, DateYearBodyRowProps>(
  ({ flattenedDates, data, activeGroup, onResize, onDragEnd }, ref) => {
    const dateYearBodyColumnRef = useRef<DateYearBodyColumnRef>(null);

    useImperativeHandle(ref, () => ({}));

    return (
      <div
        key={activeGroup.id}
        id={`event-row-${activeGroup.id}`}
        className="flex z-1"
        style={{ height: generateColumnHeight(data, activeGroup) }}
      >
        {flattenedDates.map((day: CalendarColumnType) => (
          <DateYearBodyColumn
            day={day}
            key={`cal-row-${activeGroup.id}-col-${dayjs(day.date).format(
              dateFormat
            )}`}
            id={`cal-row-${activeGroup.id}-col-${dayjs(day.date).format(
              dateFormat
            )}`}
            data={data.filter((item: calandar) => item.role === activeGroup.id)}
            onResize={onResize}
            ref={dateYearBodyColumnRef}
            onDragEnd={onDragEnd}
            activeGroup={activeGroup}
          />
        ))}
      </div>
    );
  }
);

export default DateYearBodyRow;
