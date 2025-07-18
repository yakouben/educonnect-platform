'use client';

import { useState } from 'react';
import { X, Eye, EyeOff, GraduationCap, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

type UserRole = 'coach' | 'member';

export function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'role-select'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    socialMediaLink: '',
    coachLink: '',
    agreeTerms: false
  });

  // Add state for loading, error, success, and password strength
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | null>(null);
  
  // Add signup loading state
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);

  // Password strength checker
  const checkPasswordStrength = (password: string) => {
    if (password.length < 6) return 'weak';
    if (/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(password)) return 'strong';
    if (password.length >= 6) return 'medium';
    return 'weak';
  };

  if (!isOpen) return null;

  const handleGoogleSignIn = () => {
    // Google OAuth implementation would go here
    console.log('Google Sign In');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'login') {
      await handleLoginSubmit(e);
    } else if (mode === 'signup') {
      await handleSignupSubmit(e);
    }
  };

  const handleRoleSelection = (role: UserRole) => {
    setSelectedRole(role);
    setMode('signup');
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSignupForm((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError(null);
    setSignupSuccess(false);
    setSignupLoading(true);

    try {
      // Validate form
      if (!signupForm.name || !signupForm.email || !signupForm.password || !signupForm.confirmPassword) {
        throw new Error('Please fill in all required fields.');
      }

      if (signupForm.password !== signupForm.confirmPassword) {
        throw new Error('Passwords do not match.');
      }

      if (!signupForm.agreeTerms) {
        throw new Error('Please agree to the Terms & Conditions.');
      }

      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: signupForm.email,
        password: signupForm.password,
        options: {
          data: {
            name: signupForm.name,
            role: selectedRole,
            phone: signupForm.phone,
            social_media_link: signupForm.socialMediaLink,
            coach_link: signupForm.coachLink,
          }
        }
      });

      if (authError) {
        throw new Error(authError.message);
      }

      if (authData.user) {
        // Create user profile in the users table
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            auth_id: authData.user.id,
            name: signupForm.name,
            email: signupForm.email,
            global_role: selectedRole === 'coach' ? 'moderator' : 'member',
            status: 'active',
            is_online: true,
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
          // Don't throw here as the user is already created in auth
        }

        setSignupSuccess(true);
        setSignupError(null);
        
        // Reset form
        setSignupForm({
          name: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          socialMediaLink: '',
          coachLink: '',
          agreeTerms: false
        });
        
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      setSignupError(error instanceof Error ? error.message : 'An error occurred during signup.');
      setSignupSuccess(false);
    } finally {
      setSignupLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginSuccess(false);
    setLoginLoading(true);

    try {
      // Validate form
      if (!loginForm.email || !loginForm.password) {
        throw new Error('Please enter both email and password.');
      }

      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginForm.email,
        password: loginForm.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.user) {
        setLoginSuccess(true);
        setLoginError(null);
        
        // Reset form
        setLoginForm({
          email: '',
          password: ''
        });
        
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'An error occurred during login.');
      setLoginSuccess(false);
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden">
        
        {/* Mobile View */}
        <div className="md:hidden w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header with Background */}
          <div className="relative h-48 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/logo-joinly.png"
                alt="Joinly"
                width={300}
                height={300}
                className="w-full h-full object-contain p-8"
              />
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {mode === 'role-select' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Choose Your Role</h3>
                  <p className="text-gray-600">How would you like to join Joinly?</p>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => handleRoleSelection('coach')}
                    className="w-full p-6 border-2 border-gray-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">I'm a Coach</h4>
                        <p className="text-sm text-gray-600">Create and manage learning communities</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleRoleSelection('member')}
                    className="w-full p-6 border-2 border-gray-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <GraduationCap className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">I'm a Learner</h4>
                        <p className="text-sm text-gray-600">Join communities and learn from experts</p>
                      </div>
                    </div>
                  </button>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => setMode('login')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Already have an account? Sign In
                  </button>
                </div>
              </div>
            )}

            {(mode === 'login' || mode === 'signup') && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {mode === 'login' ? 'Sign In' : 'Create your account'}
                  </h3>
                  {mode === 'signup' && selectedRole && (
                    <p className="text-gray-600">
                      {selectedRole === 'coach' ? 'Set up your coach profile' : 'Join as a learner'}
                    </p>
                  )}
                </div>

                {/* Login Form */}
                {mode === 'login' && (
                  <>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                          id="loginEmail"
                          name="email"
                          type="email"
                          value={loginForm.email}
                          onChange={handleLoginChange}
                          placeholder="Enter your email"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          required
                          aria-required="true"
                        />
                      </div>
                      <div>
                        <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <div className="relative">
                          <input
                            id="loginPassword"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={loginForm.password}
                            onChange={handleLoginChange}
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            required
                            aria-required="true"
                            aria-describedby="password-strength"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        {/* Password strength indicator */}
                        {loginForm.password && (
                          <div id="password-strength" className="mt-1 text-xs">
                            <span className={
                              passwordStrength === 'strong' ? 'text-green-600' :
                              passwordStrength === 'medium' ? 'text-yellow-600' :
                              'text-red-600'
                            }>
                              Password strength: {passwordStrength}
                            </span>
                      </div>
                        )}
                    </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                          tabIndex={0}
                          aria-label="Forgot password?"
                          onClick={() => alert('Forgot password flow coming soon!')}
                        >
                          Forgot password?
                        </button>
                      </div>
                    </div>
                    {/* Error message */}
                    {loginError && (
                      <div className="text-red-600 text-sm text-center">{loginError}</div>
                    )}
                    {/* Success message */}
                    {loginSuccess && (
                      <div className="text-green-600 text-sm text-center">Login successful!</div>
                    )}
                    <div className="space-y-4">
                      <button
                        type="submit"
                        className={cn(
                          "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center",
                          loginLoading && 'opacity-60 cursor-not-allowed'
                        )}
                        disabled={loginLoading}
                        aria-busy={loginLoading}
                      >
                        {loginLoading ? (
                          <span className="flex items-center space-x-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                            <span>Signing In...</span>
                          </span>
                        ) : (
                          'Sign In'
                        )}
                      </button>
                      
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">or</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center space-x-3 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5" />
                        <span className="font-medium text-gray-700">Continue with Google</span>
                      </button>
                    </div>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => setMode('role-select')}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Don't have an account? Sign Up
                      </button>
                    </div>
                  </>
                )}

                {/* Signup Form */}
                {mode === 'signup' && selectedRole && (
                  <>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="signupName" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          id="signupName"
                          name="name"
                          type="text"
                          value={signupForm.name}
                          onChange={handleSignupChange}
                          placeholder="Enter your full name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          required
                          aria-required="true"
                        />
                      </div>

                      <div>
                        <label htmlFor="signupEmail" className="block text-sm font-medium text-gray-700 mb-2">
                          {selectedRole === 'member' ? 'Email or Phone' : 'Email Address'}
                        </label>
                        <input
                          id="signupEmail"
                          name="email"
                          type={selectedRole === 'member' ? 'text' : 'email'}
                          value={signupForm.email}
                          onChange={handleSignupChange}
                          placeholder={selectedRole === 'member' ? 'Enter email or phone' : 'Enter your email'}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          required
                          aria-required="true"
                        />
                      </div>

                      {selectedRole === 'coach' && (
                        <div>
                          <label htmlFor="signupPhone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                          <input
                            id="signupPhone"
                            name="phone"
                            type="tel"
                            value={signupForm.phone}
                            onChange={handleSignupChange}
                            placeholder="Enter your phone number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            required
                            aria-required="true"
                          />
                        </div>
                      )}

                      <div>
                        <label htmlFor="signupPassword" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <div className="relative">
                          <input
                            id="signupPassword"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={signupForm.password}
                            onChange={handleSignupChange}
                            placeholder="Create a password"
                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            required
                            aria-required="true"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="signupConfirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                        <div className="relative">
                          <input
                            id="signupConfirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={signupForm.confirmPassword}
                            onChange={handleSignupChange}
                            placeholder="Confirm your password"
                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            required
                            aria-required="true"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                          >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      {selectedRole === 'coach' && (
                        <div>
                          <label htmlFor="signupSocialMedia" className="block text-sm font-medium text-gray-700 mb-2">Social Media Link</label>
                          <input
                            id="signupSocialMedia"
                            name="socialMediaLink"
                            type="url"
                            value={signupForm.socialMediaLink}
                            onChange={handleSignupChange}
                            placeholder="Your Instagram, LinkedIn, etc."
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          />
                        </div>
                      )}

                      {selectedRole === 'member' && (
                        <div>
                          <label htmlFor="signupCoachLink" className="block text-sm font-medium text-gray-700 mb-2">Coach Link (Optional)</label>
                          <input
                            id="signupCoachLink"
                            name="coachLink"
                            type="url"
                            value={signupForm.coachLink}
                            onChange={handleSignupChange}
                            placeholder="Link to your coach's profile"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          />
                        </div>
                      )}

                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id="agreeTerms"
                          name="agreeTerms"
                          checked={signupForm.agreeTerms}
                          onChange={(e) => setSignupForm({ ...signupForm, agreeTerms: e.target.checked })}
                          className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          required
                          aria-required="true"
                        />
                        <label htmlFor="agreeTerms" className="text-sm text-gray-600">
                          I agree to the{' '}
                          <a href="#" className="text-blue-600 hover:text-blue-700">Terms & Conditions</a>
                        </label>
                      </div>
                    </div>

                    {/* Signup Error message */}
                    {signupError && (
                      <div className="text-red-600 text-sm text-center">{signupError}</div>
                    )}
                    {/* Signup Success message */}
                    {signupSuccess && (
                      <div className="text-green-600 text-sm text-center">Account created successfully! Welcome to Joinly!</div>
                    )}

                    <div className="space-y-4">
                      <button
                        type="submit"
                        className={cn(
                          "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center",
                          signupLoading && 'opacity-60 cursor-not-allowed'
                        )}
                        disabled={signupLoading}
                        aria-busy={signupLoading}
                      >
                        {signupLoading ? (
                          <span className="flex items-center space-x-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                            <span>Creating Account...</span>
                          </span>
                        ) : (
                          'Sign Up'
                        )}
                      </button>
                      
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">or</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center space-x-3 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5" />
                        <span className="font-medium text-gray-700">Continue with Google</span>
                      </button>
                    </div>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => setMode('login')}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Already have an account? Sign In
                      </button>
                    </div>
                  </>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px]">
          {/* Left Side - Enhanced Welcome Section */}
          <div className="flex-1 relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
              {/* Floating geometric shapes */}
              <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
              <div className="absolute top-40 right-16 w-12 h-12 bg-white/5 rounded-lg animate-bounce" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-32 left-16 w-16 h-16 bg-white/8 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-20 right-20 w-8 h-8 bg-white/6 rounded-lg animate-bounce" style={{ animationDelay: '0.5s' }}></div>
              
              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent"></div>
            </div>

            {/* Main Content */}
            <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
              {/* Logo with enhanced styling */}
              <div className="relative mb-8">
                <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl ring-2 ring-white/20">
              <Image
                src="/logo-joinly.png"
                alt="Joinly"
                    width={80}
                    height={80}
                    className="w-20 h-20 object-contain"
                  />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 w-32 h-32 bg-blue-400/30 rounded-3xl blur-xl animate-pulse"></div>
            </div>
            
              {/* Welcome Text */}
              <div className="space-y-4 mb-8">
                <h2 className="text-4xl font-bold text-white leading-tight">
                  Welcome to{' '}
                  <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Joinly
                  </span>
                </h2>
                <p className="text-xl text-blue-100 max-w-sm leading-relaxed">
                  Join the ultimate learning community where coaches and learners connect, grow, and succeed together.
                </p>
              </div>

              {/* Feature Highlights */}
              <div className="space-y-4 w-full max-w-sm">
                <div className="flex items-center space-x-3 text-blue-100">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Connect with expert coaches</span>
                </div>
                <div className="flex items-center space-x-3 text-blue-100">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Learn in interactive communities</span>
                </div>
                <div className="flex items-center space-x-3 text-blue-100">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Track your progress</span>
                </div>
              </div>

              {/* Stats or Social Proof */}
              <div className="mt-8 flex items-center justify-center space-x-6 text-blue-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div className="text-xs">Active Coaches</div>
                </div>
                <div className="w-px h-8 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">10K+</div>
                  <div className="text-xs">Learners</div>
                </div>
                <div className="w-px h-8 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">50+</div>
                  <div className="text-xs">Communities</div>
                </div>
              </div>
            </div>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Bottom decorative element */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>

          {/* Right Side - Form Section */}
          <div className="flex-1 p-12 flex flex-col justify-center">
            {mode === 'role-select' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Choose Your Role</h3>
                  <p className="text-gray-600">How would you like to join Joinly?</p>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => handleRoleSelection('coach')}
                    className="w-full p-6 border-2 border-gray-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <Users className="w-8 h-8 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">I'm a Coach</h4>
                        <p className="text-gray-600">Create and manage learning communities</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleRoleSelection('member')}
                    className="w-full p-6 border-2 border-gray-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <GraduationCap className="w-8 h-8 text-green-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">I'm a Learner</h4>
                        <p className="text-gray-600">Join communities and learn from experts</p>
                      </div>
                    </div>
                  </button>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => setMode('login')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Already have an account? Sign In
                  </button>
                </div>
              </div>
            )}

            {(mode === 'login' || mode === 'signup') && (
              <div className="w-full max-w-md mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {mode === 'login' ? 'Sign In' : 'Create your account'}
                  </h3>
                  {mode === 'signup' && selectedRole && (
                    <p className="text-gray-600">
                      {selectedRole === 'coach' ? 'Set up your coach profile' : 'Join as a learner'}
                    </p>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Same form content as mobile, but with better spacing */}
                  {mode === 'login' && (
                    <>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="loginEmailDesktop" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                          <input
                            id="loginEmailDesktop"
                            name="email"
                            type="email"
                            value={loginForm.email}
                            onChange={handleLoginChange}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            required
                            aria-required="true"
                          />
                        </div>

                        <div>
                          <label htmlFor="loginPasswordDesktop" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                          <div className="relative">
                            <input
                              id="loginPasswordDesktop"
                              name="password"
                              type={showPassword ? 'text' : 'password'}
                              value={loginForm.password}
                              onChange={handleLoginChange}
                              placeholder="Enter your password"
                              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                              required
                              aria-required="true"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Error message */}
                      {loginError && (
                        <div className="text-red-600 text-sm text-center">{loginError}</div>
                      )}
                      {/* Success message */}
                      {loginSuccess && (
                        <div className="text-green-600 text-sm text-center">Login successful!</div>
                      )}

                      <div className="space-y-4">
                        <button
                          type="submit"
                          className={cn(
                            "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center",
                            loginLoading && 'opacity-60 cursor-not-allowed'
                          )}
                          disabled={loginLoading}
                          aria-busy={loginLoading}
                        >
                          {loginLoading ? (
                            <span className="flex items-center space-x-2">
                              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                              <span>Signing In...</span>
                            </span>
                          ) : (
                            'Sign In'
                          )}
                        </button>
                        
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">or</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleGoogleSignIn}
                          className="w-full flex items-center justify-center space-x-3 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5" />
                          <span className="font-medium text-gray-700">Continue with Google</span>
                        </button>
                      </div>

                      <div className="text-center">
                        <button
                          type="button"
                          onClick={() => setMode('role-select')}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Don't have an account? Sign Up
                        </button>
                      </div>
                    </>
                  )}

                  {/* Signup form - same as mobile */}
                  {mode === 'signup' && selectedRole && (
                    <>
                      <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                        <div>
                          <label htmlFor="signupNameDesktop" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                          <input
                            id="signupNameDesktop"
                            name="name"
                            type="text"
                            value={signupForm.name}
                            onChange={handleSignupChange}
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            required
                            aria-required="true"
                          />
                        </div>

                        <div>
                          <label htmlFor="signupEmailDesktop" className="block text-sm font-medium text-gray-700 mb-2">
                            {selectedRole === 'member' ? 'Email or Phone' : 'Email Address'}
                          </label>
                          <input
                            id="signupEmailDesktop"
                            name="email"
                            type={selectedRole === 'member' ? 'text' : 'email'}
                            value={signupForm.email}
                            onChange={handleSignupChange}
                            placeholder={selectedRole === 'member' ? 'Enter email or phone' : 'Enter your email'}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            required
                            aria-required="true"
                          />
                        </div>

                        {selectedRole === 'coach' && (
                          <div>
                            <label htmlFor="signupPhoneDesktop" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                            <input
                              id="signupPhoneDesktop"
                              name="phone"
                              type="tel"
                              value={signupForm.phone}
                              onChange={handleSignupChange}
                              placeholder="Enter your phone number"
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                              required
                              aria-required="true"
                            />
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label htmlFor="signupPasswordDesktop" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                              <input
                                id="signupPasswordDesktop"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={signupForm.password}
                                onChange={handleSignupChange}
                                placeholder="Password"
                                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                required
                                aria-required="true"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                              >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>

                          <div>
                            <label htmlFor="signupConfirmPasswordDesktop" className="block text-sm font-medium text-gray-700 mb-2">Confirm</label>
                            <div className="relative">
                              <input
                                id="signupConfirmPasswordDesktop"
                                name="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={signupForm.confirmPassword}
                                onChange={handleSignupChange}
                                placeholder="Confirm"
                                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                required
                                aria-required="true"
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                              >
                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>
                        </div>

                        {selectedRole === 'coach' && (
                          <div>
                            <label htmlFor="signupSocialMediaDesktop" className="block text-sm font-medium text-gray-700 mb-2">Social Media Link</label>
                            <input
                              id="signupSocialMediaDesktop"
                              name="socialMediaLink"
                              type="url"
                              value={signupForm.socialMediaLink}
                              onChange={handleSignupChange}
                              placeholder="Your Instagram, LinkedIn, etc."
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                          </div>
                        )}

                        {selectedRole === 'member' && (
                          <div>
                            <label htmlFor="signupCoachLinkDesktop" className="block text-sm font-medium text-gray-700 mb-2">Coach Link (Optional)</label>
                            <input
                              id="signupCoachLinkDesktop"
                              name="coachLink"
                              type="url"
                              value={signupForm.coachLink}
                              onChange={handleSignupChange}
                              placeholder="Link to your coach's profile"
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                          </div>
                        )}

                        <div className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            id="agreeTermsDesktop"
                            name="agreeTerms"
                            checked={signupForm.agreeTerms}
                            onChange={handleSignupChange}
                            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            required
                            aria-required="true"
                          />
                          <label htmlFor="agreeTermsDesktop" className="text-sm text-gray-600">
                            I agree to the{' '}
                            <a href="#" className="text-blue-600 hover:text-blue-700">Terms & Conditions</a>
                          </label>
                        </div>
                      </div>

                      {/* Signup Error message */}
                      {signupError && (
                        <div className="text-red-600 text-sm text-center">{signupError}</div>
                      )}
                      {/* Signup Success message */}
                      {signupSuccess && (
                        <div className="text-green-600 text-sm text-center">Account created successfully! Welcome to Joinly!</div>
                      )}

                      <div className="space-y-4">
                        <button
                          type="submit"
                          className={cn(
                            "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center",
                            signupLoading && 'opacity-60 cursor-not-allowed'
                          )}
                          disabled={signupLoading}
                          aria-busy={signupLoading}
                        >
                          {signupLoading ? (
                            <span className="flex items-center space-x-2">
                              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                              <span>Creating Account...</span>
                            </span>
                          ) : (
                            'Sign Up'
                          )}
                        </button>
                        
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">or</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleGoogleSignIn}
                          className="w-full flex items-center justify-center space-x-3 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5" />
                          <span className="font-medium text-gray-700">Continue with Google</span>
                        </button>
                      </div>

                      <div className="text-center">
                        <button
                          type="button"
                          onClick={() => setMode('login')}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Already have an account? Sign In
                        </button>
                      </div>
                    </>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 