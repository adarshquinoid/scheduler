import { forwardRef, useImperativeHandle, useRef } from "react";
import {
  DateYearBodyProps,
  DateYearBodyRef,
  DateYearBodyRowRef,
} from "../../../../types/common";
import { Group } from "../../../../types/datastructure";
import DateYearBodyRow from "./DateYearBodyRow";
import { styles } from "../../../../helpers/constants";

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
    const gridSize = styles.dayColWidth;
    return (
      <svg
        width={flattenedDates.length * gridSize}
        height={groups.length * styles.dayColHeight}
      >
        
        {/* {groups.map(
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
        )} */}
        <defs>
          <pattern
            id="smallGrid"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke="gray"
              strokeWidth="0.5"
            />
          </pattern>
          <pattern
            id="grid"
            width={gridSize * 5}
            height={gridSize * 5}
            patternUnits="userSpaceOnUse"
          >
            <rect
              width={gridSize * 5}
              height={gridSize * 5}
              fill="url(#smallGrid)"
            />
            {/* <path
              d={`M ${gridSize * 5} 0 L 0 0 0 ${gridSize * 5}`}
              fill="none"
              stroke="gray"
              strokeWidth="0.5"
            /> */}
          </pattern>
        </defs>
        <rect         width={flattenedDates.length * gridSize}
        height={groups.length * styles.dayColHeight} fill="url(#grid)"/>
      </svg>
    );
  }
);

export default DateYearBody;
