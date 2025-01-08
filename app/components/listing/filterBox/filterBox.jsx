import React, { forwardRef } from 'react'
import { Button } from 'react-bootstrap';
import { Filter, Funnel, Plus, X } from 'react-bootstrap-icons'
import OverlayModal from '../../modals/overlayModal/overlayModal';
import { handleResetFiltersSort } from '@/app/products/productsList';
import DashboardModal from '../../modals/DashboardModal/DashboardModal';

const FilterBox = ({
    showSort, setShowSort, targetSort, SortOverlayModalChildren,
    showFilter, setShowFilter, targetFilter, FilterOverlayModalChildren,
    showAdd, setShowAdd, handleShowAdd, AddEditDashboardModalChildren, resetProps
}) => {
    
    let emptyFilterLength = 0;
    for (const prp in resetProps[0][2]) {
      if (!resetProps[0][2][prp] || !resetProps[0][2][prp].length) {
        emptyFilterLength += 1;        
      }
    }

  return (
    <div className='flex items-center justify-end gap-2 !w-auto flex-wrap !my-2'>
        {
            (resetProps[0][0] != 'index' || resetProps[0][1] || Object.keys(resetProps[0][2]).length != emptyFilterLength) 
            ? <Button 
                onClick={() => {
                    handleResetFiltersSort(...resetProps[1]);
                }} 
                className='px-2 !text-xs !font-semibold uppercase !border !border-gray-400 !rounded-sm !bg-asd_white !text-gray-950 w-[5.5rem] h-[39.6px] !flex items-center justify-center gap-2'
            >
                <X className='w-[23px] h-[1.3rem] stroke-red-700 hover:stroke-gray-900' />
                Reset
            </Button>
            : <></>
        }
        
        <Button 
            ref={targetSort}            
            onClick={() => {
                setShowSort(!showSort)
            }} 
            className='p-0 !border !border-gray-400 !rounded-sm !bg-asd_white w-[40.1px] h-[39.6px]'
            >
            <Filter className='m-auto w-[21px] h-5 stroke-gray-500 hover:stroke-gray-900' />
        </Button>
        <Button 
            ref={targetFilter}
            onClick={() => {
                setShowFilter(!showFilter)
            }} 
            className='p-0 !border !border-gray-400 !rounded-sm !bg-asd_white w-[40.1px] h-[39.6px]'
        >
            <Funnel className='m-auto w-[16.5px] h-4 stroke-gray-500 hover:stroke-gray-900' />
        </Button>


        <OverlayModal target={targetSort} show={showSort} onHide={()=>setShowSort(false)}>
            {SortOverlayModalChildren}
        </OverlayModal>
        <OverlayModal target={targetFilter} show={showFilter} onHide={()=>setShowFilter(false)}>
            {FilterOverlayModalChildren}
        </OverlayModal>


        {
            (showAdd != null) ? <>
                <Button 
                    onClick={handleShowAdd}
                    className='!text-xs !font-semibold uppercase !rounded-sm !bg-asd_primary !text-asd_white w-40 h-[39.6px] !flex items-center justify-center gap-3'
                >
                    <Plus className='w-[23px] h-[1.3rem] !stroke-asd_white' />
                    New product
                </Button>

                <DashboardModal show={showAdd} onHide={()=>setShowAdd(false)} modalId={'add-product'} className='modal_vertical_scroll'>
                    {AddEditDashboardModalChildren}
                </DashboardModal>
            </>:<></>
        }

    </div>
  )
}

export default FilterBox