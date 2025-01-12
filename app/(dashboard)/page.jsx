'use client'

import React, { useEffect, useState } from 'react'
import TopProgressSection from '@/components/dashboard/topProgressSection/page'
import TypeGenderSection from '@/components/dashboard/typeGenderSection/page'
import CustomersSection from '@/components/dashboard/customersSection/page'
import ProgressSection from '@/components/dashboard/progressSection/page'
import './dashboard.css'

const Dashboard = () => {  

  const [windowListener, setWindowListener] = useState(false);
  useEffect(() => {    
    if( typeof window !== 'undefined' ){ setWindowListener(true); }
  }, [windowListener])  
  
  return (
    <>{
      windowListener ? <div className='flex flex-col justify-between gap-3 p-4 bg-gray-100 h-auto !relative !shadow-[inset_0_1px_1px_0_rgba(0,0,0,.1),inset_0_1px_2px_-1px_rgba(0,0,0,.1)]'>
        <TopProgressSection />
  
        <TypeGenderSection />
        
        <article className='flex min-[1400px]:flex-row flex-col gap-3'>
          <CustomersSection
            sectionClass='min-[1400px]:w-[21rem] w-full'
            head='Oldest Customers'
            customerType='oldest'
          />
  
          <CustomersSection
            sectionClass='min-[1400px]:w-[-webkit-fill-available] w-full'
            head='Latest Customers'
            customerType='latest'
          />
        </article>
  
        <article className='grid gap-4   min-[1400px]:grid-cols-3 min-[1400px]:grid-rows-1   md:grid-cols-2 md:grid-rows-2   grid-cols-1 grid-rows-3 progress_boxes'>
          <ProgressSection ProgData={['Men', ['shirts', 'pants', 'shoes'], ['shirt_men', 'pant_men', 'shoes_men'], ['men']]} />
          <ProgressSection ProgData={['Female', ['shirts', 'pants', 'shoes'], ['shirt_female', 'pant_female', 'shoes_female'], ['female']]} />
          <ProgressSection ProgData={['Shirts', ['female', 'men', 'twinz'], ['shirt_female', 'shirt_men', 'shirt_twinz'], ['shirt']]} />         
        </article>
      </div> : <></>
    }</>
  )
}

export default Dashboard