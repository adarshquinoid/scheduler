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
  const containerHeight = 32;
  return (
    <div className="flex h-[32px]">
      {Object.keys(datesByYear).map((yr: any, index: number) => (
        <React.Fragment key={`yr-month-year-renderer-${index}`}>
          {Object.keys(datesByYear[yr]).map((key) => {
            const containerWidth =
              datesByYear[yr][+key]?.length * styles.dayColWidth;
            return (
              <div
                key={key}

                style={{
                  fontSize: styles.dayColHeaderFontSize,
                  //   width: `${
                  //     datesByYear[yr][+key]?.length * styles.dayColWidth
                  //   }px`,
                }}
                className="text-[12px] leading-[14px] font-normal   flex justify-start items-center relative"
              >
        

                <svg width={containerWidth} height={containerHeight}>
                  <defs>
                    <pattern
                      id="monthRenderer"
                      width={containerWidth}
                      height={containerHeight}
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d={`M ${containerWidth} 0 L 0 0 0 ${containerHeight}`}
                        fill="none"
                        stroke={styles.dayColBorderColor}
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width={containerWidth}
                    height={containerHeight}
                    fill="url(#monthRenderer)"
                  />
                </svg>
                <div className="px-2.5 absolute left-0">
                  {`${Months[+key as keyof typeof Months]}-${yr}`}
                </div>
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
});

export default MonthYearRenderer;
