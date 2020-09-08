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
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Agency;
