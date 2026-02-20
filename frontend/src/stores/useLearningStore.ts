import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LearnerProfile, getDefaultProfile, calculateLevel, TopicProgress } from '@/data/learningProgress';

export type TopicStep = 'lessons' | 'quiz' | 'exercises' | 'complete';

interface TopicState {
  step: TopicStep;
  currentLesson: number;
  quizScore: number;
  completedExercises: string[];
  currentExerciseIndex: number;
  exerciseCode: Record<string, string>; // exerciseId -> code
}

interface LearningState {
  // Profile data
  profile: LearnerProfile;
  
  // Current topic navigation state
  topicStates: Record<string, TopicState>;
  
  // Actions for profile
  updateProfile: (updates: Partial<LearnerProfile>) => void;
  addXp: (xp: number) => void;
  earnBadge: (badgeId: string) => void;
  updateStreak: () => void;
  
  // Actions for topic progress
  initTopicState: (topicId: string, starterCodes?: Record<string, string>) => void;
  setTopicStep: (topicId: string, step: TopicStep) => void;
  setCurrentLesson: (topicId: string, lesson: number) => void;
  setQuizScore: (topicId: string, score: number) => void;
  markLessonsComplete: (topicId: string, totalLessons: number) => void;
  markQuizComplete: (topicId: string, score: number, totalQuestions: number, xpReward: number) => void;
  markExerciseComplete: (topicId: string, exerciseId: string, totalExercises: number, xpReward: number) => void;
  updateExerciseCode: (topicId: string, exerciseId: string, code: string) => void;
  setCurrentExerciseIndex: (topicId: string, index: number) => void;
  markTopicComplete: (topicId: string) => void;
  resetTopicState: (topicId: string) => void;
  
  // Actions for module badges
  checkAndAwardModuleBadge: (moduleId: string, allTopicsCompleted: boolean) => void;
  
  // Utilities
  getTopicState: (topicId: string) => TopicState | undefined;
  isTopicUnlocked: (topicId: string, prerequisites: string[]) => boolean;
  isTopicCompleted: (topicId: string) => boolean;
  resetAllProgress: () => void;
}

const defaultTopicState: TopicState = {
  step: 'lessons',
  currentLesson: 0,
  quizScore: 0,
  completedExercises: [],
  currentExerciseIndex: 0,
  exerciseCode: {},
};

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      profile: getDefaultProfile(),
      topicStates: {},

      updateProfile: (updates) =>
        set((state) => ({
          profile: { ...state.profile, ...updates },
        })),

      addXp: (xp) =>
        set((state) => {
          const newTotalXp = state.profile.totalXp + xp;
          const newLevel = calculateLevel(newTotalXp);
          return {
            profile: {
              ...state.profile,
              totalXp: newTotalXp,
              level: newLevel,
            },
          };
        }),

      earnBadge: (badgeId) =>
        set((state) => {
          if (state.profile.badges.includes(badgeId)) {
            return state;
          }
          return {
            profile: {
              ...state.profile,
              badges: [...state.profile.badges, badgeId],
            },
          };
        }),

      updateStreak: () =>
        set((state) => {
          const today = new Date().toISOString().split('T')[0];
          const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
          
          let newStreak = state.profile.streak;
          if (state.profile.lastActivityDate === yesterday) {
            newStreak = state.profile.streak + 1;
          } else if (state.profile.lastActivityDate !== today) {
            newStreak = 1;
          }
          
          return {
            profile: {
              ...state.profile,
              streak: newStreak,
              lastActivityDate: today,
            },
          };
        }),

      initTopicState: (topicId, starterCodes) =>
        set((state) => {
          // Only init if doesn't exist
          if (state.topicStates[topicId]) {
            return state;
          }
          return {
            topicStates: {
              ...state.topicStates,
              [topicId]: {
                ...defaultTopicState,
                exerciseCode: starterCodes || {},
              },
            },
          };
        }),

      setTopicStep: (topicId, step) =>
        set((state) => ({
          topicStates: {
            ...state.topicStates,
            [topicId]: {
              ...(state.topicStates[topicId] || defaultTopicState),
              step,
            },
          },
        })),

      setCurrentLesson: (topicId, lesson) =>
        set((state) => ({
          topicStates: {
            ...state.topicStates,
            [topicId]: {
              ...(state.topicStates[topicId] || defaultTopicState),
              currentLesson: lesson,
            },
          },
        })),

      setQuizScore: (topicId, score) =>
        set((state) => ({
          topicStates: {
            ...state.topicStates,
            [topicId]: {
              ...(state.topicStates[topicId] || defaultTopicState),
              quizScore: score,
            },
          },
        })),

      markLessonsComplete: (topicId, totalLessons) =>
        set((state) => {
          const currentProgress = state.profile.topicsProgress[topicId] || {
            topicId,
            lessonsCompleted: 0,
            quizScore: 0,
            quizCompleted: false,
            exercisesCompleted: [],
            xpEarned: 0,
          };

          return {
            profile: {
              ...state.profile,
              topicsProgress: {
                ...state.profile.topicsProgress,
                [topicId]: {
                  ...currentProgress,
                  lessonsCompleted: totalLessons,
                },
              },
            },
            topicStates: {
              ...state.topicStates,
              [topicId]: {
                ...(state.topicStates[topicId] || defaultTopicState),
                step: 'quiz',
              },
            },
          };
        }),

      markQuizComplete: (topicId, score, totalQuestions, xpReward) =>
        set((state) => {
          const currentProgress = state.profile.topicsProgress[topicId] || {
            topicId,
            lessonsCompleted: 0,
            quizScore: 0,
            quizCompleted: false,
            exercisesCompleted: [],
            xpEarned: 0,
          };

          const xpMultiplier = score / totalQuestions;
          const xpEarned = Math.round(xpReward * 0.5 * xpMultiplier);
          const newTotalXp = state.profile.totalXp + xpEarned;

          return {
            profile: {
              ...state.profile,
              totalXp: newTotalXp,
              level: calculateLevel(newTotalXp),
              topicsProgress: {
                ...state.profile.topicsProgress,
                [topicId]: {
                  ...currentProgress,
                  quizScore: score,
                  quizCompleted: true,
                  xpEarned: currentProgress.xpEarned + xpEarned,
                },
              },
            },
            topicStates: {
              ...state.topicStates,
              [topicId]: {
                ...(state.topicStates[topicId] || defaultTopicState),
                step: 'exercises',
                quizScore: score,
              },
            },
          };
        }),

      markExerciseComplete: (topicId, exerciseId, totalExercises, xpReward) =>
        set((state) => {
          const topicState = state.topicStates[topicId] || defaultTopicState;
          if (topicState.completedExercises.includes(exerciseId)) {
            return state;
          }

          const newCompletedExercises = [...topicState.completedExercises, exerciseId];
          const currentProgress = state.profile.topicsProgress[topicId] || {
            topicId,
            lessonsCompleted: 0,
            quizScore: 0,
            quizCompleted: false,
            exercisesCompleted: [],
            xpEarned: 0,
          };

          const xpPerExercise = Math.round(xpReward * 0.5 / totalExercises);
          const newTotalXp = state.profile.totalXp + xpPerExercise;

          return {
            profile: {
              ...state.profile,
              totalXp: newTotalXp,
              level: calculateLevel(newTotalXp),
              topicsProgress: {
                ...state.profile.topicsProgress,
                [topicId]: {
                  ...currentProgress,
                  exercisesCompleted: newCompletedExercises,
                  xpEarned: currentProgress.xpEarned + xpPerExercise,
                },
              },
            },
            topicStates: {
              ...state.topicStates,
              [topicId]: {
                ...topicState,
                completedExercises: newCompletedExercises,
              },
            },
          };
        }),

      updateExerciseCode: (topicId, exerciseId, code) =>
        set((state) => {
          const topicState = state.topicStates[topicId] || defaultTopicState;
          return {
            topicStates: {
              ...state.topicStates,
              [topicId]: {
                ...topicState,
                exerciseCode: {
                  ...topicState.exerciseCode,
                  [exerciseId]: code,
                },
              },
            },
          };
        }),

      setCurrentExerciseIndex: (topicId, index) =>
        set((state) => ({
          topicStates: {
            ...state.topicStates,
            [topicId]: {
              ...(state.topicStates[topicId] || defaultTopicState),
              currentExerciseIndex: index,
            },
          },
        })),

      markTopicComplete: (topicId) =>
        set((state) => {
          const currentProgress = state.profile.topicsProgress[topicId];
          if (!currentProgress) return state;

          return {
            profile: {
              ...state.profile,
              topicsProgress: {
                ...state.profile.topicsProgress,
                [topicId]: {
                  ...currentProgress,
                  completedAt: new Date(),
                },
              },
            },
            topicStates: {
              ...state.topicStates,
              [topicId]: {
                ...(state.topicStates[topicId] || defaultTopicState),
                step: 'complete',
              },
            },
          };
        }),

      resetTopicState: (topicId) =>
        set((state) => {
          const { [topicId]: _, ...restTopicStates } = state.topicStates;
          return { topicStates: restTopicStates };
        }),

      checkAndAwardModuleBadge: (moduleId, allTopicsCompleted) =>
        set((state) => {
          if (allTopicsCompleted && !state.profile.badges.includes(moduleId)) {
            return {
              profile: {
                ...state.profile,
                badges: [...state.profile.badges, moduleId],
              },
            };
          }
          return state;
        }),

      getTopicState: (topicId) => get().topicStates[topicId],

      isTopicUnlocked: (topicId, prerequisites) => {
        if (prerequisites.length === 0) return true;
        const { profile } = get();
        return prerequisites.every((prereqId) => {
          const progress = profile.topicsProgress[prereqId];
          return progress?.quizCompleted;
        });
      },

      isTopicCompleted: (topicId) => {
        const { profile } = get();
        const progress = profile.topicsProgress[topicId];
        return !!(progress?.quizCompleted && progress.exercisesCompleted.length > 0);
      },

      resetAllProgress: () =>
        set({
          profile: getDefaultProfile(),
          topicStates: {},
        }),
    }),
    {
      name: 'algolab-learning-storage',
      version: 1,
    }
  )
);
