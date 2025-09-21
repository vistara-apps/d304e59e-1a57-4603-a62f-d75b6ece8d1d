export interface User {
  userId: string;
  farcasterUsername?: string;
  baseAddress?: string;
  emissionData: EmissionData;
  rewardsPoints: number;
  achievements: Achievement[];
}

export interface EmissionData {
  transport: number;
  food: number;
  energy: number;
  total: number;
}

export interface EmissionEntry {
  entryId: string;
  userId: string;
  timestamp: Date;
  type: 'transport' | 'food' | 'energy';
  value: number;
  unit: string;
  calculatedCarbonFootprint: number;
}

export interface Challenge {
  challengeId: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  type: string;
  emissionReductionGoal: number;
}

export interface UserChallenge {
  userChallengeId: string;
  userId: string;
  challengeId: string;
  progress: number;
  status: 'active' | 'completed';
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
}

export interface MetricCardProps {
  type: 'transport' | 'food' | 'energy' | 'total';
  value: number;
  unit: string;
  change?: number;
  icon: React.ReactNode;
}

export interface ActionBannerProps {
  variant: 'challenge' | 'reward' | 'tip';
  title: string;
  description: string;
  action?: () => void;
  actionText?: string;
}

export interface ProgressBarProps {
  variant: 'achievement' | 'challenge';
  progress: number;
  max: number;
  label: string;
}

export interface ExtractedData {
  type: 'transport' | 'food' | 'energy';
  value: number;
  unit: string;
  carbonFootprint: number;
}
