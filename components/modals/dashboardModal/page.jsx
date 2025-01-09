import React, { Children } from 'react'
import { Button, Modal } from 'react-bootstrap'

const DashboardModal = ({show, onHide, modalId, className, customStyle, children}) => {
  return (    
    <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby={modalId}
        centered        
        style={customStyle||{}}
        className={className}
    >
        {children}
    </Modal>
  )
}

export default DashboardModal