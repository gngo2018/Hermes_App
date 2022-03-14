import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { io, Socket } from 'socket.io-client'
import { usePageTitleContext } from '../../contexts/PageTitleContext'
import chatStyles from './chat.module.css'

const socket = io('ws:' + process.env.NEXT_PUBLIC_hermes_ws_url, {secure: true});

export default function Room(){
    const messageLogArray= [
        {id: 1, messageSender: 'George', message:'So you decided to come and chat. What would you like to talk about?', profileColor: 'red'},
        {id: 2, messageSender: 'Kyle', message:'Why is the earth flat?', profileColor: 'gray'},
        {id: 3, messageSender: 'Sebastian', message:'Why do cows moo?', profileColor:'blue'},
        {id: 4, messageSender: 'Cortana', message:'I think I am in the wrong chat...', profileColor:'var(--purple)'}
    ]
    const router = useRouter();
    const {room} = router.query;
    const {setPageTitle} = usePageTitleContext();
    const [message, setMessage] = useState('');
    const [messageLog, setMessageLog] = useState(messageLogArray);


    function SubmitMessage(){
        if(message !== '') {
            const messageObj = {
                id: 5,
                messageSender: 'Guest',
                message: message,
                profileColor: 'green'
            };
    
            const inMemoryMessageLog = messageLog;
            setMessageLog([...inMemoryMessageLog, messageObj]);
            socket.emit('howdy', message);
            setMessage('');
        }
    }

    useEffect(()=>{
        if(room){
            setPageTitle(room.toString());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [room]);

    useEffect(() =>{
        socket.on('hello', (arg) => {
            console.log('Message from server:', arg);
        });
    }, [])

    return(
        <div className={chatStyles.room_container}>
            <Head>
                <title>Chat Room</title>
            </Head>
            <div className={chatStyles.chat_log}>
                {
                    messageLog.map((message, index) =>
                        <div key={index}>
                            {
                                message.id !== 5 ? 
                                <div className={chatStyles.message_flex_container}>
                                    <div className={chatStyles.message_sender_image} style={{background:`${message.profileColor}`}}></div>
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
                                    <div className={chatStyles.user_image} style={{background:`${message.profileColor}`}}></div>
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