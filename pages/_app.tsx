import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Roboto } from '@next/font/google'
import styles from "../styles/Home.module.css";
import Link from "next/link";

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})


export default function App({ Component, pageProps }: AppProps) {
  return <main className={roboto.className}>
        <span className={styles.appName}>Knitit
        <Link href="/admin"><button className={styles.adminbutton}>Admin</button></Link></span>
     <Component {...pageProps} /></main>
}
