'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

interface ChatAgentInterfaceProps {
  onDataExtracted?: (data: any) => void;
  className?: string;
}

export function ChatAgentInterface({ onDataExtracted, className }: ChatAgentInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm here to help you log your carbon footprint. You can tell me about your transport, food, or energy usage and I'll calculate the emissions for you. What would you like to track today?",
      sender: 'agent',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thanks for sharing that information! I've calculated your carbon footprint and added it to your tracking. Would you like to log anything else?",
        sender: 'agent',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, agentMessage]);
      setIsLoading(false);

      // Extract mock data
      if (onDataExtracted) {
        onDataExtracted({
          type: 'transport',
          value: 15,
          unit: 'km',
          carbonFootprint: 3.15,
        });
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={cn('card h-96 flex flex-col', className)}>
      <div className="flex items-center gap-sm mb-md pb-sm border-b border-border">
        <Bot className="w-5 h-5 text-primary" />
        <span className="font-medium">EcoTrackr Assistant</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-md mb-md">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex gap-sm',
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            {message.sender === 'agent' && (
              <Bot className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            )}
            <div
              className={cn(
                'max-w-[80%] px-sm py-xs rounded-lg text-sm',
                message.sender === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-muted text-foreground'
              )}
            >
              {message.content}
            </div>
            {message.sender === 'user' && (
              <User className="w-6 h-6 text-foreground/60 flex-shrink-0 mt-1" />
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-sm justify-start">
            <Bot className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div className="bg-muted text-foreground px-sm py-xs rounded-lg text-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-sm">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Tell me about your activities..."
          className="flex-1 px-sm py-xs border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
