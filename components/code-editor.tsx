"use client"

import { useEffect, useRef } from "react"
import { Highlight, themes } from "prism-react-renderer"

interface CodeEditorProps {
  code: string
  language?: string
}

export default function CodeEditor({ code, language = "tsx" }: CodeEditorProps) {
  const editorRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.scrollTop = 0
    }
  }, [code])

  return (
    <div className="h-full overflow-auto bg-[#1e1e1e] text-white">
      <Highlight theme={themes.vsDark} code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            ref={editorRef}
            className={`${className} p-4 text-sm font-mono overflow-auto h-full`}
            style={{ ...style, backgroundColor: "#1e1e1e" }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })} className="table-row">
                <span className="table-cell text-right pr-4 select-none opacity-50 text-xs">{i + 1}</span>
                <span className="table-cell">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
