import * as React from "react";
import {NextPage} from "next";
import {Auth} from "aws-amplify";
import router from "next/router";
import {RegisterForm} from "../../components/register-form";
import {ConfirmRegistrationForm} from "../../components/confirm-registration-form";

const RegisterPage: NextPage = () => {
    const [showConfirm, setShowConfirm] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [username, setUsername] = React.useState('')

    const handleRegisterSubmit = async (values: { username:  string; password: string; }) => {
        try {
            setUsername(values.username);
            // TODO: gebruik Auth.signUp (Promise) om de gebruiker in te loggen.
            setShowConfirm(true);
        } catch (err) {
            console.log(err);
            setErrorMessage((err as Error).message);
        }
    }

    const handleConfirmSubmit = async (values: { code: string }) => {
        try {
            // TODO: gebruik Auth.confirmSignUp (Promise) om de registratie af te ronden.
            await router.push('/');
        } catch (err) {
            console.log(err);
            setErrorMessage((err as Error).message);
        }
    }

    return showConfirm ? (
        <ConfirmRegistrationForm
            username={username}
            onSubmit={handleConfirmSubmit}
            errorMessage={errorMessage}
        />
    ):(
        <RegisterForm
            onSubmit={handleRegisterSubmit}
            errorMessage={errorMessage}
        />
    )
}

export default RegisterPage;
