import React from "react"
import { ControlledEditor } from "@monaco-editor/react"

function Editor({onChange, initialCode}) {


  return (
      <ControlledEditor
        height="85%"
        onChange={onChange}
        theme='light'
        language='javascript'
        value={initialCode}
        loading={"Loading..."}
        options={{
          minimap: {
            enabled: false,
          },
    }}
      />
  );
}

export default Editor