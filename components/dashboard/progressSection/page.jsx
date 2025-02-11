'use client'

import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { ThreeDotsVertical } from 'react-bootstrap-icons'
import { icons } from '@/app/icons/icons'
import { getAllProductsLength, getProductsTypeGenderLength } from '@/app/(dashboard)/dashboard'
import TableImage from '@/components/listing/tableImage/page'
import CircleProgress from '@/components/general/circleProgress/page'

const ProgressSection = ({ProgData}) => {
  const progressBoxStrokeColors = ['#f43f5e', '#22c55e', '#3b82f6'];
  const [windowListener, setWindowListener] = useState(false);    

  const [countState, setCountState] = useState({
    products: 0,    

    men: 0,
    female: 0,
    shirt: 0,

    shirt_female: 0,
    pant_female: 0,
    shoes_female: 0,
    
    shirt_men: 0,
    pant_men: 0,
    shoes_men: 0,

    
    shirt_twinz: 0,    
  })


  useEffect(() => {
    if( typeof window !== 'undefined' && windowListener ){
      getAllProductsLength(setCountState);

      getProductsTypeGenderLength(setCountState, null, 'female', 'female');
      getProductsTypeGenderLength(setCountState, null, 'men', 'men');
      getProductsTypeGenderLength(setCountState, 'shirt', null, 'shirt');
      
      getProductsTypeGenderLength(setCountState, 'shirt', 'female', 'shirt_female');
      getProductsTypeGenderLength(setCountState, 'pant', 'female', 'pant_female');
      getProductsTypeGenderLength(setCountState, 'shoes', 'female', 'shoes_female');
      
      getProductsTypeGenderLength(setCountState, 'shirt', 'men', 'shirt_men');
      getProductsTypeGenderLength(setCountState, 'pant', 'men', 'pant_men');    
      getProductsTypeGenderLength(setCountState, 'shoes', 'men', 'shoes_men');    
      
      getProductsTypeGenderLength(setCountState, 'shirt', 'twinz', 'shirt_twinz');    
    }  
  }, [windowListener])

  useEffect(() => {    
    if( typeof window !== 'undefined' ){ setWindowListener(true); }
  }, [windowListener])

  return (
    <>{
      windowListener ? <section id='progressSection' className='!bg-asd_white !rounded-[10px]'>
        <Card className='!bg-transparent border-0 shadow-[0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1)]'>
        <Card.Header className='!bg-transparent !p-5 !border-[#e5e7eb] flex items-center justify-between gap-y-2'>
            <h2 className='text-base font-bold text-asd_black capitalize'>{ProgData[0] == 'Female' ? 'Women' : ProgData[0]} Progress</h2>
            <ThreeDotsVertical className='threeDotsVertical w-[15px] h-5 stroke-gray-500 hover:stroke-asd_primary cursor-pointer' />
        </Card.Header>
        <Card.Body className='flex flex-col gap-3'>
            {
            ProgData[1].map((item, index) => {
                return(
                <div className='cardBodyRow flex flex-row items-center justify-start gap-3 p-3 border !border-dashed !border-gray-400  rounded-lg' key={index}>
                    <TableImage src={icons[item]} width={38.4} height={38.4} borderRadius={'50%'} customClass={'w-[38.4px] h-[38.4px]'} />
                    <span className='block text-sm font-semibold text-asd_black capitalize'>{item}</span>
                    <div className="circularProgressbarWrap !ml-auto !mr-0">
                    <CircleProgress color={progressBoxStrokeColors[index]} percentage={parseInt(countState[ProgData[2][index]] / countState[ProgData[3][0]] *100)} text={`${parseInt(countState[ProgData[2][index]] / countState[ProgData[3][0]] *100)} %`} />
                    </div>
                </div>
                )  
            })
            }                
        </Card.Body>
        </Card>
      </section> : <></>
    }</>

  )
}

export default ProgressSection