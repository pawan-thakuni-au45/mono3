"use client"
import { useEffect,useRef, useState } from "react";
import { initDraw } from "@/draw"
import { WS_URL } from "@/config";
export  function Canvas({roomId}:{roomId:string}){

const canvasRef=useRef<HTMLCanvasElement>(null)
const [socket,setSocket]=useState<WebSocket |null> (null)

useEffect(()=>{
      const ws=new WebSocket(WS_URL)
      ws.onopen=()=>{
         
        setSocket(ws)
         

      }
})

    useEffect(()=>{

         if(canvasRef.current){
           initDraw(canvasRef.current,roomId)
        
        }
    },[canvasRef])
    return<div className="bg-white">
        <canvas ref={canvasRef} width={2000} height={1000}></canvas>
        <button className="absolute bg-amber-500 bottom-0 right-0">rect</button>
        <button className="absolute bg-amber-500 bottom-1 right-1">circle</button>

        </div>
        }