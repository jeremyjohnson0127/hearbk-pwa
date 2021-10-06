import React, { useState, useCallback, useEffect } from 'react';
import './profileEdit.style.scss';
import AutoComplete from "react-google-autocomplete";
import content from './content';
import TextAreaField from '../../../common/TextAreaField';
import InputField from '../../../common/InputField';
import { ReactComponent as PlusIcon } from '../../../assets/icon/IconPlusSquare.svg';
import { ReactComponent as MinusIcon } from '../../../assets/icon/IconMinusSquare.svg';
import { ReactComponent as IconPlusCircle } from '../../../assets/icon/Icon feather-plus-circle.svg';
import { ReactComponent as IconCloseCircle } from '../../../assets/icon/Icon feather-close-circle.svg';
import Button from './../../../common/Button';

const ProfileEdit = ({
    city,
    headline,
    price,
    bio,
    genres,
    tags,
    styles,
    genresAdded,
    stylesAdded,
    tagsAdded,
    onInputChange,
    filterRate,
    handleClickAddGenres,
    handleClickAddStyles,
    handleClickAddTags,
    handleOnSaveProfile,
}) => {
    const [addGenres, setAddGenres] = useState(false);
    const [addRole, setAddRoles] = useState(false);
    const [addStyles, setAddStyles] = useState(false);

    const [filteredGenres, setFilteredGenres] = useState([]);
    const [filteredRoles, setFilteredRoles] = useState([]);
    const [filteredStyles, setFilteredStyles] = useState([]);
    
    useEffect(() => {
        setFilteredGenres(genres);
        setFilteredRoles(tags);
        setFilteredStyles(styles);
    }, [genres, tags, styles])

    const handleOnToggleGenres = useCallback(() => {
        setAddGenres(!addGenres);
    }, [setAddGenres, addGenres])

    const handleOnToggleRole = useCallback(() => {
        setAddRoles(!addRole);
    }, [setAddRoles, addRole])

    const handleOnToggleStyles = useCallback(() => {
        setAddStyles(!addStyles);
    }, [setAddStyles, addStyles])

    const onRoleSearch = useCallback((e) => {
        let data = tags.filter((element) => {
            return element.tag.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setAddRoles(true);
        setFilteredRoles(data);
    }, [tags])

    const onSearchGenres = useCallback((e) => {
        let data = genres.filter((element) => {
            return element.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setAddGenres(true);
        setFilteredGenres(data);
    }, [genres])

    const onSearchStyles = useCallback((e) => {
        let data = styles.filter((element) => {
            return element.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setAddStyles(true);
        setFilteredStyles(data);
    }, [styles])

    const handleSelectRoles = useCallback((element, condition) => {
        const indexOf = tagsAdded.indexOf(element)
        if(indexOf < 0 && !condition) {
            handleClickAddTags(element, condition);
        } else if ( condition ){
            handleClickAddTags(element, condition);
        }
    }, [handleClickAddTags, tagsAdded])

    const handleSelectGenres = useCallback((element, condition) => {
        const indexOf = genresAdded.indexOf(element)
        if(indexOf < 0 && !condition) {
            handleClickAddGenres(element, condition);
        } else if ( condition ){
            handleClickAddGenres(element, condition);
        }
    }, [handleClickAddGenres, genresAdded])

    const handleSelectStyles = useCallback((element, condition) => {
        const indexOf = stylesAdded.indexOf(element)
        if(indexOf < 0 && !condition) {
            handleClickAddStyles(element, condition);
        } else if ( condition ){
            handleClickAddStyles(element, condition);
        }
    }, [handleClickAddStyles, stylesAdded])

    return (
        <div>
            <div className="profile-text-container">
                <span className="profile-edit-text-label">{content.LOCATION}</span>
                <AutoComplete
                    id="city"
                    className="profile-edit-formInputField"
                    onPlaceSelected={(e) => {
                        onInputChange({
                            id: "location",
                            city: e.formatted_address,
                        });
                    }}
                    onChange={onInputChange}
                    value={city}
                    types={["(cities)"]}
                    placeholder={content.CHOOSE_CITY}
                />
            </div>
            <div className="profile-text-container-2">
                <span className="profile-edit-text-label">{content.BIO}</span>
                <TextAreaField
                    id="bio"
                    className="profile-edit-formInputField"
                    value={bio}
                    maxlength="160"
                    onChange={onInputChange}
                    placeholder={content.ENTER_BIO}
                />
            </div>
            <small className="bio-max-words" >{content.MAX_WORDS}</small>
            <div className="profile-text-container-2">
                <span className="profile-edit-text-label">{content.SEND_ME}</span>
                <TextAreaField
                    id="headline"
                    className="profile-edit-formInputField"
                    onChange={onInputChange}
                    value={headline}
                    placeholder={content.ENTER_SEND_ME}
                />
            </div>
            <div className="genres-container">
                <span className="genres-label">{content.ROLES}</span>
                <div className="search-genres-container">
                    <InputField
                        id="roles"
                        className="formInputField"
                        onChange={onRoleSearch}
                        placeholder={content.SEARCH_ROLE}
                    />
                    <div className="icon-container" onClick={handleOnToggleRole} >
                        {addRole ? <MinusIcon /> : <PlusIcon />}
                    </div>
                </div>
                <div className="genres-button-container">
                    {tagsAdded.length > 0 && tagsAdded.map(element => {
                        return <div className="genres-added-button" >
                            {element.tag}
                            <div className="icon-plus-circle" onClick={(e) => handleSelectRoles(element, true)} ><IconCloseCircle /></div>
                        </div>
                    })}
                </div>
                <div className="genres-button-container">
                    {(filteredRoles.length > 0 && addRole) && filteredRoles.map(element => {
                        return <div className="genres-button" >
                            {element.tag}
                            <div className="icon-plus-circle" onClick={(e) => handleSelectRoles(element, false)} ><IconPlusCircle /></div>
                        </div>
                    })}
                </div>
            </div>
            <div className="genres-container">
                <span className="genres-label">{content.GENRES}</span>
                <div className="search-genres-container">
                    <InputField
                        id="genres"
                        className="formInputField"
                        onChange={onSearchGenres}
                        placeholder={content.SEARCH_GENRES}
                    />
                    <div className="icon-container" onClick={handleOnToggleGenres}>
                        {addGenres ? <MinusIcon /> : <PlusIcon />}
                    </div>
                </div>
                <div className="genres-button-container">
                    {genresAdded.length > 0 && genresAdded.map(element => {
                        return <div className="genres-added-button">
                            {element.name}
                            <div className="icon-plus-circle" onClick={(e) => handleSelectGenres(element, true)} ><IconCloseCircle /></div>
                        </div>
                    })}
                </div>
                <div className="genres-button-container">
                    {(filteredGenres.length > 0 && addGenres) && filteredGenres.map(element => {
                        return <div className="genres-button">
                            {element.name}
                            <div className="icon-plus-circle" onClick={(e) => handleSelectGenres(element, false)} ><IconPlusCircle /></div>
                        </div>
                    })}
                </div>
            </div>
            <div className="genres-container">
                <span className="genres-label">{content.STYLES}</span>
                <div className="search-genres-container">
                    <InputField
                        id="styles"
                        className="formInputField"
                        onChange={onSearchStyles}
                        placeholder={content.SEARCH_STYLES}
                    />
                    <div className="icon-container" onClick={handleOnToggleStyles}>
                        {addStyles ? <MinusIcon /> : <PlusIcon />}
                    </div>
                </div>
                <div className="genres-button-container">
                    {stylesAdded.length > 0 && stylesAdded.map(element => {
                        return <div className="genres-added-button">
                            {element.name}
                            <div className="icon-plus-circle" onClick={(e) => handleSelectStyles(element, true)} ><IconCloseCircle /></div>
                        </div>
                    })}
                </div>
                <div className="genres-button-container">
                    {(filteredStyles.length > 0 && addStyles) && filteredStyles.map(element => {
                        return <div className="genres-button">
                            {element.name}
                            <div className="icon-plus-circle" onClick={(e) => handleSelectStyles(element, false)} ><IconPlusCircle /></div>
                        </div>
                    })}
                </div>
            </div>
            <div className="profile-text-container-3">
                <span className="profile-edit-text-label">{content.FILER_RATE}</span>
                <InputField
                    id="filterRate"
                    className="profile-edit-formInputField"
                    value={filterRate}
                    type='number'
                    onChange={onInputChange}
                />
                <span className="profile-edit-filter-slash" >/</span>
                <InputField
                    id="filter-rate"
                    className="profile-edit-formInputField"
                    value={100}
                />
            </div>
            <div className="profile-text-container-4">
                <span className="profile-edit-text-label">{content.PRICE}</span>
                <div className="price-input-container" >
                    <span className="dollar-text" >$</span>
                    <InputField
                        id="price"
                        className="profile-edit-formInputField"
                        type='number'
                        value={price}
                        onChange={onInputChange}
                        placeholder={content.SET_YOUR_PRICE}
                    />
                </div>
                <span className="set-price-content" > {content.SET_YOUR_PRICE_CONTENT} </span>
            </div>
            <Button
                className="profile-edit-save-button"
                buttonText={content.SAVE}
                onClick={handleOnSaveProfile}
            />
        </div>
    )
}

export default ProfileEdit;