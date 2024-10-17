import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import {
  CalendarColumnType,
  DateRendererProps,
  DateRendererRef,
} from "../../../../types/common";
import { dateFormat, styles } from "../../../../helpers/constants";
import dayjs from "dayjs";

const DateRenderer = forwardRef<DateRendererRef, DateRendererProps>(
  ({ datesByYear, flattenedDates }, ref) => {
    const currentDayRef = useRef<HTMLDivElement>(null);
    const navigateToToday = () => {
      currentDayRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    };
    useImperativeHandle(ref, () => ({
      onClick: () => {},
    }));
    useEffect(() => {
      navigateToToday();
    }, []);
    const gridSize = styles.dayColWidth;
    return (
      <div className="relative">
        <svg width={flattenedDates?.length * gridSize} height={24}>
          <defs>
            <pattern
              id="calColumnHeader"
              width={gridSize}
              height={24}
              patternUnits="userSpaceOnUse"
            >
              <path
                d={`M ${gridSize} 0 L 0 0 0 ${24}`}
                fill={styles.dayColHeaderBG}
                stroke={styles.dayColBorderColor}
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect
            width={flattenedDates?.length * gridSize}
            height={24}
            fill="url(#calColumnHeader)"
          />
        </svg>
        <div className="flex h-[24px] absolute left-0 top-0">
          {Object.keys(datesByYear).map((yr: any) => (
            <React.Fragment key={`yr-${yr}`}>
              {Object.keys(datesByYear[yr]).map((key) =>
                datesByYear[yr][+key]?.map((day: CalendarColumnType) => (
                  <div
                    key={day ? dayjs(day.date).format(dateFormat) : "key"}
                    // className={`border-b border-r  `}
                    style={{
                      width: styles.dayColWidth,
                      background: day.isCurrentDay
                        ? styles.currentDayIndicatorBGColor
                        : "transparent",
                      color: day.isCurrentDay
                        ? styles.currentDayIndicatorColor
                        : styles.dayColHeaderColor,
                      // borderColor: day.isCurrentDay
                      //   ? styles.currentDayColHeaderBorderColor
                      //   : styles.dayColHeaderBorderColor,
                    }}
                  >
                    {day.isCurrentDay ? (
                      <div
                        className="h-6 w-10 flex items-center justify-center text-[12px]  font-normal"
                        ref={currentDayRef}
                      >
                        {dayjs(day.date).format("DD")}
                      </div>
                    ) : (
                      <div className="h-6 w-10 flex items-center justify-center text-[12px] font-normal">
                        {dayjs(day.date).format("DD")}
                      </div>
                    )}
                  </div>
                ))
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
);

export default DateRenderer;
