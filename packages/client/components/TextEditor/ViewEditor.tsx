
import { Editor, EditorState, RichUtils } from "draft-js"
import { useEffect, useRef, useState } from "react";
import { convertFromHTML } from 'draft-convert'
import "draft-js/dist/Draft.css"
export const ViewTextEditor = ({ content = '<h2>no content<h2>' }) => {

    const [editorState, setEditorState] = useState(() => EditorState.createWithContent(convertFromHTML(content)))
    useEffect(() => {
        // const html = convertToHTML(editorState.getCurrentContent());
        // console.log(html);

    }, [editorState])
    // const editor = useRef(null as Editor);

    return (

        <>
            <Editor editorState={editorState} onChange={setEditorState} />
        </>
    )
}

export default ViewTextEditor