import { useRouter } from 'next/router'
import roomStyles from './room.module.css'

export default function Room(){
    const router = useRouter();
    const {room} = router.query;

    return(
        <div className={roomStyles.room_container}>
            <h2>{room} Chat</h2>
        </div>
    );
}