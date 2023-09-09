export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      library: {
        Row: {
          created_at: string | null
          id: number
          lang: string[] | null
          name: string | null
          short: string | null
          updated_at: string | null
          url: string | null
          version: string | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          lang?: string[] | null
          name?: string | null
          short?: string | null
          updated_at?: string | null
          url?: string | null
          version?: string | null
        }
        Update: {
          created_at?: string | null
          id?: never
          lang?: string[] | null
          name?: string | null
          short?: string | null
          updated_at?: string | null
          url?: string | null
          version?: string | null
        }
        Relationships: []
      }
      profile: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          id: number
          name: string | null
          updated_at: string | null
          user_id: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          id?: never
          name?: string | null
          updated_at?: string | null
          user_id?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          id?: never
          name?: string | null
          updated_at?: string | null
          user_id?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      snip: {
        Row: {
          body: string | null
          created_at: string | null
          description: string | null
          id: number
          lib_id: number | null
          prefix: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          body?: string | null
          created_at?: string | null
          description?: string | null
          id?: never
          lib_id?: number | null
          prefix: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          body?: string | null
          created_at?: string | null
          description?: string | null
          id?: never
          lib_id?: number | null
          prefix?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "snip_lib_id_fkey"
            columns: ["lib_id"]
            referencedRelation: "library"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "snip_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
