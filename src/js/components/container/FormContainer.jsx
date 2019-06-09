import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Form, Container, Row, Col, Button, Nav, Alert, Image } from 'react-bootstrap';
import Background from '../../../images/background-phone.jpg'; 
import cpech from '../../../images/Imagen1-620x264.png'
import 'regenerator-runtime/runtime';

var StyleBackground = {
    backgroundImage: `url(${Background})`,
    backgroundSize: `cover`,
    height: `-webkit-fill-available`,
    color: `white`
};


class FormContainer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            telefono: "",
            correo: "",
            rut: "",
            alerta: {
                show: false,
                msj: '',
                variant: ''
            }
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleDismiss = () => {
        this.setState({ 
            alerta: {
                show: false 
            } 
        });
    }

    requiredFields = () => {
        return (this.state.nombre && this.state.telefono && this.state.correo && this.state.rut)? true : false;
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        if (this.requiredFields()) {
            let response = await fetch('landing/subscriptions',{
                method: 'POST',
                body: JSON.stringify({
                    nombre: this.state.nombre,
                    telefono: this.state.telefono,
                    correo: this.state.correo,
                    rut: this.state.rut
                }),
                headers: {"Content-Type": "application/json"}
            });

            let data = await response.json();
            this.setState({
                alerta: {
                    show: true,
                    msj: data.msj,
                    variant: data.variant
                }
            });
        } else {
            this.setState({
                nombre: '',
                telefono: '',
                correo: '',
                alerta: {
                    show: true,
                    msj: 'Todos los campos son requeridos.',
                    variant: 'danger'
                }
            });
        }
    }

    render() {
        const { nombre, telefono, correo, rut, alerta } = this.state;
        return (
            <div style={StyleBackground}>
                <Nav style={{background: `white`}}>
                    <Container>
                        <Image src={cpech} style={{width: '110px'}} />
                    </Container>
                </Nav>
                <Container>
                    <Row style={{textAlign : 'center'}}>
                        <Col>
                            <h1>Cursos de</h1>
                            <h1>Verano +NEM</h1>
                        </Col> 
                        <Col xs={{span:6, offset: 3}} sm={{span:12, offset:0}}>
                            <h6>No dejes pasar esta increíble oportunidad. Inscríbete acá</h6>
                        </Col>
                    </Row>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="nombre" xs={12} sm={6}>
                                <Form.Label>Nombre</Form.Label> 
                                <Form.Control
                                    type="text"
                                    placeholder="Ej. Jose Canseco"
                                    value={nombre}
                                    onChange={this.handleChange}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="telefono" xs={12} sm={6}>
                                <Form.Label>Teléfono</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ej. +569 3772 93076"
                                    value={telefono}
                                    onChange={this.handleChange}
                                ></Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="correo" xs={12} sm={6}>
                                <Form.Label>Correo</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ej. correo@gmail.com"
                                    value={correo}
                                    onChange={this.handleChange}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="rut" xs={12} sm={6}>
                                <Form.Label>RUT</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ej. 26.492.283-1"
                                    value={rut}
                                    onChange={this.handleChange}
                                ></Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Button as={Col}
                            variant="success" 
                            onClick={this.handleSubmit}
                            size="lg"
                        >
                            Inscribirse
                        </Button>
                    </Form>
                </Container>
                <Container>
                    <Alert 
                        variant={alerta.variant}  
                        show={alerta.show}
                        onClose={this.handleDismiss} 
                        dismissible>
                        <p> {alerta.msj} </p>
                    </Alert>
                </Container>
            </div>
        );
    }
}

export default FormContainer;

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;
