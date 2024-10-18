import dayjs from "dayjs";
import { forwardRef, useImperativeHandle } from "react";
import { dateFormat, styles } from "../../../../helpers/constants";
import {
  calculateDateDifference,
  createDateRange,
} from "../../../../helpers/utilities";
import {
  DateYearBodyProps,
  DateYearBodyRef
} from "../../../../types/common";
import Columns from "./events/columns";
import EventGroups from "./events/eventGroups";
import EventItem from "./events/eventItem";
import HolidayColumnRender from "./events/holidayColumn";
import TodayIndicator from "./events/todayIndicator";
import { useScheduler } from "../../../../providers/SchedulerProvider";

const DateYearBody = forwardRef<DateYearBodyRef, DateYearBodyProps>(
  ({ flattenedDates,  onResize, onDragEnd }, ref) => {
    const {data,groups}=useScheduler()
 
    useImperativeHandle(ref, () => ({
      navigateToday: () => {},
    }));


    const gridSize = styles.dayColWidth;
    const gridHeight = styles.dayColHeight;
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
     
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
       
              gridSize: gridSize,
              row:_items,
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

      return (
        <>
          {events?.map((item: any) => (
            <EventItem {...item} onResize={onResize} onDragEnd={onDragEnd} />
          ))}
        </>
      );
    };

    const renderVesselGroups = () => {
      const vesselEvents: any[] = [];
  
      const vessels: any[] = groups.filter(
        (item: any) => item.type === "vessel"
      );


      const vesselEventGroup:any = [];


      vessels.forEach((vessel: any) => {
        let vesselData =  data.filter((dat: any) => vessel.id === dat.vesselId);

        const difference =
         calculateDateDifference(vesselData);

        vesselEventGroup.push({...vessel,...difference})
      });

      vesselEventGroup.forEach((_items: any, _index: number) => {
          const groupIndex = groups.findIndex(
            (grp: any) => grp.id === _items.id
          );

          flattenedDates?.forEach((item: any, ind: number) => {
            if (dayjs(item.date).format(dateFormat) === _items.start) {
              vesselEvents.push({
                ..._items,
                gridSize: gridSize,
                gridHeight: gridHeight,
                eventLength: _items.differenceInDays || 0,
                ind: ind,
                groupIndex: groupIndex,

                background: _items.background,

                data: _items?.labels,
              });
            }
          })
        });
      

      return (
        <>
          {vesselEvents?.map((item: any) => (
            <EventGroups {...item} />
          ))}
        </>
      );
    };
    const renderTenentGroups = () => {
      const tenentEvents: any[] = [];
      const telenents: any[] = groups.filter(
        (item: any) => item.type === "tenent"
      );


      const tenentEventGroup:any = [];
 

      telenents.forEach((tenent: any) => {
        let tenentData =  data.filter((dat: any) => tenent.id === dat.tenentId);
        const difference = calculateDateDifference(tenentData);

        tenentEventGroup.push({...tenent,...difference})
      });
  

      tenentEventGroup.forEach((_items: any, _index: number) => {
          const groupIndex = groups.findIndex(
            (grp: any) => grp.id === _items.id
          );

          flattenedDates?.forEach((item: any, ind: number) => {
            if (dayjs(item.date).format(dateFormat) === _items.start) {
              tenentEvents.push({
                ..._items,
                gridSize: gridSize,
                gridHeight: gridHeight,
                eventLength: _items.differenceInDays || 0,
                ind: ind,
                groupIndex: groupIndex,

                background: _items.background,

                data: _items?.labels,
              });
            }
          })
        });
      

      return (
        <>
          {tenentEvents?.map((item: any) => (
            <EventGroups {...item} />
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
        {renderTenentGroups()}
        {renderVesselGroups()}
        {renderTodayBlock()}
      </div>
    );
  }
);

export default DateYearBody;
