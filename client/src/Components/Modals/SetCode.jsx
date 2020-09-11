import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function SetCode() {
    const [show, setShow] = React.useState(false);
    const styles = {background:"transparent",bottom:"0",height:"100vh"}
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
        <>
            <Button variant="info" onClick={handleShow}> Set Code</Button>
            <Modal show={show} onHide={handleClose} centered style={styles}>
                <Modal.Header closeButton>
                    <Modal.Title>Set Code</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col lg="12" style={{ display: "flex",justifyContent: "center",alignItems: "center"}}>
                            <ul>
                                <li style={{display:"flex"}}>
                                    <i class="material-icons">check_box_outline_blank</i>{'  '}
                                    <p>10 - Purchase error</p>
                                </li>
                                <li style={{display:"flex"}}>
                                    <i class="material-icons">check_box_outline_blank</i>{'  '}
                                    <p>10 - Purchase error</p>
                                </li>
                                <li style={{display:"flex"}}>
                                    <i class="material-icons">check_box_outline_blank</i>{'  '}
                                    <p>10 - Purchase error</p>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default SetCode 