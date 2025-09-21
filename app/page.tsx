'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { FrameContainer } from '@/components/FrameContainer';
import { MetricCard } from '@/components/MetricCard';
import { ActionBanner } from '@/components/ActionBanner';
import { ProgressBar } from '@/components/ProgressBar';
import { ProfileAvatar } from '@/components/ProfileAvatar';
import { ChatAgentInterface } from '@/components/ChatAgentInterface';
import { EmissionData, Challenge } from '@/lib/types';
import { SAMPLE_CHALLENGES } from '@/lib/constants';
import { UserService } from '@/lib/userService';
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
  const { address } = useAccount();
  const [emissionData, setEmissionData] = useState<EmissionData>({
    transport: 0,
    food: 0,
    energy: 0,
    total: 0,
  });
  const [rewardsPoints, setRewardsPoints] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  // Load user data when address is available
  useEffect(() => {
    if (address) {
      loadUserData();
    } else {
      setIsLoading(false);
    }
  }, [address]);

  const loadUserData = async () => {
    try {
      const user = await UserService.getOrCreateUser(address!, undefined, address);
      const userEmissionData = await UserService.getUserEmissionData(address!);
      const userPoints = await UserService.getUserPoints(address!);

      setEmissionData(userEmissionData);
      setRewardsPoints(userPoints);
    } catch (error) {
      console.error('Failed to load user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDataExtracted = async (data: any) => {
    if (!address) return;

    try {
      // Add emission entry to database
      await UserService.addEmissionEntry(
        address,
        data.type,
        data.value,
        data.unit,
        data.carbonFootprint
      );

      // Reload user data to get updated values
      await loadUserData();

      // Check for new achievements
      const newAchievements = await UserService.checkAndAwardAchievements(address);
      if (newAchievements.length > 0) {
        // Could show a notification here
        console.log('New achievements earned:', newAchievements);
      }
    } catch (error) {
      console.error('Failed to save emission data:', error);
    }
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

  if (!address) {
    return (
      <FrameContainer>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-text mb-4">Welcome to EcoTrackr</h2>
          <p className="text-text/70 mb-6">Connect your wallet to start tracking your carbon footprint</p>
          <div className="bg-surface rounded-lg p-6">
            <p className="text-sm text-text/60">Please connect your Base wallet to continue</p>
          </div>
        </div>
      </FrameContainer>
    );
  }

  if (isLoading) {
    return (
      <FrameContainer>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-text mb-4">Loading your data...</h2>
          <div className="bg-surface rounded-lg p-6">
            <p className="text-sm text-text/60">Please wait while we fetch your carbon footprint data</p>
          </div>
        </div>
      </FrameContainer>
    );
  }

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
