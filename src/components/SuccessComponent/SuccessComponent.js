import React, { useEffect } from 'react';
import './success.style.scss';
import SucessUnsuccessContainer from './../Upload/SucessUnsuccessContainer/index';
import history from "../../history";

const SuccessComponent = () => {

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (window.fbq != null) {
                window.fbq('track', 'Purchase', {value: 5.00, currency: 'USD'});
            }
        }
    }, []);

    const onCloseSucess = () => {
        history.push("/play");
    }

    return (
        <div className="sucess-main-container">
            <SucessUnsuccessContainer sucess onCloseSucess={onCloseSucess} />
        </div>
    )
}

export default SuccessComponent;