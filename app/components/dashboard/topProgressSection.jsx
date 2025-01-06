'use client'

import { getAllProductsLength, getProductsTypeGenderLength } from '@/app/dashboard/dashboard'
import React, { useEffect, useState } from 'react'
import { Card, ProgressBar } from 'react-bootstrap'
import { CartCheck, ThreeDotsVertical } from 'react-bootstrap-icons'

const TopProgressSection = () => {

  const progressColors = ['*:bg-[#f43f5e]', '*:bg-[#22c55e]'];
  const [windowListener, setWindowListener] = useState(false);

  const [countState, setCountState] = useState({
    products: 0,    
    shirt: 0,
    men: 0,
  })
    
  useEffect(() => {    
    getAllProductsLength(setCountState);
    getProductsTypeGenderLength(setCountState, null, 'men', 'men');
    getProductsTypeGenderLength(setCountState, 'shirt', null, 'shirt');
  }, [])
    
  useEffect(() => {    
    if( typeof window !== 'undefined' ){ setWindowListener(true); }
  }, [windowListener])  

    
  return (
    <>{
      windowListener ? <section id='topProgressSection' className='grid gap-4   min-[1400px]:grid-cols-4   md:grid-cols-2 md:grid-rows-1   grid-cols-1 grid-rows-2'>
        { ['shirt', 'men'].map((item, index) => { return(
          <Card className='rounded-[10px] border-0 p-[25px] shadow-[0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1)]' key={item}>
            <Card.Body className=''>
              <ThreeDotsVertical className='threeDotsVertical w-[15px] h-5 stroke-gray-500 hover:stroke-asd_primary cursor-pointer absolute top-[25px] right-[25px]' />
              
              <div className='flex items-center flex-row gap-4'>
                <span className='spanCartCheck size-[50px] min-w-[50px] flex items-center justify-center bg-gray-200 rounded-[50%]'>
                  <CartCheck className='cartCheck w-4 h-4 stroke-gray-500' />
                </span>
                <div className='flex items-start flex-col'>
                  <span className='text-2xl font-bold text-asd_black'>{countState[item]}/{countState.products}</span>
                  <span className='text-sm font-semibold text-asd_black capitalize !line-clamp-1 overflow-ellipsis'>{item == 'shirt' ? 'shirts' : item} Percentage</span>
                </div>
              </div>                

              <div className='flex items-center flex-col gap-2 pt-10'>
                <div className='flex items-center justify-between flex-row gap-2 w-full'>
                  <span className='text-xs font-normal capitalize text-gray-500'>{item == 'shirt' ? 'shirts' : item}</span>
                  <span className='text-xs font-normal text-asd_black'>EGP{(countState[item] * 750).toLocaleString()} <span className='ml-2 !text-gray-500'>({parseInt(countState[item] / countState.products *100)}%)</span> </span>
                </div>
                <ProgressBar now={(parseInt(countState[item] / countState.products *100))} className={`w-full !h-[3px] bg-gray-200 ${progressColors[index]}`} />
              </div>
            </Card.Body>
          </Card>
        ) }) }
      </section>
      : <></>
    }</>
  )
}

export default TopProgressSection