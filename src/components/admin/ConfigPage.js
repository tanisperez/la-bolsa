import React, { useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

const ConfigPage = () => {
    const form = useRef(null);
    const [validated, setValidated] = useState(false);

    const saveChanges = () => {

    }

    return (
        <>
            <Form ref={form} noValidate validated={validated} className="media-breakpoint-down-sm">
                <Form.Group className="mb-3" controlId="formMinDrinkPrice">
                    <Form.Label>Tiempo de actualización de los precios del mercado (en minutos)</Form.Label>
                    <InputGroup>
                        <Form.Control type="number" required min={1} placeholder="20" step={1} defaultValue=""/>
                        <InputGroup.Text>minutos</InputGroup.Text>
                        <Form.Control.Feedback type="invalid">
                            Introduce el tiempo de actualización de los precios del mercado (mínimo 1 minuto).
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formMaxDrinkPrice">
                    <Form.Label>Duración del modo crack (en minutos)</Form.Label>
                    <InputGroup>
                        <Form.Control type="number" required min={1} placeholder="10" step={1} defaultValue="" />
                        <InputGroup.Text>minutos</InputGroup.Text>
                        <Form.Control.Feedback type="invalid">
                            Introduce la duración del modo crack (mínimo 1 minuto).
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formCrackDrinkPrice">
                    <Form.Label>Tiempo de actualización de los precios en el navegador (en segundos)</Form.Label>
                    <InputGroup>
                        <Form.Control type="number" required min={3} placeholder="10" step={1} defaultValue="" />
                        <InputGroup.Text>segundos</InputGroup.Text>
                        <Form.Control.Feedback type="invalid">
                            Introduce el tiempo de actualización de los precios en el navegador (mínimo 3 segundos).
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Form>
            <div className="d-flex justify-content-end">
                <Button onClick={saveChanges}>Guardar cambios</Button>
            </div>
        </>
    )
};

export default ConfigPage;