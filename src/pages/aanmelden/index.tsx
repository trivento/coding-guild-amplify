import * as React from "react";
import {NextPage} from "next";
import {Auth} from "aws-amplify";
import router from "next/router";
import {LoginForm} from "../../components/login-form";

const LoginPage: NextPage = () => {
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleSubmit = async (values: any) => {
        // values bevat de username en password uit het formulier.
        // gebruik Auth.signIn (Promise) om de gebruiker in te loggen.
        // gebruik vervolgens router.push('/') (Promise) om de gebruiker vervolgens naar de homepage te brengen
        // als er een error optreedt bij het inloggen, gebruik je setErrorMessage om deze waarde
        // te tonen aan de gebruiker.
    }

    return (
        <LoginForm
            onSubmit={handleSubmit}
            errorMessage={errorMessage}
        />
    )
}

export default LoginPage;
