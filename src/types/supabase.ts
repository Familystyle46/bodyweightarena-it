export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      articles: {
        Row: {
          author_bio: string | null
          author_name: string | null
          author_title: string | null
          category: Database["public"]["Enums"]["article_category"]
          content: string
          cover_image: string | null
          created_at: string
          cross_category_links: string[] | null
          excerpt: string
          faqs: Json | null
          id: string
          internal_links: Json | null
          is_published: boolean | null
          keyword: string | null
          meta_description: string | null
          pillar_type: string | null
          product_ids: string[] | null
          published_at: string | null
          reading_time: number | null
          related_articles: string[] | null
          same_category_links: string[] | null
          search_intent: string | null
          secondary_keywords: string[] | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author_bio?: string | null
          author_name?: string | null
          author_title?: string | null
          category?: Database["public"]["Enums"]["article_category"]
          content: string
          cover_image?: string | null
          created_at?: string
          cross_category_links?: string[] | null
          excerpt: string
          faqs?: Json | null
          id?: string
          internal_links?: string | null
          is_published?: boolean | null
          keyword?: string | null
          meta_description?: string | null
          pillar_type?: string | null
          product_ids?: string[] | null
          published_at?: string | null
          reading_time?: number | null
          related_articles?: string[] | null
          same_category_links?: string[] | null
          search_intent?: string | null
          secondary_keywords?: string[] | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author_bio?: string | null
          author_name?: string | null
          author_title?: string | null
          category?: Database["public"]["Enums"]["article_category"]
          content?: string
          cover_image?: string | null
          created_at?: string
          cross_category_links?: string[] | null
          excerpt?: string
          faqs?: Json | null
          id?: string
          internal_links?: string | null
          is_published?: boolean | null
          keyword?: string | null
          meta_description?: string | null
          pillar_type?: string | null
          product_ids?: string[] | null
          published_at?: string | null
          reading_time?: number | null
          related_articles?: string[] | null
          same_category_links?: string[] | null
          search_intent?: string | null
          secondary_keywords?: string[] | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          affiliate_link: string
          badges: string[] | null
          category: Database["public"]["Enums"]["product_category"]
          created_at: string
          description: string
          faq: Json | null
          id: string
          images: string[]
          is_active: boolean | null
          is_featured: boolean | null
          offer_end_date: string | null
          original_price: number
          sale_price: number
          short_description: string | null
          slug: string
          stock: number | null
          title: string
          updated_at: string
        }
        Insert: {
          affiliate_link: string
          badges?: string[] | null
          category?: Database["public"]["Enums"]["product_category"]
          created_at?: string
          description: string
          faq?: Json | null
          id?: string
          images?: string[]
          is_active?: boolean | null
          is_featured?: boolean | null
          offer_end_date?: string | null
          original_price: number
          sale_price: number
          short_description?: string | null
          slug: string
          stock?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          affiliate_link?: string
          badges?: string[] | null
          category?: Database["public"]["Enums"]["product_category"]
          created_at?: string
          description?: string
          faq?: Json | null
          id?: string
          images?: string[]
          is_active?: boolean | null
          is_featured?: boolean | null
          offer_end_date?: string | null
          original_price?: number
          sale_price?: number
          short_description?: string | null
          slug?: string
          stock?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          author_name: string
          comment: string
          created_at: string
          id: string
          is_verified: boolean | null
          product_id: string
          rating: number
        }
        Insert: {
          author_name: string
          comment: string
          created_at?: string
          id?: string
          is_verified?: boolean | null
          product_id: string
          rating: number
        }
        Update: {
          author_name?: string
          comment?: string
          created_at?: string
          id?: string
          is_verified?: boolean | null
          product_id?: string
          rating?: number
        }
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          subject: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject: string
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subject?: string
          message?: string
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      article_category:
        | "bien_etre"
        | "nutrition"
        | "conseils"
        | "actualites"
        | "probiotiques_digestion"
        | "sommeil_stress"
        | "minceur_detox"
        | "sommeil_confort"
        | "sante_masculine"
        | "detox_minceur"
        | "glycemie_diabete"
        | "articulations"
        | "cardio_tension"
        | "parasites_immunite"
        | "transversal"
      product_category:
        | "equilibre"
        | "minceur"
        | "energie"
        | "beaute"
        | "immunite"
        | "digestion"
    }
    CompositeTypes: { [_ in never]: never }
  }
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"]
export type ProductRow = Tables<"products">
export type ArticleRow = Tables<"articles">

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"] as const,
      article_category: [
        "bien_etre",
        "nutrition",
        "conseils",
        "actualites",
        "probiotiques_digestion",
        "sommeil_stress",
        "minceur_detox",
        "sommeil_confort",
        "sante_masculine",
        "detox_minceur",
        "glycemie_diabete",
        "articulations",
        "cardio_tension",
        "parasites_immunite",
        "transversal",
      ] as const,
      product_category: [
        "equilibre",
        "minceur",
        "energie",
        "beaute",
        "immunite",
        "digestion",
      ] as const,
    },
  },
} as const
