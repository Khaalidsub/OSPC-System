import { ActiveConversation } from "components"
import dynamic from "next/dynamic"
import React, { useState } from "react"


function Chat() {


    const Conversation = () => {
        return (
            <div className="flex flex-row p-4 border  py-8 space-x-2 rounded-lg bg-white hover:bg-gray-100 ">
                <img src="fake_images/Rectangle 825.jpg" className='h-12 w-12 rounded-full' alt="" />
                <div className="flex flex-col">
                    <h2>Adelia</h2>
                    <p>lorem ipsum dolor sit amet</p>

                </div>

            </div>
        )
    }
    const ChatConversation = () => {
        return (
            <div className="flex flex-col w-2/5  overflow-hidden truncate relative max-h-screen min-h-screen bg-white">
                <div>
                    <h2 className="bg-white border p-4 text-xl">Conversations</h2>
                </div>
                <Conversation />
                <Conversation />
                <Conversation />
                <Conversation />
                <Conversation />
                <Conversation />
                <Conversation />
                <Conversation />
                <Conversation />
            
            </div>
        )
    }
 
    return (
        <div className="min-h-screen">
            <div className="flex flex-row">
            <ChatConversation />
            <ActiveConversation />
            </div>


        </div>
    )
}



export default Chat

