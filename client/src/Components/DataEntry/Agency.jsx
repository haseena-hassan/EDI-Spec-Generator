import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



class Agency extends Component {
    constructor(props){
        super(props)
        this.state = {
            agency : ''
        }
    }

    handleAgenDone = (item) => {
        this.setState({agency : item})
        this.props.handlestatus(true)
        console.log(item)
    }

    render() {
        const list = ["A - Tradacoms","E - Edifact","O - ODETTE","T - TDCC","U - UCS","X - X12"]

        return (
            <Container>
                <Row>
                    <Col md={{ span: 4, offset: 1 }}>
                        <Form>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <p>Agency/Standard</p>
                                <Form.Control as="select"  value={this.state.agency} onChange={item => this.handleAgenDone(item.target.value)}>
                                    <option value="" disabled >Choose Agency</option>
                                    {list.map( item => {
                                        return(
                                            <option value={item}>{item}</option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Agency;
