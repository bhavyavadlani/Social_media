import React, { useState, useEffect, useRef } from 'react';
import { Send, Search, Phone, Video, Info, Smile, Image, Paperclip } from 'lucide-react';
import Avatar from '../components/ui/Avatar';
import { messages, getUserById } from '../data/mockData';
import { Message, User } from '../types';
import { useAuth } from '../context/AuthContext';

const Messages: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [conversations, setConversations] = useState<{id: string, user: User, lastMessage: Message}[]>([]);
  const [conversationMessages, setConversationMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Load conversations on component mount
  useEffect(() => {
    if (!currentUser) return;
    
    // Get unique conversations from messages
    const userIds = new Set<string>();
    
    messages.forEach(message => {
      if (message.senderId === currentUser.id) {
        userIds.add(message.receiverId);
      } else if (message.receiverId === currentUser.id) {
        userIds.add(message.senderId);
      }
    });
    
    // Create conversation objects
    const conversationList = Array.from(userIds).map(userId => {
      const user = getUserById(userId);
      if (!user) return null;
      
      // Find last message for this conversation
      const messagesForConversation = messages.filter(
        m => (m.senderId === userId && m.receiverId === currentUser.id) || 
             (m.senderId === currentUser.id && m.receiverId === userId)
      );
      
      const lastMessage = messagesForConversation.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0];
      
      return {
        id: userId,
        user,
        lastMessage
      };
    }).filter(Boolean) as {id: string, user: User, lastMessage: Message}[];
    
    setConversations(conversationList);
    
    // If there are conversations, select the first one
    if (conversationList.length > 0) {
      setSelectedConversation(conversationList[0].id);
    }
  }, [currentUser]);
  
  // Load messages for selected conversation
  useEffect(() => {
    if (!currentUser || !selectedConversation) return;
    
    const messagesForConversation = messages.filter(
      m => (m.senderId === selectedConversation && m.receiverId === currentUser.id) || 
           (m.senderId === currentUser.id && m.receiverId === selectedConversation)
    );
    
    // Sort messages by date
    const sortedMessages = messagesForConversation.sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    
    setConversationMessages(sortedMessages);
  }, [selectedConversation, currentUser]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [conversationMessages]);
  
  // Get the selected user
  const selectedUser = selectedConversation ? getUserById(selectedConversation) : null;
  
  // Format date to time or date
  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    }
    
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();
    
    if (isYesterday) {
      return 'Yesterday';
    }
    
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };
  
  // Handle sending a new message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !currentUser || !selectedConversation) return;
    
    // Create new message object
    const newMessageObj: Message = {
      id: `temp-${Date.now()}`,
      senderId: currentUser.id,
      receiverId: selectedConversation,
      content: newMessage,
      createdAt: new Date().toISOString(),
      read: false
    };
    
    // Add to conversation messages
    setConversationMessages([...conversationMessages, newMessageObj]);
    
    // Clear input
    setNewMessage('');
    
    // In a real app, this would also send the message to a backend
  };
  
  // Filter conversations by search query
  const filteredConversations = searchQuery
    ? conversations.filter(conv => 
        conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.user.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden h-[calc(100vh-180px)] flex">
        {/* Conversations sidebar */}
        <div className="w-full max-w-xs border-r border-gray-200 dark:border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Messages</h1>
            <div className="mt-2 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search conversations"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length > 0 ? (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredConversations.map(conv => (
                  <button
                    key={conv.id}
                    className={`w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      selectedConversation === conv.id ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''
                    }`}
                    onClick={() => setSelectedConversation(conv.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar 
                        src={conv.user.avatar} 
                        alt={conv.user.name} 
                        size="md" 
                        status="online" 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-gray-900 dark:text-white truncate">
                            {conv.user.name}
                          </h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatMessageTime(conv.lastMessage.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {conv.lastMessage.senderId === currentUser?.id ? 'You: ' : ''}
                          {conv.lastMessage.content}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  {searchQuery ? 'No conversations match your search.' : 'No conversations yet.'}
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Conversation detail */}
        {selectedUser ? (
          <div className="flex-1 flex flex-col">
            {/* Conversation header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar 
                  src={selectedUser.avatar} 
                  alt={selectedUser.name} 
                  size="md" 
                  status="online" 
                />
                <div>
                  <h2 className="font-medium text-gray-900 dark:text-white">
                    {selectedUser.name}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Online
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Phone size={20} />
                </button>
                <button className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Video size={20} />
                </button>
                <button className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Info size={20} />
                </button>
              </div>
            </div>
            
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {conversationMessages.map(message => {
                const isOwn = message.senderId === currentUser?.id;
                return (
                  <div 
                    key={message.id} 
                    className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isOwn && (
                      <Avatar 
                        src={selectedUser.avatar} 
                        alt={selectedUser.name}
                        size="sm"
                        className="mr-2 self-end"
                      />
                    )}
                    <div 
                      className={`max-w-[70%] p-3 rounded-lg ${
                        isOwn 
                          ? 'bg-indigo-600 text-white rounded-br-none' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
                      }`}
                    >
                      <p>{message.content}</p>
                      <div className={`text-xs mt-1 ${isOwn ? 'text-indigo-200' : 'text-gray-500 dark:text-gray-400'}`}>
                        {formatMessageTime(message.createdAt)}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Message input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <button
                  type="button"
                  className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Smile size={20} />
                </button>
                <button
                  type="button"
                  className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Paperclip size={20} />
                </button>
                <button
                  type="button"
                  className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Image size={20} />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className={`p-2 rounded-full ${
                    newMessage.trim()
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  } transition-colors`}
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mb-4">
              <Send size={24} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Your Messages
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
              Select a conversation or start a new one to begin messaging with your connections.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;