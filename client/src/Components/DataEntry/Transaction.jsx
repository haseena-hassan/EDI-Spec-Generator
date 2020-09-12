import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Pagination from 'react-bootstrap/Pagination'
import Table from 'react-bootstrap/Table'



class Transaction extends Component {
    constructor(props){
        super(props)
        this.state = {
            transaction : ''
        }
    }


    render() {
        const list = [
            {
                tset: "BALANC",
                desc: "BALANCE MESSAGE"
            },
            {
                tset: "BANSTA",
                desc: "BANKING STATUS MESSAGE"
            },
            {
                tset: "AUTHOR",
                desc: "AUTHORIZATION MESSAGE"
            }
        ]

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
                                {list.map(item => {
                                    return(
                                        <tr onClick={() => {
                                            this.setState({transaction: item})
                                            this.props.handlestatus(true)
                                        }}>
                                        <td>{item.tset}</td>
                                        <td>{item.desc}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Transaction;
