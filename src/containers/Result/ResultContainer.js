import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getOrderHistory } from "../../state/actions/userActions";
import { orderHistorySelector } from "../../state/selectors/order";
import ResultComponent from './../../components/Result/ResultComponent';

const ResultContainer = ({
    tracksHistory = [],
    history,
    getOrderHistoryDispatchAction
}) => {
    const isPremium = !!localStorage.getItem("isPremiumUser")
    
    useEffect(() => {
        getOrderHistoryDispatchAction();
    }, [getOrderHistoryDispatchAction]);


    return (
        <ResultComponent
            tracksHistory={tracksHistory}
            isPremium={isPremium}
        />
    )
}


const dispatchAction = dispatch => ({
    getOrderHistoryDispatchAction: () => dispatch(getOrderHistory()),
});

export default connect(
    orderHistorySelector,
    dispatchAction
)(ResultContainer);