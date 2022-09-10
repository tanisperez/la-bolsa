import React, { useState } from 'react';

import MarketClient from '@clients/MarketClient';

import styles from './AdminHome.module.css';

const AdminHome = () => {
    const [crackEnabled, setCrackEnabled] = useState(false);

    const crackMode = async () => {
        const marketClient = new MarketClient();
        const status = await marketClient.enableCrackMode();
        
        setCrackEnabled(status.enabled);
        
        alert(JSON.stringify(status));
    };

    return (
        <div className="d-flex justify-content-center mt-4">
            <button className={styles.crackButton} onClick={crackMode} disabled={crackEnabled}>
                ¡Crack!
            </button>
        </div>
    );
};

export default AdminHome;