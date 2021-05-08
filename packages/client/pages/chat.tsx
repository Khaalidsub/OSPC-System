import { useQuery } from "@apollo/client"
import { ActiveConversation, InlineSearchField, SearchField } from "components"
import { withAuth } from "components/withAuth"
import dynamic from "next/dynamic"
import React, { useEffect, useState } from "react"
import { CHATS, ON_CHATS } from "utililites/schema"
import { chats,chats_chats } from "utililites/__generated__/chats"
import { onChatCreate,onChatCreate_onChatCreate } from "utililites/__generated__/onChatCreate"
import { currentUser_currentUser } from "utililites/__generated__/currentUser"
import ChatConversation from "components/chat/ChatConversation"

interface ChatProps{
    currentUser:currentUser_currentUser
    }
function Chat({currentUser}:ChatProps) {
    const { data, subscribeToMore,startPolling,} = useQuery<chats>(CHATS)
    const [currentChat, setCurrentChat] = useState(null)
    const [chats, setChats] = useState([]as chats_chats[])
    const [search, setSearch] = useState('')
    
    useEffect(() => {
    setChats(data?.chats)
    // startPolling(10)
    },[data])
    useEffect(() => {
        const result = data?.chats.filter(chat=>{
            let user = chat.users.find(user=>user.id !== currentUser.id)
            return user.name.toLowerCase().includes(search.toLowerCase())
        })
        setChats(result)
    },[search])

    useEffect(() => {
        const unsubscribe = subscribeToMore<onChatCreate>({
            document:ON_CHATS,
            updateQuery:(prev,{subscriptionData})=>{

                if (!subscriptionData.data) return prev
                if (!prev.chats.includes(subscriptionData.data.onChatCreate)) 
                    return Object.assign({},prev,{ chats:[...prev.chats,subscriptionData.data.onChatCreate]})
                

                return Object.assign({},prev,{ chats:[...prev.chats.filter(chat=>chat.id !== subscriptionData.data.onChatCreate.id),subscriptionData.data.onChatCreate]})
            }
        })

        return ()=> unsubscribe()
    },[data])


  
    
    return (
        <div className="min-h-screen">
            <div className="flex flex-row">
            <ChatConversation currentUser={currentUser}  setCurrentChat={setCurrentChat} search={search} setSearch={setSearch} currentChat={currentChat} chats={chats}  />
            {currentChat && <ActiveConversation id={currentChat.id} user={currentUser.id} isOpen={currentChat.isOpen} chatUser={currentChat.users.find(user=>user.id !== currentUser.id).name} />}
            </div>


        </div>
    )
}



export default withAuth(Chat)

