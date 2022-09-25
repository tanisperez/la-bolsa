import React, { useEffect, useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

import ConfigClient from '@clients/ConfigClient';

import AlertMessage from "@components/Alert/AlertMessage";

import styles from './ConfigPage.module.css';

const ConfigPage = () => {
    const form = useRef(null);
    const [validated, setValidated] = useState(false);
    const [config, setConfig] = useState({
        market_refresh_time_in_minutes: undefined,
        market_crack_duration_in_minutes: undefined,
        client_market_refresh_time_in_seconds: undefined
    });
    const [alertMessage, setAlertMessage] = useState({
        show: false,
        variant: 'danger',
        title: '',
        body: ''
    });

    useEffect(() => {
        const configClient = new ConfigClient();
        configClient.getConfig()
            .then((config) => setConfig(config))
            .catch((error) => {
                console.error(error.message);
                setAlertMessage({
                    show: true,
                    variant: 'danger',
                    title: 'Se produjo un error al recuperar la configuración',
                    body: error.message
                });
            });
    }, []);

    const handleMarketRefreshTimeInMinutesChange = (event) => {
        const marketRefreshTimeInMinutes = parseInt(event.target.value);
        setConfig({
            market_refresh_time_in_minutes: marketRefreshTimeInMinutes,
            market_crack_duration_in_minutes: config.market_crack_duration_in_minutes,
            client_market_refresh_time_in_seconds: config.client_market_refresh_time_in_seconds
        });
    };

    const handleMarketCrackDurationInMinutes = (event) => {
        const marketCrackDurationInMinutes = parseInt(event.target.value);
        setConfig({
            market_refresh_time_in_minutes: config.market_refresh_time_in_minutes,
            market_crack_duration_in_minutes: marketCrackDurationInMinutes,
            client_market_refresh_time_in_seconds: config.client_market_refresh_time_in_seconds
        });
    };

    const handleClientMarketRefreshTimeInSeconds = (event) => {
        const clientMarketRefreshTimeInSeconds = parseInt(event.target.value);
        setConfig({
            market_refresh_time_in_minutes: config.market_refresh_time_in_minutes,
            market_crack_duration_in_minutes: config.market_crack_duration_in_minutes,
            client_market_refresh_time_in_seconds: clientMarketRefreshTimeInSeconds
        });
    };

    const saveChanges = (event) => {
        if (form.current.checkValidity() === false) {
            setValidated(true);
            event.preventDefault();
            event.stopPropagation();
        } else {
            const configClient = new ConfigClient();
            configClient.editConfig(config)
                .then(() => {
                    setAlertMessage({
                        show: true,
                        variant: 'success',
                        title: 'Se han actualizado los parámetros de configuración',
                        body: 'Para que los cambios surjan efecto, hay que reiniciar el servidor.'
                    });
                })
                .catch((error) => {
                    console.error(error.message);
                    setAlertMessage({
                        show: true,
                        variant: 'danger',
                        title: 'Se produjo un error guardando los cambios de configuración',
                        body: error.message
                    });
                });
        }
    }

    return (
        <div className={styles.configPageContainer}>
            <AlertMessage message={alertMessage} autoCloseTimeOut={7_000}/>
            <Form ref={form} noValidate validated={validated} className="media-breakpoint-down-sm">
                <Form.Group className="mb-3">
                    <Form.Label>Tiempo de actualización de los precios del mercado (en minutos)</Form.Label>
                    <InputGroup>
                        <Form.Control type="number" required min={1} placeholder="20" step={1} defaultValue={config?.market_refresh_time_in_minutes} onChange={handleMarketRefreshTimeInMinutesChange} />
                        <InputGroup.Text>minutos</InputGroup.Text>
                        <Form.Control.Feedback type="invalid">
                            Introduce el tiempo de actualización de los precios del mercado (mínimo 1 minuto).
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Duración del modo crack (en minutos)</Form.Label>
                    <InputGroup>
                        <Form.Control type="number" required min={1} placeholder="10" step={1} defaultValue={config?.market_crack_duration_in_minutes} onChange={handleMarketCrackDurationInMinutes} />
                        <InputGroup.Text>minutos</InputGroup.Text>
                        <Form.Control.Feedback type="invalid">
                            Introduce la duración del modo crack (mínimo 1 minuto).
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Tiempo de actualización de los precios en el navegador (en segundos)</Form.Label>
                    <InputGroup>
                        <Form.Control type="number" required min={3} placeholder="10" step={1} defaultValue={config?.client_market_refresh_time_in_seconds} onChange={handleClientMarketRefreshTimeInSeconds} />
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
        </div>
    )
};

export default ConfigPage;