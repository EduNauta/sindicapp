'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Eye, 
  EyeOff, 
  Save, 
  ArrowLeft,
  UserCheck,
  Lock
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { useAuthStore } from '@/lib/auth-store';
import { apiClient } from '@/lib/api';
import { 
  profileUpdateSchema, 
  changePasswordSchema,
  ProfileUpdateFormData,
  ChangePasswordFormData 
} from '@/lib/validations';
import { formatError } from '@/lib/utils';

function ProfileContent() {
  const router = useRouter();
  const { user, updateUser, setLoading } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Profile form
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors, isSubmitting: isProfileSubmitting },
    reset: resetProfile,
  } = useForm({
    resolver: zodResolver(profileUpdateSchema),
  });

  // Password form
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
    reset: resetPassword,
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  // Set initial form values when user data is available
  useEffect(() => {
    if (user) {
      resetProfile({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        bio: '',
        phone: '',
        profilePublic: true,
        emailPublic: false,
        phonePublic: false,
      });
    }
  }, [user, resetProfile]);

  const onProfileSubmit = async (data: ProfileUpdateFormData) => {
    try {
      setIsUpdating(true);
      setMessage(null);

      // For now, just update the local store
      // In a real implementation, you'd call an API endpoint
      if (user) {
        updateUser({
          firstName: data.firstName,
          lastName: data.lastName,
        });
      }

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: formatError(error) });
    } finally {
      setIsUpdating(false);
    }
  };

  const onPasswordSubmit = async (data: ChangePasswordFormData) => {
    try {
      setIsUpdating(true);
      setMessage(null);

      const response = await apiClient.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      if (response.success) {
        setMessage({ type: 'success', text: 'Password changed successfully! Please log in again.' });
        resetPassword();
        
        // Logout after password change
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setMessage({ type: 'error', text: response.message || 'Failed to change password' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: formatError(error) });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => router.push('/dashboard')}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Profile Settings</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Message */}
          {message && (
            <div className={`mb-6 rounded-md p-4 ${
              message.type === 'success' 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className={`text-sm ${
                message.type === 'success' ? 'text-green-700' : 'text-red-700'
              }`}>
                {message.text}
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <User className="h-4 w-4 inline-block mr-2" />
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'security'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Lock className="h-4 w-4 inline-block mr-2" />
                Security
              </button>
            </nav>
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
                <p className="mt-1 text-sm text-gray-600">
                  Update your personal information and profile settings.
                </p>
              </div>

              <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="px-6 py-4 space-y-6">
                {/* Current User Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Current Information</h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        <strong>Email:</strong> {user?.email}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        <strong>Username:</strong> {user?.username}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        <strong>Role:</strong> {user?.role}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <UserCheck className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        <strong>Verified:</strong> {user?.emailVerified ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Editable Fields */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Your first name"
                      error={profileErrors.firstName?.message}
                      {...registerProfile('firstName')}
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Your last name"
                      error={profileErrors.lastName?.message}
                      {...registerProfile('lastName')}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    rows={3}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Tell us about yourself..."
                    {...registerProfile('bio')}
                  />
                  {profileErrors.bio && (
                    <p className="mt-1 text-xs text-red-500">{profileErrors.bio.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1234567890"
                    error={profileErrors.phone?.message}
                    {...registerProfile('phone')}
                  />
                </div>

                {/* Privacy Settings */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        id="profilePublic"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        {...registerProfile('profilePublic')}
                      />
                      <label htmlFor="profilePublic" className="ml-2 block text-sm text-gray-900">
                        Make my profile public
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="emailPublic"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        {...registerProfile('emailPublic')}
                      />
                      <label htmlFor="emailPublic" className="ml-2 block text-sm text-gray-900">
                        Show my email address publicly
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="phonePublic"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        {...registerProfile('phonePublic')}
                      />
                      <label htmlFor="phonePublic" className="ml-2 block text-sm text-gray-900">
                        Show my phone number publicly
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    loading={isUpdating || isProfileSubmitting}
                    disabled={isUpdating || isProfileSubmitting}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Update Profile
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Security Settings</h2>
                <p className="mt-1 text-sm text-gray-600">
                  Manage your account security and password.
                </p>
              </div>

              <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="px-6 py-4 space-y-6">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? 'text' : 'password'}
                      placeholder="Enter your current password"
                      error={passwordErrors.currentPassword?.message}
                      {...registerPassword('currentPassword')}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder="Enter your new password"
                      error={passwordErrors.newPassword?.message}
                      {...registerPassword('newPassword')}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Input
                      id="confirmNewPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your new password"
                      error={passwordErrors.confirmNewPassword?.message}
                      {...registerPassword('confirmNewPassword')}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                  <div className="text-sm text-yellow-700">
                    <strong>Note:</strong> Changing your password will log you out of all devices. 
                    You&apos;ll need to log in again with your new password.
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    variant="destructive"
                    loading={isUpdating || isPasswordSubmitting}
                    disabled={isUpdating || isPasswordSubmitting}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
} 