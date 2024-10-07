import { forwardRef, useImperativeHandle, useRef } from "react";
import { generateColumnHeight } from "../../../../helpers/utilities";
import {
  DateYearBodyColumnRef,
  DateYearBodyRowProps,
  DateYearBodyRowRef,
} from "../../../../types/common";
import DateYearBodyColumn from "./DateYearBodyColumn";

const DateYearBodyRow = forwardRef<DateYearBodyRowRef, DateYearBodyRowProps>(
  ({ datesByYear, data, activeGroup }, ref) => {
    const dateYearBodyColumnRef = useRef<DateYearBodyColumnRef>(null);
 
    useImperativeHandle(ref, () => ({

    }));

    return (
      <div
        key={activeGroup.id}
        id={`event-row-${activeGroup.id}`}
        className="flex z-1"
        style={{ height: generateColumnHeight(data, activeGroup) }}
      >
        <DateYearBodyColumn
          datesByYear={datesByYear}
          data={data}
          ref={dateYearBodyColumnRef}
          activeGroup={activeGroup}
        />
      </div>
    );
  }
);

export default DateYearBodyRow;
