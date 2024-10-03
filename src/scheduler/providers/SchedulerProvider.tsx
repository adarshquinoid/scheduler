import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SchedulerContextType, SchedulerModes } from '../types/common';
import { modes } from '../helpers/constants';




const SchedulerContext = createContext<SchedulerContextType | undefined>(undefined);


export const SchedulerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<SchedulerModes>(modes.YEAR); 
  const handleSetMode = (mode: SchedulerModes) => {
    setMode(mode);
  };

  return (
    <SchedulerContext.Provider value={{ mode, setMode: handleSetMode }}>
      {children}
    </SchedulerContext.Provider>
  );
};


export const useScheduler = (): SchedulerContextType => {
  const context = useContext(SchedulerContext);
  if (!context) {
    throw new Error('useScheduler must be used within a ModeProvider');
  }
  return context;
};