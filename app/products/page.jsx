'use client'

import React, { useEffect, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import TableImage from '../components/listing/tableImage';
import FilledSpanGroup from '../components/listing/filledSpanGroup';
import SizesGroup from '../components/listing/sizesGroup';
import dayjs from 'dayjs';
import { Breadcrumb, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import CustomPagination from '../components/listing/customPagination/customPagination';
import { getProducts, getTotalCount, handleAdd, handleEdit, handlePageChange } from './productsList';
import FilterBox from '../components/listing/filterBox/filterBox';
import hocs from './hocs';
import './products.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardModal from '../components/modals/DashboardModal/DashboardModal';
import { Eye, PencilSquare, Trash3 } from 'react-bootstrap-icons';
import Head from 'next/head';
import { images } from '../images/images';


const Products = () => {

  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const pageSize = 5;

  const [showEdit, setShowEdit] = useState(false);
  let targetEditId = -1;
  const [editValues, setEditValues] = useState({});   

  const [showSort, setShowSort] = useState(false);
  const targetSort = useRef(null);
  
  const [showFilter, setShowFilter] = useState(false);
  const targetFilter = useRef(null);
  
  const [showAdd, setShowAdd] = useState(false);  

  const [orderByAttr, setOrderByAttr] = useState('index');
  const [orderByType, setOrderByType] = useState(false);
  const [filterByValues, setFilterByValues] = useState({
    index: null,
    name: null,
    colors: null,
    createdAt: null,
    filter: null,
    sizes: [],
    gender: null,
    price: null
  });

  
  const initialAddState = {
    title: "",
    desc: "",
    price: "",
    PriceBeforeDescount: "",
    createdAt: "",
    colors: [],
    sizes: {},
    sizesFound: [],
    filter: "",
    gender: "",
    images: [],
  };
  
  const dt = new Date();
  const [formValues, setFormValues] = useState({...initialAddState})
  const handleCloseAddEditForm = (setShowForm) => {
    setShowForm(false);
    setFormValues({
        title: "",
        desc: "",
        price: "",
        PriceBeforeDescount: "",
        createdAt: dt.toLocaleString().substring( 0, dt.toLocaleString().indexOf(",") ),
        colors: [],
        sizes: {},
        sizesFound: [],
        filter: "",
        gender: "",
        images: []
    });    
  }
  
  const handleChangeAddEditForm = (eTarget) => {
    const fieldName = eTarget.name;
    const fieldValue = eTarget.value;    
    
    (fieldName === "sm" || fieldName === "md" || fieldName === "lg" || fieldName === "xl")
    ? setFormValues(prev => ({
        ...prev,
        sizes: { ...prev.sizes, [fieldName]: parseInt(fieldValue) },      
    })): (fieldName === "colors")
    ? setFormValues(prev => ({
        ...prev,
        colors: fieldValue.replaceAll(" ", "").split("-"),
    })): (fieldName === "images")
    ? setFormValues(prev => ({
        ...prev,
        images: fieldValue.replaceAll(" ", "").split(","),
    })): (fieldName !== "sm" && fieldName !== "md" && fieldName !== "lg" && fieldName !== "xl")
    ?  setFormValues(prev => ({
        ...prev,
        [fieldName]: fieldValue,
    })) : null;


    setFormValues((prev) => {
        const prevSizes = {...prev.sizes};
        if( (fieldName === "sm" || fieldName === "md" || fieldName === "lg" || fieldName === "xl") && Number.isNaN(parseInt(fieldValue)) ){
            prevSizes[fieldName] = 'deleted';
        }        

        return {...prev, sizes: prevSizes};
    });
  };

  const handleSubmitAddEditForm = async (event, formType, colorsIsValidate, imagesIsValidate) => {
    event.preventDefault();
    
    const createdAtValue = formType == 'edit' ? formValues?.createdAt : dt.toLocaleString().substring( 0, dt.toLocaleString().indexOf(",") );
    let deletedFormValuesSizes = {...formValues.sizes};
    Object.keys(deletedFormValuesSizes).map(prp => {
        deletedFormValuesSizes[prp] === 'deleted' ? delete deletedFormValuesSizes[prp] : null;
    })
    // deletedFormValuesSizes : to handle each formValues.sizes where delete not include it in ['sizesFound']

    const sizesFoundValue = Object.keys(deletedFormValuesSizes)?.sort().join('_');    
    
    let newFormValues = {};
    // newFormValues : to check if formValues properties empty||null assign values from editValues(prop before edit)    
    
      Object.keys(formValues).map(prp => {
          ((!formValues[prp] || !Object.keys(formValues[prp]).length) && prp != 'sizesFound')
          ? prp == 'sizes' ? (newFormValues[prp] = {}) 
              : prp == 'colors' ? (newFormValues[prp] = []) 
              : (newFormValues[prp] = "")
          : prp == 'sizes' ? (newFormValues[prp] = deletedFormValuesSizes) 
              : (newFormValues[prp] = formValues[prp])
      });    
      if(formType === 'add'){ getTotalCount(setCount, null); }
    
      if(
        (newFormValues['title'].length >= 4 && newFormValues['title'].length <= 35) &&
        (newFormValues['desc'].length >= 4 && newFormValues['desc'].length <= 300) &&
        parseInt(newFormValues['price']) >= 1 && 
        ((parseInt(newFormValues['PriceBeforeDescount']) >= 1 && parseInt(newFormValues['PriceBeforeDescount']) != NaN) || newFormValues['PriceBeforeDescount'].length == 0) &&
        colorsIsValidate([...newFormValues['colors']]) &&
        imagesIsValidate([...newFormValues['images']]) &&        
        ((parseInt(newFormValues?.sizes?.['sm']) >= 1 && parseInt(newFormValues?.sizes?.['sm']) != NaN) || !newFormValues?.sizes?.['sm']) &&
        ((parseInt(newFormValues?.sizes?.['md']) >= 1 && parseInt(newFormValues?.sizes?.['md']) != NaN) || !newFormValues?.sizes?.['md']) &&
        ((parseInt(newFormValues?.sizes?.['lg']) >= 1 && parseInt(newFormValues?.sizes?.['lg']) != NaN) || !newFormValues?.sizes?.['lg']) &&
        ((parseInt(newFormValues?.sizes?.['xl']) >= 1 && parseInt(newFormValues?.sizes?.['xl']) != NaN) || !newFormValues?.sizes?.['xl']) &&
        newFormValues['filter'].length > 1 && 
        newFormValues['gender'].length > 1
    ){
        formType === 'add'
        ? handleAdd(setPage, setOrderByAttr, setOrderByType, setFilterByValues, {...newFormValues, sizesFound: sizesFoundValue, createdAt: createdAtValue, index: count})
        : handleEdit(setPage, setOrderByAttr, setOrderByType, setFilterByValues, {...newFormValues, sizesFound: sizesFoundValue, createdAt: createdAtValue, index: editValues?.id -1}, editValues?.docId)
        formType === 'add' ? handleCloseAddEditForm(setShowAdd) : handleCloseAddEditForm(setShowEdit);
    }

  };

  const handelCheckAddEditForm = (eTarget) => {
    if( eTarget.checked ){
      const fieldName = eTarget.name;
      const fieldValue = eTarget.value;
        (fieldName === "filter")
        ? setFormValues( prev => ({
            ...prev,
            filter: fieldValue,
        })): (fieldName === "gender")
        ? setFormValues( prev => ({
            ...prev,
            gender: fieldValue,
        })): setFormValues( prev => ({
          ...prev,
          [fieldName]: fieldValue,
        }));
    }
  };

  
  const handleShowAdd = () => {
    setShowAdd(!showAdd)
    setFormValues({...initialAddState});    
  }

  const handleShowEdit = (docData) => {
    targetEditId  = docData.id;
    setEditValues({...docData, index: docData.id-1});
    setFormValues({
      title: docData?.name,
      desc: docData?.desc,
      price: docData?.price,
      PriceBeforeDescount: docData?.PriceBeforeDescount,
      createdAt: docData?.createdAt,
      colors: docData?.colors,
      sizes: docData?.sizes,
      sizesFound: docData?.sizesFound?.split("_"),
      filter: docData?.type,
      gender: docData?.gender,
      images: docData?.images 
    });
    targetEditId  === docData.id ? setShowEdit(prev => !prev) : null;
  }

  const [showDelete, setShowDelete] = useState(false);
  let targetDeleteId = -1;
  const [deleteValues, setDeleteValues] = useState({});

  const handleShowDelete = (docData) => {
    targetDeleteId  = docData.id;
    setDeleteValues({name: docData.name, id: docData.docId});
    targetDeleteId  === docData.id ? setShowDelete(prev => !prev) : null;
  }

  const [showDetails, setShowDetails] = useState(false);
  let targetDetailsId = -1;
  const [detailsValues, setDetailsValues] = useState({});  

  const handleShowDetails = (docData) => {
    targetDetailsId  = docData.id;
    setDetailsValues({...docData});
    targetDetailsId  === docData.id ? setShowDetails(prev => !prev) : null;
  }


  const CustomActionButton = ({ id, customClass, placement, title, onclick, children }) => (
    <OverlayTrigger placement={placement} overlay={<Tooltip id={id} className={customClass}>{title}</Tooltip>}>
      <Button className='p-0 border-0 bg-transparent' onClick={onclick}>{children}</Button>
    </OverlayTrigger>
  );

  const lightPStyle = 'm-0 text-sm text-gray-700 font-normal';
  const [rowData, setRowData] = useState([]);  
  const [colDefs, setColDefs] = useState([
    { field: "id", cellRenderer: (doc) => <p className='m-0 text-sm text-asd_black font-semibold'>#{doc.data.id}</p> },
    { field: "image", sortable: false, cellRenderer: (doc) => <TableImage src={doc.data.image} width={85} height={85} borderRadius={'8px'} customClass={'w-[85px] h-[85px]'} /> },    
    { field: "name", cellRenderer: (doc) => <p className='m-0 text-sm text-asd_black font-semibold'>{doc.data.name}</p> },
    { field: "PriceBeforeDescount", cellRenderer: (doc) => <p className={lightPStyle}>{(doc.data.PriceBeforeDescount == undefined || doc.data.PriceBeforeDescount.length == 0) ? '-' : 'EGP ' + doc.data.PriceBeforeDescount}</p>},
    { field: "colors", sortable: false, cellRenderer: (doc) => <FilledSpanGroup colors={doc.data.colors} direction={'row'} gap={"10px"} spanWidth={'20px'} spanHeight={'20px'} spanRadius={'4px'} /> },
    { field: "createdAt", cellRenderer: doc => <p className={lightPStyle}>{doc.data.createdAt.length == 0 ? '-' : dayjs(new Date(doc.data.createdAt)).format("D MMM , YYYY")}</p>},
    { field: "type", cellRenderer: (doc) => <p className={lightPStyle}>{doc.data.type}</p> },
    { field: "sizes", sortable: false, cellRenderer: (doc) => <SizesGroup sizes={doc.data.sizes} /> },
    { field: "gender", cellRenderer: (doc) => <p className={lightPStyle}>{doc.data.gender == 'female' ? 'women' : doc.data.gender}</p> },
    { field: "price", cellRenderer: (doc) => <p className='m-0 text-sm text-asd_black font-semibold'>{(doc.data.price == undefined || doc.data.price.length == 0) ? '-' : 'EGP ' + doc.data.price }</p>},
    { field: "action", resizable: false, sortable: false, cellRenderer: (doc) => <div className='flex flex-row gap-3 justify-center'>
      <CustomActionButton id='ttp1' customClass='asd_tooltip_after tooltip_delete' placement='left' title='delete' onclick={() => handleShowDelete(doc.data)}>
        <Trash3 className='m-auto w-[16.5px] h-4 *:!fill-red-600 !stroke-red-fill-red-600 !stroke-[0.25px]'/>
      </CustomActionButton>
      <CustomActionButton id='ttp2' customClass='asd_tooltip_after tooltip_edit' placement='bottom' title='edit' onclick={() => handleShowEdit(doc.data)}>
        <PencilSquare className='m-auto w-[15.5px] h-[15px] *:!fill-orange-600 !stroke-orange-fill-orange-600 !stroke-[0.25px]'/>
      </CustomActionButton>
      <CustomActionButton id='ttp3' customClass='asd_tooltip_after tooltip_details' placement='right' title='details' onclick={() => handleShowDetails(doc.data)}>
        <Eye className='m-auto w-[16.5px] h-4 *:!fill-asd_primary !stroke-asd_primary !stroke-[0.25px]'/>
      </CustomActionButton>
    </div> },
  ]);



  
  useEffect(()=>{    
    getProducts(setRowData, page, pageSize, orderByAttr, orderByType, filterByValues, setCount, count);
  },[page, orderByAttr, orderByType, filterByValues])
  
  
  return (
    <>
      <Head>
        <meta name="og:title" content="Next | Abdo Store Dashboard - Products" />
        <meta name="og:description" content="Abdo store dashboard products page to handle website products with full crud operations" />
        <meta name="og:keywords" content="Abdo store dashboard, Abdo store ecommerce, Abdo store website, Dashboard, Website, Ecommerce, Abdo store, Products, Crud, Create, Read, Update, Delete, Shirts, Pants, Shoes, Women, Men, Twinz, Filter, Sort, Nextjs, Reactjs, Tailwind, Tailwindcss, React-bootstrap" />
        <meta property='og:type' content='website' />
        <meta property='og:image' content={images.products} />
      </Head>

      <div id='productsControls' className='flex items-center justify-between px-4'>
      <Breadcrumb className='flex bg-asd_white m-0 asd_breadcrumb !w-44 flex-nowrap'>
        <Breadcrumb.Item href="/" className='!text-asd_black hover:!text-blue-600 text-sm font-medium'>Home</Breadcrumb.Item>        
        <Breadcrumb.Item active className='!text-gray-400 text-sm font-medium'>Products</Breadcrumb.Item>
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
        showAdd={showAdd}
        setShowAdd={setShowAdd}
        handleShowAdd={handleShowAdd}
        AddEditDashboardModalChildren={hocs.AddEditDashboardModalChildren(formValues, setFormValues, handleCloseAddEditForm, handleChangeAddEditForm, handleSubmitAddEditForm, handelCheckAddEditForm, setShowAdd, 'add-product', setPage, setOrderByAttr, setOrderByType, setFilterByValues, 'add', setCount, count)} 
        resetProps={[[orderByAttr, orderByType, filterByValues], [setPage, setOrderByAttr, setOrderByType, setFilterByValues]]}
      />
      </div>

      <div>
        <DashboardModal show={showEdit} onHide={()=>setShowEdit(false)} modalId={'edit-product'} className='modal_vertical_scroll'>
          {hocs.AddEditDashboardModalChildren(formValues, setFormValues, handleCloseAddEditForm, handleChangeAddEditForm, handleSubmitAddEditForm, handelCheckAddEditForm, setShowEdit, 'edit-product', setPage, setOrderByAttr, setOrderByType, setFilterByValues, 'edit', null, null)}
        </DashboardModal>
      </div>

      <div>
        <DashboardModal show={showDelete} onHide={()=>setShowDelete(false)} modalId={'delete-product'}>        
          {hocs.DeleteDashboardModalChildren(setShowDelete, setPage, 'delete-product', deleteValues?.name, deleteValues?.id)}
        </DashboardModal>
      </div>

      <div>
        <DashboardModal show={showDetails} onHide={()=>setShowDetails(false)} modalId={'details-product'} className='modal_vertical_scroll'>        
          {hocs.DetailsDashboardModalChildren(setShowDetails, 'details-product', detailsValues)}
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
          <div className="customPaginationWrap bg-asd_white border-t border-[#e5e7eb] rounded-b-lg">
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

export default Products