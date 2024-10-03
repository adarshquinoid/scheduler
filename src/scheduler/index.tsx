import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Calander from "./components/Calendar";
import TreeView from "./components/TreeView";
import { modes } from "./helpers/constants";
import {
  CalendarRef,
  SchedulerProps,
  SchedulerRef,
  TreeRef,
} from "./types/common";

const Scheduler = forwardRef<SchedulerRef, SchedulerProps>(
  ({ groupData = [], handleExpand }, ref) => {
    const treeRef = useRef<TreeRef>(null);
    const calendarRef = useRef<CalendarRef>(null);
    useImperativeHandle(ref, () => ({
      onClick:()=>{}
    }));
    const [activeModes] = useState(modes.YEAR);
    return (
      <div className="w-full flex scheduler  overflow-auto">
        <div className="sticky left-0 border-r border-b border-[#e5e7eb] z-50">
          <TreeView
            groups={groupData}
            handleExpand={handleExpand}
            ref={treeRef}
          />
        </div>
        <div >
          <Calander groups={groupData} mode={activeModes} ref={calendarRef} />
        </div>
      </div>
    );
  }
);

export default Scheduler;
