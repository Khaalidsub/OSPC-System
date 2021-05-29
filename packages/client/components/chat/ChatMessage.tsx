import { formatDistance } from "date-fns";
import dynamic from "next/dynamic";
const ViewTextEditor = dynamic(() => import("components/TextEditor/ViewEditor"), {
    ssr: false,
})
export const ChatMessage = ({message,isUser = true,createdAt}) => {
    const bgColor = isUser ? {chat:'justify-self-end', message: 'bg-secondary text-white' ,time:'text-right'} : {message:'bg-white' ,chat:'justify-self-start',time:'text-left'}
  
    
    
    return (<div className={`w-2/6 ${bgColor.chat} `}>
        <div className={` max-w-full  space-y-2`} >
    <div className={` rounded ${bgColor.message} p-3 font-raleway`}>
       <ViewTextEditor content={message} />
        </div>  
        <p className='text-xs'>{formatDistance(Date.parse(createdAt), Date.now(), { addSuffix: true })}</p>
        </div >
        </div>
   
    )
}

export default ChatMessage