import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";


export function useSocket(){

    const [loading,setLoading]=useState(true)
    const [socket,setSocket]=useState<WebSocket>()

    useEffect(()=>{
        const ws=new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZGJlOTZjOS00Yjc5LTQ3ZDItOTFkOC00YTRmNGRkYTk2M2EiLCJpYXQiOjE3Mzk4ODExOTV9.KUDoAhle5HBtM5dIxb-xkF0UEpYD49l_yb7EWYJdqMg`)
        ws.onopen=()=>{
            setLoading(false)
            setSocket(ws)
        }
    },[])

    return{
        socket,
        loading
    }
}