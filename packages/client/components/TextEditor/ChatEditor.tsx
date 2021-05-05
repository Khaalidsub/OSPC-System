import { Editor, EditorState, RichUtils } from "draft-js"
import { useEffect, useRef, useState } from "react";
import { convertToHTML } from 'draft-convert'
import "draft-js/dist/Draft.css"
export const ChatEditor = ({ onInput }) => {

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
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

            <Editor ref={editor} placeholder="message" handleKeyCommand={handleKeyCommand} editorState={editorState} onChange={setEditorState} />
        </div>
    </div>
    )
}

export default ChatEditor