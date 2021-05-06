import ChatConversation from "./ChatConversation"

const Conversation = ({users ,id,isOpen, userId,setCurrentChat,chats}) => {
    const chatUser = users.find((user)=>user.id !== userId)
    const statusSpan = isOpen ? 'bg-blue-200 text-primary' : 'bg-red-100 text-primary '
    return (
        <div onClick={()=>setCurrentChat(chats.find((chat)=>chat.id === id))} className="flex flex-row p-4 border  py-8 space-x-2 rounded-lg bg-white hover:bg-gray-100 ">
            <img src="fake_images/fake_user.png" className='h-12 w-12 rounded-full' alt="" />
            <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between">
                <h2 className='text-lg '>{chatUser.name}</h2>
                <span className={`${statusSpan} p-2 rounded-lg`}>{isOpen ? 'open' : 'closed'}</span>
                </div>
              
                <p>lorem ipsum dolor sit amet</p>

            </div>

        </div>
    )
}

export default Conversation