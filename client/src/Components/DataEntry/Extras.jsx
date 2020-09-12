import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'




class Extras extends Component {
    render() {
        return (
            <Container>
                <Form>
                    <Row>
                        <Col lg="1"></Col>
                        <Col lg="3">
                            <h4 style={{float:"left"}}>Buisiness Partner</h4>
                        </Col>
                        <Col lg="4">
                            <Form.Group controlId="exampleForm.ControlInput1" style={{border:"0 0 1 0"}}>
                                <Form.Control type="text" placeholder="Buisiness partner name *" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                    <Col lg="1"></Col>
                        <Col lg="3">
                            <h4 style={{float:"left"}}>Header</h4>
                        </Col>
                        <Col lg="4">
                            <Form.Group controlId="exampleForm.ControlInput1" style={{border:"0 0 1 0"}}>
                                <Form.Control type="text" placeholder="Header text" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="1"></Col>
                        <Col lg="3">
                            <h4 style={{float:"left"}}>Footer</h4>
                        </Col>
                        <Col lg="4">
                            <Form.Group controlId="exampleForm.ControlInput1" style={{border:"0 0 1 0"}}>
                                <Form.Control type="text" placeholder="Footer text" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="1"></Col>
                        <Col lg="2">
                            <h4 style={{float:"left"}}>Segment</h4>
                        </Col>
                        <Col lg="2">
                            <p>SEG 1</p>
                        </Col>
                        <Col lg="4">
                            <Form.Group controlId="exampleForm.ControlInput1" style={{border:"0 0 1 0"}}>
                                <Form.Control type="text" placeholder="Segment text" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="3"></Col>
                        <Col lg="2">
                            <p>SEG 1</p>
                        </Col>
                        <Col lg="4">
                            <Form.Group controlId="exampleForm.ControlInput1" style={{border:"0 0 1 0"}}>
                                <Form.Control type="text" placeholder="Segment text" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 2, offset: 10 }}>
                            <Button variant="success" onClick={() => { this.props.handlestatus(true)}}>Save</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        )
    }
}

export default Extras;
