import React, { useState, useCallback, useEffect } from 'react'
import NewPassword from '../../components/NewPassword/NewPassword'
import { toast } from "react-toastify";
import { resetPassword } from "../../state/actions/userActions";
import { validateRegex } from "../../utils";

const NewPasswordContainer = ({ history }) => {

    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    useEffect(() => {
        const query = new URLSearchParams(history.location.search);
        const resetToken = query.get("resetToken");
        if (!resetToken) {
            toast.error("Invalid request !!");
            history.push("/");
        }
    }, [history]);

    const handleResetPasswordClick = useCallback(() => {
        if (password !== repeatPassword) {
            toast.error("Passwords do not match !!");
            return;
        }
        if(!validateRegex("password", password)){
            toast.error("Password must contain uppercase, lowercase, numeric, special character and should be of atleast 6 character");
            return;
        }
        const query = new URLSearchParams(history.location.search);
        const resetToken = query.get("resetToken");
        const payload = {
            resetToken,
            password
        };
        resetPassword(payload).then(res => {
            if (res.ok) {
                toast.success("Success. Please login !!");
                history.push("/emailSignIn");
            } else {
                toast.error("Failed to reset. Please try again");
                history.push("/");
            }
        });
    }, [history, password, repeatPassword]);

    const onInputChange = useCallback(e => {
        if (e.target.id === "password") {
            setPassword(e.target.value);
        } else {
            setRepeatPassword(e.target.value);
        }
    }, []);

    const resetSignInBack = useCallback(() => history.push("/emailReset"), [
        history,
    ])
    const resetSignInClose = useCallback(() => history.push('/loginScreen'), [
        history,
    ])
    return (
        <NewPassword
            resetSignInBack={resetSignInBack}
            resetSignInClose={resetSignInClose}
            password={password}
            repeatPassword={repeatPassword}
            onInputChange={onInputChange}
            handleResetPasswordClick={handleResetPasswordClick}
        />
    )
}

export default NewPasswordContainer