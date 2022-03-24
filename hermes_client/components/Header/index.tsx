import { useState } from 'react'
import Link from 'next/link'
import HeaderMenu from '../HeaderMenu'
import { usePageTitleContext } from '../../contexts/PageTitleContext'
import { useUserContext } from '../../contexts/UserContext'
import headerStyles from './header.module.css'

export default function Header() {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const { pageTitle, setPageTitle } = usePageTitleContext();
    const {userName} = useUserContext();

    function handleMenuIsOpen(arg: boolean){
        setMenuIsOpen(arg);
        console.log(userName);
    }

    return (
        <>
            <div className={headerStyles.header_container}>
                <Link href='/' passHref>
                    <h2 onClick={() => setPageTitle('Home')}>Hermes</h2>
                </Link>
                <div>{pageTitle}</div>
                <div className={headerStyles.header_right_container}>
                    {userName !== '' && <div className={headerStyles.user_name}>{userName}</div>}
                    <span onClick={() => setMenuIsOpen(!menuIsOpen)}>+</span>
                </div>
            </div>
            {menuIsOpen && <HeaderMenu handleMenuIsOpen={(arg) => handleMenuIsOpen(arg)}/>}
        </>
    );
}