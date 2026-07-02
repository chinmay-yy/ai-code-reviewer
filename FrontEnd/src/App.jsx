import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import EditorModule from "react-simple-code-editor";

const Editor = EditorModule.default; import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "github-markdown-css/github-markdown-dark.css";
import axios from 'axios'
import './App.css'
console.log(Editor)
console.log(Markdown)

function App() {
  const [count, setCount] = useState(0)
  const [code, setCode] = useState(` function sum() {
  return 1 + 1
}`)

  const [review, setReview] = useState(``)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    const response = await axios.post('http://localhost:3000/ai/get-review', { code })
    setReview(response.data)
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                padding: "0rem",
                border: "1px solid #ddd",
                borderRadius: "2.2rem",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div
            onClick={reviewCode}
            className="review">Review</div>
        </div>
        <div className="right">
          <div className="markdown-body">
            <Markdown rehypePlugins={[rehypeHighlight]}>
              {review}
            </Markdown>
          </div>
        </div>
      </main>
    </>
  )
}



export default App