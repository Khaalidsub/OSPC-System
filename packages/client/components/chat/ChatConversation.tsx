import React from "react"
import { InlineSearchField } from ".."
import Conversation from "./Conversation"

const ChatConversation = ({chats = [],search,setSearch,currentChat,setCurrentChat}) => {
    return (
        <div className="flex flex-col w-2/5   max-h-screen  bg-white">
            <div className='flex flex-row bg-white border p-4 w-full space-x-2 items-center'>
                <h2 className=" text-xl">Conversations</h2>
            <InlineSearchField placeholder="chat user"  setSearch={setSearch} search={search}/>
            </div>
            <>
      {chats.map(chat=>{
        
          return <Conversation  key={chat.id} {...chat} setCurrentChat={setCurrentChat} chats={chats} />
      })}
      </>
        </div>
    )
}

export default ChatConversation