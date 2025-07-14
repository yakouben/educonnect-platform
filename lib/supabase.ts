import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          auth_id: string;
          name: string;
          email: string;
          avatar: string | null;
          bio: string | null;
          custom_status: string | null;
          status: 'active' | 'offline';
          global_role: 'admin' | 'moderator' | 'member';
          is_online: boolean;
          last_seen: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          auth_id: string;
          name: string;
          email: string;
          avatar?: string | null;
          bio?: string | null;
          custom_status?: string | null;
          status?: 'active' | 'offline';
          global_role?: 'admin' | 'moderator' | 'member';
          is_online?: boolean;
          last_seen?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          auth_id?: string;
          name?: string;
          email?: string;
          avatar?: string | null;
          bio?: string | null;
          custom_status?: string | null;
          status?: 'active' | 'offline';
          global_role?: 'admin' | 'moderator' | 'member';
          is_online?: boolean;
          last_seen?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          color: string;
          icon: string | null;
          is_active: boolean;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          color?: string;
          icon?: string | null;
          is_active?: boolean;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          color?: string;
          icon?: string | null;
          is_active?: boolean;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      spaces: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          type: 'open' | 'private';
          category_id: string | null;
          color: string;
          tags: string[];
          owner_id: string;
          member_count: number;
          is_archived: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          type?: 'open' | 'private';
          category_id?: string | null;
          color?: string;
          tags?: string[];
          owner_id: string;
          member_count?: number;
          is_archived?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          type?: 'open' | 'private';
          category_id?: string | null;
          color?: string;
          tags?: string[];
          owner_id?: string;
          member_count?: number;
          is_archived?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      space_members: {
        Row: {
          id: string;
          space_id: string;
          user_id: string;
          role: 'admin' | 'moderator' | 'member';
          joined_at: string;
          last_read_at: string;
          is_muted: boolean;
          is_pinned: boolean;
        };
        Insert: {
          id?: string;
          space_id: string;
          user_id: string;
          role?: 'admin' | 'moderator' | 'member';
          joined_at?: string;
          last_read_at?: string;
          is_muted?: boolean;
          is_pinned?: boolean;
        };
        Update: {
          id?: string;
          space_id?: string;
          user_id?: string;
          role?: 'admin' | 'moderator' | 'member';
          joined_at?: string;
          last_read_at?: string;
          is_muted?: boolean;
          is_pinned?: boolean;
        };
      };
    };
  };
}

// Helper functions
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const getUserProfile = async (authId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('auth_id', authId)
    .single();
  
  return { data, error };
};

export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('name');
  
  return { data, error };
};

export const createSpace = async (spaceData: {
  name: string;
  description: string;
  type: 'open' | 'private';
  category_id: string;
  color: string;
  tags: string[];
  owner_id: string;
}) => {
  const { data, error } = await supabase
    .from('spaces')
    .insert(spaceData)
    .select()
    .single();
  
  return { data, error };
};

export const addSpaceMember = async (spaceId: string, userId: string, role: 'admin' | 'moderator' | 'member' = 'admin') => {
  const { data, error } = await supabase
    .from('space_members')
    .insert({
      space_id: spaceId,
      user_id: userId,
      role
    })
    .select()
    .single();
  
  return { data, error };
}; 