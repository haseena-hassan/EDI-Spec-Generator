import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function PreviewModal(props) {
    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          Preview
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
      </Modal>
    );
  }

  
function Preview(status) {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
        <Button variant="primary" {...status} onClick={() => setModalShow(true)}>Preview</Button>

        <PreviewModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            style={{background:"transparent",bottom:"0",height:"100vh"}}
        />
        </>
    );
}


export default Preview 
