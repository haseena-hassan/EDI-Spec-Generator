import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import axios from 'axios'


class Agency extends Component {
    constructor(props){
        super(props)
        this.state = {
            agency : "",
            data : []
        }
    }

    handleAgenDone = (item) => {
        this.setState({agency : item[0]})
        this.props.handlestatus(true, item[0])
        console.log(item[0])
    }

    componentDidMount() {
        axios.post('/api/agency/getAll', {})
          .then((res) => {
              this.setState({data : res.data.data})
              console.log(res.data.data)
          }, (error) => {
            console.log(error)
          })
    }

    render() {
        
        return (
            <Container>
                <Row>
                    <Col lg="12">
                        <p>Choose Agency</p>
                        {this.state.data.map( item => {
                            return(
                                <Button variant="light" 
                                    value={item["CodeAgency\r"]}
                                    style={{marginRight:"20px"}}
                                    onClick={e => this.handleAgenDone(e.target.value)}  >
                                        {item["CodeAgency\r"]} - {item.Description}
                                </Button>
                            )
                        })}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Agency;
