"use client"

import { useState, useCallback, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, Trash2 } from "lucide-react"
import { createClientComponent } from "@/lib/supabase/client"
import { Constants } from "@/types/supabase"
import type { ProductRow } from "@/types/supabase"

type ReviewRow = {
  id?: string
  author_name: string
  comment: string
  rating: number
  is_verified: boolean | null
}

const inputClass =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
const labelClass = "text-sm font-medium"

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}

const STORAGE_BUCKET = "images"
const PRODUCT_IMAGE_PREFIX = "products"

type FAQItem = { question: string; answer: string }

interface ProductFormClientProps {
  initialData?: ProductRow | null
}

export function ProductFormClient({ initialData }: ProductFormClientProps) {
  const isEdit = !!initialData?.id
  const [title, setTitle] = useState(initialData?.title ?? "")
  const [slug, setSlug] = useState(initialData?.slug ?? "")
  const [description, setDescription] = useState(initialData?.description ?? "")
  const [originalPrice, setOriginalPrice] = useState(
    String(initialData?.original_price ?? "")
  )
  const [salePrice, setSalePrice] = useState(String(initialData?.sale_price ?? ""))
  const [stock, setStock] = useState(String(initialData?.stock ?? ""))
  const [category, setCategory] = useState<
    (typeof Constants.public.Enums.product_category)[number]
  >(initialData?.category ?? "equilibre")
  const [affiliateLink, setAffiliateLink] = useState(
    initialData?.affiliate_link ?? ""
  )
  const [isActive, setIsActive] = useState(initialData?.is_active ?? true)
  const [isFeatured, setIsFeatured] = useState(initialData?.is_featured ?? false)
  const [offerEndDate, setOfferEndDate] = useState(
    initialData?.offer_end_date ? initialData.offer_end_date.slice(0, 10) : ""
  )
  const [badges, setBadges] = useState<string[]>(initialData?.badges ?? [])
  const [badgeInput, setBadgeInput] = useState("")
  const [images, setImages] = useState<string[]>(initialData?.images ?? [])
  const [faq, setFaq] = useState<FAQItem[]>(() => {
    const raw = initialData?.faq
    if (Array.isArray(raw) && raw.length) {
      return raw as FAQItem[]
    }
    return [{ question: "", answer: "" }]
  })
  const [reviews, setReviews] = useState<ReviewRow[]>([])
  const [deletedReviewIds, setDeletedReviewIds] = useState<string[]>([])
  const [reviewsLoaded, setReviewsLoaded] = useState(false)

  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!initialData?.id || reviewsLoaded) return
    const supabase = createClientComponent()
    if (!supabase) return
    supabase
      .from("reviews")
      .select("id, author_name, comment, rating, is_verified")
      .eq("product_id", initialData.id)
      .then(({ data }) => {
        setReviews(
          (data ?? []).map((r) => ({
            id: r.id,
            author_name: r.author_name,
            comment: r.comment,
            rating: r.rating,
            is_verified: r.is_verified ?? false,
          }))
        )
        setReviewsLoaded(true)
      })
  }, [initialData?.id, reviewsLoaded])

  const syncSlugFromTitle = useCallback(() => {
    if (title) setSlug(slugify(title))
  }, [title])

  const addBadge = () => {
    const v = badgeInput.trim()
    if (v && !badges.includes(v)) {
      setBadges((prev) => [...prev, v])
      setBadgeInput("")
    }
  }
  const removeBadge = (b: string) => setBadges((prev) => prev.filter((x) => x !== b))

  const addFaqRow = () => setFaq((prev) => [...prev, { question: "", answer: "" }])
  const removeFaqRow = (index: number) =>
    setFaq((prev) => prev.filter((_, i) => i !== index))
  const updateFaq = (index: number, field: "question" | "answer", value: string) =>
    setFaq((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    )

  const addReview = () =>
    setReviews((prev) => [
      ...prev,
      { author_name: "", comment: "", rating: 5, is_verified: false },
    ])
  const removeReview = (index: number) => {
    const r = reviews[index]
    if (r?.id) setDeletedReviewIds((prev) => [...prev, r.id!])
    setReviews((prev) => prev.filter((_, i) => i !== index))
  }
  const updateReview = (
    index: number,
    field: keyof ReviewRow,
    value: string | number | boolean
  ) =>
    setReviews((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    )

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const supabase = createClientComponent()
    if (!supabase) {
      setError("Supabase non configuré")
      return
    }
    setUploading(true)
    setError(null)
    const ext = file.name.split(".").pop() || "jpg"
    const path = `${PRODUCT_IMAGE_PREFIX}/${crypto.randomUUID()}.${ext}`
    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(path, file, { cacheControl: "3600", upsert: false })
    if (uploadError) {
      setError(uploadError.message)
      setUploading(false)
      return
    }
    const { data: urlData } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path)
    setImages((prev) => [...prev, urlData.publicUrl])
    setUploading(false)
  }

  const removeImage = (url: string) => setImages((prev) => prev.filter((u) => u !== url))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    const supabase = createClientComponent()
    if (!supabase) {
      setError("Supabase non configuré")
      return
    }
    const sale = parseFloat(salePrice)
    const original = parseFloat(originalPrice)
    const stockNum = stock === "" ? null : parseInt(stock, 10)
    if (Number.isNaN(sale) || sale < 0) {
      setError("Prix promo invalide")
      return
    }
    if (Number.isNaN(original) || original < 0) {
      setError("Prix initial invalide")
      return
    }
    const faqFiltered = faq.filter((f) => f.question.trim() || f.answer.trim())
    const faqPayload = faqFiltered.length ? faqFiltered : null
    const badgesPayload = badges.length ? badges : null
    const offerEndPayload = offerEndDate.trim() || null

    const productPayload = {
      title,
      slug: slug.trim() || slugify(title),
      description,
      original_price: original,
      sale_price: sale,
      stock: stockNum,
      category,
      affiliate_link: affiliateLink.trim(),
      images,
      faq: faqPayload,
      badges: badgesPayload,
      is_active: isActive,
      is_featured: isFeatured,
      offer_end_date: offerEndPayload,
    }

    setSaving(true)
    let productId = initialData?.id
    if (isEdit && initialData) {
      const { error: updateError } = await supabase
        .from("products")
        .update(productPayload)
        .eq("id", initialData.id)
      if (updateError) {
        setError(updateError.message)
        setSaving(false)
        return
      }
      productId = initialData.id
    } else {
      const { data: inserted, error: insertError } = await supabase
        .from("products")
        .insert(productPayload)
        .select("id")
        .single()
      if (insertError) {
        setError(insertError.message)
        setSaving(false)
        return
      }
      productId = inserted?.id
      setSuccess(true)
      setTitle("")
      setSlug("")
      setDescription("")
      setOriginalPrice("")
      setSalePrice("")
      setStock("")
      setCategory("equilibre")
      setAffiliateLink("")
      setIsActive(true)
      setIsFeatured(false)
      setOfferEndDate("")
      setBadges([])
      setImages([])
      setFaq([{ question: "", answer: "" }])
    }

    if (productId) {
      for (const id of deletedReviewIds) {
        await supabase.from("reviews").delete().eq("id", id)
      }
      setDeletedReviewIds([])
      for (const r of reviews) {
        if (!r.author_name.trim() && !r.comment.trim()) continue
        const rating = Math.min(5, Math.max(1, Number(r.rating) || 5))
        if (r.id) {
          await supabase
            .from("reviews")
            .update({
              author_name: r.author_name.trim(),
              comment: r.comment.trim(),
              rating,
              is_verified: r.is_verified ?? false,
            })
            .eq("id", r.id)
        } else {
          await supabase.from("reviews").insert({
            product_id: productId,
            author_name: r.author_name.trim(),
            comment: r.comment.trim(),
            rating,
            is_verified: r.is_verified ?? false,
          })
        }
      }
    }
    if (isEdit) setSuccess(true)
    setSaving(false)
  }

  if (success && isEdit) {
    return (
      <div className="space-y-4 rounded-lg border bg-card p-8">
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
          Produit mis à jour.
        </div>
        <Link
          href="/admin"
          className="inline-block text-sm text-primary hover:underline"
        >
          ← Retour à l&apos;admin
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border bg-card p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {isEdit ? "Modifier le produit" : "Ajouter un produit"}
        </h2>
        <Link
          href="/admin"
          className="text-sm text-primary hover:underline"
        >
          ← Retour
        </Link>
      </div>

      {error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="title" className={labelClass}>
            Nom *
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={syncSlugFromTitle}
            required
            className={inputClass}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="slug" className={labelClass}>
            Slug (URL)
          </label>
          <input
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="auto depuis le nom"
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className={labelClass}>
          Description *
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          className={inputClass}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="space-y-2">
          <label htmlFor="original_price" className={labelClass}>
            Prix initial (€) *
          </label>
          <input
            id="original_price"
            type="number"
            step="0.01"
            min="0"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            required
            className={inputClass}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="sale_price" className={labelClass}>
            Prix promo (€) *
          </label>
          <input
            id="sale_price"
            type="number"
            step="0.01"
            min="0"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
            required
            className={inputClass}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="stock" className={labelClass}>
            Stock
          </label>
          <input
            id="stock"
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="category" className={labelClass}>
          Catégorie
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value as (typeof Constants.public.Enums.product_category)[number]
            )
          }
          className={inputClass}
        >
          {Constants.public.Enums.product_category.map((c) => (
            <option key={c} value={c}>
              {c.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="affiliate_link" className={labelClass}>
          Lien affilié *
        </label>
        <input
          id="affiliate_link"
          type="url"
          value={affiliateLink}
          onChange={(e) => setAffiliateLink(e.target.value)}
          required
          className={inputClass}
        />
      </div>

      <div className="space-y-2">
        <span className={labelClass}>Image produit</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:text-primary-foreground file:hover:opacity-90"
        />
        {uploading && <p className="text-sm text-muted-foreground">Upload…</p>}
        {images.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-2">
            {images.map((url) => (
              <li key={url} className="relative h-20 w-20">
                <Image
                  src={url}
                  alt=""
                  fill
                  className="rounded object-cover"
                  sizes="80px"
                />
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="absolute -right-1 -top-1 rounded-full bg-destructive px-1.5 py-0.5 text-xs text-destructive-foreground"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <input
            id="is_active"
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="h-4 w-4 rounded border-input"
          />
          <label htmlFor="is_active" className={labelClass}>
            Produit actif (visible sur le site)
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            id="is_featured"
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="h-4 w-4 rounded border-input"
          />
          <label htmlFor="is_featured" className={labelClass}>
            Produit phare (mis en avant sur l&apos;accueil)
          </label>
        </div>
        <div className="space-y-1">
          <label htmlFor="offer_end_date" className={labelClass}>
            Date de fin d&apos;offre (compte à rebours)
          </label>
          <input
            id="offer_end_date"
            type="date"
            value={offerEndDate}
            onChange={(e) => setOfferEndDate(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className={labelClass}>Badges</label>
        <p className="text-xs text-muted-foreground">
          Ex: Naturel, Vegan, Bio, Homme, Vitalité…
        </p>
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            value={badgeInput}
            onChange={(e) => setBadgeInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addBadge())}
            placeholder="Ex: Naturel, Vegan, Bio..."
            className={`${inputClass} max-w-xs`}
          />
          <button
            type="button"
            onClick={addBadge}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-muted"
          >
            Ajouter
          </button>
        </div>
        {badges.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {badges.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
              >
                {b}
                <button
                  type="button"
                  onClick={() => removeBadge(b)}
                  className="hover:opacity-80"
                  aria-label="Supprimer"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {isEdit && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className={`${labelClass} flex items-center gap-1`}>
              <Star className="h-4 w-4" />
              Avis clients (témoignages)
            </span>
            <button
              type="button"
              onClick={addReview}
              className="text-sm text-primary hover:underline"
            >
              + Ajouter un avis
            </button>
          </div>
          {reviews.map((r, index) => (
            <div
              key={r.id ?? `new-${index}`}
              className="rounded-lg border border-input bg-muted/30 p-4"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <input
                  placeholder="Nom du rédacteur (ex: David S.)"
                  value={r.author_name}
                  onChange={(e) =>
                    updateReview(index, "author_name", e.target.value)
                  }
                  className={`${inputClass} max-w-[200px]`}
                />
                <button
                  type="button"
                  onClick={() => removeReview(index)}
                  className="rounded p-1 text-destructive hover:bg-destructive/10"
                  title="Supprimer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Note :</span>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => updateReview(index, "rating", n)}
                    className="p-0.5"
                  >
                    <Star
                      className={`h-5 w-5 ${
                        n <= (r.rating ?? 0)
                          ? "fill-amber-400 text-amber-500"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <textarea
                placeholder="Commentaire du client..."
                value={r.comment}
                onChange={(e) =>
                  updateReview(index, "comment", e.target.value)
                }
                rows={2}
                className={`${inputClass} mb-2`}
              />
              <div className="flex items-center gap-2">
                <input
                  id={`review-verified-${index}`}
                  type="checkbox"
                  checked={r.is_verified ?? false}
                  onChange={(e) =>
                    updateReview(index, "is_verified", e.target.checked)
                  }
                  className="h-4 w-4 rounded border-input"
                />
                <label
                  htmlFor={`review-verified-${index}`}
                  className="text-sm text-muted-foreground"
                >
                  Acheteur vérifié
                </label>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className={labelClass}>FAQ</span>
          <button
            type="button"
            onClick={addFaqRow}
            className="text-sm text-primary hover:underline"
          >
            + Ajouter une question
          </button>
        </div>
        {faq.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap items-start gap-2 rounded border p-3"
          >
            <input
              placeholder="Question"
              value={item.question}
              onChange={(e) => updateFaq(index, "question", e.target.value)}
              className={`${inputClass} flex-1 min-w-[200px]`}
            />
            <input
              placeholder="Réponse"
              value={item.answer}
              onChange={(e) => updateFaq(index, "answer", e.target.value)}
              className={`${inputClass} flex-1 min-w-[200px]`}
            />
            <button
              type="button"
              onClick={() => removeFaqRow(index)}
              className="rounded bg-muted px-2 py-1 text-sm hover:bg-muted/80"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
      >
        {saving ? "Enregistrement…" : isEdit ? "Enregistrer" : "Créer le produit"}
      </button>
    </form>
  )
}
