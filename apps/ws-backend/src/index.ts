
import {webSocketServer} from "ws"

const wss=new webSocketServer({port:3002})

wss.on('connection',function connection(ws,request){
    const url=request.url
    if(!url){
        return
    }

    const a=URLSearchParams.url(split("?")[1])
    


    ws.on('message',function message(data){
        ws.send('mes')
    })
})
