import {useState} from 'react'
import HeaderMenu from '../HeaderMenu'
import headerStyles from './header.module.css'

export default function Header(){
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    return (
        <>
            <div className={headerStyles.header_container}>
                <h2>Hermes</h2>
                <span onClick={() => setMenuIsOpen(!menuIsOpen)}>+</span>
            </div>
            { menuIsOpen && <HeaderMenu />}
        </>
    );
}