import {
  forwardRef,
  useRef
} from "react";
import {
  EventItemContainerProps,
  EventItemContainerRef,
} from "../../types/common";
import EventItem from "./eventCard";

const EventItemContainer = forwardRef<
  EventItemContainerRef,
  EventItemContainerProps
>(
  (
    {
      activeData,
      handleDragStart,
      data,
    },
    ref
  ) => {
    const eventItemContainerRef = useRef<HTMLDivElement>(null);

    return (
      <div className="absolute  left-0 ">
        {data?.length > 0 && (
          <div className=" flex flex-col gap-2" ref={eventItemContainerRef}>
            {data?.map((item: String[]) => (
                <EventItem
                  item={item}
                  activeData={activeData}
                  handleDragStart={handleDragStart}
                />
            ))}
          </div>
        )}
      </div>
    );
  }
);

export default EventItemContainer;
