'use client';

import React, { useState, useEffect } from 'react';
import { Search, Users, MessageSquare, Building, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api';

interface Forum {
  id: string;
  title: string;
  slug: string;
  description?: string;
  isPublic: boolean;
  postCount: number;
  memberCount: number;
  company?: {
    id: string;
    name: string;
    slug: string;
    logo?: string;
    isVerified: boolean;
  };
  createdAt: string;
}

interface ForumListProps {
  companyId?: string;
  limit?: number;
}

export function ForumList({ companyId, limit = 20 }: ForumListProps) {
  const [forums, setForums] = useState<Forum[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showPublicOnly, setShowPublicOnly] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchForums();
  }, [companyId, search, showPublicOnly]);

  const fetchForums = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (companyId) params.append('companyId', companyId);
      if (search) params.append('search', search);
      if (showPublicOnly) params.append('isPublic', 'true');
      params.append('limit', limit.toString());

      const response = await api.get(`/forums?${params}`);
      setForums(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to load forums');
      console.error('Error fetching forums:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={fetchForums}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search forums..."
            value={search}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
        <Button
          variant={showPublicOnly ? "default" : "outline"}
          onClick={() => setShowPublicOnly(!showPublicOnly)}
          className="whitespace-nowrap"
        >
          <Filter className="h-4 w-4 mr-2" />
          Public Only
        </Button>
      </div>

      {/* Forums Grid */}
      {forums.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No forums found</h3>
          <p className="text-gray-600">
            {search ? 'Try adjusting your search terms.' : 'No forums are available yet.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {forums.map((forum) => (
            <ForumCard key={forum.id} forum={forum} />
          ))}
        </div>
      )}
    </div>
  );
}

interface ForumCardProps {
  forum: Forum;
}

function ForumCard({ forum }: ForumCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
              {forum.title}
            </CardTitle>
            {forum.company && (
              <div className="flex items-center gap-2 mt-1">
                <Building className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-600">{forum.company.name}</span>
                {forum.company.isVerified && (
                  <Badge variant="info" className="text-xs">Verified</Badge>
                )}
              </div>
            )}
          </div>
          <Badge variant={forum.isPublic ? "success" : "secondary"}>
            {forum.isPublic ? "Public" : "Private"}
          </Badge>
        </div>
        {forum.description && (
          <CardDescription className="line-clamp-2">
            {forum.description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{forum.postCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{forum.memberCount}</span>
            </div>
          </div>
          <time className="text-xs">
            {new Date(forum.createdAt).toLocaleDateString()}
          </time>
        </div>
      </CardContent>
    </Card>
  );
} 