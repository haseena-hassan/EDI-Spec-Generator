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




class Element extends Component {
    constructor(props){
        super(props)
        this.state = {
            agency : this.props.agency,
            version : this.props.version,
            segments : this.props.segments, 

            currSegment : '',
            currElements : [],
            elements : {},

            offset: 0,
            perPage: 5,
            currentPage: 0,
            currElemLen : 0
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

    // addElement(elem){ 
    //     const element = [...this.state.element] 
    //     element.push(elem) 
    //     this.setState({ element }) 
    //     console.log(element)
    // } 

    handleSelection = (eleID) => { 
        const data = this.props.data
        const ind = data.findIndex(el => (el.Position == eleID))
        const item = data[ind]
        const currElements = [...this.state.currElements]
        if(currElements.includes(item)){
            currElements.splice(elements.indexOf(item), 1)
        } else{
            elements.push(item) 
        }
        this.setState({ elements }) 
        console.log(elements)
    }

    recieveData = (agency, version, segId) => {
        axios.post('/api/elementUsageDefs/get', {
            agency : agency,
            version : version,
            segmentId : segId
        })
        .then((res) => {
            const elements = {...this.state.elements}
            elements[segId] = res.data.data
            this.setState({
                currSegment : segId,
                currElemLen : res.data.data.length,
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
        const data = this.props.segments
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)

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
                <Col lg={{span : 6, offset : 2}}>
                    <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={Math.ceil(this.props.segments.length / this.state.perPage)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}/>
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
                                    {this.props.segments.map(segment =>
                                        <Nav.Item>
                                            <Nav.Link eventKey={segment.SegmentID}
                                                onClick={()=> this.recieveData(this.props.agency, this.props.version, segment.SegmentID)}>{segment.SegmentID}</Nav.Link>
                                        </Nav.Item>
                                    )}
                                </Nav>
                            </Col>
                            <Col sm={10}>
                                <Tab.Content>
                                    {this.props.segments.map(segment => 
                                        <Tab.Pane eventKey={segment.SegmentID}>
                                            <Table bordered  hover>
                                                <thead>
                                                    <tr>
                                                    <th>Position</th>
                                                    <th>ElementID</th>
                                                    <th>Description</th>
                                                    <th>Req.</th>
                                                    <th>Group</th>
                                                    <th>Code</th>
                                                    <th>Select</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{cursor:"pointer"}}>
                                                    {slice.map(item => 
                                                        <tr>
                                                            <td>{item.Position}</td>
                                                            <td>{item.ElementID}</td>
                                                            <td>{item.Description}</td>
                                                            <td>{item.RequirementDesignator}</td>
                                                            <td>{item.GroupRequirementDesignatorID}</td>
                                                            <td>{(item.Code) ? 
                                                                <><SetCode/>{' '}<CustomCode/></> : '-' }
                                                            </td>
                                                            <td>
                                                                <input className="styled-checkbox" value={item}   
                                                                type="checkbox" id={item.ElementID} 
                                                                onClick={()=>this.handleSelection(item.ElementID)}
                                                                checked={this.state.elements.includes(item)} />
                                                                <label for={item.ElementID}></label>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </Table>
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
        </Container> )
    }
}

export default Element;
