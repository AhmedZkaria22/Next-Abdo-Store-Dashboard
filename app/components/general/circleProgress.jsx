import React from 'react'
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar'

const CircleProgress = ({color, percentage, text}) => {
    return (      
        <CircularProgressbarWithChildren
            value={percentage}
            classes={{root: 'circularProgressbar w-[50px] h-[50px]'}}
            styles={buildStyles({                                  
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'          
            strokeLinecap: 'butt',                                      
            
            // Colors
            pathColor: color,
            textColor: '#283c50',
            trailColor: '#e9ecef'
            })}
        >
        {
            text 
            ? <span className='flex items-center justify-center p-0 w-[50px] h-[50px] !mr-3 !ml-auto text-sm font-semibold text-asd_black capitalize'>{text}</span> 
            : <></>
        }
        </CircularProgressbarWithChildren>
    )
}

export default CircleProgress