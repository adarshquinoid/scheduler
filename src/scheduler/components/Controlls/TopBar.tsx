import React, { useEffect } from "react";
import { useScheduler } from "../../providers/SchedulerProvider";
import { modes } from "../../helpers/constants";

const TopBar = () => {
  const { mode, setMode } = useScheduler();
  useEffect(() => {
    console.log(mode);
  }, [mode]);

  return (
    <div>
      <button
        onClick={() => {
          setMode(modes.WEEK);
        }}
      >Toggle Mode</button>
    </div>
  );
};

export default TopBar;
