import Image from 'next/image'
import React, { useState } from 'react'

const TableImage = ({src, width, height, borderRadius, customClass}) => {
  
  const [loading, setLoading] = useState(true);
  const [imageUrl,setImageUrl]=useState('')

  const onImageLoad = () => {
    setLoading(false);
    setImageUrl(src);
    console.log("loaded")
  }

  // const imageLoader = ({ src, width, quality }) => {
  //   return `https://example.com/${src}?w=${width}&q=${quality || 75}`
  // }
  // const imageLoader = () => {
  //   return <div>
  //   Loading Spinner goes here
  // </div>
  // const imageLoader = () => {
  //   return 'https://t4.ftcdn.net/jpg/08/40/02/73/360_F_840027367_VNrKnVS3TncnWGsxTTvR57CEyA0TiOux.jpg&q=100'
  // }
  console.log(customClass)
  return (
    // <>{loading ?
    //   <div>
    //     Loading Spinner goes here
    //   </div>
    // :
    <Image
        src={src}          
        // src={imageUrl}          
        alt='table image'
        width={width || 28.4}
        height={height || 28.4}
        style={{
            borderRadius: borderRadius || '0',
            height: `${height || 28.4}px`
        }}
        className={customClass|''}
        // loader={imageLoader}
        // onLoad={onImageLoad}
        // loader={<>loading ...</>}
        // loading='lazy'
        // className={`${onhover ? onhover : ''}`}
    />
    // }</>
  )
}

export default TableImage