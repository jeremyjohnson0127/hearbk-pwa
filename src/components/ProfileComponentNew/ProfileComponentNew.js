import React, { useState, useCallback, useRef } from 'react';
import './profileComponent.style.scss';

import { ReactComponent as MoneyBag } from '../../assets/icon/MoneyBag.svg';
import { ReactComponent as FireIcon } from '../../assets/icon/FireIcon.svg';
import { ReactComponent as UploadPhoto } from '../../assets/icon/upload photo.svg';
import { ReactComponent as Edit } from '../../assets/icon/edit-tools.svg';
import { ReactComponent as Share } from '../../assets/icon/share.svg';
import { ReactComponent as Settings } from '../../assets/icon/setting.svg';
import { ReactComponent as Focus } from '../../assets/icon/focus.svg';
import { ReactComponent as LeftArrowIcon } from '../../assets/icon/leftArrowIcon.svg';
import { ReactComponent as Camera } from '../../assets/icon/image.svg';
import Ratings from "../../common/Ratings";
import Button from './../../common/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import About from './About';
import Submit from './Submit';
import ProfileEditContainer from './../../containers/ProfileEditContainer/ProfileEditContainer';
import InputField from "../../common/InputField";

const ProfileComponentNew = ({ userDetails, user, handleOnClickSettings, handleShareProfileClick, tracksHistory, handleOnClickFollow, handleProfileUpload }) => {
    const [tabValue, setTabValue] = useState(0);
    const [showEdit, setShowEdit] = useState(false);
    const fileUploadRef = useRef(null);
    const handleAddPhotoClick = () => {
        fileUploadRef.current.click();
    };
    const handleChangeTabs = useCallback((event, newValue) => {
        setTabValue(newValue)
    }, [])
    const handleOnToggleEdit = useCallback((event, newValue) => {
        setShowEdit(!showEdit)
    }, [showEdit])

    return (
        <div className="profile-main-container">
            <div className="profile-header-container">
                <div className="user-name-container">
                    <span className="user-display-name">{userDetails ?.display_name || ""}</span><br />
                </div>
                <div className="header-icon-container">
                    <MoneyBag />
                    <div className="header-icon-text-container">
                        <p className="coin-number">{user ?.balance || "0"}</p><p className="coin-text">coin</p>
                    </div>
                    <FireIcon />
                    <div className="header-icon-text-container" >
                        <p className="coin-number">Lv.0</p><p className="coin-text">A&R Intern</p>
                    </div>
                </div>
            </div>
            <div className="profile-upload-image-container">
                {showEdit && <LeftArrowIcon onClick={handleOnToggleEdit} className="profile-edit-left-arrow" />}
                <div className="profile-upload-image-sub-container">
                    {userDetails ?.profile_image ?
                        <img src={userDetails ?.profile_image} alt="no" className="profilePicIcon" />
                        : <UploadPhoto className="profile-upload-image" />
                    }
                    <div className="edit-icon-container">
                        {!showEdit ? <Edit className="edit-icon" onClick={handleOnToggleEdit} /> : <Camera className="edit-icon" onClick={handleAddPhotoClick} />}
                    </div>
                    <div style={{ width: 0, height: 0, opacity: 0 }}>
                        <InputField
                            accept="image/*"
                            id="profileImageUpload"
                            onChange={handleProfileUpload}
                            passableRef={fileUploadRef}
                            type="file"
                        />
                    </div>
                </div>
                {!showEdit && <Share className="profile-share-icon" onClick={handleShareProfileClick} />}
            </div>
            {!showEdit && <div className="profile-star-container">
                <Ratings
                    disabled
                    value={userDetails ?.listenerRatings ?.avgRating}
                />
                <small className="profile-star-count">{userDetails ?.listenerRatings ?.avgRating || 0}</small>
            </div>}
            <div className="profile-settings-username-container">
                <span className="user-display-name">{userDetails ?.display_name || ""}</span>
                <Settings className="profile-settings-icon" onClick={handleOnClickSettings} />
            </div>
            {!showEdit && <div className="profile-review-rate-container">
                <span className="profile-review-rate">{`Review Rate: $${userDetails ?.price}`}</span>
                <Button
                    className="add-to-list-button"
                    buttonText={
                        <div className="add-to-list-container">
                            <Focus className="focus-icon" />
                            <small className="addToList-text">Add to List</small>
                        </div>
                    }
                />
            </div>}
            {!showEdit ?
                <>
                    <Tabs
                        value={tabValue}
                        onChange={handleChangeTabs}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="About" />
                        <Tab label="Submit" />
                        <Tab label="Reviews" />
                    </Tabs>
                    {tabValue === 0 && <About userDetails={userDetails} />}
                    {tabValue === 1 &&
                        <Submit
                            userDetails={userDetails}
                            tracksHistory={tracksHistory}
                            handleOnClickFollow={handleOnClickFollow}
                        />
                    }
                </> :
                <ProfileEditContainer />
            }
        </div>
    )
}

export default ProfileComponentNew;