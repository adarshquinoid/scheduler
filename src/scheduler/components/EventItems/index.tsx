import { forwardRef, useImperativeHandle, useRef } from "react";
import {
  EventItemContainerProps,
  EventItemContainerRef,
} from "../../types/common";
import EventItem from "./eventCard";
import { styles } from "../../helpers/constants";

const EventItemContainer = forwardRef<
  EventItemContainerRef,
  EventItemContainerProps
>(({ activeData, onResize, groupedData }, ref) => {
  const eventItemContainerRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => ({
    getRowHeight: () => {
      // if (eventItemContainerRef?.current) {
      //   return eventItemContainerRef?.current?.clientHeight;
      // }
      return styles.eventItemHeight;
    },
  }));
  return (
    <>
      {groupedData?.length > 0 && (
        <div className="absolute  left-0 ">
          <div className=" flex flex-col gap-2" ref={eventItemContainerRef}>
            {groupedData?.map((item: any) => (
              <EventItem
                key={`event-item-${item.start}-${item.end}`}
                activeData={activeData}
                data={item}
                onResize={onResize}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
});

export default EventItemContainer;
