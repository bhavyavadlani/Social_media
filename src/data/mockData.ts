import { User, Post, Comment, Message, Notification } from '../types';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    username: 'alexj',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
    bio: 'Digital designer & photographer | Travel enthusiast | Coffee addict',
    followers: 1248,
    following: 562,
    joined: 'January 2023'
  },
  {
    id: '2',
    name: 'Sophia Chen',
    username: 'sophiac',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
    bio: 'Software engineer | Book lover | Hiking & outdoor activities',
    followers: 3452,
    following: 731,
    joined: 'March 2022'
  },
  {
    id: '3',
    name: 'Miguel Rivera',
    username: 'miguelr',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
    bio: 'Music producer | Vocalist | Exploring sounds around the world',
    followers: 5671,
    following: 845,
    joined: 'August 2022'
  },
  {
    id: '4',
    name: 'Emma Wilson',
    username: 'emmaw',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300',
    bio: 'Content creator | Fitness enthusiast | Healthy lifestyle advocate',
    followers: 8923,
    following: 412,
    joined: 'December 2021'
  },
  {
    id: '5',
    name: 'James Taylor',
    username: 'jamest',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
    bio: 'Tech entrepreneur | AI researcher | Basketball player',
    followers: 2567,
    following: 378,
    joined: 'April 2023'
  }
];

// Mock Posts
export const posts: Post[] = [
  {
    id: '1',
    userId: '2',
    content: 'Just finished this amazing book about artificial intelligence and its societal impacts. Highly recommend! What are you all reading these days? #BookRecommendations',
    imageUrl: 'https://images.pexels.com/photos/2465877/pexels-photo-2465877.jpeg?auto=compress&cs=tinysrgb&w=700',
    createdAt: '2025-03-25T14:32:00Z',
    likes: 248,
    comments: 42,
    shares: 15,
    liked: false
  },
  {
    id: '2',
    userId: '4',
    content: 'Morning workout completed! Starting the day with positive energy. Remember, consistency is key! 💪 #FitnessJourney',
    imageUrl: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=700',
    createdAt: '2025-03-25T08:15:00Z',
    likes: 389,
    comments: 27,
    shares: 8,
    liked: true
  },
  {
    id: '3',
    userId: '3',
    content: 'Working on my latest track in the studio today. Can\'t wait to share it with you all next week! #NewMusic',
    imageUrl: 'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=700',
    createdAt: '2025-03-24T19:45:00Z',
    likes: 762,
    comments: 93,
    shares: 41,
    liked: false
  },
  {
    id: '4',
    userId: '1',
    content: 'Captured this sunset at the beach yesterday. Nature\'s beauty never fails to amaze me. What\'s your favorite time of day?',
    imageUrl: 'https://images.pexels.com/photos/1237119/pexels-photo-1237119.jpeg?auto=compress&cs=tinysrgb&w=700',
    createdAt: '2025-03-24T21:10:00Z',
    likes: 875,
    comments: 64,
    shares: 38,
    liked: false
  },
  {
    id: '5',
    userId: '5',
    content: 'Just launched our startup\'s new AI tool after months of hard work! Would love your feedback - link in bio. #TechStartup #Innovation',
    createdAt: '2025-03-23T16:20:00Z',
    likes: 523,
    comments: 89,
    shares: 112,
    liked: true
  },
  {
    id: '6',
    userId: '2',
    content: 'Found this incredible hiking trail this weekend. The views were absolutely worth the climb!',
    imageUrl: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=700',
    createdAt: '2025-03-22T11:45:00Z',
    likes: 421,
    comments: 37,
    shares: 19,
    liked: false
  }
];

// Mock Comments
export const comments: Comment[] = [
  {
    id: '1',
    postId: '1',
    userId: '3',
    content: 'I just read that one too! The chapter on neural networks was fascinating.',
    createdAt: '2025-03-25T15:10:00Z',
    likes: 14
  },
  {
    id: '2',
    postId: '1',
    userId: '5',
    content: 'Adding this to my reading list. Have you checked out "The Algorithm"? Similar topic but with a focus on ethics.',
    createdAt: '2025-03-25T16:05:00Z',
    likes: 8
  },
  {
    id: '3',
    postId: '2',
    userId: '1',
    content: 'You\'re such an inspiration! What\'s your favorite pre-workout meal?',
    createdAt: '2025-03-25T09:30:00Z',
    likes: 23
  },
  {
    id: '4',
    postId: '3',
    userId: '4',
    content: 'Can\'t wait to hear it! Your last track was on repeat for weeks.',
    createdAt: '2025-03-24T20:15:00Z',
    likes: 41
  }
];

// Mock Messages
export const messages: Message[] = [
  {
    id: '1',
    senderId: '2',
    receiverId: '1',
    content: 'Hey, loved your sunset photo! Where was that taken?',
    createdAt: '2025-03-25T22:14:00Z',
    read: false
  },
  {
    id: '2',
    senderId: '1',
    receiverId: '2',
    content: 'Thanks! It was at Malibu Beach. We should go there sometime!',
    createdAt: '2025-03-25T22:18:00Z',
    read: true
  },
  {
    id: '3',
    senderId: '3',
    receiverId: '1',
    content: 'Are you coming to the music festival next weekend?',
    createdAt: '2025-03-24T15:30:00Z',
    read: true
  }
];

// Mock Notifications
export const notifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: 'like',
    sourceUserId: '4',
    referenceId: '4',
    content: 'Emma Wilson liked your post',
    createdAt: '2025-03-25T21:40:00Z',
    read: false
  },
  {
    id: '2',
    userId: '1',
    type: 'comment',
    sourceUserId: '3',
    referenceId: '4',
    content: 'Miguel Rivera commented on your post',
    createdAt: '2025-03-25T20:15:00Z',
    read: false
  },
  {
    id: '3',
    userId: '1',
    type: 'follow',
    sourceUserId: '5',
    content: 'James Taylor started following you',
    createdAt: '2025-03-24T14:50:00Z',
    read: true
  },
  {
    id: '4',
    userId: '1',
    type: 'message',
    sourceUserId: '2',
    content: 'New message from Sophia Chen',
    createdAt: '2025-03-25T22:14:00Z',
    read: false
  }
];

// Get user by id
export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

// Get posts by user id
export const getPostsByUserId = (userId: string): Post[] => {
  return posts.filter(post => post.userId === userId);
};

// Get comments by post id
export const getCommentsByPostId = (postId: string): Comment[] => {
  return comments.filter(comment => comment.postId === postId);
};