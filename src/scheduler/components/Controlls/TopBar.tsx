import { forwardRef, useEffect, useState } from "react";
import { modes } from "../../helpers/constants";
import { useScheduler } from "../../providers/SchedulerProvider";
import { TopBarProps, TopBarRef } from "../../types/common";
import { ModeValue } from "../../types/datastructure";

const TopBar = forwardRef<TopBarRef, TopBarProps>(({ navigateToday }, ref) => {
  const { mode, setMode } = useScheduler();
  useEffect(() => {
    console.log(mode);
  }, [mode]);
  const modesArray: ModeValue[] = Object.values(modes);

  const [rangeValue, setRangeValue] = useState("1");
  const onRangeChange = (e: any) => {
    setRangeValue(e.target.value);

    const value: ModeValue = modesArray[Number(e.target.value) - 1];
    setMode(value);
  };

  return (
    <div className="flex flex-row-reverse items-center p-5 gap-2">
      <div className="p-2 bg-slate-400 rounded-lg flex items-center w-[100px] justify-center">
        {mode.label}
      </div>
      <div
        className="p-2 bg-slate-400 rounded-lg flex items-center w-[100px] justify-center"
        onClick={() => {
          navigateToday();
        }}
      >
        {"Today"}
      </div>
      <div className="px-2">
        <input
          type="range"
          min="1"
          max="5"
          id="myRange"
          value={rangeValue}
          onChange={onRangeChange}
        />
      </div>
    </div>
  );
});

export default TopBar;
