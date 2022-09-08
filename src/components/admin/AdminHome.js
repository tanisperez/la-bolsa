import React, { useState } from 'react';

import styles from './AdminHome.module.css';

const AdminHome = () => {
    const [crackEnabled, setCrackEnabled] = useState(false);

    const crackMode = () => {
        setCrackEnabled(true);
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