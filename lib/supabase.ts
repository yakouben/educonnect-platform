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

export const createUserProfile = async (authId: string, userData: {
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
}) => {
  const { data, error } = await supabase
    .from('users')
    .insert({
      auth_id: authId,
      name: userData.name,
      email: userData.email,
      avatar: userData.avatar,
      bio: userData.bio
    })
    .select()
    .single();
  
  return { data, error };
};

export const getOrCreateUserProfile = async (authId: string, userData: {
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
}) => {
  // First try to get existing profile
  const { data: existingProfile, error: getError } = await getUserProfile(authId);
  
  if (existingProfile) {
    return { data: existingProfile, error: null };
  }
  
  // If no profile exists, create one
  if (getError && getError.code === 'PGRST116') { // No rows returned
    return await createUserProfile(authId, userData);
  }
  
  return { data: null, error: getError };
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

// Community referral link functions
export const createCommunityReferralLink = async (coachId: string, coachName: string) => {
  // Generate referral code based on coach name
  const referralCode = generateCoachReferralCode(coachName);
  
  const { data, error } = await supabase
    .from('community_referral_links')
    .insert({
      coach_id: coachId,
      referral_code: referralCode
    })
    .select()
    .single();
  
  return { data, error };
};

export const getCommunityReferralLinks = async () => {
  const { data, error } = await supabase
    .from('community_referral_links')
    .select(`
      *,
      coach:users!community_referral_links_coach_id_fkey(name, email, avatar)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false });
  
  return { data, error };
};

export const getCommunityReferralLinkByCode = async (referralCode: string) => {
  const { data, error } = await supabase
    .from('community_referral_links')
    .select(`
      *,
      coach:users!community_referral_links_coach_id_fkey(
        id,
        name,
        email,
        avatar,
        bio
      )
    `)
    .eq('referral_code', referralCode)
    .eq('is_active', true)
    .single();
  
  return { data, error };
};

export const useCommunityReferralLink = async (referralLinkId: string, usedBy: string, userAgent?: string) => {
  // Check if the referral link is still valid
  const { data: referralLink, error: checkError } = await supabase
    .from('community_referral_links')
    .select('*')
    .eq('id', referralLinkId)
    .eq('is_active', true)
    .single();
  
  if (checkError || !referralLink) {
    return { data: null, error: new Error('Invalid referral link') };
  }
  
  // Record the usage
  const { data: usageData, error: usageError } = await supabase
    .from('community_referral_usage')
    .insert({
      referral_link_id: referralLinkId,
      used_by: usedBy,
      user_agent: userAgent
    })
    .select()
    .single();
  
  if (usageError) {
    return { data: null, error: usageError };
  }
  
  // Update the total uses count
  const { error: updateError } = await supabase
    .from('community_referral_links')
    .update({ 
      total_uses: referralLink.total_uses + 1,
      updated_at: new Date().toISOString()
    })
    .eq('id', referralLinkId);
  
  if (updateError) {
    return { data: null, error: updateError };
  }
  
  return { data: usageData, error: null };
};

export const getCoachReferralStats = async (coachId: string) => {
  const { data, error } = await supabase
    .from('community_referral_links')
    .select(`
      *,
      usage:community_referral_usage(count)
    `)
    .eq('coach_id', coachId)
    .eq('is_active', true)
    .single();
  
  return { data, error };
};

// Helper function to generate referral code based on coach name
const generateCoachReferralCode = (coachName: string): string => {
  // Clean the name and convert to lowercase
  const cleanName = coachName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '') // Remove special characters
    .substring(0, 10); // Limit to 10 characters
  
  // Add a random suffix for uniqueness
  const randomSuffix = Math.random().toString(36).substring(2, 6);
  
  return `${cleanName}${randomSuffix}`;
}; 