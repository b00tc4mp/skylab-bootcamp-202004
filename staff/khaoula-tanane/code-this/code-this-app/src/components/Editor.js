import React, { useState } from "react";

import CodeEditor from "@monaco-editor/react";

function Editor() {

  const code = `
  function toggleLanguage() {
    setLanguage(language === "javascript" ? "python" : "javascript");
  }
  `
  return (
      <CodeEditor
        height="90vh" 
        theme='light'
        language='javascript'
        value={code}
        loading={"Loading..."}
      />
  );
}

export default Editor