
import {z} from "zod"
export const createUserSchema=z.object({
     username:z.string().min(3).max(20),
     password:z.string(),
     email:z.string()
})


export const signInSchema=z.object({
    
    password:z.string(),
    email:z.string()
})

export const createRoomSchema=z.object({
    name:z.string()
})