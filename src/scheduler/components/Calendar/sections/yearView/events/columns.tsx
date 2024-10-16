import React from "react";
import { styles } from "../../../../../helpers/constants";

const Columns: React.FC<any> = ({ containerHeight, containerWidth }) => {
  const gridSize = styles.dayColWidth;
  const gridHeight = styles.dayColHeight;
  return (
    <svg width={containerWidth} height={containerHeight}>
      <defs>
        <pattern
          id="calColumn"
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
      <rect width={containerWidth} height={containerHeight} fill="url(#calColumn)" />
    </svg>
  );
};

export default Columns;
