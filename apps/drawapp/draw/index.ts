import axios from "axios"
import { HTTP_BACKEND } from "@/config"

type Shape={
    type:"rect",
    x:number,
    y:number,
    height:number,
    width:number

} |{
    type:"cicle",
    centerX:number,
    centerY:number,
    radius:number
}
export async function  initDraw(canvas:HTMLCanvasElement,roomId:string){
    const ctx=canvas.getContext("2d")

    let existingShapes:Shape[]=await getexistingShapes(roomId)

    if(!ctx){
        return
    }

    clearCanvas(existingShapes,canvas,ctx)

    let clicked=false
    let startX=0;
    let startY=0
    canvas.addEventListener("mousedown",(e)=>{
         clicked=true
        startX=e.clientX;
        startY=e.clientY;
    })  
  
    
    canvas.addEventListener("mouseup",(e)=>{
        clicked=false
        const width= e.clientX-startX;
           const height=e.clientY-startY;
        //here the mouse will stop making shape and then only i will push shapwes inside this array
        existingShapes.push({
            type:"rect",
            x:startX,
            y:startY,
            height,
            width

        })
    })
    canvas.addEventListener("mousemove",(e)=>{
        if(clicked){
           const width= e.clientX-startX;
           const height=e.clientY-startY;
          
          clearCanvas(existingShapes,canvas,ctx)
           ctx.strokeStyle="rgba(255,255,255)"
           ctx.strokeRect(startX,startY,width,height)
        }
    })


}
//here i am clearing rect and rendering new ones
function clearCanvas(existingShapes:Shape[], canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle= "rgba(0, 0, 0)"
    ctx.fillRect(0, 0,canvas.width,canvas.height)

    existingShapes.map((shape)=>{
        if(shape.type=="rect"){
            ctx.strokeStyle="rgba(255,255,255)"
            ctx.strokeRect(shape.x,shape.y,shape.width,shape.height);
        }
    })
}

//getexistingshapes hitting the backend getting all the existing shapes from their 
export async function getexistingShapes (roomId:string){
    const res=await axios.get(`${HTTP_BACKEND}/chats/${roomId}`)
    const messages=res.data.messages

    //and here converting them string to object and returning it 
    const shape=messages.map((x:{message:string})=>{
        const messageData=JSON.parse(x.message)
        return messageData
    })
    return shape


}