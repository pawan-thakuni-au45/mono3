import { BACKEND_URL } from "../app/config"
import axios from "axios"

export async function getChats(roomId:string){
    const response=await axios.get(`${BACKEND_URL}/chats/${roomId}`)
    return response.data.message
}

export async function ChatRoom({id}:{
    id:string
}){
    const message=await getChats(id)
}
//given this initial set of messages and id ,now we will render chatroomclient.ts