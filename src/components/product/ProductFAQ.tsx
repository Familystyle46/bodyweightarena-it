type FAQItem = { question: string; answer: string }

interface ProductFAQProps {
  faq: FAQItem[]
}

export function ProductFAQ({ faq }: ProductFAQProps) {
  if (!faq?.length) return null
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold">Questions fréquentes</h3>
      <div className="space-y-2">
        {faq.map((item, index) => (
          <details
            key={index}
            className="group rounded-lg border bg-card px-4 py-3 [&_summary]:cursor-pointer"
          >
            <summary className="font-medium">{item.question}</summary>
            <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
