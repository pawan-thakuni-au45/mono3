
import express from "express"
import jwt from "jsonwebtoken"
import {JWT_SECRET}  from "@repo/common-backend/config"
import { userMiddlewear } from "./middlewear"

const app=express()

app.post("/signup",(req,res)=>{

    const userId=1
    res.send({
        message:"signed in"
    })
})

app.post("/signin",(req,res)=>{

    const userId=1
    const token=jwt.sign({
        userId
    },JWT_SECRET)
})

app.post("/chat",userMiddlewear,(req,res)=>{

})
app.listen(3001)