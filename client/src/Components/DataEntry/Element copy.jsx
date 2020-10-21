import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ReactPaginate from 'react-paginate'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import SetCode from '../Modals/SetCode'
import CustomCode from '../Modals/CustomCode'
import axios from 'axios'


class Pagination extends Component {
    constructor(props){
        super(props)
        this.state = {
            segment : [],
            offset: 0,
            perPage: 5,
            currentPage: 0
        }
        this.handlePageClick = this.handlePageClick.bind(this)
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage
        this.setState({
            currentPage: selectedPage,
            offset: offset
        })
        this.props.handleOffset(offset)
    }
    render()  {
        const len = this.props.data.length
        return (
            <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={Math.ceil(len / this.state.perPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}/>
        )
    }
}

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
        const data = this.props.elements

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
                    {/* <th style={{display:"flex"}}>
                        <i class="material-icons">check_box_outline_blank</i>{'  '}
                        <p>All</p>
                    </th> */}
                    <th>Select</th>
                    </tr>
                </thead>
                <tbody style={{cursor:"pointer"}}>
{/* Agency: "E"
CodeParts: "0"
CompositeElement: "0"
Description: "DOCUMENT NAME CODE"
ElementID: "1001"
GroupBeginEnd: "G"
GroupReqDesignator: "C"
GroupRequirementDesignatorID: "C002"
MaximumLength: "3"
MinimumLength: "1"
Position: "1"
Release: "0"
"RepeatFactor ": "1"
RequirementDesignator: "C"
Rules: ""
SegmentID: "BGM"
SubElementReqDesignator: "C"
Type: "ID"
Version: "D  14A"*/}
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
    constructor(props){
        super(props)
        this.state = {
            elements : [],
            offset: 0,
            perPage: 5,
            currentPage: 0,
            currElemLen : 0
        }
    }

    recieveData = (segId, agency, version) => {
        axios.post('/api/elementUsageDefs/get', {
            agency : agency,
            version : version,
            segmentId : segId
        })
        .then((res) => {
            const elements = {...this.state.elements}
            elements[segId] = res.data.data
            this.setState({
                currElemLen : res.data.data.length(),
                elements
            })
            console.log(segId)
            console.log(res.data.data)
            console.log(elements)
        }, (error) => {
            console.log(error)
        }) 
    }

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
                        {/* <Pagination  style={{float:"right"}}>
                            <Pagination.First />
                            <Pagination.Prev />
                            <Pagination.Item>{1}</Pagination.Item>
                            <Pagination.Item>{2}</Pagination.Item>
                            <Pagination.Item>{3}</Pagination.Item>
                            <Pagination.Item>{4}</Pagination.Item>
                            <Pagination.Next />
                            <Pagination.Last />
                        </Pagination> */}
                    </Col>
                </Row>
                <Row>
                    <Col lg="4">
                        <h5>Choose elements for each segments : </h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <Row>
                                <Col lg="2">
                                    <Nav variant="pills" className="flex-column">
                                        {this.props.segments.map(segment => {
                                            return (<Nav.Item>
                                                <Nav.Link eventKey={segment.SegmentID}
                                                    onClick={()=> this.recieveData(segment.SegmentID, this.props.agency, this.props.version)}>{segment.SegmentID}</Nav.Link>
                                            </Nav.Item>)
                                        })}
                                    </Nav>
                                </Col>
                                <Col sm={10}>
                                    <Tab.Content>
                                        {this.props.segments.map(segment => 
                                            <Tab.Pane eventKey={segment.SegmentID}>
                                                <TableView elements={this.state.elements[segment.SegmentID]}/>
                                            </Tab.Pane>
                                        )}
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
