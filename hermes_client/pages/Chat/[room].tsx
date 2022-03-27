import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { io, Socket } from 'socket.io-client'
import { usePageTitleContext } from '../../contexts/PageTitleContext'
import chatStyles from './chat.module.css'
import { useUserContext } from '../../contexts/UserContext'

const socket = io(process.env.NEXT_PUBLIC_hermes_api_url!);

export default function Room() {
    const messageLogArray = [
        { id: 1, messageSender: 'George', message: 'So you decided to come and chat. What would you like to talk about?', profileColor: 'red' },
        { id: 2, messageSender: 'Kyle', message: 'Why is the earth flat?', profileColor: 'gray' },
        { id: 3, messageSender: 'Sebastian', message: 'Why do cows moo?', profileColor: 'blue' },
        { id: 4, messageSender: 'Cortana', message: 'I think I am in the wrong chat...', profileColor: 'var(--purple)' }
    ]
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { room } = router.query;
    const { userName } = useUserContext();
    const { setPageTitle } = usePageTitleContext();
    const [message, setMessage] = useState('');
    const [messageLog, setMessageLog] = useState(messageLogArray);

    function SubmitMessage() {
        if (message !== '') {
            const messageObj = {
                id: 5,
                messageSender: userName,
                message: message,
                profileColor: 'green'
            };

            const inMemoryMessageLog = messageLog;
            setMessageLog([...inMemoryMessageLog, messageObj]);
            socket.emit('howdy', messageObj);
            setMessage('');
        }
    }

    const scrollToBottom = () => {
        if(messagesEndRef.current){
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }

    useEffect(() => {
        console.log(socket);

        socket.on('hello', (arg) => {
            console.log('Message from server:', arg);
        });
    }, []);

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
            const id = socket.id;

            const messageObj = {
                id: 6,
                messageSender: msgObj.messageSender,
                message: msgObj.message,
                profileColor: 'red'
            };

            const inMemoryMessageLog = messageLog;
            setMessageLog([...inMemoryMessageLog, messageObj]);
        })
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
                                message.id !== 5 ?
                                    <div className={chatStyles.message_flex_container}>
                                        <div className={chatStyles.message_sender_image} style={{ background: `${message.profileColor}` }}></div>
                                        <div className={chatStyles.message_sender_details}>
                                            <div>{message.messageSender}</div>
                                            <div>{message.message}</div>
                                        </div>
                                    </div> :
                                    <div className={chatStyles.user_message_flex_container}>
                                        <div className={chatStyles.user_details}>
                                            {/* <div>{message.messageSender}</div> */}
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