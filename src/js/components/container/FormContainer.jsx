import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Form, Container, Row, Col, Button, Nav, Alert, Image } from 'react-bootstrap';
import Background from '../../../images/background-phone.jpg'; 
import cpech from '../../../images/Imagen1-620x264.png'
import 'regenerator-runtime/runtime';
import { Textbox } from "react-inputs-validation";
import "react-inputs-validation/lib/react-inputs-validation.min.css";

const Styles = {
    styleBackground : {
        backgroundImage: `url(${Background})`,
        backgroundSize: `cover`,
        minHeight: `-webkit-fill-available`,
        color: `white`
    },
    redColor : {
        color: `#c76d7c`
    },
    rowContainer: {
        padding: `0px 40px`
    },
    centerText: {
        textAlign: `center`
    },
    cpech: {
        width: '150px',
        paddingLeft: `40px`
    },
    backgroundWhite: {
        background: `white`
    },
    Width100: {
        width: '100%'
    }
};

class FormContainer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            nombreValidate: false,
            telefono: "",
            telefonoValidate: false,
            correo: "",
            correoValidate: false,
            rut: "",
            rutValidate: false,
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
        return (this.state.nombreValidate && this.state.telefonoValidate && this.state.correoValidate && this.state.rutValidate)? true : false;
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
                alerta: {
                    show: true,
                    msj: 'Existen campos que no cumple con lo requerido, favor seguir los Ej.',
                    variant: 'danger'
                }
            });
        }
    }

    render() {
        const { nombre, nombreValidate, telefono, telefonoValidate, correo, correoValidate, rut, rutValidate, alerta } = this.state;
        return (
            <div style={Styles.styleBackground}>
                <Nav style={Styles.backgroundWhite}>
                    <Container>
                        <Image src={cpech} style={Styles.cpech} />
                    </Container>
                </Nav>
                <Container>
                    <Row style={Styles.centerText}>
                        <Col>
                            <h1>Cursos de</h1>
                            <h1>Verano +NEM</h1>
                        </Col> 
                        <Col xs={{span:8, offset: 2}} sm={{span:12, offset:0}}>
                            <h6>No dejes pasar esta increíble oportunidad. Inscríbete acá</h6>
                        </Col>
                    </Row>
                    <Form style={Styles.rowContainer}>
                        <Form.Row >
                            <Form.Group as={Col} controlId="nombre" md={12} lg={6}>
                            <Form.Label>Nombre <span style={Styles.redColor}>*</span></Form.Label>
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
                                    validate={nombreValidate}
                                    validationCallback={res =>{
                                        this.setState({ nombreValidate: !res })
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
                                <Form.Label>Teléfono <span style={Styles.redColor}>*</span></Form.Label>
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
                                    validate={telefonoValidate}
                                    validationCallback={res =>
                                        this.setState({ telefonoValidate: !res })
                                    }
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
                                <Form.Label>Correo <span style={Styles.redColor}>*</span></Form.Label>
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
                                    validate={correoValidate}
                                    validationCallback={res =>
                                        this.setState({ correoValidate: !res })
                                    }
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
                            <Form.Label>RUT <span style={Styles.redColor}>*</span></Form.Label>
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
                                    validate={rutValidate}
                                    validationCallback={res =>
                                        this.setState({ rutValidate: !res })
                                    }
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
                        <Button
                            style={Styles.Width100}
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
