import Pagination from 'react-bootstrap/Pagination';
import './customPagination.css'

const CustomPagination = ({count, size, page, handleChange}) => {    
    return(
        <Pagination size={size || "lg"} className='customPagination'>{
            Array.apply(null, Array(count)).map((item, index) => {
                return(
                    <Pagination.Item key={index} 
                        active={index == page} 
                        // className='p-5'                        
                        onClick={() => handleChange(index)}
                    >
                    {index+1}
                  </Pagination.Item>              
                )
            })
        }</Pagination>
    )
};

export default CustomPagination;