import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Pagination from 'react-bootstrap/Pagination'
import Table from 'react-bootstrap/Table'



class Version extends Component {
    constructor(props){
        super(props)
        this.state = {
            version : ''
        }
    }

    render() {
        const list = [
            {
                id: "007020",
                desc: "ASC X12  VERSION 7 RELEASE 2 SUBRELEASE 0"
            },
            {
                id: "D  14B",
                desc: "EDIFACT DIRECTORY D.14B - OCTOBER 2015"
            },
            {
                id: "D  13B",
                desc: "EDIFACT DIRECTORY D.13B - NOVEMBER 2014"
            }
        ]
        const lis = this.props.data
        console.log(lis)

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
                                <th>Version</th>
                                <th>Description</th>
                                </tr>
                            </thead>
                            <tbody style={{cursor:"pointer"}}>
                                {lis.map(item => {
                                    return(
                                        <tr onClick={() => {
                                            this.setState({version: item})
                                            console.log(item)
                                            this.props.handlestatus(true, item.Version)
                                        }}>
                                        <td>{item.Version}</td>
                                        <td>{item.Description}</td>
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

export default Version;
