import React, { useState, useCallback } from 'react';
import './play.style.scss';
import content from './content';
import cx from 'classnames';
import { ReactComponent as Multiplier2 } from '../../assets/icon/Multiplier2.svg';
import { ReactComponent as MoneyBag } from '../../assets/icon/MoneyBag.svg';
import { ReactComponent as FireIcon } from '../../assets/icon/FireIcon.svg';
import { ReactComponent as Help } from '../../assets/icon/help.svg';
import { ReactComponent as Like } from '../../assets/icon/Like.svg';
import { ReactComponent as Dislike } from '../../assets/icon/ThumbsDown.svg';
import { ReactComponent as MusiMultimedia } from '../../assets/icon/music-and-multimedia.svg';
import IMG from '../../assets/img/profile/BREAKER 750x750.png';
import NewAudioPlayer from '../NewAudioPlayer';
import DialogBox from '../../common/DialogBox/DialogBox';
import ScoreRating from './ScoreRating/ScoreRating';
import ImpressedContainer from './ImpressedContainer/ImpressedContainer';
import SignContainer from "./SignContainer/SignContainer";
import isEmpty from 'lodash/isEmpty';
import FeedbackContainer from './FeedbackContainer/FeedbackContainer';
import PointsEarnedContainer from './PointsEarnedContainer/PointsEarnedContainer';
import Iframe from "../../common/Iframe";
import { ENUMS } from "../../utils";

const PlayComponent = ({
    track = {},
    handleOnUpdatefeedback,
    feedback,
    postTrackFeedback,
    showPointsEarnedContainer,
    handleOnClosePointEarnedContainer,
    updatedCoin,
    userDetails,
    tracks,
    componentIndex,
}) => {
    const [showScoreContainer, showSetScoreContainer] = useState(false);
    const [showImpressedContainer, showSetImpressedContainer] = useState(false);
    const [showSignContainer, showSetSignContainer] = useState(false);
    const [showFeedbackContainer, showSetFeedbackContainer] = useState(false);


    const handleOnScoreContainer = useCallback(() => {
        showSetScoreContainer(!showScoreContainer);
        postTrackFeedback();
    }, [showScoreContainer, postTrackFeedback]);

    const handleClickLIkeDislike = useCallback((value) => {
        handleOnUpdatefeedback("liked", value);
        showSetScoreContainer(!showScoreContainer);
    }, [handleOnUpdatefeedback, showScoreContainer])

    const handleSubmitScore = useCallback((value) => {
        handleOnUpdatefeedback("trackRating", value);
        showSetScoreContainer(false);
        showSetImpressedContainer(true);
    }, [handleOnUpdatefeedback]);

    const handleOnCloseImpressedContainer = useCallback(() => {
        showSetImpressedContainer(!showImpressedContainer);
        postTrackFeedback();
    }, [showImpressedContainer, postTrackFeedback]);

    const handleSubmitImpressed = useCallback((value) => {
        handleOnUpdatefeedback("impressed", value);
        showSetImpressedContainer(false);
        showSetSignContainer(true);
    }, [handleOnUpdatefeedback]);

    const handleOnCloseSignContainer = useCallback(() => {
        showSetSignContainer(!showSignContainer);
        postTrackFeedback();
    }, [showSignContainer, postTrackFeedback]);

    const handleSubmitSigned = useCallback((value) => {
        handleOnUpdatefeedback("signed", value);
        showSetSignContainer(false);
        showSetFeedbackContainer(true);
    }, [handleOnUpdatefeedback]);

    const handleOnCloseFeedbackContainer = useCallback(() => {
        showSetFeedbackContainer(!showFeedbackContainer);
        postTrackFeedback();
    }, [showFeedbackContainer, postTrackFeedback]);

    const handleSubmitFeedback = useCallback((value) => {
        handleOnUpdatefeedback("trackFeedback", value);
        showSetFeedbackContainer(false);
        postTrackFeedback();
    }, [handleOnUpdatefeedback, postTrackFeedback]);

    return (
        <div className="play-main-container">
            <div className="play-sub-container">
                <div className="result-header-container">
                    <div className="app-name-container">
                        <span className="app-display-name">{content.BREAKER}</span><br />
                        <small className="app-footer-text">{content.HEADER_TAG_TEXT}</small>
                    </div>
                    <div className="header-icon-container">
                        <MoneyBag className="header-icon" />
                        <div className="header-icon-text-container">
                            <p className="coin-number">{userDetails ?.balance}</p><p className="coin-text">{content.COIN}</p>
                        </div>
                        <FireIcon className="header-icon" />
                        <div className="header-icon-text-container" >
                            <p className="coin-number">Lv.0</p><p className="coin-text">{content.RATER}</p>
                        </div>
                    </div>
                </div>
                <div className="play-screen-container-2">
                    <div className="play-screen-inner-container-2">
                        <span className="listen-text">{content.LISTEN}</span><br />
                        <small className="disover-artist-text">{content.DISCOVER_ARTIST}</small>
                    </div>
                    <Help />
                </div>
            </div>
            {!isEmpty(track) &&
                <section>
                    <div className="play-image-container">
                        <div className="play-music-image-container">
                            <div className="play-image-container">
                                {track.mediaType === ENUMS.MEDIA_TYPE_YOUTUBE ? (
                                    <div className="image-container">
                                        <Iframe
                                            width=""
                                            height=""
                                            className="discoverIFrame"
                                            src={track.trackUrl}
                                            title="video-iframe"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></Iframe>
                                        <div className="song-name-container">
                                            <span className="song-name-text">{track.trackTitle}</span><br />
                                            <small className="creator-name-text">{track.display_name}</small>
                                        </div>
                                    </div>
                                ) : (
                                        <div className="image-container">
                                            <img src={IMG} alt="no img" className="cover-image-container" />
                                            {/* <div className="cover-image-container">
                                                <MusiMultimedia className="multimedia-icon" />
                                            </div> */}
                                            <div className="song-name-container">
                                                <span className="song-name-text">{track.trackTitle}</span><br />
                                                <small className="creator-name-text">{track.display_name}</small>
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </div>
                        <div className="image-footer-icon-container">
                            <Like className="image-footer-icons" onClick={() => handleClickLIkeDislike(true)} />
                            <MoneyBag className="image-footer-icons-2" />
                            <div className="multiplier-container">
                                <p className="coin-number">10</p><p className="coin-text">{content.COIN}</p>
                            </div>
                            <Dislike className="image-footer-icons" onClick={() => handleClickLIkeDislike(false)} />
                        </div>
                    </div>
                    <NewAudioPlayer src={track.trackUrl} />
                </section>
            }

            {showScoreContainer &&
                <DialogBox
                    bodyComponent={
                        <ScoreRating
                            handleSubmitScore={handleSubmitScore}
                        />
                    }
                    onClose={handleOnScoreContainer}
                    hideClose
                />
            }
            {showImpressedContainer &&
                <DialogBox
                    bodyComponent={
                        <ImpressedContainer
                            handleSubmitImpressed={handleSubmitImpressed}
                        />
                    }
                    onClose={handleOnCloseImpressedContainer}
                    hideClose
                />
            }
            {showSignContainer &&
                <DialogBox
                    bodyComponent={
                        <SignContainer
                            handleSubmitSigned={handleSubmitSigned}
                        />
                    }
                    onClose={handleOnCloseSignContainer}
                    hideClose
                />
            }
            {showFeedbackContainer &&
                <DialogBox
                    bodyComponent={
                        <FeedbackContainer
                            feedback={feedback}
                            handleSubmitFeedback={handleSubmitFeedback}
                        />
                    }
                    onClose={handleOnCloseFeedbackContainer}
                    hideClose
                />
            }
            {showPointsEarnedContainer &&
                <DialogBox
                    bodyComponent={
                        <PointsEarnedContainer
                            updatedCoin={updatedCoin}
                        />
                    }
                    onClose={handleOnClosePointEarnedContainer}
                />
            }
        </div>
    )
}

export default PlayComponent;