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
import EventItem from "./events/eventItem";
import HolidayColumnRender from "./events/holidayColumn";
import TodayIndicator from "./events/todayIndicator";
import Columns from "./events/columns";

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
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      // console.log(dragItem)
      // if(dragItem){
      // const startDate: Dayjs = dayjs(target, dateFormat);

      // const draggedEndDate = startDate.add(dragItem.length, "day");

      // if (dragItem?.row?.id) {

      //   onDragEnd({
      //     row: dragItem?.row,
      //     start: target,
      //     end: dayjs(draggedEndDate).format(dateFormat),
      //   });
      // }
      // setDragItem(null);}
      // Handle your drop logic here, e.g., updating state, sending data to a server, etc.
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault(); // Necessary to allow dropping
    };

    const renderEvents = () => {
      const events: any[] = [];
      data.forEach((_items: any, _index: number) => {
        const groupIndex = groups.findIndex(
          (grp: any) => grp.id === _items.role
        );
        const eventDates = createDateRange(_items);
        flattenedDates?.forEach((item: any, ind: number) => {
          if (dayjs(item.date).format(dateFormat) === _items.start) {
            events.push({
              ..._items,
              gridSize: gridSize,
              gridHeight: gridHeight,
              eventLength: eventDates.length,
              ind: ind,
              groupIndex: groupIndex,

              background: _items.background,

              data: _items?.labels,
            });
          }
        });
      });
      console.log(events);
      return (
        <>
          {events?.map((item: any) => (
            <EventItem {...item} />
          ))}
        </>
      );
    };
    const renderHolidays = () => {
      const holidayBlock: any[] = [];
      flattenedDates?.forEach((item: any, ind: number) => {
        if (item.isHoliday) {
          holidayBlock.push({
            background: styles.dayColHolidayBG,
            width: gridSize,
            height: groups.length * styles.dayColHeight,
            left: ind * gridSize,
          });
        }
      });

      return (
        <>
          {holidayBlock.map((item: any) => (
            <HolidayColumnRender {...item} />
          ))}
        </>
      );
    };
    const renderTodayBlock = () => {
      let left = 0;
      const index = flattenedDates?.findIndex((item: any) => item.isCurrentDay);
      if (index !== -1) {
        left = index * gridSize + 20;
      }
      return <TodayIndicator left={left} />;
    };

    return (
      <div
        className="relative"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e)}
      >
        {renderHolidays()}
        <Columns
          containerWidth={flattenedDates.length * gridSize}
          containerHeight={groups.length * styles.dayColHeight}
        />
        {renderEvents()}
        {renderTodayBlock()}
      </div>
    );
  }
);

export default DateYearBody;
