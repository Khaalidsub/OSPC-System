import {  EditorState, RichUtils } from "draft-js"
import { useEffect, useRef, useState } from "react";
import { convertToHTML } from 'draft-convert'
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import "draft-js/dist/Draft.css"
import '@draft-js-plugins/linkify/lib/plugin.css';
import Editor,{composeDecorators} from '@draft-js-plugins/editor';
import createFocusPlugin from '@draft-js-plugins/focus';

import createEmojiPlugin from '@draft-js-plugins/emoji';

const emojiPlugin = createEmojiPlugin()
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const linkifyPlugin = createLinkifyPlugin();
const plugins = [emojiPlugin,linkifyPlugin];
export const ChatEditor = ({ onInput,editorState,setEditorState }) => {

    
    useEffect(() => {
        const html = convertToHTML(editorState.getCurrentContent());
        // console.log(html);
        onInput(html)

    }, [editorState])
    const editor = useRef(null as Editor);


    const handleKeyCommand = (command: string, editorState: EditorState, event: number) => {
        const state = RichUtils.handleKeyCommand(editorState, command)
        // console.log('hello');

        if (state) {
            // console.log('handled');

            setEditorState(state)
            return 'handled'
        }
        // console.log('not handled');
        return 'not-handled'
    }
    return (<div className='border p-2 rounded-md'>
    
        <div className='font-raleway p-2'>

            <Editor plugins={plugins} ref={editor} placeholder="message" handleKeyCommand={handleKeyCommand} editorState={editorState} onChange={setEditorState} />
       {/* <EmojiSuggestions/>
       <EmojiSelect/> */}
        </div>
    </div>
    )
}

export default ChatEditor