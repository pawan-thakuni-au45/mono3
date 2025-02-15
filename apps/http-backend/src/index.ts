
import express from "express"
import jwt from "jsonwebtoken"
import {JWT_SECRET}  from "@repo/common-backend/config"
import { userMiddlewear } from "./middlewear"
import {createUserSchema,signInSchema, createRoomSchema} from "@repo/common/types"

const app=express()

app.post("/signup",(req,res)=>{

    const data=createUserSchema.safeParse(req.body)
    if(!data.success){
        res.send({
            message:"unauthorized"
        })
        return 
    }

    const userId=1
    res.send({
        message:"signed in"
    })
})

app.post("/signin",(req,res)=>{
    const data=signInSchema.safeParse(req.body)
    if(!data.success){
        res.send({
            message:"unauthorized"
        })
        return 
    }

    const userId=1
    const token=jwt.sign({
        userId
    },JWT_SECRET)
})

app.post("/chat",userMiddlewear,(req,res)=>{

    const data=createRoomSchema.safeParse(req.body)
    if(!data.success){
        res.send({
            message:"jhj"
        })
        return 
    }

})
app.listen(3001)