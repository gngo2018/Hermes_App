import { useRouter } from 'next/router'
import Head from 'next/head'
import roomStyles from './room.module.css'

export default function Room(){
    const router = useRouter();
    const {room} = router.query;

    return(
        <div className={roomStyles.room_container}>
            <Head>
                <title>Chat Room</title>
            </Head>
            <h2>{room} Chat</h2>
        </div>
    );
}