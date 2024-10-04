import React, { forwardRef, useImperativeHandle, useRef } from "react";
import Calandar from "./components/Calendar";
import TopBar from "./components/Controlls/TopBar";
import TreeView from "./components/TreeView";
import { SchedulerProvider } from "./providers/SchedulerProvider";
import {
  CalendarRef,
  SchedulerProps,
  SchedulerRef,
  TreeRef,
} from "./types/common";

const Scheduler = forwardRef<SchedulerRef, SchedulerProps>(
  (
    {
      groupData = [],
      handleExpand,
      data = [],
      treeHeader = "",

      expandIcon,
      collapseIcon,
      itemStartIcon,
      itemEndIcon,
    },
    ref
  ) => {
    const treeContainerRef = useRef<HTMLDivElement>(null);
    const treeRef = useRef<TreeRef>(null);
    const calendarRef = useRef<CalendarRef>(null);
    const schedulerRef = useRef<
      HTMLDivElement & { previousScrollLeft?: number }
    >(null);
    useImperativeHandle(ref, () => ({
      onClick: () => {},
    }));

    const handleScroll = () => {
      if (schedulerRef.current) {
        const scrollLeft = schedulerRef.current.scrollLeft;
        const scrollWidth = schedulerRef.current.scrollWidth;
        const clientWidth = schedulerRef.current.clientWidth;
        const scrollPositionToRight = scrollWidth - (scrollLeft + clientWidth);
        const scrollPositionBefore = scrollPositionToRight;
        const threshold = 10;
        if (scrollLeft===0) {
          calendarRef?.current?.loadPrevious();
          setTimeout(() => {
            if (schedulerRef.current) {
              const newScrollWidth = schedulerRef.current.scrollWidth;
              schedulerRef.current.scrollLeft =
                newScrollWidth - clientWidth - scrollPositionBefore;
            }
          }, 0);
        } else if (scrollLeft >= scrollWidth - clientWidth - threshold) {
          calendarRef?.current?.loadNext();
        }
      }
    };

    return (
      <SchedulerProvider>
        <React.Fragment>
          <TopBar />
          <div
            className="scheduler"
            id="scheduler"
            ref={schedulerRef}
            onScroll={handleScroll}
          >
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
                itemStartIcon={itemStartIcon}
                itemEndIcon={itemEndIcon}
                ref={treeRef}
              />
            </div>
            <div className="calandar-container" id="calandar-container">
              <Calandar groups={groupData} ref={calendarRef} data={data} />
            </div>
          </div>
        </React.Fragment>
      </SchedulerProvider>
    );
  }
);

export default Scheduler;
