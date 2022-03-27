import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { io } from 'socket.io-client'
import { usePageTitleContext } from '../../contexts/PageTitleContext'
import chatStyles from './chat.module.css'
import { useUserContext } from '../../contexts/UserContext'

const socket = io(process.env.NEXT_PUBLIC_hermes_api_url!);

interface UserModel {
    id:string,
    userName: string,
    profileColor: string
}

export default function Room() {
    const messageLogArray = [
        { id: '1', messageSender: 'George', message: 'So you decided to come and chat. What would you like to talk about?', profileColor: 'red' },
        { id: '2', messageSender: 'Kyle', message: 'Why is the earth flat?', profileColor: 'gray' },
        { id: '3', messageSender: 'Sebastian', message: 'Why do cows moo?', profileColor: 'blue' },
        { id: '4', messageSender: 'Cortana', message: 'I think I am in the wrong chat...', profileColor: 'var(--purple)' }
    ]
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { room } = router.query;
    const userContext = useUserContext();
    const { setPageTitle } = usePageTitleContext();
    const [message, setMessage] = useState('');
    const [messageLog, setMessageLog] = useState(messageLogArray);
    const [userArray, setUserArray] = useState<UserModel[]>([])

    function SubmitMessage() {
        if (message !== '') {
            const messageObj = {
                id: socket.id,
                messageSender: userContext.userName,
                message: message,
                profileColor: userContext.profileColor
            };

            const inMemoryMessageLog = messageLog;
            setMessageLog([...inMemoryMessageLog, messageObj]);
            socket.emit('howdy', messageObj);
            setMessage('');
        }
    }

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }

    useEffect(() => {
        const userName = sessionStorage.getItem('userName');
        const profileColor = sessionStorage.getItem('profileColor');
        if (!userName && !profileColor) {
            router.push('/User')
        }
        else if (userName && profileColor) {
            userContext.setUserName(userName);
            userContext.setProfileColor(profileColor);
        }

        console.log(socket);

        socket.on('hello', (arg) => {
            console.log('Message from server:', arg);

            const user:UserModel = {
                id: socket.id,
                userName: userContext.userName,
                profileColor: userContext.profileColor
            }

            socket.emit('user-join', user);
    
            const inMemoryUserArray = userArray;
            setUserArray([...inMemoryUserArray, user]);
        });
        
        
    }, []);

    useEffect(() =>{
        console.log('Members present: ', userArray);
    }, [userArray])

    useEffect(() => {
        if (room) {
            setPageTitle(room.toString());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [room]);

    useEffect(() => {
        scrollToBottom();
    }, [messageLog]);

    useEffect(() => {
        socket.on('chat-response', msgObj => {
            console.log(msgObj);

            const messageObj = {
                id: msgObj.id,
                messageSender: msgObj.messageSender,
                message: msgObj.message,
                profileColor: msgObj.profileColor
            };

            const inMemoryMessageLog = messageLog;
            setMessageLog([...inMemoryMessageLog, messageObj]);
        });

        socket.on('user', user => {
            console.log(user);
            const inMemoryUserArray = userArray;
            setUserArray([...inMemoryUserArray, user]);
        })

        return () => {
            socket.off();
        }
    });

    return (
        <div className={chatStyles.room_container}>
            <Head>
                <title>Chat Room</title>
            </Head>
            <div className={chatStyles.chat_log}>
                {
                    messageLog.map((message, index) =>
                        <div key={index} ref={messagesEndRef}>
                            {
                                message.id !== socket.id ?
                                    <div className={chatStyles.message_flex_container}>
                                        <div className={chatStyles.message_sender_image} style={{ background: `${message.profileColor}` }}></div>
                                        <div className={chatStyles.message_sender_details}>
                                            <div>{message.messageSender}</div>
                                            <div>{message.message}</div>
                                        </div>
                                    </div> :
                                    <div className={chatStyles.user_message_flex_container}>
                                        <div className={chatStyles.user_details}>
                                            <div>{message.message}</div>
                                        </div>
                                        <div className={chatStyles.user_image} style={{ background: `${message.profileColor}` }}></div>
                                    </div>
                            }
                        </div>
                    )
                }
            </div>
            <div className={chatStyles.user_input_container}>
                <input
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder='Send Message...'
                    value={message}
                />
                <button onClick={() => SubmitMessage()}>Send</button>
            </div>
        </div>
    );
}