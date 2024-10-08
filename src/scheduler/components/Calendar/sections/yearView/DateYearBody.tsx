import { forwardRef, useImperativeHandle, useRef } from "react";
import {
  DateYearBodyProps,
  DateYearBodyRef,
  DateYearBodyRowRef,
} from "../../../../types/common";
import { Group } from "../../../../types/datastructure";
import DateYearBodyRow from "./DateYearBodyRow";

const DateYearBody = forwardRef<DateYearBodyRef, DateYearBodyProps>(
  ({ flattenedDates, groups, data, onResize, onDragEnd }, ref) => {
    const dateYearBodyRowRef = useRef<DateYearBodyRowRef>();
    const checkForRows = (grp: Group) => {
      const isTopLevel = grp.parent === null;
      const isTopLevelExpanded = groups.find(
        (item: any) => item.parent === null
      )?.expand;
      const isParentExpanded = groups.find(
        (item: any) => item.id === grp.parent
      )?.expand;
      return isTopLevel || (isParentExpanded && isTopLevelExpanded);
    };

    useImperativeHandle(ref, () => ({
      navigateToday: () => {},
    }));

    return (
      <div>
        {groups.map(
          (grp: Group) =>
            checkForRows(grp) && (
              
              <DateYearBodyRow
                flattenedDates={flattenedDates}
                groups={groups}
                onResize={onResize}
                onDragEnd={onDragEnd}
                key={`calendar-row-${grp.id}`}
                data={data}
                ref={dateYearBodyRowRef}
                activeGroup={grp}
              />
            )
        )}
      </div>
    );
  }
);

export default DateYearBody;
