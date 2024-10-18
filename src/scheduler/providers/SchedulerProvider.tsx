import React, { createContext, useContext, useState, ReactNode } from "react";
import { SchedulerContextType, SchedulerModes } from "../types/common";
import { modes } from "../helpers/constants";

const SchedulerContext = createContext<SchedulerContextType | undefined>(
  undefined
);

export const SchedulerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<SchedulerModes>(modes.YEAR);
  const [activeDragItem, setActiveDragItem] = useState<any>(null);
  const [eventData,setEventData]=useState<any>([])
  const [groups,setGroups]=useState<any>([])
  const handleSetMode = (mode: SchedulerModes) => {
    setMode(mode);
  };
  const handleSetDragItem = (item: any) => {
    setActiveDragItem(item);
  };
  const handleSetEventData = (item: any) => {
    setEventData(item);
  };
  const handleSetGroupData = (item: any) => {
    setGroups(item);
  };

  return (
    <SchedulerContext.Provider
      value={{
        mode,
        setMode: handleSetMode,
        setDragItem: handleSetDragItem,
        dragItem: activeDragItem,
        data:eventData,
        groups:groups,
        handleSetEventData:handleSetEventData,
        handleSetGroupData:handleSetGroupData


      }}
    >
      {children}
    </SchedulerContext.Provider>
  );
};

export const useScheduler = (): SchedulerContextType => {
  const context = useContext(SchedulerContext);
  if (!context) {
    throw new Error("useScheduler must be used within a ModeProvider");
  }
  return context;
};
