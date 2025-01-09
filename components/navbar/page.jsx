"use client";
import React from 'react';
import { Badge, Button, Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Bell, List } from 'react-bootstrap-icons';
import { icons } from '@/app/icons/icons';
import Image from 'next/image';
import Sidebar from '../sidebar/page';
import './styles.css';

const DashNavbar = () => {

  return (
    <Navbar collapseOnSelect expand="lg" className="!m-0 !p-0 !bg-asd_white border-b-[1px] !border-[#e5e7eb]">
    <Container className='!m-0 !px-5 !py-4 !w-full !max-w-full'>
    <Navbar key={'md'} expand={'md'} className="flex md:!hidden !order-2 min-[425px]:!order-1">
      <Container fluid className='!p-0'>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} className='asd_navbar_toggle !p-0 !border-0'>
        <List className='!w-5 !h-[15.5px] *:!fill-[#2c3344]/80 hover:*:!fill-[#2c3344] !bg-transparent *:!origin-center' />
        </Navbar.Toggle>
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-md`}
          aria-labelledby={`offcanvasNavbarLabel-expand-md`}
          placement="start"
        >
          <Offcanvas.Header closeButton>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Sidebar />
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>


      <Navbar.Brand href="/" className='!font-mono !text-lg !text-asd_black !m-0 !text-wrap !order-1 min-[425px]:!order-2 max-[425px]:!text-center max-[425px]:!w-full'>Abdo Store Dashboard</Navbar.Brand>
      {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
      {/* <Navbar.Collapse id="responsive-navbar-nav"> */}
        <Nav className='flex flex-row items-center gap-4 order-3'>
        <Button className='flex items-center justify-center !relative !border-0 !bg-transparent p-0'> 
          <Bell className='!w-[22px] !h-5 *:!fill-[#6b7280] !stroke-[#6b7280] !stroke-[0.25px] !bg-transparent' />
          <Badge className='!flex !items-center !justify-center !absolute !-top-2 !-right-[6px] text-xs !bg-asd_primary !text-asd_white !rounded-[50%] !p-0 w-[19px] h-[19px]'>9</Badge>
        </Button>
          <div>
            <Image
              src={icons.avatar}
              alt='avatar icon'
              className='rounded-[50%]'
              width={40}
              height={40}              
            />
            {/* <NavDropdown id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Log out</NavDropdown.Item>
            </NavDropdown> */}
          </div>
        </Nav>
      {/* </Navbar.Collapse> */}
    </Container>
  </Navbar>
  )
}

export default DashNavbar