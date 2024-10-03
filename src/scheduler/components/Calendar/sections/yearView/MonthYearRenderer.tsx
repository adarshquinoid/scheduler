import React, { forwardRef, useImperativeHandle } from "react";
import { Months, styles } from "../../../../helpers/constants";
import {
  MonthYearRendererProps,
  MonthYearRendererRef,
} from "../../../../types/common";

const MonthYearRenderer = forwardRef<
  MonthYearRendererRef,
  MonthYearRendererProps
>(({ datesByYear }, ref) => {
  useImperativeHandle(ref, () => ({
    onClick: () => {},
  }));
  return (
    <div className="flex h-[32px]">
      {Object.keys(datesByYear).map((yr: any, index: number) => (
        <React.Fragment key={`yr-month-year-renderer-${index}`}>
          {Object.keys(datesByYear[yr]).map((key) => (
            <div
              key={key}
              style={{
                width: `${
                  datesByYear[yr][+key]?.length * styles.dayColWidth
                }px`,
              }}
              className="text-[12px] leading-[14px] font-normal border-t border-b border-r border-[#EDEAE9]"
            >
              <div className="p-2.5">
                {`${Months[+key as keyof typeof Months]}-${yr}`}
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
});

export default MonthYearRenderer;
