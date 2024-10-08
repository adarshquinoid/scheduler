import dayjs from "dayjs";
import { useState } from "react";
import "./App.css";
import Scheduler from "./scheduler";
import { dateFormat } from "./scheduler/helpers/constants";
import { calandar, Group } from "./scheduler/types/datastructure";

function App() {
  const datas = [
    { name: "Bahri", parent: null, id: 1, expand: false, type: "tenent" },
    { name: "Alanood (SAR)", parent: 1, id: 101, expand: false, type: "group" },
    { name: "Master", parent: 101, id: 1011, expand: false, type: "role" },
    {
      name: "Chief Officer",
      parent: 101,
      id: 1012,
      expand: false,
      type: "role",
    },
    // { name: "2nd Officer", parent: 101, id: 1013, expand: false, type: "role" },
    // { name: "3rd Officer", parent: 101, id: 1014, expand: false, type: "role" },
    // {
    //   name: "Chief Engineer",
    //   parent: 101,
    //   id: 1015,
    //   expand: false,
    //   type: "role",
    // },
    // {
    //   name: "3rd Engineer",
    //   parent: 101,
    //   id: 1016,
    //   expand: false,
    //   type: "role",
    // },
    // {
    //   name: "Electr. Officer / Engineer",
    //   parent: 101,
    //   id: 1017,
    //   expand: false,
    //   type: "role",
    // },
    // { name: "Fitter", parent: 101, id: 1018, expand: false, type: "role" },
    // { name: "Motorman", parent: 101, id: 1019, expand: false, type: "role" },
    // { name: "Cook", parent: 101, id: 1020, expand: false, type: "role" },
    // { name: "Messman", parent: 101, id: 1021, expand: false, type: "role" },
    // { name: "Amad (SAR)", parent: 1, id: 201, expand: false, type: "group" },
    // { name: "Master", parent: 201, id: 2011, expand: false, type: "role" },
  ];

  const calData = [
    {
      start: "10-10-2024",
      end: "20-10-2024",
      role: 1011,
      id: 1,
      background: "red",
    },
    {
      start: "11-10-2024",
      end: "18-10-2024",
      role: 1011,
      id: 2,
      background: "yellow",
    },
    // { start: "21-10-2024", end: "25-10-2024", role: 1011 },
    // { start: "21-10-2024", end: "26-10-2024", role: 1011 },
  ];

  const [employeeDatas, setEmployeeDatas] = useState(
    datas.map((item: Group) => ({
      ...item,
      hasChild: datas.some((dat: Group) => item.id === dat.parent),
    }))
  );
  const [data, setData] = useState(calData);
  const [updateKey, setUpdateKey] = useState(0);
  const handleExpand = (node: any) => {
    setEmployeeDatas((c) =>
      c.map((item: any) =>
        item.id === node.id ? { ...item, expand: !item.expand } : item
      )
    );
  };
  const onDragEnd = (dragData: any) => {
    console.log(data);
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
