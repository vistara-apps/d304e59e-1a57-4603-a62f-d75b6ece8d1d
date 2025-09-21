'use client';

import { useState, useEffect } from 'react';
import { useOnchainKit } from '@coinbase/onchainkit';
import { FrameContainer } from '@/components/FrameContainer';
import { MetricCard } from '@/components/MetricCard';
import { ActionBanner } from '@/components/ActionBanner';
import { ProgressBar } from '@/components/ProgressBar';
import { ProfileAvatar } from '@/components/ProfileAvatar';
import { ChatAgentInterface } from '@/components/ChatAgentInterface';
import { EmissionData, Challenge, ExtractedData } from '@/lib/types';
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
  const config = useOnchainKit();
  const [emissionData, setEmissionData] = useState<EmissionData>({
    transport: 201.6,
    food: 158.2,
    energy: 95.6,
    total: 455.4,
  });
  const [rewardsPoints, setRewardsPoints] = useState(1250);
  const [showChat, setShowChat] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const handleDataExtracted = (data: ExtractedData) => {
    // Update emission data based on extracted information
    setEmissionData(prev => ({
      ...prev,
      [data.type]: prev[data.type] + data.carbonFootprint,
      total: prev.total + data.carbonFootprint,
    }));
    setRewardsPoints(prev => prev + 10); // Reward for logging data
  };

  const renderHomeTab = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-gray-900 mb-1">
            EcoTrackr
          </h1>
          <p className="text-base text-gray-600">
            Your Carbon Footprint
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-sm text-gray-600">Points</div>
            <div className="text-lg font-bold text-green-600">{rewardsPoints}</div>
          </div>
          <ProfileAvatar variant="large" />
        </div>
      </div>

      {/* Main Carbon Footprint Card */}
      <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-xl p-6 border border-green-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-1">
              Carbon Footprint
            </h2>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900">
                {emissionData.total.toFixed(1)}
              </span>
              <span className="text-lg text-gray-600">kg CO₂</span>
            </div>
            <div className="text-sm text-gray-500 mt-1">This week</div>
          </div>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Leaf className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Emission Breakdown */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-gray-900">Carbon Footprint</h3>
        <div className="grid gap-2">
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
      <div className="space-y-2">
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
      <div className="grid grid-cols-5 gap-2">
        {[
          { icon: Plus, label: 'Add Data', color: 'bg-green-600' },
          { icon: Award, label: 'Challenges', color: 'bg-blue-500' },
          { icon: BarChart3, label: 'Statistics', color: 'bg-purple-500' },
          { icon: Users, label: 'Community', color: 'bg-green-500' },
          { icon: Settings, label: 'Settings', color: 'bg-gray-500' },
        ].map((action, index) => (
          <button
            key={index}
            onClick={() => action.label === 'Add Data' && setShowChat(true)}
            className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white border border-gray-200 hover:shadow-lg transition-all duration-200"
          >
            <div className={`w-8 h-8 ${action.color} rounded-full flex items-center justify-center`}>
              <action.icon className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-medium text-gray-600">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderChatTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Log Your Data</h2>
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
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="container py-2">
          <div className="flex justify-center">
            <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </FrameContainer>
  );
}
