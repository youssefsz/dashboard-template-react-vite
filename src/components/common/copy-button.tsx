import { useState } from "react"
import { 
  CheckIcon, 
  DocumentDuplicateIcon as CopyIcon 
} from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"

interface CopyButtonProps {
  content: string
  label?: string
}

export function CopyButton({ content, label = "Copy" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="h-8 gap-1.5"
      onClick={handleCopy}
    >
      {copied ? (
        <CheckIcon className="h-4 w-4 text-green-500" />
      ) : (
        <CopyIcon className="h-4 w-4" />
      )}
      {copied ? "Copied" : label}
    </Button>
  )
}
