import { useState } from "react";
import Calander from "./components/Calander";
import TreeView from "./components/TreeView";
import { modes } from "./helpers/constants";

const Scheduler = ({ groupData = [], handleExpand }: any) => {
  const [activeModes] = useState(modes.DAY);
  return (
    <div className="w-full flex scheduler  overflow-auto">
      <div className="sticky left-0 border-r border-b border-[#e5e7eb]">
        <TreeView groups={groupData} handleExpand={handleExpand} />
      </div>
      <div>
        <Calander groups={groupData} mode={activeModes} />
      </div>
    </div>
  );
};

export default Scheduler;
