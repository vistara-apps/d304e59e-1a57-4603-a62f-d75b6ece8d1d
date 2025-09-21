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

  const extractDataFromMessage = (message: string) => {
    const lowerMessage = message.toLowerCase();

    // Transport patterns
    const transportPatterns = [
      /(\d+(?:\.\d+)?)\s*(km|kilometers?|miles?|mi)/i,
      /(drove?|drive|car|bus|train|flight|plane|walked?|bike|biked?)\s+(\d+(?:\.\d+)?)\s*(km|kilometers?|miles?|mi)/i,
    ];

    // Food patterns
    const foodPatterns = [
      /(\d+(?:\.\d+)?)\s*(kg|kilograms?|pounds?|lbs?|grams?|g)\s*(beef|chicken|fish|pork|lamb|rice|wheat|vegetables?|fruit)/i,
      /(ate|eat|consumed?|consumption)\s+(\d+(?:\.\d+)?)\s*(kg|kilograms?|pounds?|lbs?|grams?|g)\s*(beef|chicken|fish|pork|lamb|rice|wheat|vegetables?|fruit)/i,
    ];

    // Energy patterns
    const energyPatterns = [
      /(\d+(?:\.\d+)?)\s*(kwh|kilowatt.?hours?|watt.?hours?|wh)/i,
      /(used?|consumed?|electricity|power)\s+(\d+(?:\.\d+)?)\s*(kwh|kilowatt.?hours?|watt.?hours?|wh)/i,
    ];

    // Check transport
    for (const pattern of transportPatterns) {
      const match = lowerMessage.match(pattern);
      if (match) {
        const value = parseFloat(match[1] || match[2]);
        const unit = match[2] || match[3];
        const carbonFootprint = value * 0.21; // Rough estimate: 210g CO2 per km
        return {
          type: 'transport' as const,
          value,
          unit: unit === 'mi' || unit === 'miles' ? 'miles' : 'km',
          carbonFootprint,
        };
      }
    }

    // Check food
    for (const pattern of foodPatterns) {
      const match = lowerMessage.match(pattern);
      if (match) {
        const value = parseFloat(match[1] || match[2]);
        const unit = match[2] || match[3];
        const foodType = match[3] || match[4];
        let carbonFootprint = 0;

        // Rough carbon estimates per kg
        const foodFactors: Record<string, number> = {
          beef: 60, lamb: 24, pork: 7, chicken: 6, fish: 5,
          rice: 2.7, wheat: 1.4, vegetables: 0.5, fruit: 0.3,
        };

        carbonFootprint = value * (foodFactors[foodType] || 1);
        return {
          type: 'food' as const,
          value,
          unit: unit === 'g' || unit === 'grams' ? 'g' : 'kg',
          carbonFootprint,
        };
      }
    }

    // Check energy
    for (const pattern of energyPatterns) {
      const match = lowerMessage.match(pattern);
      if (match) {
        const value = parseFloat(match[1] || match[2]);
        const unit = match[2] || match[3];
        const carbonFootprint = value * 0.4; // Rough estimate: 400g CO2 per kWh
        return {
          type: 'energy' as const,
          value,
          unit: unit === 'wh' || unit === 'watt hours' ? 'wh' : 'kwh',
          carbonFootprint,
        };
      }
    }

    return null;
  };

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

    // Extract data from message
    const extractedData = extractDataFromMessage(input);

    // Simulate AI response
    setTimeout(() => {
      let responseContent = "Thanks for sharing that information!";
      let extractedInfo = null;

      if (extractedData) {
        responseContent = `I've calculated your carbon footprint for ${extractedData.type}: ${extractedData.carbonFootprint.toFixed(2)} kg CO2. Would you like to log anything else?`;
        extractedInfo = extractedData;
      } else {
        responseContent = "I couldn't extract specific data from your message. Try telling me something like 'I drove 15 km today' or 'I ate 200g of beef'. What would you like to track?";
      }

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: 'agent',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, agentMessage]);
      setIsLoading(false);

      // Extract data if found
      if (extractedInfo && onDataExtracted) {
        onDataExtracted(extractedInfo);
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
