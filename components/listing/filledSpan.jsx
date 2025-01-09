import React from 'react'

const FilledSpan = ({background, width, height, radius}) => {
  return (
    <span style={{
        backgroundColor: background,
        width: width,
        height: height,
        display: 'block',
        borderRadius: radius || '0px'
    }}></span>
  )
}

export default FilledSpan