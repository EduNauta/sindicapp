'use client';

import React from 'react';
import { Plus, MessageSquare } from 'lucide-react';
import { ForumList } from '@/components/forums/forum-list';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/auth-store';

export default function ForumsPage() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Forums</h1>
                <p className="text-sm text-gray-600">Connect with workers across industries</p>
              </div>
            </div>
            
            {user && user.role.canCreatePosts && (
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Forum
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                <ForumCategoryLink name="General Discussion" count={45} />
                <ForumCategoryLink name="Workplace Issues" count={23} />
                <ForumCategoryLink name="Industry News" count={18} />
                <ForumCategoryLink name="Legal Advice" count={12} />
                <ForumCategoryLink name="Union Resources" count={8} />
              </div>
              
              <div className="mt-8">
                <h4 className="font-semibold text-gray-900 mb-3">Quick Stats</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Total Forums</span>
                    <span className="font-medium">106</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Today</span>
                    <span className="font-medium">34</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Posts</span>
                    <span className="font-medium">2,847</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Forum List */}
          <div className="lg:col-span-3">
            <ForumList />
          </div>
        </div>
      </div>
    </div>
  );
}

interface ForumCategoryLinkProps {
  name: string;
  count: number;
  active?: boolean;
}

function ForumCategoryLink({ name, count, active = false }: ForumCategoryLinkProps) {
  return (
    <a
      href="#"
      className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
        active
          ? 'bg-blue-100 text-blue-700 font-medium'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <span>{name}</span>
      <span className={`text-xs ${active ? 'text-blue-600' : 'text-gray-500'}`}>
        {count}
      </span>
    </a>
  );
} 