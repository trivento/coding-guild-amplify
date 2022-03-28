import * as React from "react";
import {useAuthContext} from "../contexts/auth-context";
import router from "next/router";
import styles from "../../styles/Home.module.css";
import Head from "next/head";
import {Button, Text} from "@aws-amplify/ui-react";
import Link from "next/link";

export const PageWrapper: React.FC = ({children}) => {
    const auth = useAuthContext();

    const signOut = async () => {
        // TODO: implementeer sign out
        auth.setUser(null);
        await router.push("/");
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Amplify Coding Guild Blog</title>
                <meta name="description" content="A simple blog based on AWS Amplify"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <header>
                <h1><Link href={"/"}>Coding Guild Blog</Link></h1>
                {auth.isLoggedIn
                    ? <div>
                        <Text>Ingelogd als: {auth.user}</Text>
                        <Link href={"/post/create"}>Nieuwe post maken</Link> |{" "}
                        <Button type="button" onClick={signOut}>Uitloggen</Button>
                    </div>
                    : <div>
                        <Link href={"/aanmelden/registreren"}>Registreren</Link> |{" "}
                        <Link href={"/aanmelden"}>Inloggen</Link>
                    </div>}
            </header>
            {children}
        </div>
    )
}
