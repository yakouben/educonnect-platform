'use client';

import { useState, useEffect } from 'react';
import { X, Copy, Share2, Link, Users, Plus } from 'lucide-react';
import { GlassCard } from './ui/glass-card';
import { EnhancedButton } from './ui/enhanced-button';
import { useToast } from '@/hooks/use-toast';
import { getCommunityReferralLinks, createCommunityReferralLink } from '@/lib/supabase';

interface CommunityReferralLink {
  id: string;
  referral_code: string;
  total_uses: number;
  created_at: string;
  coach: {
    name: string;
    email: string;
    avatar: string;
  };
}

interface CommunityReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserId: string;
  currentUserName: string;
}

export function CommunityReferralModal({ isOpen, onClose, currentUserId, currentUserName }: CommunityReferralModalProps) {
  const [referralLinks, setReferralLinks] = useState<CommunityReferralLink[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      loadReferralLinks();
    }
  }, [isOpen]);

  const loadReferralLinks = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await getCommunityReferralLinks();
      if (error) throw error;
      setReferralLinks(data || []);
    } catch (error) {
      console.error('Error loading referral links:', error);
      toast({
        title: 'Error',
        description: 'Failed to load referral links.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateReferralLink = async () => {
    setIsCreating(true);
    try {
      const { data, error } = await createCommunityReferralLink(currentUserId, currentUserName);
      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Your referral link has been created!',
        variant: 'default'
      });

      await loadReferralLinks();
    } catch (error) {
      console.error('Error creating referral link:', error);
      toast({
        title: 'Error',
        description: 'Failed to create referral link.',
        variant: 'destructive'
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleCopyLink = async (referralCode: string) => {
    const referralUrl = `${window.location.origin}/join/${referralCode}`;
    try {
      await navigator.clipboard.writeText(referralUrl);
      toast({
        title: 'Copied!',
        description: 'Referral link copied to clipboard.',
        variant: 'default'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to copy link to clipboard.',
        variant: 'destructive'
      });
    }
  };

  const handleShareLink = async (referralCode: string) => {
    const referralUrl = `${window.location.origin}/join/${referralCode}`;
    const shareData = {
      title: `Join Joinly Community`,
      text: `I'm inviting you to join the Joinly community! Use this link to get started:`,
      url: referralUrl
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await handleCopyLink(referralCode);
      }
    } catch (error) {
      await handleCopyLink(referralCode);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <GlassCard className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">Community Referral Links</h3>
              <p className="text-white/60 text-sm">Share Joinly with your network</p>
            </div>
            <div className="flex items-center space-x-3">
              <EnhancedButton
                onClick={handleCreateReferralLink}
                variant="primary"
                disabled={isCreating}
                className="bg-blue-500/80 hover:bg-blue-500"
              >
                <Plus className="w-4 h-4 mr-2" />
                {isCreating ? 'Creating...' : 'Create My Link'}
              </EnhancedButton>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
                <p className="text-white/60 mt-2">Loading referral links...</p>
              </div>
            ) : referralLinks.length === 0 ? (
              <div className="text-center py-8">
                <Link className="w-12 h-12 text-white/40 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">No Referral Links</h4>
                <p className="text-white/60 mb-4">Create your first referral link to start inviting people to Joinly.</p>
                <EnhancedButton
                  onClick={handleCreateReferralLink}
                  variant="primary"
                  className="bg-blue-500/80 hover:bg-blue-500"
                >
                  Create First Link
                </EnhancedButton>
              </div>
            ) : (
              referralLinks.map((link) => (
                <GlassCard key={link.id} className="p-4 bg-white/5">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="font-mono text-lg font-bold text-white bg-white/10 px-3 py-1 rounded-lg">
                          {link.referral_code}
                        </div>
                        <span className="text-sm font-medium text-green-500">Active</span>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm text-white/60">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{link.total_uses} people joined</span>
                        </div>
                        <span>Created by {link.coach.name}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <EnhancedButton
                        onClick={() => handleCopyLink(link.referral_code)}
                        variant="ghost"
                        size="sm"
                        className="text-white/60 hover:text-white"
                      >
                        <Copy className="w-4 h-4" />
                      </EnhancedButton>
                      
                      <EnhancedButton
                        onClick={() => handleShareLink(link.referral_code)}
                        variant="ghost"
                        size="sm"
                        className="text-white/60 hover:text-white"
                      >
                        <Share2 className="w-4 h-4" />
                      </EnhancedButton>
                    </div>
                  </div>
                </GlassCard>
              ))
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );
} 