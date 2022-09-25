import React, { useEffect, useState } from 'react';

import MarketClient from '@clients/MarketClient';
import ConfigClient from '@clients/ConfigClient';

import AlertMessage from '@components/Alert/AlertMessage';

import styles from './AdminHome.module.css';

const AdminHome = () => {
    const [crackStatus, setCrackStatus] = useState({
        crack_mode_start: undefined,
        crack_mode_end: undefined,
        enabled: false
    });
    const [config, setConfig] = useState({
        market_refresh_time_in_minutes: undefined,
        market_crack_duration_in_minutes: undefined
    });
    const [alertMessage, setAlertMessage] = useState({
        show: false,
        variant: 'danger',
        title: '',
        body: ''
    });

    useEffect(() => {
        const marketClient = new MarketClient();
        marketClient.getCrackModeStatus()
            .then((status) => setCrackStatus(status))
            .catch((error) => {
                console.error(error.message);
                setAlertMessage({
                    show: true,
                    variant: 'danger',
                    title: 'Se produjo un error al recuperar el estado del modo crack',
                    body: error.message
                });
            });

        const configClient = new ConfigClient();
        configClient.getConfig()
            .then((config) => setConfig(config))
            .catch((error) => {
                console.error(error);
                setAlertMessage({
                    show: true,
                    variant: 'danger',
                    title: 'Se produjo un error al recuperar la configuración',
                    body: error.message
                });
            });
    }, []);


    const crackMode = async () => {
        const marketClient = new MarketClient();
        marketClient.enableCrackMode()
            .then((status) => setCrackStatus(status))
            .catch((error) => {
                console.error(error.message);
                setAlertMessage({
                    show: true,
                    variant: 'danger',
                    title: 'Se produjo un error al activar el modo crack',
                    body: error.message
                });
            });
    };

    return (
        <div className="d-flex flex-column align-items-center mt-4">
            <AlertMessage message={alertMessage} autoCloseTimeOut={7_000}/>
            {
                crackStatus.enabled ?
                    <span className="mb-4">El modo crack está habilitado, finalizará a las {crackStatus.crack_mode_end}</span>
                    :
                    <span className="mb-4">La duración del modo crack será de {config.market_crack_duration_in_minutes} minutos</span>
            }
            <button className={styles.crackButton} onClick={crackMode} disabled={crackStatus.enabled}>
                ¡Crack!
            </button>
        </div>
    );
};

export default AdminHome;