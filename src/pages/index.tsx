import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Link from "next/link";
import {useAuthContext} from "../contexts/auth-context";
import {Button, Text} from '@aws-amplify/ui-react';
import {Auth} from "aws-amplify";

const Home: NextPage = () => {
    const auth = useAuthContext();

    const signOut = async () => {
        // TODO: log de gebruiker uit met Auth.signOut
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Amplify Coding Guild Blog</title>
                <meta name="description" content="A simple blog based on AWS Amplify"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            {auth.isLoggedIn
                ? <div>
                    <Text>Ingelogd als: {auth.user}</Text>
                    <Button type="button" onClick={signOut}>Uitloggen</Button>
                </div>
                : <div>
                    <Link href={"/aanmelden/registreren"}>Registreren</Link>
                    <Link href={"/aanmelden"}>Inloggen</Link>
                </div>}
        </div>
    )
}

export default Home
