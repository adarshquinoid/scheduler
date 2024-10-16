import React from 'react'
import { styles } from '../../../../../helpers/constants';

const HolidayColumnRender:React.FC<any> = ({left,height}) => {
    const gridSize = styles.dayColWidth;
    const gridHeight = styles.dayColHeight;
  return (
    <div
    style={{
      top: 0,
      background: styles.dayColHolidayBG,
      width: gridSize,
      left:left,
    }}
    className="h-full absolute"
  >
    <svg
      width={gridSize}
      height={height}
    >
      <defs>
        <pattern
          id="holidayCol"
          width={gridSize}
          height={gridHeight}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${gridSize} 0 L 0 0 0 ${gridHeight}`}
            fill="none"
            stroke={styles.dayColBorderColor}
            strokeWidth="1"
          />
        </pattern>
       
      </defs>
      <rect
        width={gridSize}
        height={height}
        fill="url(#holidayCol)"
      />
    </svg>
  </div>
  )
}

export default HolidayColumnRender