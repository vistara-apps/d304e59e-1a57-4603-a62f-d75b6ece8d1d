export const EMISSION_FACTORS = {
  transport: {
    car: 0.21, // kg CO2 per km
    bus: 0.089,
    train: 0.041,
    plane: 0.255,
  },
  food: {
    beef: 27, // kg CO2 per kg
    pork: 12.1,
    chicken: 6.9,
    fish: 6.1,
    vegetables: 2,
  },
  energy: {
    electricity: 0.5, // kg CO2 per kWh
    gas: 2.3, // kg CO2 per m³
    heating: 0.2,
  },
};

export const ACHIEVEMENT_THRESHOLDS = {
  firstEntry: 1,
  weekStreak: 7,
  monthStreak: 30,
  reduction10: 10, // 10% reduction
  reduction25: 25, // 25% reduction
  reduction50: 50, // 50% reduction
};

export const REWARD_POINTS = {
  dailyEntry: 10,
  weeklyGoal: 50,
  monthlyGoal: 200,
  challengeComplete: 100,
  reduction: 25, // per percentage point reduced
};

export const SAMPLE_CHALLENGES = [
  {
    challengeId: '1',
    name: 'Car-Free Week',
    description: 'Reduce transport emissions by using alternatives to driving',
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    type: 'transport',
    emissionReductionGoal: 50,
  },
  {
    challengeId: '2',
    name: 'Plant-Based Challenge',
    description: 'Lower your food footprint with plant-based meals',
    startDate: new Date(),
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    type: 'food',
    emissionReductionGoal: 30,
  },
  {
    challengeId: '3',
    name: 'Energy Saver',
    description: 'Reduce home energy consumption by 20%',
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    type: 'energy',
    emissionReductionGoal: 20,
  },
];
