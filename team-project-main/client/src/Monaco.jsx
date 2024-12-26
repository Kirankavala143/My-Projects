import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';

function EditorComponent() {
  const [code, setCode] = useState('// Start coding here');
  const [output, setOutput] = useState('');

  function handleExecute() {
    fetch('http://127.0.0.1:8000/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    })
      .then(response => response.json())
      .then(data => {
        setOutput(data.result);
      })
      .catch(error => {
        setOutput('Error executing code: ' + error.message); 
      });
  }

  return (
    <div>
      <MonacoEditor
        height="5000px"
        language="javascript"
        value={code}
        onChange={(newValue) => setCode(newValue)}
      />
      <button onClick={handleExecute}>Run Code</button>

      <div>
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
}

export default EditorComponent;
