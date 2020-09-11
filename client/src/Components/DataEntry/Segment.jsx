import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Pagination from 'react-bootstrap/Pagination'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'



class Segment extends Component {
    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col lg="3">
                        <Form>
                            <Form.Group controlId="exampleForm.ControlInput1" style={{border:"0 0 1 0"}}>
                                <Form.Control type="text" placeholder="Search" />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col lg="8">
                        <Pagination  style={{float:"right"}}>
                            <Pagination.First />
                            <Pagination.Prev />
                            <Pagination.Item>{1}</Pagination.Item>
                            <Pagination.Item>{2}</Pagination.Item>
                            <Pagination.Item>{3}</Pagination.Item>
                            <Pagination.Item>{4}</Pagination.Item>
                            <Pagination.Next />
                            <Pagination.Last />
                        </Pagination>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table bordered  hover>
                            <thead>
                                <tr>
                                <th>Position</th>
                                <th>Segment ID</th>
                                <th>Section</th>
                                <th>Requirement</th>
                                <th style={{display:"flex"}}>
                                    <i class="material-icons">check_box_outline_blank</i>{'  '}
                                    <p>All</p>
                                </th>
                                </tr>
                            </thead>
                            <tbody style={{cursor:"pointer"}}>
                                <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>Otto</td>
                                <td><i class="material-icons">check_box_outline_blank</i></td>
                                </tr>
                                <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>Otto</td>
                                <td><i class="material-icons">check_box_outline_blank</i></td>
                                </tr>
                                <tr>
                                <td>3</td>
                                <td>Larry the Bird</td>
                                <td>@twitter</td>
                                <td>Otto</td>
                                <td><i class="material-icons">check_box_outline_blank</i></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 2, offset: 10 }}>
                        <Button variant="success">Save</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Segment;
