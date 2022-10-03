import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { ContentState, EditorProps, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import  './nsEditorStyle.css';

const NSEditor: React.FC<
    { text: string } & Omit<EditorProps, "editorState" | "onChange">
> = ({ text, ...props }) => {
    const [editorState, setEditorState] = React.useState(
        EditorState.createWithContent(ContentState.createFromText(text))
    );

    const editorRef = React.useRef<Editor | null>(null);
  
    return (
        <div className="border" style={{ height: 255, overflow: 'auto'}}>
        <Editor wrapperClassName="nsEditorClassName"
          editorState={editorState}
          onEditorStateChange={setEditorState}
        />
        </div>
    );
};
export default NSEditor;
