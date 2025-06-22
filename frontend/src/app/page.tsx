'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/auth-store';
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus, Users, Shield, Calendar } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (isAuthenticated && !isLoading) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render content if authenticated (will redirect)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">SindicApp</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-blue-600 mb-8">
            <Users className="h-10 w-10 text-white" />
          </div>
          
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Unite. Organize.</span>
            <span className="block text-blue-600">Make Change.</span>
          </h1>
          
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            SindicApp is the digital platform that empowers workers to connect, organize, and advocate for better working conditions. 
            Join thousands of workers who are already making a difference.
          </p>

          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  <UserPlus className="h-5 w-5 mr-2" />
                  Get Started - It&apos;s Free
                </Button>
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link href="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <LogIn className="h-5 w-5 mr-2" />
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Company Forums
              </h3>
              <p className="text-gray-600">
                Connect with colleagues from your workplace and industry. Share experiences, ask questions, and build solidarity.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Anonymous Reporting
              </h3>
              <p className="text-gray-600">
                Report workplace issues safely and anonymously. Help create a database of labor violations and unsafe conditions.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Union Coordination
              </h3>
              <p className="text-gray-600">
                Organize events, coordinate actions, and mobilize workers for collective bargaining and advocacy efforts.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-blue-600 rounded-lg">
          <div className="px-6 py-12 sm:px-12">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white">
                Ready to make a difference?
              </h2>
              <p className="mt-4 text-lg text-blue-100">
                Join SindicApp today and connect with workers fighting for fair treatment and better conditions.
              </p>
              <div className="mt-8">
                <Link href="/register">
                  <Button size="lg" variant="secondary">
                    <UserPlus className="h-5 w-5 mr-2" />
                    Create Your Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-blue-600 mr-2" />
              <span className="text-lg font-semibold text-gray-900">SindicApp</span>
            </div>
            <p className="text-gray-600 text-sm">
              Empowering workers through digital organization and solidarity.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              © 2024 SindicApp. Built for workers, by workers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
