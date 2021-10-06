import React, { useState, useCallback } from 'react';
import './promoCard.styles.scss';
import { ReactComponent as Like } from '../../../assets/icon/Like.svg';
import { ReactComponent as PlusIcon } from '../../../assets/icon/IconPlusSquare.svg';
import { ReactComponent as MinusIcon } from '../../../assets/icon/IconMinusSquare.svg';
import { ReactComponent as Feedback } from '../../../assets/icon/feedback.svg';
import { ReactComponent as Star } from '../../../assets/icon/star.svg';
import { ReactComponent as Happy } from '../../../assets/icon/happy-face.svg';
import { ReactComponent as Social } from '../../../assets/icon/social.svg';
import { ReactComponent as ThumbsDown } from '../../../assets/icon/ThumbsDown.svg';
import { ReactComponent as Edit } from '../../../assets/icon/Edit.svg';
import { ReactComponent as Key } from '../../../assets/icon/access.svg';
import AltImg from '../../../assets/img/upload photo.png';
import moment from 'moment';

export const IconContainer = ({ icon, number, text }) => (
    <div className="icon-container-2">
        {icon}<br />
        <small>{number}</small><br />
        <small className="icon-text">{text}</small>
    </div>
);

const PromoCard = ({ hasKey, hasFeedback, cardData, isPremium }) => {

    const [cardIsOpen, setCardIsOpen] = useState(false);

    const handleOnToggleCard = useCallback(() => {
        setCardIsOpen(!cardIsOpen)
    }, [cardIsOpen, setCardIsOpen]);

    const hitPercentageRounded = Math.round(cardData.stats.hit);
    const missPercentageRounded = Math.round(cardData.stats.miss);

    const timeDiffCalc = (dateFuture, dateNow) => {
        let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;
        const days = Math.floor(diffInMilliSeconds / 86400);
        diffInMilliSeconds -= days * 86400;
        const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
        diffInMilliSeconds -= hours * 3600;
        const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
        diffInMilliSeconds -= minutes * 60;

        if (days > 0) {
            return `${days} day ago`;
        }
        if (hours > 0) {
            return `${hours} hr ago`;
        }
        if (minutes > 0) {
            return `${minutes} min ago`;
        }

        return 'now';
    }

    return (
        <div className={hasKey ? "promo-campaign-card-border" : "promo-campaign-card"}>
            <div className="promo-camaign-inner-container">
                <div className="like-container">
                    <Like className="like-icon" />
                    <span className="like-percentage-txt">{hitPercentageRounded ? hitPercentageRounded : 0}%</span>
                </div>
                <div className="promo-campaign-inner-container">
                    <div className="card-container-2">
                        {cardData && <small className="subscription-date-text">{`${moment(cardData.created_on).format("MM/DD/YYYY")} - ${moment(cardData.updated_on).format("MM/DD/YYYY")}`}</small>}
                        {!cardIsOpen &&
                            <div className="card-container-3">
                                <Like className="icon-2" />
                                <Star className="icon-2" />
                                <Happy className="icon-2" />
                                <Feedback className="icon-2" />
                            </div>
                        }
                    </div>
                    <div onClick={handleOnToggleCard}>
                        {cardIsOpen ?
                            <MinusIcon className="accordian-toggle-icon" /> :
                            <PlusIcon className="accordian-toggle-icon" />
                        }
                    </div>
                </div>
            </div>
            {cardIsOpen &&
                <div className="card-inner-container">
                    <div className="title-track-container">
                        <small>{cardData.trackTitle}</small>
                        <small>4:11</small>
                    </div>
                    <div className="card-icons-container">
                        <div className="icon-first-row">
                            <IconContainer icon={<Social className="icon-3" />} number={cardData.listenersCount} text="Listeners" />
                            <IconContainer icon={<Like className="icon-3" />} number={`${hitPercentageRounded ? hitPercentageRounded : 0}%`} text="Thumbs Up" />
                            <IconContainer icon={<ThumbsDown className="icon-3" />} number={`${missPercentageRounded ? missPercentageRounded : 0}%`} text="Thumbs Down" />
                        </div>
                        <div className="icon-second-row">
                            <IconContainer icon={<Happy className="icon-3" />} number={cardData.stats.impressed || 0} text="Impressed" />
                            <IconContainer icon={<Edit className="icon-3" />} number={cardData.stats.signed || 0} text="Would Promote" />
                        </div>
                        {hasKey && <div className="key-component">
                            <Key className="key-icon" />
                            <span className="key-number">x 1</span>
                            <span>Keys Earned</span>
                        </div>}
                        {cardData.stats.trackfeedbacks && isPremium &&
                            <div className="feedback-container">
                                <span className="container-feedback-text">Feedbacks</span>
                                {cardData.stats.trackfeedbacks.map((data) => {
                                    return (
                                        <div className="activity-card">
                                            <img src={data.users && (data.users[0]?.profile_image || AltImg)} alt="noImg" className="avatar-container"/>
                                            <p className="card-text" >{data.trackFeedback}</p>
                                            <span className="time-text">{timeDiffCalc(moment(data.submittedOn), new Date())}</span>
                                        </div>
                                    )
                                })}
                            </div>}
                    </div>
                </div>
            }
        </div>
    )
};

export default PromoCard;