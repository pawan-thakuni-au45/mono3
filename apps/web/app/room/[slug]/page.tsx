import { BACKEND_URL } from "../../config";
import axios from "axios"
async function getRoomId(slug:string){
    const response=await axios.get(`${BACKEND_URL}/room/${slug}`);
    return response.data.id
}
export default async function chatRoom({
    params
}:{
    params:{
        slug:string
    }
}){
    const slug=params.slug
    const roomId=await getRoomId(slug)
}

//in this page i am getting the id of the room by giving the slug

// after getting the id of the room i will create anothre component where all the chat and everything will be stored