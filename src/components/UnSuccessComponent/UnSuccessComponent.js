import React from 'react';
import './unSuccess.style.scss';
import SucessUnsuccessContainer from './../Upload/SucessUnsuccessContainer/index';

const UnSuccessComponent = () => {

    const onCloseSucess = () => {
        window.history.back();
    }

    return (
        <div className="unSucess-main-container">
            <SucessUnsuccessContainer onCloseSucess={onCloseSucess} />
        </div>
    )
}

export default UnSuccessComponent;