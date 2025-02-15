import { NextFunction,Response,Request } from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/common-backend/config"


export function userMiddlewear(req:Request,res:Response,next:NextFunction){
    const token=req.headers["authorization"] ?? ""

    const decode=jwt.verify(token,JWT_SECRET)

    if(decode){
        //@ts-ignore
        req.userId=decode.userId
        next()
    }
}