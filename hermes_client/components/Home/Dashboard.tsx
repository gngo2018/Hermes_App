import Link from 'next/link'
import { usePageTitleContext } from '../../contexts/PageTitleContext';
import dashboardStyles from './dashboard.module.css'

export default function Dashboard() {
    let chatArray = [
        { chatTitle: 'Public', lastMessage: 'Some last message text' },
        { chatTitle: 'Test', lastMessage: 'Hey! Do ya come here often?' },
        { chatTitle: 'Random', lastMessage: 'Rando Text' }
    ];

    const {setPageTitle} = usePageTitleContext();

    return (
        <div className={dashboardStyles.dashboard_container}>
            {
                chatArray.map((chat, index) =>
                    <Link href={'/Chat/' + chat.chatTitle}>
                        <div className={dashboardStyles.chat_flex_container} key={index} onClick={() => setPageTitle(chat.chatTitle)}>
                            <div className={dashboardStyles.chat_image}></div>
                            <div className={dashboardStyles.chat_text}>
                                <div>{chat.chatTitle}</div>
                                <div>{chat.lastMessage}</div>
                            </div>
                        </div>
                    </Link>
                )
            }
        </div>
    );
}