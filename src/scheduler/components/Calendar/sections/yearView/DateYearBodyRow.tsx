import { forwardRef, useImperativeHandle, useRef } from "react";
import { generateColumnHeight } from "../../../../helpers/utilities";
import {
  DateYearBodyColumnRef,
  DateYearBodyRowProps,
  DateYearBodyRowRef,
} from "../../../../types/common";
import DateYearBodyColumn from "./DateYearBodyColumn";
import { calandar } from "../../../../types/datastructure";

const DateYearBodyRow = forwardRef<DateYearBodyRowRef, DateYearBodyRowProps>(
  ({ datesByYear, data, activeGroup,onResize,onDragEnd }, ref) => {
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
          data={data.filter((item:calandar)=>item.role===activeGroup.id)}
          onResize={onResize}
          ref={dateYearBodyColumnRef}
          onDragEnd={onDragEnd}
          activeGroup={activeGroup}
        />
      </div>
    );
  }
);

export default DateYearBodyRow;
