# 🚀 Supabase Setup Guide

## 📋 Environment Configuration

Create a `.env.local` file in your project root with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 🔑 Getting Your Supabase Credentials

1. **Go to your Supabase Dashboard**: https://supabase.com/dashboard
2. **Select your project** (or create a new one)
3. **Navigate to Settings** → **API**
4. **Copy the following values**:
   - **Project URL** → Use as `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → Use as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🗄️ Database Setup

1. **Run the SQL Schema**: Execute the `supabase_schema.sql` file in your Supabase SQL editor
2. **Verify Tables**: Check that all tables are created successfully
3. **Insert Sample Categories** (optional):

```sql
-- Insert default categories
INSERT INTO public.categories (name, description, color, icon, is_active) VALUES
('Development', 'Programming and software development', 'bg-blue-500', '💻', true),
('Design', 'UI/UX design and creative work', 'bg-purple-500', '🎨', true),
('Business', 'Entrepreneurship and business discussions', 'bg-green-500', '💼', true),
('Education', 'Learning and educational content', 'bg-orange-500', '📚', true),
('Community', 'General community discussions', 'bg-pink-500', '👥', true);
```

## 👤 Authentication Setup

### Enable Authentication Providers (Optional)
1. Go to **Authentication** → **Providers**
2. Enable your preferred providers (Email, Google, GitHub, etc.)

### Create User Profile Function
Add this function to automatically create user profiles:

```sql
-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (auth_id, name, email, avatar)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## ✅ Features Implemented

### 🏗️ Space Creation Form
- **Real-time validation** with error messages
- **Category selection** from database
- **Color picker** for space customization
- **Privacy settings** (Open/Private)
- **Form validation** with user feedback
- **Loading states** during creation

### 🔗 Database Integration
- **Supabase client** configured with TypeScript
- **Space creation** with owner assignment
- **Automatic member addition** (creator as admin)
- **Category loading** from database
- **Error handling** with user notifications

### 🎨 User Experience
- **Success notifications** on space creation
- **Form reset** after successful creation
- **Loading indicators** during async operations
- **Fallback categories** if database is empty
- **Authentication checks** before creation

## 🔧 How It Works

1. **User opens create form** → Categories loaded from Supabase
2. **User fills form** → Real-time validation
3. **User submits** → Authentication check
4. **Space created** → Database insertion
5. **Creator added** → As admin member
6. **Success feedback** → Form reset & notification

## 🎯 Next Steps

1. **Enable authentication** in your app
2. **Add space listing** from database
3. **Implement join/leave** functionality
4. **Add real-time updates** with Supabase subscriptions
5. **Add file uploads** for space avatars

## 🐛 Troubleshooting

### Common Issues:

**"Categories not loading"**
- Check if categories table has data
- Verify environment variables
- Check browser console for errors

**"Authentication Required"**
- Implement Supabase Auth in your app
- Add login/signup functionality

**"Space creation failed"**
- Check Row Level Security policies
- Verify user has required permissions
- Check Supabase logs for detailed errors

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security) 