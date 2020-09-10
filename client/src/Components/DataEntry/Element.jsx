import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Pagination from 'react-bootstrap/Pagination'
import Table from 'react-bootstrap/Table'



class Version extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col lg="3">
                        <Form>
                            <Form.Group controlId="exampleForm.ControlInput1" style={{border:"0 0 1 0"}}>
                                <Form.Control type="text" placeholder="Search" />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col lg="9">
                        <Pagination  style={{float:"right"}}>
                            <Pagination.First />
                            <Pagination.Prev />
                            <Pagination.Item>{1}</Pagination.Item>
                            <Pagination.Ellipsis />

                            <Pagination.Item>{10}</Pagination.Item>
                            <Pagination.Item>{11}</Pagination.Item>
                            <Pagination.Item>{12}</Pagination.Item>
                            <Pagination.Item>{13}</Pagination.Item>
                            <Pagination.Item>{14}</Pagination.Item>

                            <Pagination.Ellipsis />
                            <Pagination.Item>{20}</Pagination.Item>
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
                                <th>#</th>
                                <th>Version</th>
                                <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                </tr>
                                <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                </tr>
                                <tr>
                                <td>3</td>
                                <td>Larry the Bird</td>
                                <td>@twitter</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Version;
