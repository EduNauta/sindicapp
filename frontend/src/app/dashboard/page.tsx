'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, User, Settings, Shield } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { useAuthStore } from '@/lib/auth-store';
import { apiClient } from '@/lib/api';
import { formatError } from '@/lib/utils';

function DashboardContent() {
  const router = useRouter();
  const { user, logout, setLoading } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      setLoading(true);
      
      await apiClient.logout();
      logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', formatError(error));
      // Even if logout fails on server, clear local auth
      logout();
      router.push('/login');
    } finally {
      setIsLoggingOut(false);
      setLoading(false);
    }
  };

  const handleLogoutAll = async () => {
    try {
      setIsLoggingOut(true);
      setLoading(true);
      
      await apiClient.logoutAll();
      logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout all error:', formatError(error));
      // Even if logout fails on server, clear local auth
      logout();
      router.push('/login');
    } finally {
      setIsLoggingOut(false);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-900">SindicApp</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-700">
                  {user?.firstName && user?.lastName 
                    ? `${user.firstName} ${user.lastName}` 
                    : user?.username}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {user?.role}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                {user?.role === 'admin' && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => router.push('/admin')}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Admin Panel
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => router.push('/profile')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Profile
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogoutAll}
                  disabled={isLoggingOut}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Logout All
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                  loading={isLoggingOut}
                  disabled={isLoggingOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Welcome Card */}
            <div className="lg:col-span-2">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Welcome to SindicApp!
                  </h2>
                  <p className="text-gray-600 mb-4">
                    You have successfully logged in to your account. This is your dashboard where you can manage your profile, 
                    access company forums, and participate in union activities.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <h3 className="text-sm font-medium text-blue-800 mb-2">Authentication Status</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>✓ Successfully authenticated</li>
                      <li>✓ User role: {user?.role}</li>
                      <li>✓ Email verification: {user?.emailVerified ? 'Verified' : 'Pending'}</li>
                      <li>✓ Account status: Active</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* User Info Card */}
            <div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Your Profile
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Username
                      </label>
                      <p className="text-sm text-gray-900">{user?.username}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Email
                      </label>
                      <p className="text-sm text-gray-900">{user?.email}</p>
                    </div>
                    {user?.firstName && (
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Name
                        </label>
                        <p className="text-sm text-gray-900">
                          {user.firstName} {user.lastName}
                        </p>
                      </div>
                    )}
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Role
                      </label>
                      <p className="text-sm text-gray-900 capitalize">{user?.role}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => router.push('/profile')}
                    >
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Available Features</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white overflow-hidden shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">🗣️ Company Forums</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Participate in discussions about your workplace and industry.
                </p>
                <Button 
                  variant="default" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => router.push('/forums')}
                >
                  Browse Forums
                </Button>
              </div>
              
              <div className="bg-white overflow-hidden shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">🏢 Company Directory</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Discover companies and connect with colleagues across industries.
                </p>
                <Button 
                  variant="default" 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => router.push('/companies')}
                >
                  Explore Companies
                </Button>
              </div>
              
              <div className="bg-white overflow-hidden shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">📢 Anonymous Reports</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Submit anonymous reports about workplace issues safely.
                </p>
                <Button variant="outline" className="w-full" disabled>
                  Coming Soon
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
} 