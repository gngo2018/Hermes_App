import { useState } from 'react'
import { useUserContext } from '../../contexts/UserContext'
import headerMenuStyles from './header_menu.module.css'

interface HeaderMenuProps{
  handleMenuIsOpen: (isOpen: boolean) => void
}

export default function HeaderMenu(props: HeaderMenuProps){
    const userContext = useUserContext();
    const [userName, setUserName] = useState('');

    function handleInputOnChange(e: React.ChangeEvent<HTMLInputElement>){
      const input = e.target.value;
      setUserName(input);
    }
    
    function handleButtonOnClick(){
      userContext.setUserName(userName);
      props.handleMenuIsOpen(false);
    }

    return(
      <div className={headerMenuStyles.header_menu_container}>
          <span>Group</span>
          <span className={headerMenuStyles.divider_line}/>
          <span>Direct Message</span>
          <span className={headerMenuStyles.divider_line}/>
          <div className={headerMenuStyles.custom_name_container}>
            <input onChange={(e) => handleInputOnChange(e)} placeholder='Custom Name'/>
            <button type='button' onClick={() => handleButtonOnClick()}>Submit</button>
          </div>
      </div>
    );
}