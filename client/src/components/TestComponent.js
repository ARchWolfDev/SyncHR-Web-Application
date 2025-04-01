import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import createTablePlugin from 'draft-js-table'; // Import the table plugin

// Create the table plugin
const tablePlugin = createTablePlugin();

const MyEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={setEditorState}
      toolbar={{
        options: ['inline', 'blockType', 'fontSize', 'textAlign', 'list', 'link', 'image', 'table'],
      }}
      plugins={[tablePlugin]} // Add the table plugin here
    />
  );
};

export default MyEditor;
