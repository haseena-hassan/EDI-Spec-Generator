import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ReactPaginate from 'react-paginate'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import './style.css'


class Segment extends Component {
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
        const offset = selectedPage * this.state.perPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset
        })
    }

    handleSelection = (pos) => { 
        const data = this.props.data
        const ind = data.findIndex(el => (el.Position == pos))
        const item = data[ind]
        const segment = [...this.state.segment]
        if(segment.includes(item)){
            segment.splice(segment.indexOf(item), 1)
        } else{
            segment.push(item) 
        }
        this.setState({ segment }) 
        console.log(segment)
    } 

    render() {
        const data = this.props.data
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
                            pageCount={Math.ceil(data.length / this.state.perPage)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}/>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col lg="10">
                        <Table bordered >
                            <thead>
                                <tr>
                                <th>Position</th>
                                <th>Segment ID</th>
                                <th>Section</th>
                                <th>Requirement</th>
                                <th>Select</th>
                                {/* <th style={{display:"flex"}}>
                                    <i class="material-icons">check_box_outline_blank</i>{'  '}
                                    <p>All</p>
                                </th> */}
                                </tr>
                            </thead>
                            <tbody style={{cursor:"pointer"}}>
                                {slice.map(item => 
                                    <tr>
                                        <td>{item.Position}</td>
                                        <td>{item.SegmentID}</td>
                                        <td>{item.Section}</td>
                                        <td>{item.RequirementDesignator}</td>
                                        <td>
                                            <input className="styled-checkbox" type="checkbox" id={item.Position} 
                                                value={item} onClick={() =>  this.handleSelection(item.Position)}
                                                checked={this.state.segment.includes(item)} />
                                            <label for={item.Position}></label>
                                        </td>
                                    {/* <td><i class="material-icons">check_box_outline_blank</i></td>  */}
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 2, offset: 10 }}>
                        <Button variant="success" 
                            onClick={() => { this.props.handlestatus(true, this.state.segment)}}
                        >Save</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Segment;
