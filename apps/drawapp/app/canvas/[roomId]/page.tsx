"use client"
import { initDraw } from "@/draw"
import { useRef,useEffect } from "react"
export default function Canvas(){

    const canvasRef=useRef<HTMLCanvasElement>(null)

    useEffect(()=>{

         if(canvasRef.current){
           initDraw(canvasRef.current)
        
        }
    },[canvasRef])
    return<div className="bg-white">
        <canvas ref={canvasRef} width={2000} height={1000}></canvas>
        <button className="absolute bg-amber-500 bottom-0 right-0">rect</button>
        <button className="absolute bg-amber-500 bottom-1 right-1">circle</button>

        </div>
}