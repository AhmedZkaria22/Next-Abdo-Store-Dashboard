import React, { useState } from 'react';
import { Button, ButtonGroup, Card, Carousel, Col, Container, Dropdown, Form, ListGroup, ListGroupItem, Modal, Row } from 'react-bootstrap';
import { handleDelete, handleFilter, handleSort } from './productsList';
import FilledSpanGroup from '@/components/listing/filledSpanGroup';

const customLabelStyle = 'text-sm text-asd_black font-semibold capitalize';
const customInputStyle = 'm-0 text-sm !text-gray-700/90 !bg-transparent !border-[#dee2e6] font-normal focus:!border-asd_primary focus:!text-gray-700/90 disabled:!bg-[#dee2e6] disabled:!opacity-50';
const submitCancelHelper = '!text-xs !font-semibold uppercase border-0 !rounded-sm';
const customSubmitStyle = `${submitCancelHelper} !bg-asd_primary !text-asd_white`;
const customCancelStyle = `${submitCancelHelper} !bg-asd_white !text-asd_primary`;

const SortOverlayModalChildren = (setShowSort, setPage, setOrderByAttr, setOrderByType) => {
  const sortRadios = ["id", "name"]
  const [formOrderByAttr, setFormOrderByAttr] = useState('index');
  const [formOrderType, setFormOrderType] = useState(false);


  const handleChange = (item) => {
    item == 'name' ? setFormOrderByAttr('title') 
    : item == 'id' ? setFormOrderByAttr('index') 
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
                    {sortRadios.map(item => (
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
  const filterInputs = ["index", "name", "colors", "createdAt", "type", "sizes", "gender", "price"];
  const filterInputPlaceholders = ["needed id - 1", "name", "#333, red, #ffffff", "MM/DD/YYYY", "select", "sizes", "select", "price"];
  const formOptionsData = {
    type: ['shirt', 'pant', 'shoes'],
    gender: ['female', 'men', 'twinz'],
    sizes: ['sm', 'md', 'lg', 'xl']
  };

  const [formValues, setFormValues] = useState({
    index: null,
    name: null,
    colors: null,
    createdAt: null,
    filter: null,
    sizes: [],
    gender: null,
    price: null
  });

  const handleChange = (item, opt, eTarget) => {
    item === 'type' ? setFormValues(prev => ({...prev, filter: opt})) 
    : item === 'gender' ? setFormValues(prev => ({...prev, gender: opt}))
    : item === 'sizes' && eTarget.checked ? setFormValues(prev => ({...prev, sizes: [...prev.sizes, opt]})) 
    : item === 'sizes' && !eTarget.checked ? setFormValues(prev => ({...prev, sizes: [...prev.sizes.filter(prevItem => prevItem != opt)]}))
    : setFormValues(prev => ({...prev, [item]: eTarget.value}))
  }

  const handleClose = () => {
    setShowFilter(false);
    setFormValues({
        index: null,
        name: null,
        colors: null,
        createdAt: null,
        filter: null,
        sizes: [],
        gender: null,
        price: null
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // handleFilter(setPage, setFilterByValues, formValues);
    handleFilter(setPage, setFilterByValues, {...formValues, colors: formValues?.colors?.replaceAll(" ", "")});
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
                            <Form.Label className={customLabelStyle}>{item == 'index' ? 'id' : item}</Form.Label>
                            {
                                (item === 'type' || item ==='gender') ?
                                <Dropdown drop={'down-centered'}>
                                    <Dropdown.Toggle id="dropdown-basic" className={`${customInputStyle} after:!align-[0.155em]`}
                                        disabled={formValues?.index?.length > 0}>{
                                        item === 'type' ? formValues.filter||filterInputPlaceholders[index] : (formValues.gender == 'female' ? 'women' : formValues.gender)||filterInputPlaceholders[index]
                                    }</Dropdown.Toggle>
                            
                                    <Dropdown.Menu>{
                                        formOptionsData[item].map((opt, o) => (
                                            <Dropdown.Item as={'span'} key={o} className={`${customInputStyle} cursor-pointer`}
                                            onClick={() => handleChange(item, opt, null)} 
                                            active={item === 'type' ? formValues.filter == opt : formValues.gender == opt}>{opt == 'female' ? 'women' : opt}</Dropdown.Item>                                        
                                        ))
                                    }</Dropdown.Menu>
                                </Dropdown>
                                : item ==='sizes' ?
                                <div className="mb-3">{
                                    formOptionsData[item].map((opt, o) => (
                                        <Form.Check
                                            label={opt}
                                            key={o}
                                            name="sizes_checkbox"
                                            type={'checkbox'}
                                            id={`sizes_checkbox-${o+1}`}
                                            className={customInputStyle}
                                            onChange={(e) => handleChange(item, opt, e.target)}
                                            disabled={formValues?.index?.length > 0}
                                        />
                                    ))
                                }</div>
                                : <Form.Control type="text" placeholder={filterInputPlaceholders[index]} 
                                    className={customInputStyle}                                    
                                    onChange={(e) => handleChange(item, null, e.target)}
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


const AddEditDashboardModalChildren = (formValues, setFormValues, handleCloseAddEditForm, handleChangeAddEditForm, handleSubmitAddEditForm, handelCheckAddEditForm, setShowForm, modalId, setPage, setOrderByAttr, setOrderByType, setFilterByValues, formType, setCount, count) => {    
    
  const formInputNames = ["title", "desc", ["price", "PriceBeforeDescount"], "colors", "images", ["sm", "md", "lg", "xl"], "filter", "gender"];
  const formInputPlaceholders = [
    "Title : ", "Description : ", ["Price : 99", "PriceBeforeDescount : 102"], 
    "Colors : #333-rgb(0,255,0)-blue-...etc", `Images : link1,link2,...etc`, 
    ["small: ", "medium: ", "large: ", "x large: "], 
    "Item Type", "Gender"
  ];
  const formInputTypes = ["text", "textarea", ["number", "number"], "text", "textarea", ["number", "number", "number", "number"], "radio", "radio"];
  const formInputRequired = [true, true, [true, false], true, true, [false, false, false, false], null, null];


  const colorsIsValidate = (colorsList) => {
    const regex_hex3 = /^\#([0-9a-fA-F]{3})$/g;
    const regex_hex6 = /^\#([0-9a-fA-F]{6})$/g;
    const regex_rgb = /^rgb\(((\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\,){2}(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\)$/g;
    const regex_name = /^[a-zA-Z]{3,20}$/g;
    const regex_arr = [];
    let success = 0;
      

    if(colorsList?.length >= 1){
        colorsList?.map( (colorItem, ndx) => {
            // const test_hex3 = regex_hex3.test(colorItem);
            // const test_hex6 = regex_hex6.test(colorItem);
            // const test_rgb = regex_rgb.test(colorItem);
            // const test_name = regex_name.test(colorItem);
            
            const colorItemVar = colorItem;
            const test_hex3 = colorItemVar.match(regex_hex3);
            const test_hex6 = colorItemVar.match(regex_hex6);
            const test_rgb = colorItemVar.match(regex_rgb);
            const test_name = colorItemVar.match(regex_name);
            
            // regex_arr.push(test_hex3, test_hex6, test_rgb, test_name);
            if(test_hex3 || test_hex6 || test_rgb || test_name){
                regex_arr.push(true);
            }

        })
    }
    
    success += regex_arr.filter(item => item == true).length;
      
    return success == colorsList?.length
  }

  
  const imagesIsValidate = (imagesList) => {
    // const regex = /^(https?:\/\/|www\.)[a-zA-Z0-9@:%\._\+~#=-]){2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g;
    const regex = /^(https?:\/\/|www\.)(?!.*\1)([a-zA-Z0-9@:%\._\+~#=-]){2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g;
    // need update regex to not allow "www." after first correct one
    const regex_arr = [];
          
    imagesList?.length && imagesList?.map( imageItem => {
        const imageItemVar = imageItem.trim();
        // const regexRes = regex.test(imageItemVar);
        const regexRes = imageItemVar.match(regex);

        // www. condition to check if www. repeated or not , -1 where not || 0 where start || 7 where http || 8 where https
        // http:// condition to check if http:// repeated or not , -1 where not || 0 where start and https:// -1(not found)
        // https:// condition to check if https:// repeated or not , -1 where not || 0 where start and http:// -1(not found)
        if(regexRes && (imageItemVar.indexOf('www.') == imageItemVar.lastIndexOf('www.')) &&
           (imageItemVar.indexOf('www.') == -1 || imageItemVar.indexOf('www.') == 0 || imageItemVar.indexOf('www.') == 7 || imageItemVar.indexOf('www.') == 8) &&
           ((imageItemVar.indexOf('http://') == imageItemVar.lastIndexOf('http://')) && 
           (imageItemVar.indexOf('http://') == -1 || (imageItemVar.indexOf('http://') == 0 && imageItemVar.indexOf('https://') == -1))) &&
           ((imageItemVar.indexOf('https://') == imageItemVar.lastIndexOf('https://')) && 
           (imageItemVar.indexOf('https://') == -1 || (imageItemVar.indexOf('https://') == 0 && imageItemVar.indexOf('http://') == -1)))           
        ){
            regex_arr.push(true)
        }
    })

    let success = 0;
    success += regex_arr.filter(item => item == true).length;

    return success == imagesList?.length
  }


  return (
    <>
        <Modal.Header closeButton>
            <Modal.Title id={modalId} className='!text-xl text-asd_black uppercase font-semibold'>
                {formType === 'add' ? 'Add' : 'Edit'} Product
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className='addEditModalBody'>
            <Form onSubmit={(e) => handleSubmitAddEditForm(e, formType, colorsIsValidate, imagesIsValidate)}>
                {
                    formInputNames.map((inputName, inputIndex) => {
                        return(
                            
                            formInputTypes[inputIndex] === 'text' ? <Form.Group className="mb-3" key={inputIndex}>
                            <Form.Label className={customLabelStyle}>{inputName}</Form.Label>
                            <Form.Control
                                className={customInputStyle}
                                type={formInputTypes[inputIndex]}
                                placeholder={formInputPlaceholders[inputIndex]}
                                required={formInputRequired[inputIndex]}
                                onChange={(e) => handleChangeAddEditForm(e.target)}
                                name={inputName}
                                value={
                                    inputName === 'title' ? formValues?.[inputName] : formValues?.[inputName].join('-')
                                }
                                isInvalid={((formValues?.title?.length < 4 || formValues?.title?.length > 35) && inputName === 'title') || 
                                    (!colorsIsValidate(formValues?.colors) && inputName === 'colors')}
                            />
                            {
                                (((formValues?.title?.length < 4 || formValues?.title?.length > 35) && inputName === 'title') || 
                                (!colorsIsValidate(formValues?.colors) && inputName === 'colors'))?
                                <Form.Control.Feedback type='invalid'>{
                                    inputName === 'title' ? 'product title must between 4 : 35 chars' : 'product colors not correct, remove spaces & follow colors format'
                                }</Form.Control.Feedback> : null
                            }
                            </Form.Group>                            
                            : formInputTypes[inputIndex] === 'textarea' ? <Form.Group className="mb-3" key={inputIndex}>
                                <Form.Label className={customLabelStyle}>{inputName}</Form.Label>
                            <Form.Control
                                className={customInputStyle}
                                as={formInputTypes[inputIndex]}
                                rows={3}
                                placeholder={formInputPlaceholders[inputIndex]}
                                required={formInputRequired[inputIndex]}
                                onChange={(e) => handleChangeAddEditForm(e.target)}
                                name={inputName}
                                value={formValues?.[inputName]}
                                isInvalid={((formValues?.[inputName]?.length < 4 || formValues?.[inputName]?.length > 300) && inputName === 'desc') || 
                                    (!imagesIsValidate(formValues?.images) && inputName === 'images')}
                            />
                            {
                                (((formValues?.[inputName]?.length < 4 || formValues?.[inputName]?.length > 300) && inputName === 'desc') || 
                                (!imagesIsValidate(formValues?.images) && inputName === 'images')) ?
                                <Form.Control.Feedback type='invalid'>{
                                    inputName === 'desc' ? 'product description must between 4 : 300 chars' : 'product images not correct'
                                }</Form.Control.Feedback> : null
                            }
                            </Form.Group>
                            : inputIndex === 2 ? <Row className='priceRow' key={inputIndex}>{
                                inputName.map((inputNameNested, inputIndexNested) => {
                                    return <Col key={inputIndexNested}>
                                    <Form.Group className="mb-3" key={inputIndexNested}>
                                    <Form.Label className={customLabelStyle}>{inputNameNested}</Form.Label>
                                        <Form.Control
                                            className={customInputStyle}
                                            type={formInputTypes[inputIndex][inputIndexNested]}
                                            placeholder={formInputPlaceholders[inputIndex][inputIndexNested]}
                                            required={formInputRequired[inputIndex][inputIndexNested]}
                                            onChange={(e) => handleChangeAddEditForm(e.target)}
                                            name={inputNameNested}
                                            value={parseInt(formValues?.[inputNameNested])}
                                            isInvalid={
                                                (parseInt(formValues?.[inputNameNested]) < 1 && parseInt(formValues?.[inputNameNested]) != NaN && inputNameNested == 'price') ||
                                                (parseInt(formValues?.[inputNameNested]) < 1 && parseInt(formValues?.[inputNameNested]) != NaN && formValues?.[inputNameNested].length != 0 && inputNameNested == 'PriceBeforeDescount')
                                            }
                                        />
                                        {
                                            ((parseInt(formValues?.[inputNameNested]) < 1 && parseInt(formValues?.[inputNameNested]) != NaN && inputNameNested == 'price') ||
                                            (parseInt(formValues?.[inputNameNested]) < 1 && parseInt(formValues?.[inputNameNested]) != NaN && formValues?.[inputNameNested].length != 0 && inputNameNested == 'PriceBeforeDescount')) ?
                                            <Form.Control.Feedback type='invalid'>
                                                product {inputNameNested} must be positive
                                            </Form.Control.Feedback> : null

                                        }
                                    </Form.Group>
                                    </Col>                                
                                })
                            }
                            </Row>
                            : inputIndex === 5 ? 
                            <div className="mb-3" key={inputIndex}>
                            <Form.Label className={customLabelStyle}>Sizes</Form.Label>
                            <div className='sizeRow flex justify-start gap-3 flex-wrap'>
                                {inputName.map((inputNameNested, inputIndexNested) => {
                                    return <Form.Group className="sizeRowItem flex items-center gap-2 mb-3 max-w-[22.5%]" key={inputIndexNested}>
                                    <Form.Label className={`${customLabelStyle} !mb-0`}>{inputNameNested}</Form.Label>
                                    <Form.Control
                                        className={customInputStyle}
                                        type={formInputTypes[inputIndex][inputIndexNested]}
                                        placeholder={formInputPlaceholders[inputIndex][inputIndexNested]}
                                        onChange={(e) => handleChangeAddEditForm(e.target)}
                                        name={inputNameNested}
                                        value={ formValues?.sizes?.[inputNameNested] === 'deleted' ? '' :formValues?.sizes?.[inputNameNested] }
                                        isInvalid={(parseInt(formValues?.sizes?.[inputNameNested]) < 1 && parseInt(formValues?.sizes?.[inputNameNested]) != NaN && formValues?.sizes?.[inputNameNested].length != 0)}
                                    />
                                    </Form.Group>
                                })       
                                }
                            {
                                (parseInt(formValues?.sizes?.['sm']) < 1 || parseInt(formValues?.sizes?.['md']) < 1 || parseInt(formValues?.sizes?.['lg']) < 1 || parseInt(formValues?.sizes?.['xl']) < 1) ?
                                <Form.Control.Feedback type='invalid' className='w-full !block !-mt-2'>
                                    product sizes must be positive or empty
                                </Form.Control.Feedback> : null
                            }
                            </div>
                            </div>
                            : formInputTypes[inputIndex] === 'radio' ? <Form.Group className={`AddItemModal__${inputName} flex items-center flex-col mb-2`}>
                                <Form.Label className={`${customLabelStyle} w-full`}> {formInputPlaceholders[inputIndex]} </Form.Label>
                                <div className='radioRow px-16 w-full flex justify-start gap-2'>
                                {
                                    (inputIndex === 6 ? ['shirt', 'pant', 'shoes'] : ['men', 'female', 'twinz']).map((radioName, radioIndex) => {
                                        return <div className='radioRowItem !m-0 !p-0 flex items-center !flex-row gap-2' key={radioIndex}>
                                            <Form.Check name={inputName} type='radio' id={`radio${inputIndex}${radioIndex+1}`} className='w-auto h-auto rounded-[50%]' value={radioName} 
                                             checked={formValues?.[inputName] == radioName} required onChange={ (e) => handelCheckAddEditForm(e.target) } />
                                            <Form.Label htmlFor={`radio${inputIndex}${radioIndex+1}`} className='!text-sm !mb-0 mr-12'> {radioName} </Form.Label>
                                        </div>
                                    })
                                }
                                </div>
                            </Form.Group>        
                            : <></>                        
                        )
                    })
                }
                <Modal.Footer>
                <ButtonGroup aria-label="sort form buttons" style={{gap: "10px", width: "100%"}}>
                    <Button variant="primary" type="submit" className={customSubmitStyle}>
                        {formType === 'add' ? 'Add' : 'Edit'}
                    </Button>
                    <Button variant="secondary" type="reset" className={customCancelStyle} onClick={() => handleCloseAddEditForm(setShowForm)}>
                        Cancel
                    </Button>
                </ButtonGroup>
                </Modal.Footer>
            </Form>
        </Modal.Body>
    </>
  )
}


const DeleteDashboardModalChildren = (setShowForm, setPage, modalId, productName, docId) => {    

  const handleClose = () => {
    setShowForm(false);
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();    
    handleDelete(setPage, docId)
    handleClose();
  };

  return (
    <>
        <Modal.Header closeButton>
        <Modal.Title id={modalId} className='!text-xl text-asd_black uppercase font-semibold'>
            Delete Product
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p className='!text-base !text-asd_black !font-normal'>
            Are you sure that, you want to delete product - {productName}
        </p>
        </Modal.Body>
        <Modal.Footer>
        <ButtonGroup aria-label="sort form buttons" style={{gap: "10px", width: "100%"}}>
            <Button variant="primary" type="button" className={`${customSubmitStyle} !bg-red-500`} onClick={handleSubmit}>
                Delete
            </Button>
            <Button variant="secondary" type="button" className={`${customCancelStyle} !text-red-500`} onClick={handleClose}>
                Cancel
            </Button>
        </ButtonGroup>

        </Modal.Footer>
    </>
  )
}


const DetailsDashboardModalChildren = (setShowForm, modalId, detailsValues) => {    

  const handleClose = () => {
    setShowForm(false);
  }
  
  return (
    <>
        <Modal.Header closeButton>
        <Modal.Title id={modalId} className='!text-xl text-asd_black uppercase font-semibold'>
            Product Details
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container id="detailsContainer" className={'beforeNav'}>
            <Row id="Test_Product_view__row1" className={'justify-content-center'}>
                
                <Col lg={5} md={6} sm={11} xs={11}>
                    <Carousel className={'detailsCarousel d-none d-md-block'}> {
                        detailsValues?.images?.map( (image, index) => 
                            <Carousel.Item key={index} className='!h-[27rem]'>
                                <img src={`${image}`}  alt="img#0" className='!h-full !w-full !rounded-lg'/> 
                            </Carousel.Item>
                        )}                                
                    </Carousel>
                </Col>

                <Col lg={7} md={6} sm={11} xs={11}>
                    <h2 className='!text-3xl !text-asd_black !font-normal'>{detailsValues?.name}</h2>
                    
                    <p className='!text-base !text-asd_black !font-normal'>{detailsValues?.desc}</p>
                    
                    <Carousel className={'detailsCarousel d-md-none d-lg-none d-xl-none !mb-3'}> {
                        detailsValues?.images?.map( (image, index) => 
                            <Carousel.Item key={index} className='!h-[27rem]'>
                                <img src={`${image}`}  alt="img#0" className='!h-full !w-full !rounded-lg'/> 
                            </Carousel.Item>
                        )}                                
                    </Carousel>
                    
                    <p className={'!text-2xl !text-asd_black !font-medium !mb-0'}>EGP{detailsValues?.price}</p>
                    
                    { (detailsValues?.PriceBeforeDescount) && <p className={'!text-2xl !line-through text-muted !font-normal'}>EGP{detailsValues.PriceBeforeDescount}</p> }
                    
                    {/* { szl(detailsValues.sizes) }  */}

                    {/* <Product_view_listGroup preload={["Size", ...szar]} cTg={[`h5`, 0]} sizesCount={[...szarCount]} /> */}
                    <div className='detailsSizes !flex !items-center !gap-3 !mb-2'>
                        <p className='!text-base !text-asd_black !w-12 !m-0 !font-normal'>Sizes</p>
                    <ListGroup horizontal className='!m-0 !p-0 !gap-3'>
                        {
                            detailsValues?.sizesFound?.split('_')?.map((sizeItem, sizeIndex) => {
                                return(
                                    <ListGroupItem key={sizeIndex} className='!flex !flex-col !items-center !border-0 !w-7 !p-0'>
                                        <span className='!text-base !text-asd_black !font-normal'>{sizeItem}</span>
                                        <span className='!text-base !text-asd_black !font-semibold'>{detailsValues?.sizes?.[sizeItem]}</span>
                                    </ListGroupItem>
                                )
                            })
                        }
                    </ListGroup>
                    </div>
                    
                    {/* <p className={'Product_view_sizeStock'} style={{display: 'none'}}> <span></span> in stock </p> */}
                    
                    {/* <span className={'d-none ProductId'}> {item.id} </span> */}
                    
                    {/* <Product_view_listGroup preload={["Color", ...item.colors]} cTg={[`h5`, 0]}/> */}
                    <div className='detailsColors !flex !items-center !gap-3'>
                        <p className='!text-base !text-asd_black !w-12 !m-0 !font-normal'>Colors</p>
                        <FilledSpanGroup colors={detailsValues?.colors} direction={'row'} gap={"12px"} spanWidth={'28px'} spanHeight={'28px'} spanRadius={'8px'} />
                    </div>
                </Col>
            </Row>
        </Container>
        </Modal.Body>
        <Modal.Footer>
        <ButtonGroup aria-label="sort form buttons" className='!gap-[10px] !w-full'>
            <Button variant="secondary" type="button" className={customCancelStyle} onClick={handleClose}>
                Close
            </Button>
        </ButtonGroup>

        </Modal.Footer>
    </>
  )
}


export default {SortOverlayModalChildren, FilterOverlayModalChildren, AddEditDashboardModalChildren, DeleteDashboardModalChildren, DetailsDashboardModalChildren}