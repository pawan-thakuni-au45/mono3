
import { useEffect,useRef, useState } from "react";
import { initDraw } from "@/draw";

export default function Canvas({roomId,socket}:{roomId:string,socket:WebSocket}){
    const canvasRef=useRef<HTMLCanvasElement>(null)
    useEffect(()=>{

        if(canvasRef.current){
          initDraw(canvasRef.current,roomId,socket)
       
       }
   },[canvasRef])
   return<div className="bg-white">
   
   <canvas ref={canvasRef} width={2000} height={1000}></canvas>
   <button className="absolute bg-amber-500 bottom-0 right-0">rect</button>
   <button className="absolute bg-amber-500 bottom-1 right-1">circle</button>

   </div>
}