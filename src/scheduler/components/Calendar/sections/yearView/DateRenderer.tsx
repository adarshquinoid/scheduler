import React, { forwardRef, useImperativeHandle } from "react";
import {
  CalendarColumnType,
  DateRendererProps,
  DateRendererRef,
} from "../../../../types/common";
import { dateFormat, styles } from "../../../../helpers/constants";
import dayjs from "dayjs";

const DateRenderer = forwardRef<DateRendererRef, DateRendererProps>(
  ({ datesByYear }, ref) => {
    useImperativeHandle(ref, () => ({
      onClick: () => {},
    }));
    return (
      <div className="flex h-[24px]">
        {Object.keys(datesByYear).map((yr: any) => (
          <React.Fragment key={`yr-${yr}`}>
            {Object.keys(datesByYear[yr]).map((key) =>
              datesByYear[yr][+key]?.map((day: CalendarColumnType) => (
                <div
                  key={day ? dayjs(day.date).format(dateFormat) : "key"}
                  className={`border-b border-r  `}
                  style={{
                    width: styles.dayColWidth,
                    background: day.isCurrentDay
                      ? styles.currentDayIndicatorBGColor
                      : styles.dayColHeaderBG,
                    color: day.isCurrentDay
                      ? styles.currentDayIndicatorColor
                      : styles.dayColHeaderColor,
                      borderColor:day.isCurrentDay?styles.currentDayColHeaderBorderColor:styles.dayColHeaderBorderColor
                  }}
                >
                  <div className="h-6 w-10 flex items-center justify-center text-[12px] leading-[14px] font-normal">
                    {day ? dayjs(day.date).format("DD") : ""}
                  </div>
                </div>
              ))
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
);

export default DateRenderer;
