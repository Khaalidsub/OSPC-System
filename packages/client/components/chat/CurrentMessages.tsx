import React, { useEffect } from "react"
import { ChatMessage } from "."

export const MessageList = ({id,user,messages,subscribeToMore})=>{
   
    useEffect(() => {
        
        
        const unsubscribe = subscribeToMore()

        return ()=> unsubscribe()
    },[messages])
    return(
        <>
        {messages?.map(message=>{
            return <ChatMessage createdAt={message.createdAt} key={message.id} message={message.input} isUser={message.sender.id === user} />
        })}
        </>
    )
}

export default MessageList