import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Pagination from 'react-bootstrap/Pagination'
import Table from 'react-bootstrap/Table'
import ReactPaginate from 'react-paginate'


class Transaction extends Component {
    constructor(props){
        super(props)
        this.state = {
            transaction : '',
            offset: 0,
            perPage: 10,
            currentPage: 0
        }
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset
        });
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
                        <Table bordered  hover>
                            <thead>
                                <tr>
                                <th>Transaction Set</th>
                                <th>Description</th>
                                </tr>
                            </thead>
                            <tbody style={{cursor:"pointer"}}>
                                {slice.map(item => 
                                    <tr onClick={() => {
                                        this.setState({transaction: item})
                                        console.log(item)
                                        this.props.handlestatus(true, item)
                                    }}>
                                    <td>{item.TransactionSet}</td>
                                    <td>{item.Description}</td>
                                    </tr> )
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Transaction;
