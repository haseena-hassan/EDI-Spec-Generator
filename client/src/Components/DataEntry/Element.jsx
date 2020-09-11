import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Pagination from 'react-bootstrap/Pagination'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import SetCode from '../Modals/SetCode'
import CustomCode from '../Modals/CustomCode'


class TableView extends Component {
    render() {
        return (
            <Table bordered  hover>
                <thead>
                    <tr>
                    <th>Position</th>
                    <th>ElementID</th>
                    <th>Description</th>
                    <th>Req.</th>
                    <th>Group</th>
                    <th>Code</th>
                    <th style={{display:"flex"}}>
                        <i class="material-icons">check_box_outline_blank</i>{'  '}
                        <p>All</p>
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>M</td>
                    <td>Otto</td>
                    <td>
                        <SetCode />{'     '}<CustomCode />
                    </td>
                    <th><i class="material-icons">check_box_outline_blank</i></th>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>M</td>
                    <td>Otto</td>
                    <td></td>
                    <th><i class="material-icons">check_box_outline_blank</i></th>
                    </tr>
                    <tr>
                    <td>3</td>
                    <td>Larry the Bird</td>
                    <td>@twitter</td>
                    <td>O</td>
                    <td>Otto</td>
                    <td>
                        <SetCode />{'     '}<CustomCode />
                    </td>
                    <th><i class="material-icons">check_box_outline_blank</i></th>
                    </tr>
                </tbody>
            </Table>
        )
    }
}

class Element extends Component {
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
                    <Col lg="4">
                        <h5>Choose elements for each segments :</h5>
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <Row>
                                <Col lg="2">
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                    <Nav.Link eventKey="first">SEG 1</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                    <Nav.Link eventKey="second">SEG 2</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                </Col>
                                <Col sm={10}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="first">
                                            <TableView />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="second">
                                            <TableView />
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Element;
