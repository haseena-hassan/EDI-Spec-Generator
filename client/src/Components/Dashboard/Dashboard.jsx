import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from './Card'

import im1 from '../../Assets/images/edi-card.jpg'
import im2 from '../../Assets/images/reports-card.jpg'
import im3 from '../../Assets/images/search-card.jpg'
import im4 from '../../Assets/images/validator-card.jpg'

export default class Dashboard extends Component {
    render() {
        return (
            <Container  style={{paddingTop:"20px"}}>
                <Row>
                    <Col lg="7" className="justify-content-md-center">
                        <Row >
                            <Col lg="6">
                                <Card image={im1} title="EDI Specification" link="Create EDI Specification" icon="add" path="create-spec"/>
                                <Card  image={im2} title="Search" link="Seach for EDI Files/Specification" icon="search" path="search"/>
                            </Col>
                            <Col lg="6">
                                <Card image={im4} title="EDI Files" link="Create EDI File" icon="add" path="create-edi"/>
                                <Card  image={im3} title="Report" link="View Report" icon="article" path="reports"/>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg="5" style={{paddingLeft: "130px"}} >
                        {/* <Chatbox /> */}
                    </Col>
                </Row>
                
            </Container>
        )
    }
}
