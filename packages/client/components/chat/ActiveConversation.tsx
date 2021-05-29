import { useMutation, useQuery } from '@apollo/client';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import { MESSAGES, ON_MESSAGE, SEND_MESSAGE } from 'utililites/schema';
import { MessageList } from '.';
import { messages, messagesVariables } from 'utililites/__generated__/messages';
import { onMessageSent } from 'utililites/__generated__/onMessageSent';
import {
    sendMessage,
    sendMessageVariables,
} from 'utililites/__generated__/sendMessage';
import { htmlToText } from 'html-to-text';
import { profileDefault } from 'utililites/util';
import { ContentState, EditorState } from 'draft-js';
const TextEditor = dynamic(() => import('components/TextEditor/ChatEditor'), {
    ssr: false,
});
export const ActiveConversation = ({ id, user,chatUser,isOpen }) => {
    const [body, setBody] = useState('');
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    const [sendMessage] = useMutation<sendMessage, sendMessageVariables>(
        SEND_MESSAGE,
    );


    const scrollChat = useRef<any>(null)
    const scrollToBottom = () => {
        scrollChat.current.scrollIntoView({ behavior: "smooth" })

    }
    const { data, subscribeToMore } = useQuery<messages, messagesVariables>(
        MESSAGES,
        { variables: { id: id as string } },
    );

    useEffect(scrollToBottom, [data])

    const subscribeToMoreMessages = () =>
        subscribeToMore<onMessageSent>({
            document: ON_MESSAGE,
            variables:{id:id as string},
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                return Object.assign({}, prev, {
                    messages: [...prev.messages, subscriptionData.data.onMessageSent],
                });
            },
        });
    const onSubmit = async () => {
        try {
            if (htmlToText(body) && htmlToText(body).trim()) {
                await sendMessage({
                    variables: {
                        createMessageInput: { input: body, sender: user, chat: id },
                    },
                });
                const newEditorState = EditorState.push(editorState,ContentState.createFromText(''),'remove-range')
                setEditorState(newEditorState)
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="flex flex-col w-full min-h-screen space-y-2">
            <div className="bg-white border p-4 flex flex-row items-center space-x-3">
            <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${chatUser.image||profileDefault}`} className='h-12 w-12 rounded-full' alt="" />
                <h2 className=" text-xl">{chatUser.name}</h2>
            </div>
            <div

                style={{ overflowX: 'hidden' }}
                className="h-3/4 grid px-12 border rounded-md  space-y-8 py-8  max-h-screen overflow-scroll"
            >
                <MessageList
                    subscribeToMore={subscribeToMoreMessages}
                    messages={data?.messages}
                    user={user}
                    id={id}

                />
                <div ref={scrollChat} />
            </ div>
            <div className=" flex flex-row items-center space-x-2">
                {id && (isOpen &&
                   ( <>
                        <div className="w-full">
                            <TextEditor setEditorState={setEditorState} editorState={editorState} onInput={setBody} />
                        </div>
                        <div className="w-1/12 flex flex-row">
                            <img
                                onClick={() => onSubmit()}
                                src="assets/send.svg"
                                className="w-1/2 p-2 rounded-xl cursor-pointer border"
                                alt=""
                            />
                            <img
                                onClick={() => onSubmit()}
                                src="assets/file.svg"
                                className="w-1/2 p-2 rounded-xl cursor-pointer border"
                                alt=""
                            />
                        </div>
                    </>)
                )}
            </div>
        </div>
    );
};

export default ActiveConversation;
