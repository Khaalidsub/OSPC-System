import { useQuery } from "@apollo/client"
import { ActiveConversation } from "components"
import { withAuth } from "components/withAuth"
import dynamic from "next/dynamic"
import React, { useEffect, useState } from "react"
import { CHATS, ON_CHATS } from "utililites/schema"
import { chats,chats_chats } from "utililites/__generated__/chats"
import { onChatCreate,onChatCreate_onChatCreate } from "utililites/__generated__/onChatCreate"
import { currentUser_currentUser } from "utililites/__generated__/currentUser"

interface ChatProps{
    currentUser:currentUser_currentUser
    }
function Chat({currentUser}:ChatProps) {
    const { data, subscribeToMore} = useQuery<chats>(CHATS)
    const [currentChat, setCurrentChat] = useState(null)
    

    useEffect(() => {
        const unsubscribe = subscribeToMore<onChatCreate>({
            document:ON_CHATS,
            updateQuery:(prev,{subscriptionData})=>{

                if (!subscriptionData.data) return prev
                return Object.assign({},prev,{ chats:[...prev.chats,subscriptionData.data.onChatCreate]})
            }
        })

        return ()=> unsubscribe()
    },[data])

    const Conversation = ({users = [],id,isOpen}) => {
        const chatUser = users.find((user)=>user.id !== currentUser.id)
        return (
            <div onClick={()=>setCurrentChat(data?.chats.find((chat)=>chat.id === id))} className="flex flex-row p-4 border  py-8 space-x-2 rounded-lg bg-white hover:bg-gray-100 ">
                <img src="fake_images/Rectangle 825.jpg" className='h-12 w-12 rounded-full' alt="" />
                <div className="flex flex-col">
                    <h2 className='text-lg'>{chatUser.name}</h2>
                    <p>lorem ipsum dolor sit amet</p>

                </div>

            </div>
        )
    }
    const ChatConversation = () => {
        return (
            <div className="flex flex-col w-2/5   max-h-screen  bg-white">
                <div>
                    <h2 className="bg-white border p-4 text-xl">Conversations</h2>
                </div>
                <>
          {data?.chats.map(chat=>{
            
              return <Conversation  key={chat.id} {...chat} />
          })}
          </>
            </div>
        )
    }
    
    return (
        <div className="min-h-screen">
            <div className="flex flex-row">
            <ChatConversation />
            {currentChat && <ActiveConversation id={currentChat.id} user={currentUser.id} chatUser={currentChat.users.find(user=>user.id !== currentUser.id).name} />}
            </div>


        </div>
    )
}



export default withAuth(Chat)

