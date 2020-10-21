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
})
  
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
                                    { props.status ? 
                                        <i class="material-icons">check_circle</i> : 
                                        <i class="material-icons">add_circle_outline</i> }
                                </Col>
                                <Col lg="3">
                                    { props.children }
                                </Col>
                            </Row>
                        </Col>
                        <Col lg="2" className="accordion-button">
                            { expanded ? 
                                <i class="material-icons">arrow_drop_up</i> : 
                                <i class="material-icons">arrow_drop_down</i> } 
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




class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            statAgen : false,
            statVers : false,
            statTrans : false,
            statSeg : false,
            statElem : false,
            statExtr : false,
            
            agency : '',
            version : '',
            transactionSet : '',
            transactionDescription : '',
            segments : [],
            elements : [],
            numberOfHeadingSegments : 0,
            numberOfDetailSegments : 0,
            numberOfSummarySegments : '',
            headingText : '',
            footerText : '',
            businessPartnerText : '',
            segmentUsage : '',

            responseVer : [],
            responseTset : [],
            responseSeg : []
        }
    }

    handleStatusAgen = (status, agen) => { 
        this.setState({
            statAgen : status,
            agency : agen
        }, () => {
            axios.post('/api/version/getAll', {
                agency : this.state.agency
            })
            .then((res) => {
                this.setState({responseVer : res.data.data})
                console.log(res.data.data)
            }, (error) => {
                console.log(error)
            })
        })
    }
    handleStatusVers = (status, vers) => {
        this.setState({
            statVers : status,
            version : vers
        }, () => {
            axios.post('/api/transactionSet/getAll', {
                agency : this.state.agency,
                version : this.state.version
            })
            .then((res) => {
                this.setState({responseTset : res.data.data})
                console.log(res.data.data)
            }, (error) => {
                console.log(error)
            })
        }) 
    }
    handleStatusTrans = (status, transId, transDesc) => {
        this.setState({
            statTrans : status,
            transactionSet : transId,
            transactionSetDesc : transDesc
        }, () => {
            axios.post('/api/segmentUsage/getAll', {
                agency : this.state.agency,
                version : this.state.version,
                transactionSet : this.state.transactionSet
            })
            .then((res) => {
                this.setState({responseSeg : res.data.data})
                console.log(res.data.data)
            }, (error) => {
                console.log(error)
            })   
        })
    }
    handleStatusSeg = (status, segs) => { 
        var segUsage={}, numH=0, numS=0, numD=0, seg=[]
        for(var i=0; i<segs.length; i++){
            segUsage[segs[i]["Position"]] = segs[i]
            segs[i]["Section"]=='H' ? numH++ : (segs[i]["Section"]=='D' ? numD++ : numS++)
            seg.push(segs[i]["SegmentID"])
        }
        this.setState({
            statSeg : status,
            segmentUsage : segUsage,
            numberOfHeadingSegments : numH,
            numberOfDetailSegments : numD,
            numberOfSummarySegments : numS,
            segments : seg
        }, () => {
            console.log(this.state.segments)
        }) 
    }
    handleStatusElem = (status) => { this.setState({statElem : status}) }
    handleStatusExtr = (status) => { this.setState({statExtr : status}) }

  
  render() {
    const previewStat = !(this.state.statAgen && this.state.statElem && this.state.statVers && this.state.statTrans && this.state.statSeg && this.state.statExtr) ? "active" : "disabled"
    return (
      <Container style={{paddingTop:"50px"}}>
        <Accordion>
          <Row >
            <Col lg="12">
              <AccordionItem>
                <AccordionHeader status={this.state.statAgen}>
                  Agency
                </AccordionHeader>
                <AccordionPanel>
                  <Agency handlestatus={this.handleStatusAgen} />
                </AccordionPanel>
              </AccordionItem>
            </Col>
          </Row>
          <Row >
            <Col lg="12">
              <AccordionItem>
                <AccordionHeader status={this.state.statVers}>
                  Version
                </AccordionHeader>
                <AccordionPanel>
                  <Version handlestatus={this.handleStatusVers} data={this.state.responseVer}/>
                </AccordionPanel>
              </AccordionItem>
            </Col>
          </Row>
          <Row >
            <Col lg="12">
              <AccordionItem>
                <AccordionHeader status={this.state.statTrans}>
                  Transaction
                </AccordionHeader>
                <AccordionPanel>
                  <Transaction handlestatus={this.handleStatusTrans} data={this.state.responseTset}/>
                </AccordionPanel>
              </AccordionItem>
            </Col>
          </Row>
          <Row >
            <Col lg="12">
              <AccordionItem>
                <AccordionHeader status={this.state.statSeg}>
                  Segment
                </AccordionHeader>
                <AccordionPanel>
                  <Segment handlestatus={this.handleStatusSeg} data={this.state.responseSeg}/>
                </AccordionPanel>
              </AccordionItem>
            </Col>
          </Row>
          <Row >
            <Col lg="12">
              <AccordionItem>
                <AccordionHeader status={this.state.statElem}>
                  Elements
                </AccordionHeader>
                <AccordionPanel>
                  <Element handlestatus={this.handleStatusElem} agency={this.state.agency} 
                            version={this.state.version} segments={this.state.segments} />
                </AccordionPanel>
              </AccordionItem>
            </Col>
          </Row>
          <Row >
            <Col lg="12">
              <AccordionItem>
                <AccordionHeader status={this.state.statExtr}>
                  Additional Information
                </AccordionHeader>
                <AccordionPanel>
                  <Extras handlestatus={this.handleStatusExtr} />
                </AccordionPanel>
              </AccordionItem>
            </Col>
          </Row>
        </Accordion> 
        <Row style={{paddingBottom:"50px"}}>
            <Col lg="12">
              <Preview status={previewStat}/>
              {/* {' '}<i class="material-icons">remove_red_eye</i> */}
            </Col>
        </Row>
      </Container>
      
    )
  }
}

export default App
