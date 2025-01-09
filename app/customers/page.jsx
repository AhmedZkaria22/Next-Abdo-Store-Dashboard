'use client'

import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head';
import { Breadcrumb, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Eye } from 'react-bootstrap-icons';
import { AgGridReact } from 'ag-grid-react';
import CustomPagination from '@/components/listing/customPagination/customPagination';
import FilterBox from '@/components/listing/filterBox/filterBox';
import TableImage from '@/components/listing/tableImage';
import DashboardModal from '@/components/modals/DashboardModal/DashboardModal';
import { getCustomerCart, getCustomers } from './customersList';
import { handlePageChange } from '../functions/listingFunctions';
import hocs from './hocs';
import dayjs from 'dayjs';
import { images } from '@/app/images/images';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";


const Customers = () => {
  const lightPStyle = 'm-0 text-sm text-gray-700 font-normal';

  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const pageSize = 5;

  const [orderByAttr, setOrderByAttr] = useState('index');
  const [orderByType, setOrderByType] = useState(false);
  const [filterByValues, setFilterByValues] = useState({
    index: null,
    email: null,
    firstSignInDate: null,
    lastBuyDate: null
  });

  const [showDetails, setShowDetails] = useState(false);
  let targetDetailsId = -1;
  const [detailsValues, setDetailsValues] = useState({});  
  const [customerDetails, setCustomerDetails] = useState({});  
  const customerImageAlt = 'https://wphtml.com/html/tf/duralux-demo/assets/images/avatar/1.png';

  const handleShowDetails = (docData) => {
    targetDetailsId  = docData.id;
    getCustomerCart(setDetailsValues, docData.email);
    setCustomerDetails({name: docData.name, image: (docData.image||customerImageAlt)})
    targetDetailsId  === docData.id ? setShowDetails(prev => !prev) : null;
  }
  const handleHideDetails = () => {
    setDetailsValues({});
    setShowDetails(false);
  }
  

  const [showSort, setShowSort] = useState(false);
  const targetSort = useRef(null);
  const [showFilter, setShowFilter] = useState(false);
  const targetFilter = useRef(null);

  
  const [rowData, setRowData] = useState([]);  
  const [colDefs, setColDefs] = useState([
    { field: "id", cellRenderer: (doc) => <p className='m-0 text-sm text-asd_black font-semibold'>#{doc.data.id}</p> },
    { field: "image", sortable: false, cellRenderer: (doc) => <TableImage src={doc.data.image || customerImageAlt} width={85} height={85} borderRadius={'8px'} customClass={'w-[85px] h-[85px]'} /> },    
    { field: "name", cellRenderer: (doc) => <p className='m-0 text-sm text-asd_black font-semibold'>{doc.data.name}</p> },
    { field: "email", cellRenderer: (doc) => <p className={lightPStyle}>{doc.data.email}</p> },
    { field: "firstSignInDate", cellRenderer: (doc) => <p className={lightPStyle}>{doc.data.firstSignInDate?.length == 0 ? '-' : dayjs(new Date(doc.data.firstSignInDate)).format("D MMM , YYYY")}</p>},
    { field: "lastBuyDate", cellRenderer: (doc) => <p className={lightPStyle}>{(!doc.data.lastBuyDate?.length  || !doc.data.lastBuyDate || doc.data.lastBuyDate.toLowerCase() == 'invalid date')  ? 'Not yet' : dayjs(new Date(doc.data.lastBuyDate)).format("D MMM , YYYY")}</p>},
    { field: "action", resizable: false, sortable: false, cellRenderer: (doc) => <div className='flex flex-row gap-3 justify-center'>
      <OverlayTrigger placement='right' overlay={<Tooltip id='ttp3' className='asd_tooltip_after tooltip_details'>details</Tooltip>}>
        <Button className='p-0 border-0 bg-transparent' onClick={() => handleShowDetails(doc.data)}>
          <Eye className='m-auto w-[16.5px] h-4 *:!fill-asd_primary !stroke-asd_primary !stroke-[0.25px]'/>
        </Button>
      </OverlayTrigger>
    </div> },
  ]);



  useEffect(()=>{    
    getCustomers(setRowData, page, pageSize, orderByAttr, orderByType, filterByValues, setCount);    
  },[page, orderByAttr, orderByType, filterByValues])    


  
  return (
      <>
        <Head>
          <meta name="og:title" content="Next | Abdo Store Dashboard - Customers" />
          <meta name="og:description" content="Abdo store dashboard customers page to view all website loged customers" />
          <meta name="og:keywords" content="Abdo store dashboard, Abdo store ecommerce, Abdo store website, Dashboard, Website, Ecommerce, Abdo store, Customers, loged in, Authentication, Read, Shirts, Pants, Shoes, Women, Men, Twinz, Filter, Sort, Nextjs, Reactjs, Tailwind, Tailwindcss, React-bootstrap" />
          <meta property='og:type' content='website' />
          <meta property='og:image' content={images.customers} />
        </Head>

        <div className='flex items-center justify-between px-4'>
        <Breadcrumb className='flex bg-asd_white m-0 asd_breadcrumb !w-44 flex-nowrap'>
          <Breadcrumb.Item href="/" className='!text-asd_black hover:!text-blue-600 text-sm font-medium'>Home</Breadcrumb.Item>        
          <Breadcrumb.Item active className='!text-gray-400 text-sm font-medium'>Customers</Breadcrumb.Item>
        </Breadcrumb>

        <FilterBox
          showSort={showSort}
          setShowSort={setShowSort}
          targetSort={targetSort}
          SortOverlayModalChildren={hocs.SortOverlayModalChildren(setShowSort, setPage, setOrderByAttr, setOrderByType)}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          targetFilter={targetFilter}
          FilterOverlayModalChildren={hocs.FilterOverlayModalChildren(setShowFilter, setPage, setFilterByValues)} 
          resetProps={[[orderByAttr, orderByType, filterByValues], [setPage, setOrderByAttr, setOrderByType, setFilterByValues]]}
        />
        </div>

        <div>
          <DashboardModal show={showDetails} onHide={handleHideDetails} modalId={'details-product'} className='modal_vertical_scroll'>
            {hocs.DetailsDashboardModalChildren(handleHideDetails, 'details-product', customerDetails, detailsValues)}
          </DashboardModal>
        </div>

        <div className='flex flex-col justify-between gap-3 p-4 bg-gray-100 h-auto !relative !shadow-[inset_0_1px_1px_0_rgba(0,0,0,.1),inset_0_1px_2px_-1px_rgba(0,0,0,.1)]'>
          <div className='ag-theme-quartz listing_table w-full h-[496px]'>
            <AgGridReact
              rowData={rowData}
              rowHeight={85}
              columnDefs={colDefs}
              suppressRowHoverHighlight={true}            
            />
          </div>

          {count > pageSize && (
            <div className='customPaginationWrap bg-asd_white border-t border-[#e5e7eb] rounded-b-lg'>
              <CustomPagination
                count={Math.ceil(count / [pageSize])}
                size="sm"
                page={page}
                handleChange={(value) => handlePageChange(value, setPage)}
              />
            </div>
          )}
        </div>
      </>
  )
}

export default Customers