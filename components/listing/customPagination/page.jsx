'use client'
import Pagination from 'react-bootstrap/Pagination';
import './styles.css'
import { useEffect, useState } from 'react';

const CustomPagination = ({count, size, page, handleChange}) => {  
    const [windowListener, setWindowListener] = useState(false);
    
    useEffect(() => {
        if( typeof window !== 'undefined' ){ setWindowListener(true); }
    }, [windowListener])  
  
    return(
        <>{
            windowListener ? <Pagination size={size || "lg"} className='customPagination'>{
                Array.apply(null, Array(count)).map((item, index) => {
                    return(
                        <Pagination.Item key={index} 
                            active={index == page} 
                            onClick={() => handleChange(index)}
                        >
                        {index+1}
                      </Pagination.Item>              
                    )
                })
            }</Pagination> : <></>
        }</>
    )
};

export default CustomPagination;