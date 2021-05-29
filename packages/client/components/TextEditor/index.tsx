
import {  EditorState, RichUtils } from "draft-js"
import { useEffect, useRef, useState } from "react";
import { convertToHTML } from 'draft-convert'
import "draft-js/dist/Draft.css"
import '@draft-js-plugins/image/lib/plugin.css';
import Editor,{composeDecorators} from '@draft-js-plugins/editor';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import createImagePlugin from '@draft-js-plugins/image';
import createBlockDndPlugin from '@draft-js-plugins/drag-n-drop';

import createFocusPlugin from '@draft-js-plugins/focus';
const linkifyPlugin = createLinkifyPlugin();

const blockDndPlugin = createBlockDndPlugin();
const focusPlugin = createFocusPlugin();
const decorator = composeDecorators(
    focusPlugin.decorator,
    blockDndPlugin.decorator
  );
  const imagePlugin = createImagePlugin({ decorator });
const plugins = [linkifyPlugin,blockDndPlugin, focusPlugin, imagePlugin];
export const TextEditor = ({ onInput }) => {

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    useEffect(() => {
        const html = convertToHTML(editorState.getCurrentContent());
        // console.log(html);
        onInput(html)

    }, [editorState])
    const editor = useRef(null as Editor);
    const _onBoldClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
    }
    const _onItalicClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
    }
    const _onUnderlineClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
    }
    const _onStrikeThrough = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'));
    }
    const _onCodeClick = () => {
        setEditorState(RichUtils.toggleCode(editorState));
    }

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
    const focus = () => {
        editor.current.focus()
      };
    
    return (<div className='border p-2 rounded-md'>
        <div className='p-2 space-x-4'>

            <button className=' font-poppins font-bold' onClick={_onBoldClick.bind(this)}>B</button>
            <button className='font-thin font-poppins italic' onClick={_onItalicClick.bind(this)}>I</button>
            <button className='font-thin font-poppins underline' onClick={_onUnderlineClick.bind(this)}>U</button>
            <button className='font-thin font-poppins' onClick={_onStrikeThrough.bind(this)}>S</button>
            <button className='font-thin font-poppins' onClick={_onCodeClick.bind(this)}>{"{ }"}</button>
        </div>
        <hr />
        <div  onClick={focus} className='font-raleway p-2'>

            <Editor plugins={plugins} ref={editor} placeholder="Write" handleKeyCommand={handleKeyCommand} editorState={editorState} onChange={setEditorState} />
        </div>
    </div>
    )
}

export default TextEditor