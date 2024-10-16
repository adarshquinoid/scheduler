import React from 'react'
import { styles } from '../../../../../helpers/constants'

const TodayIndicator:React.FC<any> = ({left}) => {
  return (
    <div
    style={{
      top: 0,
      background: styles.currentDayIndicatorBGColor,

      left:left,
    }}
    className="h-full w-1 z-30 absolute"
  />
  )
}

export default TodayIndicator