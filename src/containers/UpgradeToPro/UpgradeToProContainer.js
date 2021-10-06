import React, { useCallback, useState, useEffect } from 'react';
import UpgradeToProComponent from '../../components/UpgradeToPro/UpgradeToProComponent';
import { connect } from "react-redux";
import {
    updateOrderData,
    renewSubscription,
} from "../../state/actions/orderActions";
import {
    getPaymentMethods,
    getUserDetails,
} from "../../state/actions/userActions";
import { orderSelector } from "../../state/selectors/order";
import { toast } from 'react-toastify';
import history from "../../history";

const UpgradeToProContainer = ({ dispatchUpdate, accountName, isSaveCardDetails, getPaymentMethodsDispatchAction, paymentMethods, getUserDetailsDispatchAction, userDetails }) => {
    const [shouldCreateToken, setShouldCreateToken] = useState(false);
    const [selectedPaymentId, setSelectedPaymentId] = useState(undefined);
    const [selectedPlan, setSelectedPlan] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleOnSelectPlan = useCallback((value) => {
        setSelectedPlan(value);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        getPaymentMethodsDispatchAction();
        getUserDetailsDispatchAction();
    }, [getPaymentMethodsDispatchAction, getUserDetailsDispatchAction]);

    const handleInputChange = useCallback(
        (e) => {
            let payload = {};
            if (e.target.name === "saveCardDetails") {
                payload = {
                    [e.target.name]: e.target.checked,
                };
            } else {
                payload = {
                    [e.target.id]: e.target.value,
                };
            }
            dispatchUpdate(payload);
        },
        [dispatchUpdate]
    );

    const handlePaymentFormError = useCallback((e) => {
        console.log(e);
    }, []);

    const onSubmitPayment = useCallback(
        async (cardInfo) => {
            if (
                !cardInfo?.paymentFromSavedCard &&
                !(cardInfo && cardInfo.id && accountName.length > 0)
            ) {
                toast.error("Enter valid card details");
                return;
            }
            setIsProcessing(true);
            const payload = {
                saveCardDetails: isSaveCardDetails,
                paymentToken: cardInfo.id,
                isAddPremium: true,
                selectedPlan: selectedPlan === 1 ? "year" : "month",
                ...(cardInfo &&
                    cardInfo.paymentFromSavedCard && { paymentFromSaveCard: true }),
            };

            const response = await renewSubscription(payload, true);
            if (response.ok) {
                setIsProcessing(false);
                history.push('./upgraded')
                toast.success("Payment sucess")
            } else {
                setIsProcessing(false);
                toast.error("Payment failed. Please check your card details or promo code")
            }
        },
        [
            isSaveCardDetails,
            accountName,
            selectedPlan,
        ]
    );

    const handleSaveCardChanges = useCallback(
        (cardInfo) => {
            setShouldCreateToken(false);
            onSubmitPayment(cardInfo);
        },
        [onSubmitPayment]
    );

    const handleOrderNowClick = useCallback(() => {
        if (selectedPaymentId) {
          onSubmitPayment({ id: selectedPaymentId, paymentFromSavedCard: true });
        } else {
        setShouldCreateToken(true);
        }
    }, [onSubmitPayment, selectedPaymentId]);

    const handleSelectPayment = useCallback(
        (id) => {
            if (id === selectedPaymentId) {
                setSelectedPaymentId(undefined);
            } else {
                setSelectedPaymentId(id);
            }
        },
        [selectedPaymentId]
    );

    const handleOnClickBack = () => {
        window.history.back();
    }

    return (
        <UpgradeToProComponent
            accountName={accountName}
            isSaveCardDetails={isSaveCardDetails}
            onInputChange={handleInputChange}
            handlePaymentFormError={handlePaymentFormError}
            shouldCreateToken={shouldCreateToken}
            saveCardInformation={handleSaveCardChanges}
            onSubmitFeedback={handleOrderNowClick}
            paymentMethods={paymentMethods}
            selectedPaymentId={selectedPaymentId}
            handleSavedCardSelect={handleSelectPayment}
            handleOnClickBack={handleOnClickBack}
            userDetails={userDetails}
            handleOnSelectPlan={handleOnSelectPlan}
            selectedPlan={selectedPlan}
            isProcessing={isProcessing}
            isSuccess={isSuccess}
            onCloseSucess={()=> setIsSuccess(false)}
        />
    )
}


const dispatchAction = (dispatch) => ({
    getUserDetailsDispatchAction: () => dispatch(getUserDetails()),
    dispatchUpdate: (payload) => dispatch(updateOrderData(payload)),
    getPaymentMethodsDispatchAction: () => dispatch(getPaymentMethods()),
});

export default connect(
    orderSelector,
    dispatchAction
)(UpgradeToProContainer);