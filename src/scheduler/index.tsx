import React, { forwardRef, useImperativeHandle, useRef } from "react";
import Calandar from "./components/Calendar";
import TopBar from "./components/Controlls/TopBar";
import TreeView from "./components/TreeView";
import {
  CalendarRef,
  SchedulerProps,
  SchedulerRef,
  TreeRef,
} from "./types/common";
import { SchedulerProvider } from "./providers/SchedulerProvider";

const Scheduler = forwardRef<SchedulerRef, SchedulerProps>(
  (
    {
      groupData = [],
      handleExpand,
      data = [],
      treeHeader = "",
      onResize,
      expandIcon,
      collapseIcon,
      itemStartIcon,
      itemEndIcon,
      onDragEnd,
      updateKey,
    },
    ref
  ) => {
    const treeContainerRef = useRef<HTMLDivElement>(null);
    const treeRef = useRef<TreeRef>(null);
    const calendarRef = useRef<CalendarRef>(null);
    const schedulerRef = useRef<
      HTMLDivElement 
    >(null);
    const calendarContainerRef = useRef<
      HTMLDivElement & { previousScrollLeft?: number }
    >(null);
    useImperativeHandle(ref, () => ({
      onClick: () => {},
    }));

    const handleScroll = () => {
      if (calendarContainerRef.current) {
        const scrollLeft = calendarContainerRef.current.scrollLeft;
        const scrollWidth = calendarContainerRef.current.scrollWidth;
        const clientWidth = calendarContainerRef.current.clientWidth;
        const scrollPositionToRight = scrollWidth - (scrollLeft + clientWidth);
        const scrollPositionBefore = scrollPositionToRight;
        const threshold = 10;
        if (scrollLeft === 0) {
          calendarRef?.current?.loadPrevious();
          setTimeout(() => {
            if (calendarContainerRef.current) {
              const newScrollWidth = calendarContainerRef.current.scrollWidth;
              calendarContainerRef.current.scrollLeft =
                newScrollWidth - clientWidth - scrollPositionBefore;
            }
          }, 0);
        } else if (scrollLeft >= scrollWidth - clientWidth - threshold) {
          calendarRef?.current?.loadNext();
        }
      }
    };
    const scrollIntoView = () => {};
    return (
      <>
        <TopBar navigateToday={scrollIntoView} />
        <div className="scheduler" id="scheduler" ref={schedulerRef}>
          <div
            className="tree-container"
            id="tree-container"
            ref={treeContainerRef}
          >
            <TreeView
              groups={groupData}
              treeHeader={treeHeader}
              handleExpand={handleExpand}
              expandIcon={expandIcon}
              collapseIcon={collapseIcon}
              data={data}
              itemStartIcon={itemStartIcon}
              itemEndIcon={itemEndIcon}
              ref={treeRef}
            />
          </div>
          <div
            className="calandar-container"
            id="calandar-container"
            ref={calendarContainerRef}
            onScroll={handleScroll}
          >
            <Calandar
              groups={groupData}
              ref={calendarRef}
              data={data}
              updateKey={updateKey}
              onResize={onResize}
              onDragEnd={onDragEnd}
            />
          </div>
        </div>
      </>
    );
  }
);

export default Scheduler;
