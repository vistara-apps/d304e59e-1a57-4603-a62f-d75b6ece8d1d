'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/minikit';
import { FrameContainer } from '@/components/FrameContainer';
import { MetricCard } from '@/components/MetricCard';
import { ActionBanner } from '@/components/ActionBanner';
import { ProgressBar } from '@/components/ProgressBar';
import { ProfileAvatar } from '@/components/ProfileAvatar';
import { ChatAgentInterface } from '@/components/ChatAgentInterface';
import { EmissionData, Challenge } from '@/lib/types';
import { SAMPLE_CHALLENGES } from '@/lib/constants';
import { 
  Car, 
  Utensils, 
  Zap, 
  Leaf, 
  Plus, 
  Award,
  Users,
  MessageCircle,
  BarChart3,
  Settings
} from 'lucide-react';

export default function HomePage() {
  const { user } = useMiniKit();
  const [emissionData, setEmissionData] = useState<EmissionData>({
    transport: 201.6,
    food: 158.2,
    energy: 95.6,
    total: 455.4,
  });
  const [rewardsPoints, setRewardsPoints] = useState(1250);
  const [showChat, setShowChat] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const handleDataExtracted = (data: any) => {
    // Update emission data based on extracted information
    setEmissionData(prev => ({
      ...prev,
      [data.type]: prev[data.type] + data.carbonFootprint,
      total: prev.total + data.carbonFootprint,
    }));
    setRewardsPoints(prev => prev + 10); // Reward for logging data
  };

  const renderHomeTab = () => (
    <div className="space-y-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-foreground mb-1">
            EcoTrackr
          </h1>
          <p className="text-base text-foreground/70">
            Your Carbon Footprint
          </p>
        </div>
        <div className="flex items-center gap-sm">
          <div className="text-right">
            <div className="text-sm text-foreground/70">Points</div>
            <div className="text-lg font-bold text-primary">{rewardsPoints}</div>
          </div>
          <ProfileAvatar variant="large" />
        </div>
      </div>

      {/* Main Carbon Footprint Card */}
      <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl p-lg border border-primary/20">
        <div className="flex items-center justify-between mb-md">
          <div>
            <h2 className="text-lg font-medium text-foreground/80 mb-1">
              Carbon Footprint
            </h2>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground">
                {emissionData.total.toFixed(1)}
              </span>
              <span className="text-lg text-foreground/70">kg CO₂</span>
            </div>
            <div className="text-sm text-foreground/60 mt-1">This week</div>
          </div>
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
            <Leaf className="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>

      {/* Emission Breakdown */}
      <div className="space-y-sm">
        <h3 className="text-lg font-bold text-foreground">Carbon Footprint</h3>
        <div className="grid gap-sm">
          <MetricCard
            type="transport"
            value={emissionData.transport}
            unit="kg CO₂"
            change={-5.2}
            icon={<Car className="w-5 h-5" />}
          />
          <MetricCard
            type="food"
            value={emissionData.food}
            unit="kg CO₂"
            change={2.1}
            icon={<Utensils className="w-5 h-5" />}
          />
          <MetricCard
            type="energy"
            value={emissionData.energy}
            unit="kg CO₂"
            change={-8.7}
            icon={<Zap className="w-5 h-5" />}
          />
        </div>
      </div>

      {/* Action Banners */}
      <div className="space-y-sm">
        <ActionBanner
          variant="tip"
          title="Quick Tip"
          description="Try walking or cycling for trips under 2km to reduce your transport footprint by up to 30%"
          action={() => {}}
          actionText="Learn More"
        />
        <ActionBanner
          variant="challenge"
          title="Join Car-Free Week"
          description="Challenge yourself and friends to reduce transport emissions"
          action={() => {}}
          actionText="Join Now"
        />
        <ActionBanner
          variant="reward"
          title="Achievement Unlocked!"
          description="You've logged data for 7 days straight. Earn 50 bonus points!"
          action={() => {}}
          actionText="Claim"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-5 gap-sm">
        {[
          { icon: Plus, label: 'Add Data', color: 'bg-primary' },
          { icon: Award, label: 'Challenges', color: 'bg-blue-500' },
          { icon: BarChart3, label: 'Statistics', color: 'bg-purple-500' },
          { icon: Users, label: 'Community', color: 'bg-green-500' },
          { icon: Settings, label: 'Settings', color: 'bg-gray-500' },
        ].map((action, index) => (
          <button
            key={index}
            onClick={() => action.label === 'Add Data' && setShowChat(true)}
            className="flex flex-col items-center gap-xs p-sm rounded-lg bg-surface border border-border hover:shadow-card transition-all duration-200"
          >
            <div className={`w-8 h-8 ${action.color} rounded-full flex items-center justify-center`}>
              <action.icon className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-medium text-foreground/70">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderChatTab = () => (
    <div className="space-y-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Log Your Data</h2>
        <button
          onClick={() => setShowChat(false)}
          className="btn-secondary"
        >
          Close
        </button>
      </div>
      <ChatAgentInterface onDataExtracted={handleDataExtracted} />
    </div>
  );

  return (
    <FrameContainer>
      {showChat ? renderChatTab() : renderHomeTab()}
      
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border">
        <div className="container py-sm">
          <div className="flex justify-center">
            <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </FrameContainer>
  );
}
