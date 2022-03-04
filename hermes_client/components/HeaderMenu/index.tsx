import headerMenuStyles from './header_menu.module.css'

export default function HeaderMenu(){
    return(
      <div className={headerMenuStyles.header_menu_container}>
          <span>Group</span>
          <span className={headerMenuStyles.divider_line}/>
          <span>Direct Message</span>
      </div>
    );
}