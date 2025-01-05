'use client'

import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Card, ProgressBar } from 'react-bootstrap'
import { ThreeDotsVertical } from 'react-bootstrap-icons'
import ApexCharts from 'apexcharts'
import { getAllProductsLength, getProductsTypeGenderLength } from '@/app/dashboard/dashboard'

const TypeGenderSection = () => {
  const [typeGenderToggle, setTypeGenderToggle] = useState('gender');
  const typeGenderProgressColors = ['*:bg-[#f43f5e]', '*:bg-[#22c55e]', '*:bg-[#3b82f6]'];

  /*With integration*/
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

  const options = {
    chart: {
      height: 350,
      type: "bar",
      foreColor: "#a0acbb",
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#f43f5e', '#22c55e', '#3b82f6'],
    series: [      
      {
        name: 'Women',
        type: 'column',
        data: [140, 85, 80]
      },
      {
        name: "Men",
        type: 'column',
        data: [90, 120, 70]
      },
      {
        name: "Twinz",
        type: 'column',
        data: [50, 65, 90]
      },
    ],    
    stroke: {
      width: [0, 0, 0]
    },
    plotOptions: {
      bar: {
        columnWidth: '14px',
        borderRadius: 10,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
      }
    },
    xaxis: {
      categories: ['Shirts', 'Pants', 'Shoes']
    },
    tooltip: {
      shared: false,
      intersect: true
    },    
    legend: {
      horizontalAlign: "center",
      offsetX: 0,
      labels: {
        colors: '#283c50',
        fontWeight: 600
      }
    },
    responsive: [{
      breakpoint: 330,
      options: {
        plotOptions: {
          bar: {
            columnWidth: '8px',
          }
        }
      }
    },{
      breakpoint: 300,
      options: {
        plotOptions: {
          bar: {
            columnWidth: '4px',
          }
        }
      }
    }]
  };

  const [rendered, setRendered] = useState(false);
  var apexChart = new ApexCharts(document.querySelector("#apex_charts_wrap_gender"), options);

  const typeGenderToggleStyle = '!w-auto !text-xs !font-semibold uppercase border !rounded-md !border-asd_primary !bg-asd_white !text-asd_primary cursor-pointer';
  
  const typeGenderPriceProp = typeGenderToggle == 'gender' ? ['shirt', 'pant', 'shoes'] : ['female', 'men', 'twinz'];      

  /*With integration*/
  useEffect(() => {
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
  }, [])
  

  // useEffect(() => {
  //   setRendered(true);
  //   rendered && apexChart.render();
  // }, [rendered])
  
  useEffect(() => {
    setRendered(true);
    apexChart = new ApexCharts(document.querySelector(`#apex_charts_wrap_${typeGenderToggle}`), options);
    rendered && apexChart.render();
  }, [rendered, typeGenderToggle])

  
  /*useEffect(() => {    
    if(typeGenderToggle == 'gender'){
      apexChart.updateOptions({
        series: [
          {
            name: 'Female',
            type: 'column',
            data: [140, 85, 80]
          },
          {
            name: "Men",
            type: 'column',
            data: [90, 120, 70]
          },
          {
            name: "Twinz",
            type: 'column',
            data: [50, 65, 90]
          }
        ],
        xaxis: {
          categories: ['Shirts', 'Pants', 'Shoes']
        }
      })
    }else{
      apexChart.updateOptions({
        series: [
          {
            name: 'Shirts',
            type: 'column',
            data: [20, 35, 60]
          },
          {
            name: "Pants",
            type: 'column',
            data: [110, 55, 50]
          },
          {
            name: "Shoes",
            type: 'column',
            data: [60, 90, 40]
          }
        ],
        xaxis: {
          categories: ['Female', 'Men', 'Twinz']
        }
      })
    };
  }, [typeGenderToggle])*/


  /*With integration*/
  useEffect(() => {  
    if(typeGenderToggle == 'gender'){
      apexChart?.updateOptions({
        series: [
          {
            name: 'Women',
            type: 'column',
            data: [countState.shirt_female, countState.pant_female, countState.shoes_female]
          },
          {
            name: "Men",
            type: 'column',
            data: [countState.shirt_men, countState.pant_men, countState.shoes_men]
          },
          {
            name: "Twinz",
            type: 'column',
            data: [countState.shirt_twinz, countState.pant_twinz, countState.shoes_twinz]
          }
        ],
        xaxis: {
          categories: ['Shirts', 'Pants', 'Shoes']
        }
      })
    }else{
      apexChart?.updateOptions({
        series: [
          {
            name: 'Shirts',
            type: 'column',
            data: [countState.shirt_female, countState.shirt_men, countState.shirt_twinz]
          },
          {
            name: "Pants",
            type: 'column',
            data: [countState.pant_female, countState.pant_men, countState.pant_twinz]
          },
          {
            name: "Shoes",
            type: 'column',
            data: [countState.shoes_female, countState.shoes_men, countState.shoes_twinz]
          }
        ],
        xaxis: {
          categories: ['Women', 'Men', 'Twinz']
        }
      })
    };
  }, [typeGenderToggle, countState])
  // }, [typeGenderToggle, countState.shoes_twinz])

  return (
    <section id='typeGenderSection' className='!bg-asd_white !rounded-[10px] product_type_gender_section'>
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
        <Card.Body>
            { typeGenderToggle == 'type' ?  <div id="apex_charts_wrap_type"></div> : <></> }
            { typeGenderToggle == 'gender' ?  <div id="apex_charts_wrap_gender"></div> : <></> }
        </Card.Body>
        <Card.Footer className='!bg-transparent !p-5 !border-[#e5e7eb] grid gap-4   lg:grid-cols-4 lg:grid-rows-1   grid-cols-1 grid-rows-3'>
            {
            (typeGenderToggle == 'gender' ? ['Shirts', 'Pants', 'Shoes'] : ['Female', 'Men', 'Twinz']).map((item, index) => {
                return(
                <div className='flex items-start flex-col p-3 border !border-dashed !border-gray-400  rounded-lg' key={index}>
                    <span className='block text-xs font-normal text-gray-700'>{item}</span>
                    {/* price from firebase (countState[item]) * random number */}
                    {/* <span className='block text-base font-bold text-asd_black'>EGP5,569</span> */}
                    {/* <ProgressBar now={65} className={`w-full !h-[3px] mt-1 bg-gray-200 ${typeGenderProgressColors[index]}`} /> */}
                    {/* With integration */}
                    <span className='block text-base font-bold text-asd_black'>EGP{(countState[typeGenderPriceProp[index]] * 750).toLocaleString()}</span>
                    <ProgressBar now={(parseInt(countState[typeGenderPriceProp[index]] / countState.products *100))} className={`w-full !h-[3px] mt-1 bg-gray-200 ${typeGenderProgressColors[index]}`} />
                </div>
                )  
            })
            }                
        </Card.Footer>
        </Card>
    </section>
  )
}

export default TypeGenderSection