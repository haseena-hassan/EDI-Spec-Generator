import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup' 
import FormControl from 'react-bootstrap/FormControl' 
import ListGroup from 'react-bootstrap/ListGroup' 
import Container from 'react-bootstrap/Container'
 

 
class AddCode extends Component { 
    constructor(props) { 
        super(props) 

        this.state = { 
            codeval : "", 
            description : "", 
            list:[] 
        } 
    } 
    addItem(){ 
        if(this.state.userInput !== '' ){ 
            const custCode = { 
                id : Math.random(), 
                code : this.state.codeval + '  -  ' + this.state.description
            }  
            const list = [...this.state.list] 
            list.push(custCode) 
            this.setState({ 
                list, 
                codeval : "", 
                description : "", 
            }) 
        } 
    } 

    deleteItem(key){ 
        const list = [...this.state.list] 
        const updateList = list.filter(item => item.id !== key) 
        this.setState({ 
            list : updateList, 
        }) 
    } 

    render(){ 
        return(
            <Container>
                <Row> 
                    <Col lg="5">
                        <InputGroup className="mb-3"> 
                        <FormControl 
                            placeholder="Value"
                            size="lg"
                            value = {this.state.codeval} 
                            onChange = {item => this.setState({codeval:item.target.value})} 
                            aria-label="any"
                            aria-describedby="basic-addon2"
                        /> 
                        </InputGroup>
                        <InputGroup className="mb-3"> 
                        <FormControl 
                            placeholder="Description "
                            size="lg"
                            value = {this.state.description} 
                            onChange = {item => this.setState({description:item.target.value})} 
                            aria-label="Description"
                            aria-describedby="basic-addon2"
                        /> 
                        </InputGroup>
                        <InputGroup.Append> 
                            <Button variant="success" onClick = {()=>this.addItem()}>Create</Button> 
                        </InputGroup.Append> 
                    </Col> 
                    <Col lg="1"></Col>
                    <Col lg="6">
                        <ListGroup> 
                            {this.state.list.map(item => {return( 
                                <ListGroup.Item style={{display:"flex",border:"0"}}> 
                                    <i class="material-icons" onClick={ () => this.deleteItem(item.id) } style={{paddingRight:"10px",cursor:"pointer"}}>remove_circle</i>
                                    <p>{item.code}</p>
                                </ListGroup.Item> 
                            )})} 
                        </ListGroup> 
                    </Col>
                </Row> 
            </Container> 
        )} 
    } 


function CustomCode() {
    const [show, setShow] = React.useState(false)
    const styles = {background:"transparent",bottom:"0",height:"100vh"}
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
  
    return (
      <>
        <Button variant="info" onClick={handleShow}>Custom</Button>
        <Modal show={show} onHide={handleClose} centered size="lg" style={styles}>
            <Modal.Header closeButton>
                <Modal.Title>Create custom code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddCode />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleClose}>Save</Button>
            </Modal.Footer>
        </Modal>
      </>
    )
}


export default CustomCode 
