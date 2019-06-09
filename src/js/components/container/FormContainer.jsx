import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Form, Container, Row, Col, Button, Nav, Alert, Image } from 'react-bootstrap';
import Background from '../../../images/background-phone.jpg'; 
import cpech from '../../../images/Imagen1-620x264.png'
import 'regenerator-runtime/runtime';
import { Textbox } from "react-inputs-validation";
import "react-inputs-validation/lib/react-inputs-validation.min.css";

var StyleBackground = {
    backgroundImage: `url(${Background})`,
    backgroundSize: `cover`,
    height: `-webkit-fill-available`,
    color: `white`
};
var StyleRed = {
    color: `#c76d7c`
}

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
                            <Form.Group as={Col} controlId="nombre" md={12} lg={6}>
                            <Form.Label>Nombre <span style={StyleRed}>*</span></Form.Label>
                                <Textbox
                                    tabIndex="1"
                                    id={"nombre"}
                                    name="nombre" 
                                    type="text"
                                    value={nombre}
                                    placeholder="Ej. Jose Canseco"
                                    onChange={(nombre, e) => {
                                        this.setState({ nombre });
                                    }}
                                    onBlur={e => {}} 
                                    validationOption={{
                                        name: "Nombre",
                                        check: true,
                                        required: true,
                                        customFunc: true
                                    }}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="telefono" md={12} lg={6}>
                                <Form.Label>Teléfono <span style={StyleRed}>*</span></Form.Label>
                                <Textbox
                                    tabIndex="2"
                                    id={"telefono"}
                                    name="telefono"
                                    type="text"
                                    value={telefono}
                                    placeholder="Ej. +569 3772 93076"
                                    onChange={(telefono, e) => {
                                        this.setState({ telefono });
                                    }}
                                    onBlur={e => {}} 
                                    validationOption={{
                                        name: "Teléfono",
                                        check: true,
                                        required: true,
                                        customFunc: telefono => {
                                            const reg = /^(\+?56)?(\s?)(0?9)(\s?)[98765]\d{7}$/;
                                            if (reg.test(String(telefono).toLowerCase())) {
                                                return true;
                                            } else {
                                                return "Ingresa un teléfono válido.";
                                            }
                                        }
                                    }}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="correo" md={12} lg={6}>
                                <Form.Label>Correo <span style={StyleRed}>*</span></Form.Label>
                                <Textbox
                                    tabIndex="1"
                                    id={"correo"}
                                    name="correo" 
                                    type="text" 
                                    value={correo} 
                                    placeholder="Ej. correo@gmail.com"
                                    onChange={(correo, e) => {
                                        this.setState({ correo });
                                    }} 
                                    onBlur={e => {}}
                                    validationOption={{
                                        name: "Correo",
                                        check: true,
                                        required: true,
                                        customFunc: correo => {
                                            const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                            if (reg.test(String(correo).toLowerCase())) {
                                                return true;
                                            } else {
                                                return "Ingresa un mail válido.";
                                            }
                                        }
                                    }}
                                />
                            </Form.Group> 
                            <Form.Group as={Col} controlId="rut" md={12} lg={6}>
                            <Form.Label>RUT <span style={StyleRed}>*</span></Form.Label>
                                <Textbox
                                    tabIndex="1"
                                    id={"rut"}
                                    name="rut"
                                    type="text"
                                    value={rut}
                                    placeholder="Ej. 26.492.283-1"
                                    onChange={(rut, e) => {
                                        this.setState({ rut });
                                    }}
                                    onBlur={e => {}} 
                                    validationOption={{
                                        name: "Rut", 
                                        check: true, 
                                        required: true, 
                                        customFunc: rut => {
                                            const reg = /^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/;
                                            if (reg.test(String(rut).toLowerCase())) {
                                                return true;
                                            } else {
                                                return "Ingresa un rut válido.";
                                            }
                                        }
                                    }}
                                />
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
