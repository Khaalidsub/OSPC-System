
import {  EditorState, RichUtils } from "draft-js"
import { useEffect, useRef, useState } from "react";
import { convertFromHTML } from 'draft-convert'
import Editor from '@draft-js-plugins/editor';
import "draft-js/dist/Draft.css"
import '@draft-js-plugins/linkify/lib/plugin.css';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import createImagePlugin from '@draft-js-plugins/image';
const linkifyPlugin = createLinkifyPlugin();
const imagePlugin = createImagePlugin();

const plugins = [linkifyPlugin,imagePlugin];
export const ViewTextEditor = ({ content = '<h2>no content<h2>' }) => {

    const [editorState, setEditorState] = useState(() => EditorState.createWithContent(convertFromHTML(content)))
    useEffect(() => {
        // const html = convertToHTML(editorState.getCurrentContent());
        // console.log(html);

    }, [editorState])
    // const editor = useRef(null as Editor);

    return (

        <>
            <Editor editorState={editorState} onChange={setEditorState}  plugins={plugins} />
        </>
    )
}

export default ViewTextEditor