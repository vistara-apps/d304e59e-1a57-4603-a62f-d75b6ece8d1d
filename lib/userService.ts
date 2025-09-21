import { prisma } from './db';
import { User, EmissionEntry, Achievement } from '@prisma/client';

export interface EmissionData {
  transport: number;
  food: number;
  energy: number;
  total: number;
}

export class UserService {
  static async getOrCreateUser(userId: string, farcasterUsername?: string, baseAddress?: string): Promise<User> {
    let user = await prisma.user.findUnique({
      where: { userId },
      include: {
        emissionEntries: true,
        achievements: true,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          userId,
          farcasterUsername,
          baseAddress,
          emissionData: JSON.stringify({
            transport: 0,
            food: 0,
            energy: 0,
            total: 0,
          }),
        },
        include: {
          emissionEntries: true,
          achievements: true,
        },
      });
    }

    return user;
  }

  static async addEmissionEntry(
    userId: string,
    type: 'transport' | 'food' | 'energy',
    value: number,
    unit: string,
    carbonFootprint: number
  ): Promise<EmissionEntry> {
    const entry = await prisma.emissionEntry.create({
      data: {
        userId,
        type,
        value,
        unit,
        calculatedCarbonFootprint: carbonFootprint,
      },
    });

    // Update user's emission data
    await this.updateUserEmissionData(userId);

    // Award points for logging data
    await this.awardPoints(userId, 10);

    return entry;
  }

  static async updateUserEmissionData(userId: string): Promise<void> {
    const entries = await prisma.emissionEntry.findMany({
      where: { userId },
    });

    const emissionData: EmissionData = {
      transport: 0,
      food: 0,
      energy: 0,
      total: 0,
    };

    entries.forEach(entry => {
      emissionData[entry.type as keyof EmissionData] += entry.calculatedCarbonFootprint;
      emissionData.total += entry.calculatedCarbonFootprint;
    });

    await prisma.user.update({
      where: { userId },
      data: {
        emissionData: JSON.stringify(emissionData),
      },
    });
  }

  static async awardPoints(userId: string, points: number): Promise<void> {
    await prisma.user.update({
      where: { userId },
      data: {
        rewardsPoints: {
          increment: points,
        },
      },
    });
  }

  static async getUserEmissionData(userId: string): Promise<EmissionData> {
    const user = await prisma.user.findUnique({
      where: { userId },
    });

    if (!user) {
      return { transport: 0, food: 0, energy: 0, total: 0 };
    }

    return JSON.parse(user.emissionData) as EmissionData;
  }

  static async getUserPoints(userId: string): Promise<number> {
    const user = await prisma.user.findUnique({
      where: { userId },
    });

    return user?.rewardsPoints || 0;
  }

  static async getUserAchievements(userId: string): Promise<Achievement[]> {
    return await prisma.achievement.findMany({
      where: { userId },
      orderBy: { earnedAt: 'desc' },
    });
  }

  static async checkAndAwardAchievements(userId: string): Promise<Achievement[]> {
    const user = await prisma.user.findUnique({
      where: { userId },
      include: { emissionEntries: true, achievements: true },
    });

    if (!user) return [];

    const newAchievements: Achievement[] = [];
    const existingAchievementNames = user.achievements.map(a => a.name);

    // First entry achievement
    if (user.emissionEntries.length >= 1 && !existingAchievementNames.includes('First Entry')) {
      const achievement = await prisma.achievement.create({
        data: {
          userId,
          name: 'First Entry',
          description: 'Logged your first carbon footprint entry',
          icon: '🌱',
        },
      });
      newAchievements.push(achievement);
    }

    // Week streak achievement
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentEntries = user.emissionEntries.filter(e => e.timestamp >= weekAgo);
    if (recentEntries.length >= 7 && !existingAchievementNames.includes('Week Streak')) {
      const achievement = await prisma.achievement.create({
        data: {
          userId,
          name: 'Week Streak',
          description: 'Logged data for 7 consecutive days',
          icon: '🔥',
        },
      });
      newAchievements.push(achievement);
    }

    return newAchievements;
  }
}

