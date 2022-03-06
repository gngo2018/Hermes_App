import { useState } from 'react'
import Link from 'next/link'
import HeaderMenu from '../HeaderMenu'
import { usePageTitleContext } from '../../contexts/PageTitleContext'
import headerStyles from './header.module.css'

export default function Header() {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const { pageTitle, setPageTitle } = usePageTitleContext();
    return (
        <>
            <div className={headerStyles.header_container}>
                <Link href='/'>
                    <h2 onClick={() => setPageTitle('Home')}>Hermes</h2>
                </Link>
                <div>{pageTitle}</div>
                <span onClick={() => setMenuIsOpen(!menuIsOpen)}>+</span>
            </div>
            {menuIsOpen && <HeaderMenu />}
        </>
    );
}