import { Star } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

type Review = {
  id: string
  author_name: string
  comment: string
  rating: number
  created_at: string
  is_verified?: boolean | null
}

interface ReviewsListProps {
  reviews: Review[]
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <div className="rounded-xl border bg-muted/30 py-12 text-center">
        <p className="font-medium text-muted-foreground">Aucun avis pour le moment</p>
        <p className="mt-1 text-sm text-muted-foreground">Soyez le premier à donner votre avis !</p>
      </div>
    )
  }

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${i <= Math.round(averageRating) ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
            />
          ))}
          <span className="font-bold">{averageRating.toFixed(1)}/5</span>
          <span className="text-muted-foreground">({reviews.length} avis)</span>
        </div>
        <h3 className="mt-4 text-2xl font-bold">Nos clients parlent</h3>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {reviews.map((review) => (
          <div key={review.id} className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i <= review.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
                />
              ))}
              <span className="text-sm font-medium">{review.author_name}</span>
              {review.is_verified && (
                <span className="text-xs text-primary">Vérifié</span>
              )}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(review.created_at), { addSuffix: true, locale: fr })}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
