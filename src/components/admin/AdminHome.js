import React, { useEffect, useState } from 'react';

import { MARKET_CRACK_DURATION_IN_MINUTES } from '@config/LaBolsa';
import MarketClient from '@clients/MarketClient';

import styles from './AdminHome.module.css';

const AdminHome = () => {
    const [crackStatus, setCrackStatus] = useState({
        crack_mode_start: undefined,
        crack_mode_end: undefined,
        enabled: false
    });

    useEffect(() => {
        const marketClient = new MarketClient();

        marketClient.getCrackModeStatus()
            .then((status) => setCrackStatus(status))
            .catch((error) => console.error(error));
    }, []);


    const crackMode = async () => {
        const marketClient = new MarketClient();
        const status = await marketClient.enableCrackMode();
        setCrackStatus(status);
    };

    return (
        <div className="d-flex flex-column align-items-center mt-4">
            {
                crackStatus.enabled ?
                    <span className="mb-4">El modo crack está habilitado, finalizará a las {crackStatus.crack_mode_end}</span>
                :
                    <span className="mb-4">La duración del modo crack será de {MARKET_CRACK_DURATION_IN_MINUTES} minutos</span>
            }
            <button className={styles.crackButton} onClick={crackMode} disabled={crackStatus.enabled}>
                ¡Crack!
            </button>
        </div>
    );
};

export default AdminHome;