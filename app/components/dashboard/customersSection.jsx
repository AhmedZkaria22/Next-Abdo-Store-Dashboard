import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { ThreeDotsVertical } from 'react-bootstrap-icons'
import TableImage from '../listing/tableImage'
import { getLatestCustomers, getOldestCustomers } from '@/app/dashboard/dashboard'

const CustomersSection = ({sectionClass, head, customerType}) => {
  const customerImageAlt = 'https://wphtml.com/html/tf/duralux-demo/assets/images/avatar/1.png';

  const [customersList, setCustomersList] = useState([]);
  useEffect(() => {                    
    customerType == 'oldest' ? getOldestCustomers(setCustomersList) : getLatestCustomers(setCustomersList);
  }, [])

  return (
    <section id='customersSection' className={`!bg-asd_white !rounded-[10px] ${sectionClass}`}>
        <Card className='!bg-transparent border-0 shadow-[0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1)]'>
        <Card.Header className='!bg-transparent !p-5 !border-[#e5e7eb] flex items-center justify-between'>
            <h2 className='text-base font-bold text-asd_black capitalize'>{head}</h2>
            <ThreeDotsVertical className='threeDotsVertical w-[15px] h-5 stroke-gray-500 hover:stroke-asd_primary cursor-pointer' />
        </Card.Header>
        <Card.Body className={`p-0 overflow-auto ${customerType == 'latest' ? 'customersSectionLatest' : ''}`}>
            {
            customersList.map((item, index) => {
                return(
                <div className={`cardBodyRow flex items-center flex-row gap-3 p-3 ${index != customersList.length-1 ? '!border-b !border-solid border-b-[#e5e7eb]' : ''}`} key={item.id}>
                    {
                        customerType == 'oldest' ? <>
                            <TableImage src={item.image || customerImageAlt} width={38.4} height={38.4} borderRadius={'50%'} customClass={'w-[38.4px] h-[38.4px]'} />
                            <span className='text-sm font-semibold text-asd_black capitalize'>{item.name}</span>
                        </>:<>
                            <span className='text-sm font-semibold text-asd_black capitalize'>#{item.id}</span>
                            <TableImage src={item.image || customerImageAlt} width={38.4} height={38.4} borderRadius={'50%'} customClass={'w-[38.4px] h-[38.4px]'} />
                            <span className='text-sm font-semibold text-asd_black capitalize'>{item.name}</span>
                            <span className='flex flex-row items-end gap-1 text-sm font-semibold text-asd_black capitalize'>{item.lastBuyDate} <span className='block text-xs leading-5 font-normal text-gray-700'>(last buy date)</span> </span>
                        </>
                    }
                </div>
                )  
            })
            }                
        </Card.Body>
        </Card>
    </section>
  )
}

export default CustomersSection