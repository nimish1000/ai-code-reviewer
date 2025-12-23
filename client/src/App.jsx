import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import axios from "axios"
import prism from "prismjs"
import './App.css'

function App() {
  const [code, setCode] = useState(`function sum(){\n  return 1+1\n}`)
  const [review, setReview] = useState("") // Added this missing state
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    setLoading(true);
    setReview("Reviewing your code...");
    
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code })
      setReview(response.data)
    } catch (error) {
      if (error.response && error.response.status === 429) {
        setReview("Rate limit reached. Please wait 1 minute before trying again.");
      } else {
        setReview("Error: Could not reach the server.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
            padding={10}
            style={{
              fontFamily: '"Fira code","Fira Mono",monospace',
              fontSize: 16,
              height: "100%",
              width: "100%"
            }}
          />
        </div>
        {/* Button changes text while loading */}
        <div className={`review ${loading ? 'disabled' : ''}`} onClick={reviewCode}>
          {loading ? "Thinking..." : "Review"}
        </div>
      </div>
      <div className="right">
        {/* This is where the AI response will now actually appear */}
        <div style={{ padding: "1.5rem", whiteSpace: "pre-wrap" }}>
          {review}
        </div>
      </div>
    </main>
  )
}

export default App;