import React from 'react'
import { styles } from '../../../../../helpers/constants';

const Columns:React.FC<any> = ({containerHeight,containerWidth}) => {
  const gridSize = styles.dayColWidth;
  const gridHeight = styles.dayColHeight;
  return (
    <svg
    width={containerWidth}
    height={containerHeight}
  >
    <defs>
      <pattern
        id="smallGrid"
        width={gridSize}
        height={gridHeight}
        patternUnits="userSpaceOnUse"
      >
        <path
          d={`M ${gridSize} 0 L 0 0 0 ${gridHeight}`}
          fill="none"
          stroke="gray"
          strokeWidth="0.5"
        />
      </pattern>
      <pattern
        id="grid"
        width={gridSize * 5}
        height={gridHeight * 5}
        patternUnits="userSpaceOnUse"
      >
        <rect
          width={gridSize * 5}
          height={gridHeight * 5}
          fill="url(#smallGrid)"
        />
      </pattern>
    </defs>
    <rect
      width={containerWidth}
      height={containerHeight}
      fill="url(#grid)"
    />
  </svg>
  )
}

export default Columns