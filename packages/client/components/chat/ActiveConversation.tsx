import dynamic from "next/dynamic"
import React, { useState } from "react"
import { ChatMessage } from "."

const TextEditor = dynamic(() => import("components/TextEditor/ChatEditor"), {
    ssr: false,
})
export const ActiveConversation = () => {
    const [body, setBody] = useState('')

    //get the messages of the active chat
    // send messages to that specific chat
    return (
        <div className="flex flex-col w-full">

            <div>
                <h2 className="bg-white border p-4 text-xl">Adelia</h2>
            </div>
            <div className="h-3/4 grid  space-y-6 py-8 max-h-16 overflow-scroll">
                <ChatMessage message={'lorem ipsum dolor sit amet, consect'} isUser={true}/>
                <ChatMessage message={'lorem ipsum dolor sit amet, consect'} isUser={true}/>
                <ChatMessage message={'lorem ipsum dolor sit amet, consect'} isUser={false}/>
                <ChatMessage message={'lorem ipsum dolor sit amet, consect'} isUser={false}/>
                <ChatMessage message={'lorem ipsum dolor sit amet, consect'} isUser={false}/>
                <ChatMessage message={'lorem ipsum dolor sit amet, consect'} isUser={false}/>
                <ChatMessage message={'lorem ipsum dolor sit amet, consect'} isUser={false}/>
                <ChatMessage message={'lorem ipsum dolor sit amet, consect'} isUser={false}/>
                <ChatMessage message={'lorem ipsum dolor sit amet, consect'} isUser={false}/>
                <ChatMessage message={'lorem ipsum dolor sit amet, consect'} isUser={false}/>
                <ChatMessage message={'lorem ipsum dolor sit amet, consect'} isUser={false}/>
                <ChatMessage message={'lorem ipsum dolor sit amet, consect'} isUser={false}/>
                <ChatMessage message={'lorem ipsum dolor sit amet, consect'} isUser={false}/>
                <ChatMessage message={'lorem ipsum dolor sit amet, consect'} isUser={false}/>
                <ChatMessage message={'lorem ipsum dolor sit amet, consect'} isUser={false}/>
                <ChatMessage message={'lorem ipsum dolor sit amet, consect'} isUser={false}/>
                <ChatMessage message={'lorem ipsum dolor sit amet, consect'} isUser={false}/>
                <ChatMessage message={'lorem ipsum dolor sit amet, consect'} isUser={false}/>
                <ChatMessage message={'lorem ipsum dolor sit amet, consect'} isUser={false}/>
                <ChatMessage message={'lorem ipsum dolor sit amet, consect'} isUser={false}/>
                <ChatMessage message={'lorem ipsum dolor sit amet, consect'} isUser={false}/>
                <ChatMessage message={'lorem ipsum dolor sit amet, consect'} isUser={false}/>
                <ChatMessage message={'lorem ipsum dolor sit amet, consect'} isUser={false}/>
                <ChatMessage message={'lorem ipsum dolor sit amet, consect'} isUser={false}/>

            </div>
            <div className='flex flex-row items-center space-x-2'>
                <div className='w-full'>
                <TextEditor onInput={setBody} />
                </div>
               <div className='w-1/12'>
                <img src="assets/send.svg" className='h-8 w-8 p-2 rounded-xl cursor-pointer border' alt=""/>
               </div>
            </div>
        </div>
    )
}

export default ActiveConversation