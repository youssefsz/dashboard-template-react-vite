import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface CodeBlockProps {
  code: string
  className?: string
  language?: "plain" | "html"
}

function highlightHtml(code: string): ReactNode {
  const lines = code.split("\n")

  return lines.map((line, index) => {
    const trimmed = line.trim()
    const attributeMatch = line.match(/^(\s+)([^\s=]+)(=)("(?:[^"]*)")$/)

    if (attributeMatch) {
      const [, indent, attributeName, equals, value] = attributeMatch

      return (
        <span key={`${line}-${index}`}>
          {indent}
          <span className="text-[#9cdcfe]">{attributeName}</span>
          <span>{equals}</span>
          <span className="text-[#ce9178]">{value}</span>
          {index < lines.length - 1 ? "\n" : ""}
        </span>
      )
    }

    if (trimmed === "<script" || trimmed === "></script>") {
      return (
        <span key={`${line}-${index}`}>
          <span className="text-[#569cd6]">{line}</span>
          {index < lines.length - 1 ? "\n" : ""}
        </span>
      )
    }

    return (
      <span key={`${line}-${index}`}>
        {line}
        {index < lines.length - 1 ? "\n" : ""}
      </span>
    )
  })
}

export function CodeBlock({ code, className, language = "plain" }: CodeBlockProps) {
  return (
    <pre
      className={cn(
        "p-4 rounded-md bg-muted font-mono text-sm overflow-x-auto whitespace-pre-wrap break-all",
        className
      )}
    >
      <code>{language === "html" ? highlightHtml(code) : code}</code>
    </pre>
  )
}
