import React, { useContext } from "react";
import { StripeProvider, Elements } from "react-stripe-elements";
import content from "./content";
import "./styles.scss";
import UploadTrackForm from "./UploadTrackForm";
import { UpgradeToPremium, PremiumAccess } from "./UpgradeToPremium";
import TotalPaymentComponent from "./TotalPayment";
import PaymentForm from "./PaymentForm";
import Button from "../../common/Button";
import PopUpComponent from "../PopUps/PopUpsComponent";
import PromoCodeComponent from "./PromoComponent";
import { MenuHandlerContext } from "../../routes";
import { STRIPE_KEY } from "../../config";
import Icon from "../../common/IconComponent";

const OrderFeedbackComponent = ({
  tracks,
  accountName,
  genres,
  promoCode,
  selectedPaymentId,
  handleDeleteSavedCard,
  handleSavedCardSelect,
  paymentMethods,
  isAddPremium,
  onInputChange,
  isHyperTargeted,
  onSubmitFeedback,
  saveCardInformation,
  shouldCreateToken,
  isPaymentFormReady,
  handleTrackChanges,
  handlePaymentFormError,
  handleAddAnotherTrack,
  isSaveCardDetails,
  setAddGenre,
  isProcessing,
  isSuccess,
  handleRemoveTrack,
  handleLogoClick,
  handleRateTrackClick,
  handlePlaceNewOrderClick,
  closeSuccessPopUp,
  isPremium,
  hitOrPro,
  setHitOrPro,
}) => {
  const handleMenuClick = useContext(MenuHandlerContext);
  return (
    <div className="orderFeedbackContainer">
      <header className="orderFeedbackHeader">
        <Button
          isIcon
          className="menuIcon"
          iconName="menu"
          onClick={handleMenuClick}
        />
        <Icon
          iconName="HearBKSilverLogo"
          className="silverLogo"
        />
      </header>
      <section className="orderFeedbackHeaderText">
        <div>
          <strong>{content.ORDER}</strong>
        </div>
        <div>{content.FEEDBACK}</div>
      </section>
      <section className="hitCampaignContainer">
        <div className="hitCampaignHeader">{content.HIT_CAMPAIGN_HEADER}</div>
        <div className="hitCampaignDescription">
          <p>{content.HIT_CAMPAIGN_DESCRIPTION}</p>
          <p>{content.HIT_CAMPAIGN_DESCRIPTION1}</p>
        </div>
      </section>
      {tracks.map(
        (
          { trackTitle, trackUrl, mediaType, selectedFeedback, genreId },
          index
        ) => (
          <UploadTrackForm
            index={index}
            genres={genres}
            trackTitle={trackTitle}
            trackUrl={trackUrl}
            mediaType={mediaType}
            handleTrackChanges={handleTrackChanges}
            selectedFeedback={selectedFeedback}
            setAddGenre={setAddGenre}
            selectedGenre={genres.find((g) => g._id === genreId)}
          />
        )
      )}
      {/* <div
        className="addAnotherTrack"
        role="button"
        onClick={handleAddAnotherTrack}
      >
        {content.ADD_ANOTHER_TRACK}
     </div>*/}
      {!isPremium ? (
        <UpgradeToPremium
          onInputChange={onInputChange}
          isAddPremium={isAddPremium}
        />
      ) : (
        <PremiumAccess
          onInputChange={onInputChange}
          isHyperTargeted={isHyperTargeted}
        />
      )}
      <React.Fragment>
        <TotalPaymentComponent
          handleRemoveTrack={handleRemoveTrack}
          tracks={tracks}
          isAddPremium={isAddPremium}
          genres={genres}
          hitOrPro={hitOrPro}
        />
        <PromoCodeComponent
          onInputChange={onInputChange}
          promoCode={promoCode}
        />
        <StripeProvider apiKey={STRIPE_KEY}>
          <Elements>
            <PaymentForm
              onInputChange={onInputChange}
              accountName={accountName}
              submitPayment={saveCardInformation}
              shouldCreateToken={shouldCreateToken}
              handlePaymentFormError={handlePaymentFormError}
              isSaveCardDetails={isSaveCardDetails}
              paymentMethods={paymentMethods}
              selectedPaymentId={selectedPaymentId}
              handleDeleteSavedCard={handleDeleteSavedCard}
              handleSavedCardSelect={handleSavedCardSelect}
            />
          </Elements>
        </StripeProvider>
        <div className="orderButtonWrapper">
          <Button
            className="launchButton"
            buttonText={content.ORDER_NOW_BUTTON}
            onClick={onSubmitFeedback}
            disabled={!isPaymentFormReady}
          />
        </div>
      </React.Fragment>
      {isProcessing && (
        <PopUpComponent name="orderProcessing" hasCloseIcon={false} />
      )}
      {isSuccess && (
        <PopUpComponent
          name="success"
          handlers={{
            rateTrackClick: handleRateTrackClick,
            placeNewOrderClick: handlePlaceNewOrderClick,
          }}
          hasCloseIcon={false}
          closeClick={closeSuccessPopUp}
        />
      )}
    </div>
  );
};

export default OrderFeedbackComponent;
