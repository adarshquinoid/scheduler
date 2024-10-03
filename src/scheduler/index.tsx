import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Calandar from "./components/Calendar";
import TreeView from "./components/TreeView";
import { modes } from "./helpers/constants";
import {
  CalendarRef,
  SchedulerProps,
  SchedulerRef,
  TreeRef,
} from "./types/common";

const Scheduler = forwardRef<SchedulerRef, SchedulerProps>(
  ({ groupData = [], handleExpand, data = [], treeHeader = "" }, ref) => {
    const treeContainerRef = useRef<HTMLDivElement>(null);
    const treeRef = useRef<TreeRef>(null);
    const calendarRef = useRef<CalendarRef>(null);
    const schedulerRef = useRef<HTMLDivElement  & { previousScrollLeft?: number }>(null);
    useImperativeHandle(ref, () => ({
      onClick: () => {},
    }));



    const handleScroll = () => {
      if (schedulerRef.current) {
        const scrollLeft = schedulerRef.current.scrollLeft;
        const scrollWidth = schedulerRef.current.scrollWidth;
        const clientWidth = schedulerRef.current.clientWidth;
        if (scrollLeft === 0) {
          calendarRef?.current?.loadPrevious()
        }
        else if (scrollLeft === scrollWidth - clientWidth) {
          calendarRef?.current?.loadNext()
        
        } 
      }
    };

    const [activeModes] = useState(modes.YEAR);
    return (
      <div className="scheduler" id="scheduler" ref={schedulerRef}   onScroll={handleScroll}>
        <div
          className="tree-container"
          id="tree-container"
          ref={treeContainerRef}
        >
          <TreeView
            groups={groupData}
            treeHeader={treeHeader}
            handleExpand={handleExpand}
            ref={treeRef}
          />
        </div>
        <div className="calander-container" id="calander-container">
          <Calandar
            groups={groupData}
            mode={activeModes}
            ref={calendarRef}
            data={data}
          />
        </div>
      </div>
    );
  }
);

export default Scheduler;
