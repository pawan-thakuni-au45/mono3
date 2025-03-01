
import express from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/common-backend/config"
import { userMiddlewear } from "./middlewear"
import { createUserSchema, signInSchema, createRoomSchema } from "@repo/common/types"
import { prismaClient } from "@repo/db/client"

const app = express()
app.use(express.json())

app.post("/signup", async (req, res) => {

    const parseData = createUserSchema.safeParse(req.body)

    if (!parseData.success) {
        res.send({
            message: "unauthorized thi"
        })
        return
    }
    try {
        await prismaClient.user.create({
            data: {
                username: parseData.data.username,
                password: parseData.data.password,
                email: parseData.data?.email
            }


        })
        res.send({
            message: "signed up"
        })

    } catch (err) {
        res.status(411).json({
            message: "user with this email already exist,please tyr another email"
        })

    }



})

app.post("/signin", async (req, res) => {
    const parseData = signInSchema.safeParse(req.body)
    if (!parseData.success) {
        res.send({
            message: "unauthorized"
        })
        return
    }


    try {
        const user = await prismaClient.user.findFirst({
            where: {
                password: parseData.data.password,
                email: parseData.data.email
            }
        })
        if (!user) {
            res.status(403).json({
                message: "user does not exist"
            })
            return;
        }

        const userId = user?.id
        const token = jwt.sign({
            userId
        }, JWT_SECRET)
        res.json({
            message: "user signed in ",
            token
        })


    } catch (error) {
        res.json({
            message: "something went wrong"
        })

    }
})


app.post("/room", userMiddlewear, async (req, res) => {

    const parseData = createRoomSchema.safeParse(req.body)
    if (!parseData.success) {
        res.send({
            message: "jhj"
        })
        return
    }
    //@ts-ignore
    const userId = req.userId



    try {
        const room = await prismaClient.room.create({
            data: {
                slug: parseData.data.name,
                adminId: userId
            }
        })
        res.json({
            roomId: room.id
        })

    } catch (e) {
        res.status(411).json({
            message: "user already exist with this rooid"
        })

    }



})

app.get("/chats/:roomId", async (req, res) => {

    try{
        const roomId = Number(req.params.roomId)
        const messages = await prismaClient.chat.findMany({
            where: {
                roomId: roomId
            },
            orderBy: {
                roomId: "desc"
            },
            take: 50
    
        })
        res.json({
            messages
        })
    }catch(err){
        res.json({
            messages:[]
        })

    }
   
})

app.get("/room/:slug", async (req, res) => {
   
    try{
        const slug = req.params.slug
        const room = await prismaClient.room.findFirst({
            where: {
                slug
            }
    
    
        })
        res.json({
            room
        })
    }catch(err){
        res.json({
            message:"wrong",
            err
        })
    }
  
})


app.listen(3001)