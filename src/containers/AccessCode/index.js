import React, { useState, useCallback } from "react";
import content from "./content";
import "./styles.scss";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { ACCESS_CODE } from "../../config";
import { toast } from "react-toastify";

const AccessCode = () => {
  const [accessCode, setAccessCode] = useState("");
  const history = useHistory();

  const handleAccessCodeChange = useCallback((e) => {
    setAccessCode(e.target.value);
  }, []);

  const onConfirmClick = useCallback(() => {
    if (accessCode === ACCESS_CODE) {
      localStorage.setItem("access-token-entered", "true");
      history.push("/");
    } else {
      toast.error("Invalid access code");
    }
  }, [accessCode, history]);
  return (
    <div className="logInContainer">
      <div className="logInBox">
        <p className="logInHeading">{content.ACCESS_CODE_LABEL}</p>

        <div className="buttonBox">
          <TextField
            required
            id="email"
            label={content.ACCESS_CODE_PLACEHOLDER}
            type="email"
            defaultValue=""
            variant="outlined"
            className="form-input"
            autoComplete="off"
            value={accessCode}
            onChange={handleAccessCodeChange}
          />
          <button className="emailButton" onClick={onConfirmClick}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessCode;
