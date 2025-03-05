"use client"
import { useEffect,useRef, useState } from "react";
import { initDraw } from "@/draw"
import { WS_URL } from "@/config";
import Canvas from "./Canvas";
export  function RoomCanvas({roomId}:{roomId:string}){


const [socket,setSocket]=useState<WebSocket |null> (null)

useEffect(()=>{
      const ws=new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiNzQxNWUxYi01ZGYxLTQyNTMtOTFlZi0xZjY2MzViOWQwM2YiLCJpYXQiOjE3NDExNTIwOTd9.RUdC9NcJLxIfxTMN55DmMTtXZ2P0NTbqriZxH2OdZ6E`)
      ws.onopen=()=>{
         
        setSocket(ws);
        const data=JSON.stringify({
            type:"join room",
            roomId
        })
        console.log(data);
        ws.send(data)
         

      }
})



    if(!socket){
        return <div>
           Connecting...
           </div>
    }

        return <div>
            <Canvas roomId={roomId} socket={socket}></Canvas>
        </div>
    
   
        }