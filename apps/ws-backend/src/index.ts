
import {WebSocketServer,WebSocket} from "ws"
import jwt, { JwtPayload } from "jsonwebtoken"
import {JWT_SECRET} from "@repo/common-backend/config"
import { parse } from "dotenv"

const wss=new WebSocketServer({port:3002})

interface User {
    ws:WebSocket,
    rooms:string[],
userId:string
}

const users:User[]=[]
function checkUser(token:string){
    const decode=jwt.verify(token,JWT_SECRET)
           if(!decode || !(decode as JwtPayload).userId){
            return 
           }
           return ( decode as JwtPayload).userId

}

wss.on('connection',function connection(ws,request){
    const url=request.url
    if(!url){
        return
    }

    const queryParams=new URLSearchParams(url.split("?")[1])
    const token=queryParams.get('token') || ""
    const userId=checkUser(token)
    
   

   
 if(!userId){
    return
 }  

 users.push({
    userId,
    rooms:[],
    ws
 })
 
 ws.on('message',function message(data){
    const parseData=JSON.parse(data as unknown as string)
    if(parseData.type==='join room'){
       const user= users.find(x=> x.ws===ws)
       user?.rooms.push(parseData.rooId)
    }

    if(parseData.type==='leave room'){
        const user=users.find(x=>x.ws===ws)
        if(!user){
            return 
        }
        user.rooms=user?.rooms.filter(parseData.roomId)
    }

    if(parseData.type==='chat'){
        const roomId=parseData.roomId
        const message=parseData.message

        users.forEach(user=>{
            if(user.rooms.includes(roomId)){
                user.ws.send(JSON.stringify({
                    type:"chat",
                    message:message,
                    roomId
                }))
            }

        })
    }
    })

  
})
