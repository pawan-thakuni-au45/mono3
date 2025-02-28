"use client"

import { useEffect, useState } from "react"
import { useSocket } from "../hooks/useSocket"
import { Socket } from "dgram"
import { parse } from "path"

export function chatroomclient({message,id}:{
    message:{message:string}[],
    id:string
}){


    const [chat,setChat]=useState(message)
    const {socket,loading}=useSocket()
    const [currentMessage,setCurrentMessage]=useState("")

    useEffect(()=>{

        if(socket && !loading){
            socket.send(JSON.stringify({
                type:"join room",
                roomId:id
            }))
            socket.onmessage=(event)=>{
                const parsedata=JSON.parse(event.data)
                if(parsedata.type==="chat"){
                    setChat(c=>[...c,{message:parsedata.message}])

                }
            }
        }

    }),[socket,loading]

    return <div>
        <div>
        {message.map(m=><div>{m.message}</div>)}
        <input type="text" value={currentMessage} onChange={e=>{
            setCurrentMessage(e.target.value);
        }}></input>
        <button onClick={()=>{
            socket?.send(JSON.stringify({
                type:"chat",
                roomID:id,
             message:currentMessage
            }))
            setCurrentMessage("")
        }}> Send Message</button>
        </div>

    </div>
}