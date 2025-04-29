
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus } from 'lucide-react';

interface ChatSession {
  id: string;
  title: string;
  date: string;
  active?: boolean;
}

interface ChatSidebarProps {
  chatSessions: ChatSession[];
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ 
  chatSessions, 
  onSelectChat,
  onNewChat
}) => {
  return (
    <div className="w-64 border-r h-full flex flex-col bg-sidebar">
      <div className="p-4 border-b">
        <Button 
          onClick={onNewChat} 
          className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2"
        >
          <Plus size={16} />
          New Chat
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {chatSessions.map((session) => (
            <button
              key={session.id}
              onClick={() => onSelectChat(session.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                session.active
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'hover:bg-muted/80 text-sidebar-foreground'
              }`}
            >
              <div className="truncate">{session.title}</div>
              <div className="text-xs text-muted-foreground truncate">{session.date}</div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;
