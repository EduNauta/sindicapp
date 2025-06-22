'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth-store';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  requiredRole?: string;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  requireAuth = true,
  requiredRole,
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useAuthStore();

  useEffect(() => {
    // Don't redirect while loading auth state
    if (isLoading) return;

    // If authentication is required but user is not authenticated
    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    // If authentication is not required but user is authenticated, redirect to dashboard
    if (!requireAuth && isAuthenticated) {
      router.push('/dashboard');
      return;
    }

    // If specific role is required
    if (requiredRole && user && user.role !== requiredRole) {
      router.push('/unauthorized');
      return;
    }
  }, [isAuthenticated, user, isLoading, requireAuth, requiredRole, redirectTo, router]);

  // Show loading while checking auth state
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

  // If auth is required but user is not authenticated, don't render children
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  // If auth is not required but user is authenticated, don't render children (will redirect)
  if (!requireAuth && isAuthenticated) {
    return null;
  }

  // If specific role is required but user doesn't have it, don't render children
  if (requiredRole && user && user.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}

// Convenience components for specific use cases
export function PublicRoute({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute requireAuth={false} redirectTo="/dashboard">
      {children}
    </ProtectedRoute>
  );
}

export function AdminRoute({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute requireAuth={true} requiredRole="admin">
      {children}
    </ProtectedRoute>
  );
}

export function ModeratorRoute({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute requireAuth={true} requiredRole="moderator">
      {children}
    </ProtectedRoute>
  );
} 