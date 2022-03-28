import * as React from "react";
import {NextPage} from "next";
import {Auth} from "aws-amplify";
import router from "next/router";
import {LoginForm} from "../../components/login-form";
import {useAuthContext} from "../../contexts/auth-context";

const LoginPage: NextPage = () => {
    const [errorMessage, setErrorMessage] = React.useState('');
    const auth = useAuthContext();

    const handleSubmit = async (values: any) => {
        try {
            const user = values.username; // TODO: gebruik Auth.signIn (Promise) om de gebruiker aan te melden.
            auth.setUser(user);
            await router.push('/');
        } catch (err) {
            console.log(err);
            setErrorMessage((err as Error).message);
        }
    }

    return (
        <LoginForm
            onSubmit={handleSubmit}
            errorMessage={errorMessage}
        />
    )
}

export default LoginPage;
