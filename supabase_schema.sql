-- ============================================================================
-- SUPABASE SCHEMA FOR COMMUNITY PLATFORM
-- ============================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- ENUMS
-- ============================================================================

-- User roles in the community
CREATE TYPE user_role AS ENUM ('admin', 'moderator', 'member');

-- User online status (simplified to active/offline only)
CREATE TYPE user_status AS ENUM ('active', 'offline');

-- Space types for privacy levels (removed 'secret')
CREATE TYPE space_type AS ENUM ('open', 'private');

-- Message types
CREATE TYPE message_type AS ENUM ('text', 'image', 'file', 'system');

-- ============================================================================
-- TABLES
-- ============================================================================

-- Users table (extends Supabase auth.users) - MOVED TO FIRST
CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar TEXT,
    bio TEXT,
    custom_status VARCHAR(255),
    status user_status DEFAULT 'offline',
    global_role user_role DEFAULT 'member',
    is_online BOOLEAN DEFAULT false,
    last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table (admin-managed) - MOVED AFTER USERS
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    color VARCHAR(50) DEFAULT 'bg-blue-500',
    icon VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Spaces table (now references categories table)
CREATE TABLE public.spaces (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type space_type DEFAULT 'open',
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    color VARCHAR(50) DEFAULT 'bg-blue-500',
    tags TEXT[] DEFAULT '{}',
    owner_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    member_count INTEGER DEFAULT 0,
    is_archived BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Space members (many-to-many relationship)
CREATE TABLE public.space_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    space_id UUID REFERENCES public.spaces(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    role user_role DEFAULT 'member',
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_read_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_muted BOOLEAN DEFAULT false,
    is_pinned BOOLEAN DEFAULT false,
    UNIQUE(space_id, user_id)
);

-- Messages table
CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    space_id UUID REFERENCES public.spaces(id) ON DELETE CASCADE,
    author_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    type message_type DEFAULT 'text',
    reply_to UUID REFERENCES public.messages(id) ON DELETE SET NULL,
    is_edited BOOLEAN DEFAULT false,
    is_pinned BOOLEAN DEFAULT false,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Message reactions
CREATE TABLE public.message_reactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    message_id UUID REFERENCES public.messages(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    emoji VARCHAR(10) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(message_id, user_id, emoji)
);

-- Message attachments
CREATE TABLE public.message_attachments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    message_id UUID REFERENCES public.messages(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    url TEXT NOT NULL,
    size INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Space invitations
CREATE TABLE public.space_invitations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    space_id UUID REFERENCES public.spaces(id) ON DELETE CASCADE,
    invited_by UUID REFERENCES public.users(id) ON DELETE CASCADE,
    invited_user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    invited_email VARCHAR(255),
    message TEXT,
    is_accepted BOOLEAN DEFAULT false,
    is_rejected BOOLEAN DEFAULT false,
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '7 days'),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(space_id, invited_user_id)
);

-- Space join requests (for private spaces)
CREATE TABLE public.space_join_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    space_id UUID REFERENCES public.spaces(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    message TEXT,
    is_approved BOOLEAN DEFAULT false,
    is_rejected BOOLEAN DEFAULT false,
    reviewed_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(space_id, user_id)
);

-- Community referral links (replaces space-specific referral links)
CREATE TABLE public.community_referral_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    coach_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    referral_code VARCHAR(50) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    total_uses INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Community referral usage tracking
CREATE TABLE public.community_referral_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    referral_link_id UUID REFERENCES public.community_referral_links(id) ON DELETE CASCADE,
    used_by UUID REFERENCES public.users(id) ON DELETE CASCADE,
    used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT
);

-- Remove the old space referral tables
DROP TABLE IF EXISTS public.space_referral_usage;
DROP TABLE IF EXISTS public.space_referral_links;

-- Remove referral tracking from spaces table
ALTER TABLE public.spaces DROP COLUMN IF EXISTS referral_enabled;
ALTER TABLE public.spaces DROP COLUMN IF EXISTS referral_reward_description;

-- User sessions (for tracking online status)
CREATE TABLE public.user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    session_token UUID DEFAULT uuid_generate_v4(),
    ip_address INET,
    user_agent TEXT,
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    data JSONB,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Users indexes
CREATE INDEX idx_users_auth_id ON public.users(auth_id);
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_status ON public.users(status);
CREATE INDEX idx_users_is_online ON public.users(is_online);
CREATE INDEX idx_users_global_role ON public.users(global_role);

-- Categories indexes
CREATE INDEX idx_categories_name ON public.categories(name);
CREATE INDEX idx_categories_is_active ON public.categories(is_active);
CREATE INDEX idx_categories_created_by ON public.categories(created_by);

-- Spaces indexes
CREATE INDEX idx_spaces_owner_id ON public.spaces(owner_id);
CREATE INDEX idx_spaces_type ON public.spaces(type);
CREATE INDEX idx_spaces_category_id ON public.spaces(category_id);
CREATE INDEX idx_spaces_created_at ON public.spaces(created_at);
CREATE INDEX idx_spaces_tags ON public.spaces USING GIN(tags);

-- Space members indexes
CREATE INDEX idx_space_members_space_id ON public.space_members(space_id);
CREATE INDEX idx_space_members_user_id ON public.space_members(user_id);
CREATE INDEX idx_space_members_role ON public.space_members(role);

-- Messages indexes
CREATE INDEX idx_messages_space_id ON public.messages(space_id);
CREATE INDEX idx_messages_author_id ON public.messages(author_id);
CREATE INDEX idx_messages_created_at ON public.messages(created_at);
CREATE INDEX idx_messages_reply_to ON public.messages(reply_to);
CREATE INDEX idx_messages_is_deleted ON public.messages(is_deleted);

-- Message reactions indexes
CREATE INDEX idx_message_reactions_message_id ON public.message_reactions(message_id);
CREATE INDEX idx_message_reactions_user_id ON public.message_reactions(user_id);

-- Notifications indexes
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX idx_notifications_created_at ON public.notifications(created_at);

-- Referral links indexes
CREATE INDEX idx_community_referral_links_coach_id ON public.community_referral_links(coach_id);
CREATE INDEX idx_community_referral_links_referral_code ON public.community_referral_links(referral_code);
CREATE INDEX idx_community_referral_links_is_active ON public.community_referral_links(is_active);

-- Referral usage indexes
CREATE INDEX idx_community_referral_usage_referral_link_id ON public.community_referral_usage(referral_link_id);
CREATE INDEX idx_community_referral_usage_used_by ON public.community_referral_usage(used_by);
CREATE INDEX idx_community_referral_usage_used_at ON public.community_referral_usage(used_at);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_spaces_updated_at BEFORE UPDATE ON public.spaces
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON public.messages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update space member count
CREATE OR REPLACE FUNCTION update_space_member_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.spaces 
        SET member_count = member_count + 1 
        WHERE id = NEW.space_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.spaces 
        SET member_count = member_count - 1 
        WHERE id = OLD.space_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Apply member count trigger
CREATE TRIGGER update_space_member_count_trigger
    AFTER INSERT OR DELETE ON public.space_members
    FOR EACH ROW EXECUTE FUNCTION update_space_member_count();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.space_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.space_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.space_join_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view all users" ON public.users
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = auth_id);

CREATE POLICY "Users can insert own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = auth_id);

-- Categories policies
CREATE POLICY "Everyone can view active categories" ON public.categories
    FOR SELECT USING (is_active = true);

CREATE POLICY "Only admins can create categories" ON public.categories
    FOR INSERT WITH CHECK (
        (SELECT global_role FROM public.users WHERE auth_id = auth.uid()) = 'admin'
    );

CREATE POLICY "Only admins can update categories" ON public.categories
    FOR UPDATE USING (
        (SELECT global_role FROM public.users WHERE auth_id = auth.uid()) = 'admin'
    );

CREATE POLICY "Only admins can delete categories" ON public.categories
    FOR DELETE USING (
        (SELECT global_role FROM public.users WHERE auth_id = auth.uid()) = 'admin'
    );

-- Spaces policies (updated to remove secret space type)
CREATE POLICY "Public spaces are viewable by all users" ON public.spaces
    FOR SELECT USING (type = 'open');

CREATE POLICY "Private spaces are viewable by members" ON public.spaces
    FOR SELECT USING (
        type = 'private' AND id IN (
            SELECT space_id FROM public.space_members 
            WHERE user_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
        )
    );

CREATE POLICY "Space owners can update their spaces" ON public.spaces
    FOR UPDATE USING (
        owner_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
    );

CREATE POLICY "Authenticated users can create spaces" ON public.spaces
    FOR INSERT WITH CHECK (
        auth.uid() IS NOT NULL AND
        owner_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
    );

-- Space members policies
CREATE POLICY "Users can view space members of joined spaces" ON public.space_members
    FOR SELECT USING (
        space_id IN (
            SELECT space_id FROM public.space_members 
            WHERE user_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
        )
    );

CREATE POLICY "Space admins can manage members" ON public.space_members
    FOR ALL USING (
        space_id IN (
            SELECT space_id FROM public.space_members 
            WHERE user_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
            AND role IN ('admin')
        )
    );

CREATE POLICY "Users can join open spaces" ON public.space_members
    FOR INSERT WITH CHECK (
        space_id IN (SELECT id FROM public.spaces WHERE type = 'open') AND
        user_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
    );

-- Messages policies
CREATE POLICY "Users can view messages in joined spaces" ON public.messages
    FOR SELECT USING (
        space_id IN (
            SELECT space_id FROM public.space_members 
            WHERE user_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
        ) AND is_deleted = false
    );

CREATE POLICY "Users can create messages in joined spaces" ON public.messages
    FOR INSERT WITH CHECK (
        space_id IN (
            SELECT space_id FROM public.space_members 
            WHERE user_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
        ) AND
        author_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
    );

CREATE POLICY "Users can update own messages" ON public.messages
    FOR UPDATE USING (
        author_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
    );

CREATE POLICY "Admins and moderators can delete any message" ON public.messages
    FOR UPDATE USING (
        author_id = (SELECT id FROM public.users WHERE auth_id = auth.uid()) OR
        space_id IN (
            SELECT space_id FROM public.space_members 
            WHERE user_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
            AND role IN ('admin', 'moderator')
        )
    );

-- Message reactions policies
CREATE POLICY "Users can view reactions in joined spaces" ON public.message_reactions
    FOR SELECT USING (
        message_id IN (
            SELECT id FROM public.messages 
            WHERE space_id IN (
                SELECT space_id FROM public.space_members 
                WHERE user_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
            )
        )
    );

CREATE POLICY "Users can manage own reactions" ON public.message_reactions
    FOR ALL USING (
        user_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
    );

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON public.notifications
    FOR SELECT USING (
        user_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
    );

CREATE POLICY "Users can update own notifications" ON public.notifications
    FOR UPDATE USING (
        user_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
    );

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to get user role in a specific space
CREATE OR REPLACE FUNCTION get_user_role_in_space(user_auth_id UUID, space_id UUID)
RETURNS user_role AS $$
DECLARE
    user_role user_role;
BEGIN
    SELECT sm.role INTO user_role
    FROM public.space_members sm
    JOIN public.users u ON sm.user_id = u.id
    WHERE u.auth_id = user_auth_id AND sm.space_id = space_id;
    
    RETURN COALESCE(user_role, 'member');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user can access space (updated for no secret spaces)
CREATE OR REPLACE FUNCTION can_user_access_space(user_auth_id UUID, space_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    space_type space_type;
    is_member BOOLEAN;
BEGIN
    SELECT type INTO space_type FROM public.spaces WHERE id = space_id;
    
    IF space_type = 'open' THEN
        RETURN true;
    END IF;
    
    -- For private spaces, check membership
    SELECT EXISTS(
        SELECT 1 FROM public.space_members sm
        JOIN public.users u ON sm.user_id = u.id
        WHERE u.auth_id = user_auth_id AND sm.space_id = space_id
    ) INTO is_member;
    
    RETURN is_member;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create notification
CREATE OR REPLACE FUNCTION create_notification(
    user_id UUID,
    notification_type VARCHAR(50),
    title VARCHAR(255),
    message TEXT,
    data JSONB DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    notification_id UUID;
BEGIN
    INSERT INTO public.notifications (user_id, type, title, message, data)
    VALUES (user_id, notification_type, title, message, data)
    RETURNING id INTO notification_id;
    
    RETURN notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_user_admin(user_auth_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS(
        SELECT 1 FROM public.users 
        WHERE auth_id = user_auth_id AND global_role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- ============================================================================
-- REALTIME SUBSCRIPTIONS
-- ============================================================================

-- Enable realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.users;
ALTER PUBLICATION supabase_realtime ADD TABLE public.categories;
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.message_reactions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.space_members;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE public.users IS 'User profiles and authentication data';
COMMENT ON TABLE public.categories IS 'Admin-managed space categories';
COMMENT ON TABLE public.spaces IS 'Community spaces with different privacy levels';
COMMENT ON TABLE public.space_members IS 'Many-to-many relationship between users and spaces';
COMMENT ON TABLE public.messages IS 'Chat messages within spaces';
COMMENT ON TABLE public.message_reactions IS 'Emoji reactions to messages';
COMMENT ON TABLE public.message_attachments IS 'File attachments for messages';
COMMENT ON TABLE public.notifications IS 'User notifications system'; 

-- ============================================================================
-- COMMUNITY REFERRAL SYSTEM SQL FOR SUPABASE
-- ============================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- DROP OLD TABLES (if they exist)
-- ============================================================================

-- Drop old space referral tables if they exist
DROP TABLE IF EXISTS public.space_referral_usage CASCADE;
DROP TABLE IF EXISTS public.space_referral_links CASCADE;

-- ============================================================================
-- CREATE NEW COMMUNITY REFERRAL TABLES
-- ============================================================================

-- Community referral links (replaces space-specific referral links)
CREATE TABLE public.community_referral_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    coach_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    referral_code VARCHAR(50) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    total_uses INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Community referral usage tracking
CREATE TABLE public.community_referral_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    referral_link_id UUID REFERENCES public.community_referral_links(id) ON DELETE CASCADE,
    used_by UUID REFERENCES public.users(id) ON DELETE CASCADE,
    used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT
);

-- ============================================================================
-- CREATE INDEXES
-- ============================================================================

-- Community referral links indexes
CREATE INDEX idx_community_referral_links_coach_id ON public.community_referral_links(coach_id);
CREATE INDEX idx_community_referral_links_referral_code ON public.community_referral_links(referral_code);
CREATE INDEX idx_community_referral_links_is_active ON public.community_referral_links(is_active);

-- Community referral usage indexes
CREATE INDEX idx_community_referral_usage_referral_link_id ON public.community_referral_usage(referral_link_id);
CREATE INDEX idx_community_referral_usage_used_by ON public.community_referral_usage(used_by);
CREATE INDEX idx_community_referral_usage_used_at ON public.community_referral_usage(used_at);

-- ============================================================================
-- CREATE TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to community referral links
CREATE TRIGGER update_community_referral_links_updated_at 
    BEFORE UPDATE ON public.community_referral_links
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on community referral tables
ALTER TABLE public.community_referral_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_referral_usage ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- RLS POLICIES
-- ============================================================================

-- Community referral links policies
CREATE POLICY "Users can view all active referral links" ON public.community_referral_links
    FOR SELECT USING (is_active = true);

CREATE POLICY "Users can create their own referral links" ON public.community_referral_links
    FOR INSERT WITH CHECK (
        auth.uid() IS NOT NULL AND
        coach_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
    );

CREATE POLICY "Users can update their own referral links" ON public.community_referral_links
    FOR UPDATE USING (
        coach_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
    );

-- Community referral usage policies
CREATE POLICY "Users can view referral usage for active links" ON public.community_referral_usage
    FOR SELECT USING (
        referral_link_id IN (
            SELECT id FROM public.community_referral_links 
            WHERE is_active = true
        )
    );

CREATE POLICY "Users can insert referral usage" ON public.community_referral_usage
    FOR INSERT WITH CHECK (
        auth.uid() IS NOT NULL AND
        used_by = (SELECT id FROM public.users WHERE auth_id = auth.uid())
    );

-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================

-- Grant necessary permissions
GRANT ALL ON public.community_referral_links TO authenticated;
GRANT ALL ON public.community_referral_usage TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- ============================================================================
-- REALTIME SUBSCRIPTIONS
-- ============================================================================

-- Enable realtime for community referral links
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_referral_links;

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE public.community_referral_links IS 'Community-wide referral links created by coaches';
COMMENT ON TABLE public.community_referral_usage IS 'Tracking of referral link usage';

-- ============================================================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================================================

-- Uncomment the following lines if you want to insert sample data for testing
-- Make sure you have users in your users table first

/*
-- Insert sample referral links (replace with actual user IDs from your users table)
INSERT INTO public.community_referral_links (coach_id, referral_code) VALUES
('your-user-id-1', 'johnsmith1234'),
('your-user-id-2', 'sarahjones5678'),
('your-user-id-3', 'mikebrown9012');
*/ 