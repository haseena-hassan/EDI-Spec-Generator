import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



class Agency extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col lg="4">
                        <Form>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <p>Choose Agency</p>
                                <Form.Control as="select">
                                <option>TradaCom</option>
                                <option>Edifact</option>
                                <option>XCII</option>
                                <option>ANSI</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Text className="text-muted">Agency/Standard</Form.Text>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Agency;
