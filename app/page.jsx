'use client'

import React from 'react'
import Head from 'next/head'
import TopProgressSection from '@/app/components/dashboard//TopProgressSection.jsx'
import TypeGenderSection from '@/app/components/dashboard//TypeGenderSection.jsx'
import CustomersSection from '@/app/components/dashboard//CustomersSection.jsx'
import ProgressSection from '@/app/components/dashboard//ProgressSection.jsx'
import { images } from './images/images'
import './dashboard/dashboard.css'

const Dashboard = () => {  
  return (
    <>
      <Head>
        <meta name="og:title" content="Next | Abdo Store Dashboard" />
        <meta name="og:description" content="Abdo store dashboard related to abdo store ecommerce website, to handle website statistics , products and customers" />
        <meta name="og:keywords" content="Abdo store dashboard, Abdo store ecommerce, Abdo store website, Dashboard, Website, Ecommerce, Abdo store, Nextjs, Reactjs, Tailwind, Tailwindcss, React-bootstrap" />
        <meta property='og:type' content='website' />
        <meta property='og:image' content={images.dashboard} />
      </Head>
  
      <div className='flex flex-col justify-between gap-3 p-4 bg-gray-100 h-auto !relative !shadow-[inset_0_1px_1px_0_rgba(0,0,0,.1),inset_0_1px_2px_-1px_rgba(0,0,0,.1)]'>
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
      </div>
    </>
  )
}

export default Dashboard