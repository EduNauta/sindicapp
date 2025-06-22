'use client';

import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Eye, Pin, Clock, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/auth-store';
import { api } from '@/lib/api';

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  isPinned: boolean;
  viewCount: number;
  commentCount: number;
  likeCount: number;
  createdAt: string;
  author: {
    id: string;
    username: string;
    avatar?: string;
  };
  forum: {
    id: string;
    title: string;
    slug: string;
    company?: {
      id: string;
      name: string;
      slug: string;
    };
  };
}

interface PostListProps {
  forumId?: string;
  limit?: number;
}

export function PostList({ forumId, limit = 20 }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchPosts();
  }, [forumId]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (forumId) params.append('forumId', forumId);
      params.append('limit', limit.toString());

      const response = await api.get(`/posts?${params}`);
      setPosts(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to load posts');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId: string) => {
    if (!user) return;

    try {
      await api.post(`/posts/${postId}/like`);
      
      // Update local state
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, likeCount: post.likeCount + 1 }
          : post
      ));
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
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
        <Button onClick={fetchPosts}>Try Again</Button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
        <p className="text-gray-600">Be the first to start a discussion!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard 
          key={post.id} 
          post={post} 
          onLike={handleLike}
          showLikeButton={!!user}
        />
      ))}
    </div>
  );
}

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  showLikeButton: boolean;
}

function PostCard({ post, onLike, showLikeButton }: PostCardProps) {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (!showLikeButton) return;
    onLike(post.id);
    setLiked(!liked);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const getExcerpt = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        {/* Author and Meta Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium">{post.author.username}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="h-3 w-3" />
              <span className="text-xs">{formatDate(post.createdAt)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {post.isPinned && (
              <Badge variant="warning">
                <Pin className="h-3 w-3 mr-1" />
                Pinned
              </Badge>
            )}
            {post.forum.company && (
              <Badge variant="outline">
                {post.forum.company.name}
              </Badge>
            )}
          </div>
        </div>

        {/* Post Title */}
        <CardTitle className="text-xl hover:text-blue-600 transition-colors cursor-pointer">
          {post.title}
        </CardTitle>

        {/* Forum Info */}
        <CardDescription>
          in <span className="font-medium">{post.forum.title}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Post Content Preview */}
        <div className="text-gray-700">
          {getExcerpt(post.content)}
        </div>

        {/* Engagement Stats and Actions */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{post.viewCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{post.commentCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className={`h-4 w-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
              <span>{post.likeCount}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {showLikeButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className="text-gray-600 hover:text-red-500"
              >
                <Heart className={`h-4 w-4 mr-1 ${liked ? 'fill-current' : ''}`} />
                Like
              </Button>
            )}
            <Button variant="ghost" size="sm" className="text-gray-600">
              <MessageCircle className="h-4 w-4 mr-1" />
              Reply
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 