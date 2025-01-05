import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import "./sidebar.css"

const Sidebar = () => {
  const customButtonClass = 'p-0 h-11 max-h-11 !flex items-center justify-center !bg-[#eaebef] !text-asd_black border-0 !rounded-xl'
  return (
    <ButtonGroup vertical className='sidebar pt-3 ps-3 h-full !justify-start gap-3'>
      <Button href='/' className={customButtonClass}>Dashboard</Button>
      <Button href='/products' className={customButtonClass}>Products</Button>
      <Button href='/customers' className={customButtonClass}>Customers</Button>
    </ButtonGroup>

  )
}

export default Sidebar