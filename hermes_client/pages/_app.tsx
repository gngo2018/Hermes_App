import { useState } from 'react'
import type { AppProps } from 'next/app'
import Header from "../components/Header";
import { PageTitleContext } from '../contexts/PageTitleContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
    const [pageTitle, setPageTitle] = useState('Home');
    return (
        <PageTitleContext.Provider value={{pageTitle, setPageTitle}}>
            <Header />
            <Component {...pageProps} />
        </PageTitleContext.Provider>
    )
}

export default MyApp
