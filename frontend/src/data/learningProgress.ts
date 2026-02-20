export interface TopicProgress {
  topicId: string;
  lessonsCompleted: number;
  quizScore: number;
  quizCompleted: boolean;
  exercisesCompleted: string[];
  xpEarned: number;
  completedAt?: Date;
}

export interface ModuleProgress {
  moduleId: string;
  topicsCompleted: string[];
  badgeEarned: boolean;
}

export interface LearnerProfile {
  totalXp: number;
  level: number;
  streak: number;
  lastActivityDate: string;
  badges: string[];
  topicsProgress: Record<string, TopicProgress>;
  modulesProgress: Record<string, ModuleProgress>;
}

const STORAGE_KEY = 'algolab_learner_profile';

export const getDefaultProfile = (): LearnerProfile => ({
  totalXp: 0,
  level: 1,
  streak: 0,
  lastActivityDate: '',
  badges: [],
  topicsProgress: {},
  modulesProgress: {}
});

export const loadLearnerProfile = (): LearnerProfile => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load learner profile:', e);
  }
  return getDefaultProfile();
};

export const saveLearnerProfile = (profile: LearnerProfile): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save learner profile:', e);
  }
};

export const calculateLevel = (xp: number): number => {
  // Each level requires more XP: level 1 = 0, level 2 = 100, level 3 = 250, etc.
  let level = 1;
  let requiredXp = 0;
  while (xp >= requiredXp) {
    level++;
    requiredXp += level * 50;
  }
  return level - 1;
};

export const getXpForNextLevel = (currentLevel: number): number => {
  let totalXp = 0;
  for (let i = 2; i <= currentLevel + 1; i++) {
    totalXp += i * 50;
  }
  return totalXp;
};

export const getXpForCurrentLevel = (currentLevel: number): number => {
  if (currentLevel <= 1) return 0;
  let totalXp = 0;
  for (let i = 2; i <= currentLevel; i++) {
    totalXp += i * 50;
  }
  return totalXp;
};

export const updateTopicProgress = (
  profile: LearnerProfile,
  topicId: string,
  updates: Partial<TopicProgress>
): LearnerProfile => {
  const currentProgress = profile.topicsProgress[topicId] || {
    topicId,
    lessonsCompleted: 0,
    quizScore: 0,
    quizCompleted: false,
    exercisesCompleted: [],
    xpEarned: 0
  };

  const newProgress = { ...currentProgress, ...updates };
  
  const newProfile = {
    ...profile,
    topicsProgress: {
      ...profile.topicsProgress,
      [topicId]: newProgress
    },
    lastActivityDate: new Date().toISOString().split('T')[0]
  };

  // Update streak
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  if (profile.lastActivityDate === yesterday) {
    newProfile.streak = profile.streak + 1;
  } else if (profile.lastActivityDate !== today) {
    newProfile.streak = 1;
  }

  return newProfile;
};

export const addXp = (profile: LearnerProfile, xp: number): LearnerProfile => {
  const newTotalXp = profile.totalXp + xp;
  const newLevel = calculateLevel(newTotalXp);
  
  return {
    ...profile,
    totalXp: newTotalXp,
    level: newLevel
  };
};

export const earnBadge = (profile: LearnerProfile, badgeId: string): LearnerProfile => {
  if (profile.badges.includes(badgeId)) {
    return profile;
  }
  
  return {
    ...profile,
    badges: [...profile.badges, badgeId]
  };
};

export const isTopicUnlocked = (
  profile: LearnerProfile,
  topicId: string,
  prerequisites: string[]
): boolean => {
  if (prerequisites.length === 0) return true;
  
  return prerequisites.every(prereqId => {
    const progress = profile.topicsProgress[prereqId];
    return progress?.quizCompleted;
  });
};

export const isTopicCompleted = (profile: LearnerProfile, topicId: string): boolean => {
  const progress = profile.topicsProgress[topicId];
  return progress?.quizCompleted && progress.exercisesCompleted.length > 0;
};

export const getTopicCompletionPercentage = (
  profile: LearnerProfile,
  topicId: string,
  totalLessons: number,
  totalExercises: number
): number => {
  const progress = profile.topicsProgress[topicId];
  if (!progress) return 0;
  
  const lessonWeight = 40;
  const quizWeight = 30;
  const exerciseWeight = 30;
  
  const lessonPercent = (progress.lessonsCompleted / totalLessons) * lessonWeight;
  const quizPercent = progress.quizCompleted ? quizWeight : 0;
  const exercisePercent = (progress.exercisesCompleted.length / totalExercises) * exerciseWeight;
  
  return Math.round(lessonPercent + quizPercent + exercisePercent);
};
