import React from "react";
import "./PopUps.styles.scss";
import Button from "../../common/Button";
import Icon from "../../common/IconComponent";
import AddToHome from "./AddToHome";
import Cookie from "./Cookie";
import NewCard from "./NewCard";
import OrderProcessing from "./OrderProcessing";
import Success from "./Success";
import UploadFailed from "./UploadFailed";
import PrivacyPolicy from "./PrivacyPolicy";
import Beta from "./Beta";

const PopUpsComponent = ({ name, hasCloseIcon, handlers, closeClick }) => {
  return (
    <div className="popUpLargeContainer">
      <div className="popUpSmallContainer">
        <div className="iconContainer">
          <Icon className="headerIcon" iconName="logo_hexagon" />
          {hasCloseIcon && (
            <Button
              isIcon
              className="cancelIcon"
              iconName="cancel"
              onClick={closeClick}
            />
          )}
        </div>
        {name === "addToHome" ? (
          <AddToHome />
        ) : name === "cookie" ? (
          <Cookie {...handlers} />
        ) : name === "newCard" ? (
          <NewCard />
        ) : name === "orderProcessing" ? (
          <OrderProcessing />
        ) : name === "success" ? (
          <Success {...handlers} />
        ) : name === "uploadFailed" ? (
          <UploadFailed {...handlers} />
        ) : name === "privacyPolicy" ? (
          <PrivacyPolicy {...handlers} />
        ) : name === "beta" ? (
          <Beta {...handlers} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

PopUpsComponent.defaultProps = {
  hasCloseIcon: true,
};

export default PopUpsComponent;
