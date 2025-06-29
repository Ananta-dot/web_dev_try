import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import CreatePost from './CreatePost';
import PostCard from './PostCard';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
    setupRealtimeSubscription();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          users(first_name, last_name, profile_picture_url)
        `)
        .eq('visibility', 'public')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('posts-feed')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'posts',
          filter: 'visibility=eq.public'
        },
        async (payload) => {
          // Fetch the complete post data with user info
          const { data: newPost } = await supabase
            .from('posts')
            .select(`
              *,
              users(first_name, last_name, profile_picture_url)
            `)
            .eq('id', payload.new.id)
            .single();

          if (newPost) {
            setPosts(current => [newPost, ...current]);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'posts',
          filter: 'visibility=eq.public'
        },
        (payload) => {
          setPosts(current =>
            current.map(post =>
              post.id === payload.new.id 
                ? { ...post, ...payload.new }
                : post
            )
          );
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'posts'
        },
        (payload) => {
          setPosts(current =>
            current.filter(post => post.id !== payload.old.id)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handlePostCreated = (newPost) => {
    // Real-time subscription will handle this, but we can add immediate feedback
    setPosts(current => [newPost, ...current]);
  };

  const handlePostUpdate = () => {
    // Real-time subscription will handle updates
    fetchPosts();
  };

  const handlePostDelete = (postId) => {
    setPosts(current => current.filter(post => post.id !== postId));
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Loading feed...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <CreatePost onPostCreated={handlePostCreated} />
      <div>
        {posts.map(post => (
          <PostCard 
            key={post.id} 
            post={post} 
            onUpdate={handlePostUpdate}
            onDelete={handlePostDelete}
          />
        ))}
        {posts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No posts yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Be the first to share something with the community!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
