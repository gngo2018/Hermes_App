import { useState } from 'react'
import type { AppProps } from 'next/app'
import Header from "../components/Header";
import { PageTitleContext } from '../contexts/PageTitleContext'
import '../styles/globals.css'
import { UserContext } from '../contexts/UserContext';

function MyApp({ Component, pageProps }: AppProps) {
    const [userName, setUserName] = useState('Guest');
    const [pageTitle, setPageTitle] = useState('Home');
    return (
        <PageTitleContext.Provider value={{ pageTitle, setPageTitle }}>
            <UserContext.Provider value={{ userName: userName, setUserName: setUserName }}>
                <Header />
                <Component {...pageProps} />
            </UserContext.Provider>
        </PageTitleContext.Provider>
    )
}

export default MyApp
