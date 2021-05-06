import { formatDistance } from "date-fns";
import dynamic from "next/dynamic";
const ViewTextEditor = dynamic(() => import("components/TextEditor/ViewEditor"), {
    ssr: false,
})
export const ChatMessage = ({message,isUser = true,createdAt}) => {
    const bgColor = isUser ? ' justify-self-end bg-secondary text-white text-right' : 'bg-white justify-self-start'
    const content = isUser ? 'justify-self-end text-right' : 'justify-self-start text-left'
    
    
    return (
        <div className={` w-1/2 ${content}`} >
    <div className={` rounded  ${bgColor} p-3 font-raleway`}>
       <ViewTextEditor content={message} />
        </div>  
        <p className='text-xs '>{formatDistance(Date.parse(createdAt), Date.now(), { addSuffix: true })}</p>
        </div >
   
    )
}

export default ChatMessage