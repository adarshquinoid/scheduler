import { useState } from "react";
import "./App.css";
import Scheduler from "./scheduler";

function App() {
  const datas = [
    { name: "Bahri", parent: null, id: 1, expand: false },
    { name: "Alanood (SAR)", parent: 1, id: 101, expand: false },
    { name: "Master", parent: 101, id: 1011, expand: false },
    { name: "Chief Officer", parent: 101, id: 1012, expand: false },
    { name: "2nd Officer", parent: 101, id: 1013, expand: false },
    { name: "3rd Officer", parent: 101, id: 1014, expand: false },
    { name: "Chief Engineer", parent: 101, id: 1015, expand: false },
    { name: "3rd Engineer", parent: 101, id: 1016, expand: false },
    {
      name: "Electr. Officer / Engineer",
      parent: 101,
      id: 1017,
      expand: false,
    },
    { name: "Fitter", parent: 101, id: 1018, expand: false },
    { name: "Motorman", parent: 101, id: 1019, expand: false },
    { name: "Cook", parent: 101, id: 1020, expand: false },
    { name: "Messman", parent: 101, id: 1021, expand: false },
    { name: "Amad (SAR)", parent: 1, id: 201, expand: false },
    { name: "Master", parent: 201, id: 2011, expand: false },
  ];
  const [employeeDatas, setEmployeeDatas] = useState([...datas]);

  const handleExpand = (node: any) => {
    setEmployeeDatas((c) =>
      c.map((item: any) =>
        item.id === node.id ? { ...item, expand: !item.expand } : item
      )
    );
  };
  return (
    <>
  
      <div className="bg-green-300  p-5 ">Scheduler Component</div>
      <div>
        <Scheduler groupData={employeeDatas} handleExpand={handleExpand} />
      </div>
    </>
  );
}

export default App;
