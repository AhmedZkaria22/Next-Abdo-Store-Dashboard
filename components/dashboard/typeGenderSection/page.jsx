'use client'

import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Card, ProgressBar } from 'react-bootstrap'
import { ThreeDotsVertical } from 'react-bootstrap-icons'
import { getAllProductsLength, getProductsTypeGenderLength } from '@/app/dashboard/dashboard'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const TypeGenderSection = () => {

  const [windowListener, setWindowListener] = useState(false);
  const [typeGenderToggle, setTypeGenderToggle] = useState('gender');  
  const typeGenderProgressColors = ['*:bg-[#f43f5e]', '*:bg-[#22c55e]', '*:bg-[#3b82f6]'];

  const [countState, setCountState] = useState({
    products: 0,

    shirt: 0,
    pant: 0,
    shoes: 0,
    
    female: 0,
    men: 0,
    twinz: 0,
    
    shirt_female: 0,
    pant_female: 0,
    shoes_female: 0,
    
    shirt_men: 0,
    pant_men: 0,
    shoes_men: 0,
    
    shirt_twinz: 0,
    pant_twinz: 0,
    shoes_twinz: 0,
  })

  const [chartData, setChartData] = useState([
    {
      name: 'Women',
      Shirts: 140,
      Pants: 85,
      Shoes: 80
    },
    {
      name: "Men",
      Shirts: 90,
      Pants: 120,
      Shoes: 70
    },
    {
      name: "Twinz",
      Shirts: 50,
      Pants: 65,
      Shoes: 90
    }
  ]);

  const [chartBars, setChartBars] = useState(['Shirts', 'Pants', 'Shoes']);

  const typeGenderToggleStyle = '!w-auto !text-xs !font-semibold uppercase border !rounded-md !border-asd_primary !bg-asd_white !text-asd_primary cursor-pointer';
  
  const typeGenderPriceProp = typeGenderToggle == 'gender' ? ['shirt', 'pant', 'shoes'] : ['female', 'men', 'twinz'];      

  const [barWidth, setBarWidth] = useState(14);


  const handleResizeResponsiveContainer = () => {
    const windowWidth = window.innerWidth;

    if(windowWidth >= 300.1 && windowWidth <= 400){
      setBarWidth(8);
    }else if(windowWidth <= 300){
      setBarWidth(4);
    }else{
      setBarWidth(14);
    }
  }


  useEffect(() => {
    if( typeof window !== 'undefined' && windowListener ){
      getAllProductsLength(setCountState);
      getProductsTypeGenderLength(setCountState, null, 'men', 'men');
      getProductsTypeGenderLength(setCountState, 'shirt', null, 'shirt');

      getProductsTypeGenderLength(setCountState, null, 'female', 'female');
      getProductsTypeGenderLength(setCountState, null, 'men', 'men');
      getProductsTypeGenderLength(setCountState, null, 'twinz', 'twinz');      

      getProductsTypeGenderLength(setCountState, 'shirt', null, 'shirt');
      getProductsTypeGenderLength(setCountState, 'pant', null, 'pant');
      getProductsTypeGenderLength(setCountState, 'shoes', null, 'shoes');

      getProductsTypeGenderLength(setCountState, 'shirt', 'female', 'shirt_female');
      getProductsTypeGenderLength(setCountState, 'shirt', 'men', 'shirt_men');
      getProductsTypeGenderLength(setCountState, 'shirt', 'twinz', 'shirt_twinz');      

      getProductsTypeGenderLength(setCountState, 'pant', 'female', 'pant_female');
      getProductsTypeGenderLength(setCountState, 'pant', 'men', 'pant_men');
      getProductsTypeGenderLength(setCountState, 'pant', 'twinz', 'pant_twinz');      

      getProductsTypeGenderLength(setCountState, 'shoes', 'female', 'shoes_female');
      getProductsTypeGenderLength(setCountState, 'shoes', 'men', 'shoes_men');
      getProductsTypeGenderLength(setCountState, 'shoes', 'twinz', 'shoes_twinz'); 
    }
  }, [windowListener])
  
  
  useEffect(() => {  
    if( typeof window !== 'undefined' && windowListener){
      if(typeGenderToggle == 'gender'){
        setChartData([
          {
            name: 'Women',
            Shirts: countState.shirt_female,
            Pants: countState.pant_female,
            Shoes: countState.shoes_female
          },
          {
            name: "Men",
            Shirts: countState.shirt_men,
            Pants: countState.pant_men,
            Shoes: countState.shoes_men
          },
          {
            name: "Twinz",
            Shirts: countState.shirt_twinz,
            Pants: countState.pant_twinz,
            Shoes: countState.shoes_twinz
          }      
        ]);
        setChartBars(['Shirts', 'Pants', 'Shoes']);
      }else{
        setChartData([
          {
            name: 'Shirts',
            Women: countState.shirt_female,
            Men: countState.shirt_men,
            Twinz: countState.shirt_twinz
          },      
          {
            name: 'Pants',
            Women: countState.pant_female,
            Men: countState.pant_men,
            Twinz: countState.pant_twinz
          },      
          {
            name: 'Shoes',
            Women: countState.shoes_female,
            Men: countState.shoes_men,
            Twinz: countState.shoes_twinz
          },      
        ]);
        setChartBars(['Women', 'Men', 'Twinz']);
      };
    }
  }, [typeGenderToggle, countState, windowListener])


  useEffect(() => {    
      if( typeof window !== 'undefined' ){ setWindowListener(true); }
  }, [windowListener])  

  return (
    <>{
      windowListener ? <section id='typeGenderSection' className='!bg-asd_white !rounded-[10px] product_type_gender_section'>
        <Card className='!bg-transparent border-0 shadow-[0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1)]'>
        <Card.Header className='!bg-transparent !p-5 !border-[#e5e7eb] flex items-center justify-between gap-y-2'>
          <h2 className='text-base font-bold text-asd_black capitalize'>Products Type Gender Chart</h2>
          <ButtonGroup aria-label="type gender toggle" className='gap-2 mr-2 ml-auto'>
            <Button type="button" className={typeGenderToggleStyle} disabled={ typeGenderToggle == 'gender' } onClick={() => setTypeGenderToggle('gender')}>
              Gender
            </Button>
            <Button type="button" className={typeGenderToggleStyle} disabled={ typeGenderToggle == 'type' } onClick={() => setTypeGenderToggle('type')}>
              Type
            </Button>
          </ButtonGroup>
          <ThreeDotsVertical className='threeDotsVertical w-[15px] h-5 stroke-gray-500 hover:stroke-asd_primary cursor-pointer' />
        </Card.Header>
        <Card.Body className='h-[350px]'>
          <ResponsiveContainer width="100%" height="100%" onResize={handleResizeResponsiveContainer}>
            <BarChart
              width={500}
              height={300}
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              className='dashboardBarChart !w-full !max-w-full'
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend iconSize={10} />
              <Bar dataKey={chartBars[0]} fill="#f43f5e" className='dashboardBarChartBarItem' barSize={barWidth} radius={[10, 10, 0, 0]} activeBar={<Rectangle fill="#f43f5e" stroke="#f43f5e" className='dashboardBarChartBarRect' width={barWidth} radius={[10, 10, 0, 0]} />} />
              <Bar dataKey={chartBars[1]} fill="#22c55e" className='dashboardBarChartBarItem' barSize={barWidth} radius={[10, 10, 0, 0]} activeBar={<Rectangle fill="#22c55e" stroke="#22c55e" className='dashboardBarChartBarRect' width={barWidth} radius={[10, 10, 0, 0]} />} />
              <Bar dataKey={chartBars[2]} fill="#3b82f6" className='dashboardBarChartBarItem' barSize={barWidth} radius={[10, 10, 0, 0]} activeBar={<Rectangle fill="#3b82f6" stroke="#3b82f6" className='dashboardBarChartBarRect' width={barWidth} radius={[10, 10, 0, 0]} />} />
            </BarChart>
          </ResponsiveContainer>
        </Card.Body>
        <Card.Footer className='!bg-transparent !p-5 !border-[#e5e7eb] grid gap-4   lg:grid-cols-4 lg:grid-rows-1   grid-cols-1 grid-rows-3'>
            {
            (typeGenderToggle == 'gender' ? ['Shirts', 'Pants', 'Shoes'] : ['Female', 'Men', 'Twinz']).map((item, index) => {
                return(
                <div className='flex items-start flex-col p-3 border !border-dashed !border-gray-400  rounded-lg' key={index}>
                  <span className='block text-xs font-normal text-gray-700'>{item}</span>
                  <span className='block text-base font-bold text-asd_black'>EGP{(countState[typeGenderPriceProp[index]] * 750).toLocaleString()}</span>
                  <ProgressBar now={(parseInt(countState[typeGenderPriceProp[index]] / countState.products *100))} className={`w-full !h-[3px] mt-1 bg-gray-200 ${typeGenderProgressColors[index]}`} />
                </div>
                )  
            })
            }                
        </Card.Footer>
        </Card>
      </section> : <></>
    }</>
  )
}

export default TypeGenderSection