import { forwardRef, useEffect } from "react";
import { modes } from "../../helpers/constants";
import { useScheduler } from "../../providers/SchedulerProvider";
import { TopBarProps, TopBarRef } from "../../types/common";

const TopBar = forwardRef<TopBarRef, TopBarProps>(({ navigateToday },ref) => {
  const { mode, setMode } = useScheduler();
  useEffect(() => {
    // console.log(mode);
  }, [mode]);

  return (
    <div>
      <button
        onClick={() => {
          setMode(modes.WEEK);
        }}
      >
        Toggle Mode
      </button>
      <button
        onClick={() => {
          navigateToday();
        }}
      >
        Scroll Into View
      </button>
    </div>
  );
});

export default TopBar;
