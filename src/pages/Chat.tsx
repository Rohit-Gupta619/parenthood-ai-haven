
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import ChatSidebar from '@/components/chat/ChatSidebar';
import MessageList, { Message } from '@/components/chat/MessageList';
import MessageInput from '@/components/chat/MessageInput';
import { toast } from 'sonner';

// Mock data for chat sessions
const mockChatSessions = [
  { id: '1', title: 'Sleep training advice', date: 'Today', active: true },
  { id: '2', title: 'Toddler tantrums', date: 'Yesterday' },
  { id: '3', title: 'Picky eating solutions', date: 'Mar 21' },
  { id: '4', title: 'Potty training tips', date: 'Mar 19' },
];

// Initial messages
const initialMessages: Message[] = [
  {
    id: '1',
    content: "Hello! I'm your ParenthoodAI assistant. How can I help you with your parenting questions today?",
    sender: 'bot',
    timestamp: new Date(Date.now() - 60000),
  },
];

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [chatSessions, setChatSessions] = useState(mockChatSessions);
  const [activeChatId, setActiveChatId] = useState('1');

  const selectChat = (id: string) => {
    setActiveChatId(id);
    setChatSessions(prev =>
      prev.map(session => ({
        ...session,
        active: session.id === id,
      }))
    );

    // For demonstration, we'll simulate loading different messages for different chats
    if (id === '1') {
      setMessages(initialMessages);
    } else if (id === '2') {
      setMessages([
        {
          id: '2-1',
          content: "How can I handle my toddler's tantrums in public?",
          sender: 'user',
          timestamp: new Date(Date.now() - 120000),
        },
        {
          id: '2-2',
          content: "Toddler tantrums in public can be challenging. Here are some strategies:\n\n1. Stay calm and composed\n2. Identify triggers ahead of time\n3. Use distraction techniques\n4. Have a 'quiet corner' strategy\n5. Validate their feelings\n\nWould you like me to explain any of these strategies in more detail?",
          sender: 'bot',
          timestamp: new Date(Date.now() - 100000),
        },
      ]);
    } else {
      setMessages([]);
      setTimeout(() => {
        setMessages([
          {
            id: `${id}-1`,
            content: `This is a new conversation for chat ${id}.`,
            sender: 'bot',
            timestamp: new Date(),
          },
        ]);
      }, 500);
    }
  };

  const createNewChat = () => {
    const newChatId = String(Date.now());
    const newChat = {
      id: newChatId,
      title: 'New conversation',
      date: 'Just now',
      active: true,
    };
    
    setChatSessions(prev => [
      newChat,
      ...prev.map(session => ({ ...session, active: false })),
    ]);
    
    setActiveChatId(newChatId);
    setMessages([
      {
        id: `welcome-${newChatId}`,
        content: "Hello! I'm your ParenthoodAI assistant. How can I help you today?",
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
  };

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Update chat title if it's a new conversation
    if (chatSessions.find(s => s.id === activeChatId)?.title === 'New conversation') {
      const shortTitle = content.length > 20 ? content.substring(0, 20) + '...' : content;
      setChatSessions(prev =>
        prev.map(session =>
          session.id === activeChatId ? { ...session, title: shortTitle } : session
        )
      );
    }

    // Simulate AI response after delay
    setTimeout(() => {
      const botResponses: { [key: string]: string } = {
        sleep: "Sleep training can be challenging! There are several methods like the Ferber method (gradual checking) and the chair method. The key is consistency. What age is your child?",
        eat: "Picky eating is common in young children. Try involving them in meal preparation, offer choices between healthy options, and be patient. It can take 10-15 exposures before a child accepts a new food.",
        tantrum: "For tantrums, remember that children are often overwhelmed by emotions they can't process. Stay calm, acknowledge their feelings, and provide a safe space. Consistency in responses is crucial.",
        potty: "Potty training works best when your child shows signs of readiness like staying dry for longer periods and showing interest. Make it positive with praise and small rewards for success.",
        development: "Child development varies widely! Each child progresses at their own pace within typical ranges. What specific developmental milestone are you curious about?",
      };
      
      let response = "I'm here to help with your parenting questions. Could you provide more details about what you're experiencing with your child?";
      
      // Simple keyword matching for demo purposes
      Object.entries(botResponses).forEach(([keyword, reply]) => {
        if (content.toLowerCase().includes(keyword)) {
          response = reply;
        }
      });
      
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      toast("New message from ParenthoodAI");
    }, 1500);
  };

  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem-4rem)] overflow-hidden">
        <ChatSidebar 
          chatSessions={chatSessions} 
          onSelectChat={selectChat} 
          onNewChat={createNewChat} 
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <MessageList messages={messages} isTyping={isTyping} />
          <MessageInput onSendMessage={handleSendMessage} disabled={isTyping} />
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
