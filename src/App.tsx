import dayjs from "dayjs";
import { useState } from "react";
import "./App.css";
import dummy from "./dummy.json";
import Scheduler from "./scheduler";
import { dateFormat } from "./scheduler/helpers/constants";
import { calandar, Group } from "./scheduler/types/datastructure";
function App() {


  const [employeeDatas, setEmployeeDatas] = useState(
    dummy?.groups.map((item: Group) => ({
      ...item,
      hasChild: dummy?.groups.some((dat: Group) => item.id === dat.parent),
    }))
  );
  const [data, setData] = useState(dummy?.data);
  const [updateKey, setUpdateKey] = useState(0);
  const handleExpand = (node: any) => {
    setEmployeeDatas((c) =>
      c.map((item: any) =>
        item.id === node.id ? { ...item, expand: !item.expand } : item
      )
    );
  };
  const onDragEnd = (dragData: any) => {
    setData((c) =>
      c.map((item) =>
        item.id === dragData?.row.id
          ? { ...item, start: dragData?.start, end: dragData.end }
          : item
      )
    );
    setUpdateKey((k) => k + 1);
  };

  const onResize = (end: calandar) => {
    setData((c) =>
      c.map((item) =>
        item.id === end.id
          ? { ...item, end: dayjs(end.newDate).format(dateFormat) }
          : item
      )
    );
    setUpdateKey((k) => k + 1);
  };
  return (
    <>
      <div className="bg-green-300  p-5 ">Scheduler Component</div>
     
     <div className="bg-red">
     <div className="h-[11px]   indicator rounded-t-[6px]" style={{width:900}}/>
     </div>
     
      <div>
        <Scheduler
          groupData={employeeDatas}
          data={data}
          handleExpand={handleExpand}
          expandIcon={<div>+</div>}
          collapseIcon={<div>+</div>}
          itemStartIcon={<div>:</div>}
          itemEndIcon={<div>:</div>}
          updateKey={updateKey}
          onDragEnd={onDragEnd}
          onResize={onResize}
        />
      </div>
    </>
  );
}

export default App;
