import { forwardRef, useRef } from "react";
import {
  EventItemContainerProps,
  EventItemContainerRef,
} from "../../types/common";
import EventItem from "./eventCard";

const EventItemContainer = forwardRef<
  EventItemContainerRef,
  EventItemContainerProps
>(({ activeData, onResize, groupedData }, ref) => {
  const eventItemContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="absolute  left-0 ">
      {groupedData?.length > 0 && (
        <div className=" flex flex-col gap-2" ref={eventItemContainerRef}>
          {groupedData?.map((item: any) => (
            <EventItem
              activeData={activeData}
              data={item}
              onResize={onResize}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default EventItemContainer;
