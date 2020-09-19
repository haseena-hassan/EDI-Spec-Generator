import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './spec.css'
import axios from 'axios'

import Agency from '../DataEntry/Agency'
import Version from '../DataEntry/Version'
import Transaction from '../DataEntry/Transaction'
import Segment from '../DataEntry/Segment'
import Element from '../DataEntry/Element'
import Extras from '../DataEntry/Extras'
import Preview from '../Modals/Preview'

const Accordion = (props) => {
    return (
      <div className="accordion">{ props.children }</div>
    )
}

const AccordionItemContext = React.createContext({
  
    expanded: false,
    toggleExpansion: () => {}
});
    
class AccordionItem extends React.Component {
    constructor (props) {
        super(props)
        
        this.toggleExpansion = () => {
            this.setState({ expanded: !this.state.expanded })
        }
        this.state = {
            expanded: false,
            toggleExpansion: this.toggleExpansion
        }
    }
    render () {
        return (
            <AccordionItemContext.Provider value={this.state}>
                <div className="accordion-item">
                    {this.props.children}
                </div>
            </AccordionItemContext.Provider>
        )
    }
  }
    
  const AccordionHeader = (props) => {
    return (
      <AccordionItemContext.Consumer>
        {({ expanded, toggleExpansion }) => (
          <Container style={{cursor:"pointer"}}>
            <Row className="accordion-header" onClick={toggleExpansion}>
              <Col lg="10">
                <Row className="accordion-text">
                  <Col lg="1.5">
                    { props.status ? <i class="material-icons">check_circle</i> : <i class="material-icons">add_circle_outline</i> }
                  </Col>
                  <Col lg="3">
                    { props.children }
                  </Col>
                </Row>
              </Col>
              <Col lg="2" className="accordion-button">
              { expanded ? <i class="material-icons">arrow_drop_up</i> : <i class="material-icons">arrow_drop_down</i> } 
              </Col>
            </Row>
          </Container>
        )}
      </AccordionItemContext.Consumer>
    )
  }
    
  const AccordionPanel = (props) => {
    return (
      <AccordionItemContext.Consumer>
        {({ expanded }) => 
            <div className={"accordion-panel " + (expanded ? 'expanded' : '')}>
              {props.children}
            </div>}
      </AccordionItemContext.Consumer>
    )
  }