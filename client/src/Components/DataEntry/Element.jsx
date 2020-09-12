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
    constructor(props){
        super(props)
        this.state = {
            element : []
        }
    }
    addElement(elem){ 
        const element = [...this.state.element] 
        element.push(elem) 
        this.setState({ element }) 
        console.log(element)
    } 


    render() {
        const list = [
            {
                pos: "1",
                elemId: "1073",
                desc: "RESPONSE CODE",
                grp: "H",
                req: "M"
            },
            {
                pos: "2",
                elemId: "006040RAIL",
                desc: "AGENCY QUALIFIER CODE",
                grp: "H",
                req: "M"
            },
            {
                pos: "3",
                elemId: "006040RAIL",
                desc: "FOLLOW-UP ACTION CODE",
                grp: "H",
                req: "M"
            },
            {
                pos: "4",
                elemId: "006040RAIL",
                desc: "REJECT REASON CODE",
                grp: "H",
                req: "M"
            },
        ]

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
                <tbody style={{cursor:"pointer"}}>
                    {list.map(item => {
                        return(
                            <tr onClick={() => {
                                this.addElement(item)
                            }}>
                                <td>{item.pos}</td>
                                <td>{item.elemId}</td>
                                <td>{item.desc}</td>
                                <td>{item.req}</td>
                                <td>{item.grp}</td>
                                <td>{(item.pos=="2"||item.pos=="4") ? '-' : <><SetCode/>{' '}<CustomCode /></>}</td>
                                <td><i class="material-icons">check_box_outline_blank</i></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }
}

class Element extends Component {
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
                <Row>
                    <Col md={{ span: 2, offset: 10 }}>
                        <Button variant="success" onClick={() => { this.props.handlestatus(true)}}>Save</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Element;
