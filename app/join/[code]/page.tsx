'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { GlassCard } from '@/components/ui/glass-card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { AuthModal } from '@/components/AuthModal';
import { useToast } from '@/hooks/use-toast';
import { getCommunityReferralLinkByCode, useCommunityReferralLink } from '@/lib/supabase';
import { getCurrentUser, getUserProfile } from '@/lib/supabase';
import { Users, Calendar, Shield, CheckCircle, XCircle, Loader2, User } from 'lucide-react';
import Image from 'next/image';

interface ReferralData {
  id: string;
  referral_code: string;
  is_active: boolean;
  total_uses: number;
  created_at: string;
  coach: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    bio: string | null;
  };
}

export default function JoinWithReferralPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [referralData, setReferralData] = useState<ReferralData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const referralCode = params.code as string;

  useEffect(() => {
    loadReferralData();
    checkUserAuth();
  }, [referralCode]);

  const loadReferralData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await getCommunityReferralLinkByCode(referralCode);
      
      if (error) {
        throw error;
      }
      
      if (!data) {
        setError('Referral link not found');
        return;
      }
      
      setReferralData(data);
    } catch (error: any) {
      console.error('Error loading referral data:', error);
      setError(error.message || 'Failed to load referral link');
    } finally {
      setIsLoading(false);
    }
  };

  const checkUserAuth = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
      
      if (user) {
        const { data: profile } = await getUserProfile(user.id);
        setUserProfile(profile);
      }
    } catch (error) {
      console.error('Error checking user auth:', error);
    }
  };

  const handleJoinCommunity = async () => {
    if (!currentUser || !userProfile) {
      setShowAuthModal(true);
      return;
    }

    setIsJoining(true);
    
    try {
      // Use the referral link
      const { data: usageData, error: usageError } = await useCommunityReferralLink(
        referralData!.id,
        userProfile.id,
        navigator.userAgent
      );
      
      if (usageError) {
        throw usageError;
      }

      toast({
        title: 'Welcome to Joinly!',
        description: `You've successfully joined the community using ${referralData!.coach.name}'s referral link!`,
        variant: 'default'
      });

      // Redirect to the dashboard
      setTimeout(() => {
        router.push('/');
      }, 2000);
      
    } catch (error: any) {
      console.error('Error joining community:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to join community',
        variant: 'destructive'
      });
    } finally {
      setIsJoining(false);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    checkUserAuth();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4">
        <GlassCard className="w-full max-w-md p-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-white mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Loading...</h2>
          <p className="text-white/60">Verifying your referral link</p>
        </GlassCard>
      </div>
    );
  }

  if (error || !referralData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4">
        <GlassCard className="w-full max-w-md p-8 text-center">
          <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Invalid Link</h2>
          <p className="text-white/60 mb-6">{error || 'This referral link is not valid.'}</p>
          <EnhancedButton
            onClick={() => router.push('/')}
            variant="primary"
            className="bg-blue-500/80 hover:bg-blue-500"
          >
            Go Home
          </EnhancedButton>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Image
              src="/logo-joinly.png"
              alt="Joinly"
              width={60}
              height={60}
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">You're Invited!</h1>
          <p className="text-white/60">Someone has invited you to join the Joinly community</p>
        </div>

        {/* Coach Card */}
        <GlassCard className="p-6 mb-6">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <h2 className="text-2xl font-bold text-white">{referralData.coach.name}</h2>
                <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                  <span className="text-xs text-white/80">Coach</span>
                </div>
              </div>
              
              {referralData.coach.bio && (
                <p className="text-white/70 mb-4">{referralData.coach.bio}</p>
              )}
              
              <p className="text-white/60 text-sm">
                Join the Joinly community and start your learning journey with {referralData.coach.name}!
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Referral Info */}
        <GlassCard className="p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2 text-white/60">
              <Users className="w-4 h-4" />
              <span>{referralData.total_uses} people have joined</span>
            </div>
            
            <div className="flex items-center space-x-2 text-white/60">
              <Calendar className="w-4 h-4" />
              <span>Created {formatDate(referralData.created_at)}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-white/60">
              <Shield className="w-4 h-4" />
              <span>Community Referral</span>
            </div>
            
            <div className="flex items-center space-x-2 text-white/60">
              <span className="font-mono text-white">{referralData.referral_code}</span>
            </div>
          </div>
        </GlassCard>

        {/* Join Button */}
        <div className="text-center">
          {currentUser && userProfile ? (
            <EnhancedButton
              onClick={handleJoinCommunity}
              variant="primary"
              disabled={isJoining}
              className="w-full bg-blue-500/80 hover:bg-blue-500 text-lg py-4"
            >
              {isJoining ? (
                <span className="flex items-center space-x-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Joining Community...</span>
                </span>
              ) : (
                <span className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Join Joinly Community</span>
                </span>
              )}
            </EnhancedButton>
          ) : (
            <EnhancedButton
              onClick={() => setShowAuthModal(true)}
              variant="primary"
              className="w-full bg-blue-500/80 hover:bg-blue-500 text-lg py-4"
            >
              <span className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Sign In to Join</span>
              </span>
            </EnhancedButton>
          )}
          
          <p className="text-white/40 text-sm mt-4">
            By joining, you agree to the community guidelines and terms of service.
          </p>
        </div>

        {/* Auth Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode="login"
        />
      </div>
    </div>
  );
} 