import { useState } from 'react'
import axios from 'axios'
const url = process.env.NEXT_PUBLIC_hermes_api_url +'api/ping';

export default function Test(){
    const [message, setMessage] = useState('')

    async function PingAPI(){
        const data = await axios.get(url)
        console.log(data);
        setMessage(data.data.message);
    }

    return(
        <>
            <button onClick={() => PingAPI()}>Ping</button>
            <h2>{message}</h2>
        </>
    );
}