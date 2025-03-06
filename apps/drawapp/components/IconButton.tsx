import { ReactNode } from "react";


export default function IconButton({icon,onClick,activated}:{icon:ReactNode,onClick:()=>void,activated:boolean}){

return <div className={`p-3 m-3 flex ${activated ?"text-red-600" :"text-white"}`} onClick={onClick}>
{icon}
</div>
}