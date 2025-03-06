
import { useEffect,useRef, useState } from "react";
import { initDraw } from "@/draw";
import { redirect } from "next/navigation";
import IconButton from "./IconButton";
import {Circle, Pencil, RectangleHorizontal} from "lucide-react";

type Shape="circle" | "rect" |"pencil"


export default function Canvas({roomId,socket}:{roomId:string,socket:WebSocket}){
    const canvasRef=useRef<HTMLCanvasElement>(null)
    const[selectedicon,setSelectedicon]=useState<Shape>("circle")
    useEffect(()=>{
        if(canvasRef.current){
          initDraw(canvasRef.current,roomId,socket)
       
       }
   },[canvasRef])
   return<div style={{
    background:"red",
    height:"100vh",
    overflow:"hidden"
   }}>
   
   <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
   <Topbar selectedicon={selectedicon} setSelectedicon={setSelectedicon}></Topbar>
   </div >

   

}

function Topbar({selectedicon,setSelectedicon}:{selectedicon:Shape,setSelectedicon:(s:Shape)=>void}){
    return <div style={{
        position:"fixed",
        left:10,
        top:10
    }}>
<div>
<IconButton icon={<Pencil/>} activated={selectedicon==="pencil"} onClick={()=>{setSelectedicon("pencil")}} ></IconButton>
<IconButton icon={<RectangleHorizontal/>} activated={selectedicon==="rect"} onClick={()=>{setSelectedicon("rect")}}> </IconButton>
<IconButton icon={<Circle/>} activated={selectedicon==="circle"} onClick={()=>{setSelectedicon("circle")}}></IconButton>
</div>

    </div>
}


