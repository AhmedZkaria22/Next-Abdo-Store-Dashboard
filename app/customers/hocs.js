import React, { useState } from 'react';
import { Button, ButtonGroup, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap';

import { handleFilter, handleSort } from '../functions/listingFunctions';
import TableImage from '@/components/listing/tableImage/page';
import './styles.css';

const customLabelStyle = 'text-sm text-asd_black font-semibold capitalize';
const customInputStyle = 'm-0 text-sm !text-gray-700/90 !bg-transparent !border-[#dee2e6] font-normal focus:!border-asd_primary focus:!text-gray-700/90 disabled:!bg-[#dee2e6] disabled:!opacity-50';
const submitCancelHelper = '!text-xs !font-semibold uppercase border-0 !rounded-sm';
const customSubmitStyle = `${submitCancelHelper} !bg-asd_primary !text-asd_white`;
const customCancelStyle = `${submitCancelHelper} !bg-asd_white !text-asd_primary`;

const SortOverlayModalChildren = (setShowSort, setPage, setOrderByAttr, setOrderByType) => {
  const sortRadios = ["id", "email"];
  const [formOrderByAttr, setFormOrderByAttr] = useState('index');
  const [formOrderType, setFormOrderType] = useState(false);


  const handleChange = (item) => {
    item == 'id' ? setFormOrderByAttr('index') 
    : setFormOrderByAttr(item)
  }
  
  const handleClose = () => {
    setShowSort(false);
    setFormOrderByAttr('index');
    setFormOrderType(false);
  }

  return (
    <Card className='w-[18rem]'>
        <Card.Body>
            <Card.Title className='!text-xl text-asd_black uppercase font-semibold'>Sort by</Card.Title>
            <Form onSubmit={(event) => {
                event.preventDefault();
                handleSort(setPage, setOrderByAttr, setOrderByType, formOrderByAttr, formOrderType);
                handleClose();
            }}>
                <Row style={{maxHeight: "15rem", overflow: "auto"}} className='my-2'>
                    {sortRadios.map( item => (
                        <div key={`sort-${item}`} className="mb-3">
                        <Form.Check
                            label={item}
                            name="sort-group"
                            type={'radio'}
                            id={`sort-${item}`}
                            className={customLabelStyle}
                            onChange={() => handleChange(item)}
                        />
                        </div>
                    ))}
                </Row>
                <Form.Check
                    type="switch"
                    id="sort-type-switch"
                    label="Descending"
                    className={customLabelStyle}
                    onChange={(e) => setFormOrderType(e.target.checked)}
                />
                
                <ButtonGroup aria-label="sort form buttons" className='mt-2 gap-[10px] w-full'>
                    <Button variant="primary" type="submit" className={customSubmitStyle}>
                        Sort
                    </Button>
                    <Button variant="secondary" type="reset" className={customCancelStyle} onClick={() => {
                        handleClose();
                    }}>
                        Cancel
                    </Button>
                </ButtonGroup>
            </Form>
        </Card.Body>
    </Card>
  )
}


const FilterOverlayModalChildren = (setShowFilter, setPage, setFilterByValues) => {
  const filterInputs = ["index", "email", "firstSignInDate", "lastBuyDate"];
  const inputsLabels = ["id", "email", "first Sign In Date", "last Buy Date"];
  const filterInputPlaceholders = ["needed id - 1", "email", "MM/DD/YYYY", "MM/DD/YYYY"];

  const [formValues, setFormValues] = useState({
    index: null,
    email: null,
    firstSignInDate: null,
    lastBuyDate: null
});

  const handleChange = (item, eTarget) => {
    setFormValues(prev => ({...prev, [item]: eTarget.value}))
  }

  const handleClose = () => {
    setShowFilter(false);
    setFormValues({
        index: null,
        email: null,
        firstSignInDate: null,
        lastBuyDate: null
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleFilter(setPage, setFilterByValues, formValues);    
    handleClose();
  }

  return (
    <Card className='w-[18rem]'>
        <Card.Body>
        <Card.Title className='!text-xl text-asd_black uppercase font-semibold'>Filter by</Card.Title>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Row style={{maxHeight: "15rem", overflow: "auto"}} className='my-2'>
                    {filterInputs.map((item, index) => (
                        <Form.Group className="mb-3" controlId={`filterForm.ControlInput${index+1}`} key={index}>
                            <Form.Label className={customLabelStyle}>{inputsLabels[index]}</Form.Label>
                            {
                                <Form.Control type="text" placeholder={filterInputPlaceholders[index]} 
                                    className={customInputStyle}
                                    onChange={(e) => handleChange(item, e.target)}
                                    disabled={formValues?.index?.length > 0 && item != 'index'}
                                />
                            }
                        </Form.Group>
                    ))}
                </Row>
                
                <ButtonGroup aria-label="sort form buttons" style={{gap: "10px", width: "100%"}}>
                    <Button variant="primary" type="submit" className={customSubmitStyle}>
                        Filter
                    </Button>
                    <Button variant="secondary" type="reset" className={customCancelStyle} onClick={handleClose}>
                        Cancel
                    </Button>
                </ButtonGroup>
            </Form>
        </Card.Body>
    </Card>
  )
}


const detailsHeadingStyle = 'text-[10px] text-asd_black font-bold uppercase';
const detailsCellsStyle = 'm-0 text-sm text-gray-700 font-normal';
const DetailsDashboardModalChildren = (handleHideDetails, modalId, customerDetails, detailsValues) => {

    const handleClose = () => {
      handleHideDetails();
    }
    
    return (
      <div className='h-full min-w-[270px] overflow-auto'>
          <Modal.Header closeButton>
          <Modal.Title id={modalId} className='!text-xl text-asd_black uppercase font-semibold'>
              Customer Details
          </Modal.Title>
          </Modal.Header>
          <Modal.Body className='min-w-[270px] overflow-auto'>
          <Container id="Test_Product_view" className={'beforeNav'}>
              
              <Row className={'mb-3'}>                  
                <Col xs={12} className='flex flex-row items-center gap-3'>
                  <TableImage src={customerDetails.image} width={85} height={85} borderRadius={'8px'} customClass={'w-[85px] h-[85px]'} />
                  <p className='text-base text-asd_black font-bold capitalize'>{customerDetails.name}</p>                          
                </Col>
              </Row>
              <Row className={'mb-3'}>                  
                <Col xs={12} className=''>                  
                  <h3 className='text-lg text-asd_black font-semibold underline decoration-solid decoration-2 underline-offset-[12px] decoration-asd_primary'>Customer History</h3>
                </Col>
              </Row>
              <Row className={'detailsHeadRow mb-3'}>
                  <Col xs={4}>
                    <span className={detailsHeadingStyle}>Date</span>
                  </Col>
                  
                  <Col xs={5}>
                    <span className={detailsHeadingStyle}>Product</span>
                  </Col>
  
                  <Col xs={3}>
                    <span className={detailsHeadingStyle}>Cost</span>
                  </Col>
              </Row>
              {
                detailsValues?.length ? detailsValues?.map((detail, index) => {
                  return(
                    <Row className={`detailsBodyRow ${index != detailsValues.length -1 ? 'mb-3' : 'mb-0'}`} key={detail.index}>
                        <Col xs={4} className='detailsRowItemLGS !flex flex-row items-center'>
                          <p className={`${detailsCellsStyle} font-semibold`}>{detail.date}</p>
                        </Col>
                        
                        <Col xs={5} className='detailsRowItemLGS !flex flex-row items-center gap-3'>
                          <TableImage src={detail.image} width={50} height={50} borderRadius={'4px'} customClass={'w-[50px] h-[50px]'} />
                          <p className={detailsCellsStyle}>{detail.name}</p>                          
                        </Col>
        
                        <Col xs={3} className='detailsRowItemLGS !flex flex-row items-center'>
                          <p className={`${detailsCellsStyle} font-semibold`}>EGP {detail.cost}</p>
                        </Col>

                        <Col xs={12} className='detailsRowItemSMS !hidden'>
                          <TableImage src={detail.image} width={60} height={60} borderRadius={'4px'} customClass={'w-[60px] h-[60px]'} />
                          <div className='flex flex-col'>
                            <p className={`${detailsCellsStyle} flex flex-row gap-1 font-semibold`}>{detail.date} <span className='block text-xs leading-5 font-normal text-gray-700'>(date)</span></p>
                            <p className={`${detailsCellsStyle} capitalize`}>{detail.name}</p>
                            <p className={`${detailsCellsStyle} flex flex-row gap-1 font-semibold`}>EGP {detail.cost} <span className='block text-xs leading-5 font-normal text-gray-700'>(cost)</span></p>
                          </div>
                        </Col>

                    </Row>
                  )
                }) : <></>
              }

          </Container>
          </Modal.Body>
          
          <Modal.Footer>
          <ButtonGroup aria-label="sort form buttons" style={{gap: "10px", width: "100%"}}>
              <Button variant="secondary" type="button" className={customCancelStyle} onClick={handleClose}>
                Close
              </Button>
          </ButtonGroup>
  
          </Modal.Footer>
      </div>
    )
  }
  

export default {SortOverlayModalChildren, FilterOverlayModalChildren, DetailsDashboardModalChildren}