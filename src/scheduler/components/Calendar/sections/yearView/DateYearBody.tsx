import { forwardRef, useImperativeHandle, useRef } from "react";
import {
  DateYearBodyProps,
  DateYearBodyRef,
  DateYearBodyRowRef,
} from "../../../../types/common";
import { Group } from "../../../../types/datastructure";
import DateYearBodyRow from "./DateYearBodyRow";
import { dateFormat, styles } from "../../../../helpers/constants";
import { createDateRange } from "../../../../helpers/utilities";
import dayjs from "dayjs";

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
    const gridHeight = styles.dayColHeight;

    const renderEvents = () => {
      const events: any[] = [];
     
      data.forEach((_items: any, _index: number) => {
        const groupIndex=groups.findIndex((grp:any)=>grp.id===_items.role)
        const eventDates = createDateRange(_items);
        flattenedDates?.forEach((item:any,ind:number)=>{
          if(dayjs(item.date).format(dateFormat)===_items.start){
         
            events.push(
              <div
                className="absolute "
                style={{
                  width: (gridSize*eventDates.length)-4,
                  height: gridHeight-10,
                  left: (ind * gridSize)+2,
                  background:_items.background,
                  top: groupIndex * gridHeight+5,
                }}
              />
            );
          }
        })

   
      });

      return <>{events}</>;
    };
    return (
      <div className="relative">
        <svg
          width={flattenedDates.length * gridSize}
          height={groups.length * styles.dayColHeight}
        >
          <defs>
            <pattern
              id="smallGrid"
              width={gridSize}
              height={gridHeight}
              patternUnits="userSpaceOnUse"
            >
              <path
                d={`M ${gridSize} 0 L 0 0 0 ${gridHeight}`}
                fill="none"
                stroke="gray"
                strokeWidth="0.5"
              />
            </pattern>
            <pattern
              id="grid"
              width={gridSize * 5}
              height={gridHeight * 5}
              patternUnits="userSpaceOnUse"
            >
              <rect
                width={gridSize * 5}
                height={gridHeight * 5}
                fill="url(#smallGrid)"
              />
            </pattern>
          </defs>
          <rect
            width={flattenedDates.length * gridSize}
            height={groups.length * styles.dayColHeight}
            fill="url(#grid)"
          />
        </svg>
        {renderEvents()}
      </div>
    );
  }
);

export default DateYearBody;
