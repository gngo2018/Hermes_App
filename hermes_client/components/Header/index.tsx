import headerStyles from './header.module.css'

export default function Header(){
    return (
        <div className={headerStyles.header_container}>
            <h2>Hermes</h2>
            <span>+</span>
        </div>
    );
}