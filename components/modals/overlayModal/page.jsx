import React from 'react'
import { Overlay } from 'react-bootstrap'

const OverlayModal = ({target, show, onHide, children, placement}) => {
  const OverlayModalStyle = {
    position: 'absolute',
    backgroundColor: 'white',
    padding: '0px',
    borderRadius: 3,
    marginTop: "12px",
    zIndex: 9
  }
  return (
    <>
      <Overlay target={target.current} show={show} rootClose={true} rootCloseEvent='click' onHide={onHide} placement={placement || "bottom-start"}>
        {({
          placement: _placement,
          arrowProps: _arrowProps,
          show: _show,
          popper: _popper,
          hasDoneInitialMeasure: _hasDoneInitialMeasure,
          ...props
        }) => (
          <div
            {...props}
            style={{
              ...OverlayModalStyle,
              ...props.style,
            }}
          >
            {
              children
            }
          </div>
        )}
      </Overlay>
    </>
  )
}

export default OverlayModal