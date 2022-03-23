import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Amplify Coding Guild Blog</title>
        <meta name="description" content="A simple blog based on AWS Amplify" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href={"/aanmelden/registreren"}>Registreren</Link>
        <Link href={"/aanmelden"}>Inloggen</Link>
    </div>
  )
}

export default Home
