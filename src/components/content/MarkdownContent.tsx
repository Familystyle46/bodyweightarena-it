import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface MarkdownContentProps {
  content: string
  /** Taille du bloc : sm (produit), base, lg (article blog) */
  size?: "sm" | "base" | "lg"
  className?: string
}

const sizeClasses = {
  sm: "prose-sm",
  base: "prose",
  lg: "prose-lg",
}

/**
 * Affiche du contenu Markdown avec styles prose (titres, listes, liens, etc.).
 * Utilisé pour les descriptions produits et le contenu des articles de blog.
 */
export function MarkdownContent({
  content,
  size = "base",
  className = "",
}: MarkdownContentProps) {
  if (!content?.trim()) return null
  return (
    <div
      className={`prose max-w-none text-foreground ${sizeClasses[size]} prose-headings:font-serif prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground ${className}`}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  )
}
