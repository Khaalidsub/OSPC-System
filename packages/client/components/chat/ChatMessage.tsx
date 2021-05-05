import message from "globalize/dist/globalize/message";

export const ChatMessage = ({message,isUser = true}) => {
    const bgColor = isUser ? 'bg-secondary' : 'bg-white'
    const textColor = isUser ? 'text-white' : 'text-black'
    const content = isUser ? 'justify-self-end' : 'justify-self-start'
    return (
        <div className={` rounded ${content}  ${bgColor} ${textColor} p-2 `}>
<p>{message}</p>
        </div>
    )
}

export default ChatMessage