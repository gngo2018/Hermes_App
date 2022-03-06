import { createContext, useContext } from 'react'

export type PageTitleState = {
    pageTitle: string
    setPageTitle: (c: string) => void
}

export const PageTitleContext = createContext<PageTitleState>({
    pageTitle: 'Home',
    setPageTitle: () => { }
});

export const usePageTitleContext = () => useContext(PageTitleContext);