import dayjs from "dayjs";
import { useEffect } from "react";
import "./App.css";
import dummy from "./dummy.json";
import Scheduler from "./scheduler";
import { dateFormat } from "./scheduler/helpers/constants";
import { useScheduler } from "./scheduler/providers/SchedulerProvider";
import { calandar, Group } from "./scheduler/types/datastructure";
function App() {
  const { handleSetEventData, handleSetGroupData, groups, data } =
    useScheduler();

  const handleExpand = (node: any) => {
    handleSetGroupData(
      groups.map((item: any) =>
        item.id === node.id ? { ...item, expand: !item.expand } : item
      )
    );
  };
  const onDragEnd = (dragData: any) => {
    handleSetEventData(
      data.map((item: any) =>
        item.id === dragData?.row.id
          ? {
              ...item,
              start: dayjs(dragData?.start).format(dateFormat),
              end: dayjs(dragData.end).format(dateFormat),
            }
          : item
      )
    );
  };

  const onResize = (end: calandar) => {
    handleSetEventData(
      data.map((item: any) =>
        item.id === end.id
          ? { ...item, end: dayjs(end.newDate).format(dateFormat) }
          : item
      )
    );
  };

  useEffect(() => {
    handleSetGroupData(
      dummy?.groups.map((item: Group) => ({
        ...item,
        hasChild: dummy?.groups.some((dat: Group) => item.id === dat.parent),
      }))
    );
  }, []);
  useEffect(() => {
    handleSetEventData(dummy?.data);
  }, []);
  console.log(data);
  return (
    <>
      <div className="bg-green-300  p-5 ">Scheduler Component</div>

      <div className="border border-red-300">
        <Scheduler
          handleExpand={handleExpand}
          expandIcon={<div>+</div>}
          collapseIcon={<div>+</div>}
          itemStartIcon={<div>:</div>}
          itemEndIcon={<div>:</div>}
          onDragEnd={onDragEnd}
          onResize={onResize}
        />
      </div>
    </>
  );
}

export default App;
