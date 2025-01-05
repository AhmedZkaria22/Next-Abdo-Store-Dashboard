import React from 'react'

const SizesGroup = ({sizes}) => {
    const sizesKeys = Object.keys(sizes);
    const sizesValues = Object.values(sizes);
  return (
    <div className='flex justify-between gap-[15px] flex-wrap'>{
        sizesKeys.map((sizeItem, i) => {
            return(
                <span key={i} className='w-2/5 block text-sm text-gray-700 font-normal'>{sizeItem}: {sizesValues[i]}</span>
            )
        })
    }</div>
  )
}

export default SizesGroup