import React from 'react'
import FilledSpan from '../filledSpan/page'

const FilledSpanGroup = ({colors, direction, gap, spanWidth, spanHeight, spanRadius}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: direction || 'column',
      gap: gap || '15px'
    }}>
      {
        colors?.map((color, index) => {
          return(
            <FilledSpan key={index} background={color} width={spanWidth} height={spanHeight} radius={spanRadius} />
          )
        })
      }
    </div>
  )
}

export default FilledSpanGroup