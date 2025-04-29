
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mic, MicOff, Send } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
      
      // Focus the textarea after sending
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleRecording = () => {
    // This would be implemented with actual speech recognition
    // For now, we'll just toggle the state for demonstration
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      console.log("Speech recognition would start here");
      // Simulating receiving speech after 2 seconds
      setTimeout(() => {
        setMessage(prev => prev + "I need help with my toddler's sleep schedule.");
        setIsRecording(false);
      }, 2000);
    } else {
      console.log("Speech recognition would stop here");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t p-4 bg-background">
      <div className="flex items-end gap-2">
        <div className="relative flex-1">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about parenting..."
            className="min-h-[60px] w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 pr-12"
            disabled={disabled}
          />
        </div>
        
        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={toggleRecording}
          className={isRecording ? "bg-primary text-primary-foreground" : ""}
        >
          {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
        </Button>
        
        <Button 
          type="submit" 
          size="icon"
          disabled={!message.trim() || disabled}
        >
          <Send size={18} />
        </Button>
      </div>
    </form>
  );
};

export default MessageInput;
