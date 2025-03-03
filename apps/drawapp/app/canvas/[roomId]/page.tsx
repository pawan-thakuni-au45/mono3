"use client"
import { useRef,useEffect } from "react"
export default function Canvas(){

    const canvasRef=useRef<HTMLCanvasElement>(null)

    useEffect(()=>{

         if(canvasRef.current){
            const canvas=canvasRef.current
            const ctx=canvas.getContext("2d")
            ctx?.strokeRect(100,0,100,100)       
        }
    },[canvasRef])
    return<div className="bg-white">
        <canvas ref={canvasRef} width={300} height={500}></canvas>
        </div>
}