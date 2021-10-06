import React, { useEffect } from 'react';
import UpgradeSucess from '../UpgradeToPro/UpgradeSuccess/index';
import './upgradeSucesss.style.scss';
import history from "../../history";

const UpgradeSucessComponent = () => {

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (window.fbq != null) {
                window.fbq('track', 'Upgrades');
            }
        }
    }, []);

    const onCloseSucess = () => {
        history.push('./home');
    }

    return (
        <div className='upgradeSucess-main-container'>
            <UpgradeSucess onCloseSucess={onCloseSucess} />
        </div>
    )
}

export default UpgradeSucessComponent;