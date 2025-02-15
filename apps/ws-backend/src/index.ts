
import {WebSocketServer} from "ws"
import jwt, { JwtPayload } from "jsonwebtoken"
import {JWT_SECRET} from "@repo/common-backend/config"

const wss=new WebSocketServer({port:3002})

wss.on('connection',function connection(ws,request){
    const url=request.url
    if(!url){
        return
    }

    const queryParams=new URLSearchParams(url.split("?")[1])
    const token=queryParams.get('token') || ""
    const decode=jwt.verify(token,JWT_SECRET)
    if(!decode || !(decode as JwtPayload ).userId){
        ws.close();
    return 
    }

   



    ws.on('message',function message(data){
        ws.send('mes')
    })
})
