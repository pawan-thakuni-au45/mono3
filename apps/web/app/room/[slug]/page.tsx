import { BACKEND_URL } from "../../config";
import { ChatRoom} from "../../../component/ChatRoom";
import axios from "axios"
async function getRoomId(slug:string){
    const response=await axios.get(`${BACKEND_URL}/room/${slug}`);
    return response.data.room.id
}
export default async function chatRoom1({
    params
}:{
    params:{
        slug:string
    }
}){
    const slug=(await params).slug
    const roomId=await getRoomId(slug)
    return <ChatRoom id={roomId}></ChatRoom>
}

//in this page i am getting the id of the room by giving the slug

// after getting the id of the room i will create anothre component where all the chat and everything will be stored