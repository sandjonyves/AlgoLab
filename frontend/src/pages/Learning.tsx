import React, { useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Trophy, Flame, Star, Lock, CheckCircle2, Clock, ChevronRight, Zap, Award, HelpCircle, Code2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { learningModules, getDifficultyLabel, getDifficultyColor, Topic, Module, getTopicById, getModuleByTopicId } from '@/data/learningTopics';
import { getXpForNextLevel, getXpForCurrentLevel } from '@/data/learningProgress';
import { LessonViewer } from '@/components/learning/LessonViewer';
import { TopicQuiz } from '@/components/learning/TopicQuiz';
import { TopicExercise } from '@/components/learning/TopicExercise';
import { useLearningStore, TopicStep } from '@/stores/useLearningStore';
import { cn } from '@/lib/utils';

const Learning: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  
  const {
    profile,
    topicStates,
    initTopicState,
    setCurrentLesson,
    markLessonsComplete,
    markQuizComplete,
    markExerciseComplete,
    markTopicComplete,
    checkAndAwardModuleBadge,
    updateStreak,
    isTopicUnlocked,
    isTopicCompleted,
  } = useLearningStore();

  const [selectedModule, setSelectedModule] = React.useState<Module | null>(null);
  const [currentTopic, setCurrentTopic] = React.useState<Topic | null>(null);

  // Get current topic state from store
  const topicState = topicId ? topicStates[topicId] : undefined;
  const topicStep = topicState?.step || 'lessons';
  const currentLesson = topicState?.currentLesson || 0;
  const quizScore = topicState?.quizScore || 0;
  const completedExercises = topicState?.completedExercises || [];

  // Load topic from URL
  useEffect(() => {
    if (topicId) {
      const topic = getTopicById(topicId);
      if (topic && isTopicUnlocked(topicId, topic.prerequisites)) {
        setCurrentTopic(topic);
        // Initialize topic state with starter codes
        const starterCodes: Record<string, string> = {};
        topic.exercises.forEach(ex => {
          starterCodes[ex.id] = ex.starterCode;
        });
        initTopicState(topicId, starterCodes);
        updateStreak();
      } else {
        navigate('/learning');
      }
    } else {
      setCurrentTopic(null);
    }
  }, [topicId, navigate, initTopicState, isTopicUnlocked, updateStreak]);

  const handleLessonsComplete = () => {
    if (!currentTopic || !topicId) return;
    markLessonsComplete(topicId, currentTopic.lessons.length);
  };

  const handleQuizComplete = (score: number, total: number) => {
    if (!currentTopic || !topicId) return;
    markQuizComplete(topicId, score, total, currentTopic.xpReward);
  };

  const handleExerciseComplete = (exerciseId: string) => {
    if (!currentTopic || !topicId) return;
    markExerciseComplete(topicId, exerciseId, currentTopic.exercises.length, currentTopic.xpReward);
  };

  const handleTopicFinish = () => {
    if (!currentTopic || !topicId) return;
    markTopicComplete(topicId);
    
    // Check if module is complete
    const module = getModuleByTopicId(currentTopic.id);
    if (module) {
      const allTopicsComplete = module.topics.every(t => 
        t.id === currentTopic.id || isTopicCompleted(t.id)
      );
      checkAndAwardModuleBadge(module.id, allTopicsComplete);
    }
  };

  const handleBackToModules = () => {
    navigate('/learning');
    setCurrentTopic(null);
  };

  const handleLessonChange = (lesson: number) => {
    if (!topicId) return;
    setCurrentLesson(topicId, lesson);
  };

  const xpForNext = getXpForNextLevel(profile.level);
  const xpForCurrent = getXpForCurrentLevel(profile.level);
  const xpProgress = ((profile.totalXp - xpForCurrent) / (xpForNext - xpForCurrent)) * 100;

  const totalTopics = learningModules.reduce((acc, m) => acc + m.topics.length, 0);
  const completedTopicsCount = Object.values(profile.topicsProgress).filter(p => p.quizCompleted).length;

  // Topic View
  if (currentTopic && topicId) {
    const module = getModuleByTopicId(currentTopic.id);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
        {/* Header */}
        <header className="sticky top-0 z-50 px-6 py-4 bg-card/80 backdrop-blur-lg border-b border-border">
          <div className="flex items-center justify-between max-w-5xl mx-auto">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={handleBackToModules}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-xl bg-gradient-to-br text-white", currentTopic.color)}>
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-lg font-bold">{currentTopic.title}</h1>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getDifficultyColor(currentTopic.difficulty)}>
                      {getDifficultyLabel(currentTopic.difficulty)}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {currentTopic.duration} min
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center gap-2">
              {(['lessons', 'quiz', 'exercises'] as TopicStep[]).map((step, i) => (
                <div
                  key={step}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                    topicStep === step
                      ? "bg-primary text-primary-foreground"
                      : i < ['lessons', 'quiz', 'exercises'].indexOf(topicStep)
                        ? "bg-success/20 text-success"
                        : "bg-muted text-muted-foreground"
                  )}
                >
                  {i < ['lessons', 'quiz', 'exercises'].indexOf(topicStep) ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : step === 'lessons' ? (
                    <BookOpen className="w-4 h-4" />
                  ) : step === 'quiz' ? (
                    <HelpCircle className="w-4 h-4" />
                  ) : (
                    <Code2 className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">
                    {step === 'lessons' ? 'Leçons' : step === 'quiz' ? 'Quiz' : 'Exercices'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 max-w-5xl mx-auto">
          <Card className="p-6">
            {topicStep === 'lessons' && (
              <LessonViewer
                lessons={currentTopic.lessons}
                currentLesson={currentLesson}
                onNext={() => handleLessonChange(currentLesson + 1)}
                onPrevious={() => handleLessonChange(currentLesson - 1)}
                onComplete={handleLessonsComplete}
              />
            )}

            {topicStep === 'quiz' && (
              <TopicQuiz
                questions={currentTopic.quiz}
                topicId={currentTopic.id}
                onComplete={handleQuizComplete}
              />
            )}

            {topicStep === 'exercises' && (
              <TopicExercise
                topicId={topicId}
                exercises={currentTopic.exercises}
                completedExercises={completedExercises}
                onComplete={handleExerciseComplete}
                onFinish={handleTopicFinish}
              />
            )}

            {topicStep === 'complete' && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center animate-scale-in">
                  <Trophy className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Sujet terminé !</h2>
                <p className="text-muted-foreground mb-8">
                  Tu as maîtrisé "{currentTopic.title}" avec succès !
                </p>

                {/* Stats */}
                <div className="flex justify-center gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">{quizScore}/{currentTopic.quiz.length}</div>
                    <div className="text-sm text-muted-foreground">Quiz</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-success">{completedExercises.length}/{currentTopic.exercises.length}</div>
                    <div className="text-sm text-muted-foreground">Exercices</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-amber-500">+{currentTopic.xpReward}</div>
                    <div className="text-sm text-muted-foreground">XP gagnés</div>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <Button variant="outline" onClick={handleBackToModules}>
                    Retour aux modules
                  </Button>
                  {module && (() => {
                    const currentIndex = module.topics.findIndex(t => t.id === currentTopic.id);
                    const nextTopic = module.topics[currentIndex + 1];
                    if (nextTopic) {
                      return (
                        <Button onClick={() => navigate(`/learning/${nextTopic.id}`)} className="gap-2">
                          Sujet suivant <ArrowRight className="w-4 h-4" />
                        </Button>
                      );
                    }
                    return null;
                  })()}
                </div>
              </div>
            )}
          </Card>
        </main>
      </div>
    );
  }

  // Modules List View
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      {/* Header */}
      <header className="sticky top-0 z-50 px-6 py-4 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Espace Apprentissage</h1>
                <p className="text-xs text-muted-foreground">Maîtrise l'algorithmique pas à pas</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="font-bold">{profile.streak}</span>
              <span className="text-sm text-muted-foreground hidden sm:inline">jours</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <span className="font-bold">{profile.totalXp}</span>
              <span className="text-sm text-muted-foreground hidden sm:inline">XP</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10">
              <Star className="w-5 h-5 text-primary" />
              <span className="font-bold">Niveau {profile.level}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-6xl mx-auto">
        {/* Progress Overview */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold">Ta Progression</h2>
              <p className="text-sm text-muted-foreground">
                {completedTopicsCount} / {totalTopics} sujets complétés
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Prochain niveau</p>
              <p className="font-bold">{xpForNext - profile.totalXp} XP restants</p>
            </div>
          </div>
          <Progress value={xpProgress} className="h-3" />
        </Card>

        {/* Modules Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {learningModules.map((module) => {
            const moduleTopicsCompleted = module.topics.filter(t => 
              profile.topicsProgress[t.id]?.quizCompleted
            ).length;
            const moduleProgress = (moduleTopicsCompleted / module.topics.length) * 100;

            return (
              <Card 
                key={module.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedModule(selectedModule?.id === module.id ? null : module)}
              >
                <div className={cn("p-4 bg-gradient-to-r text-white", module.color)}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg">{module.title}</h3>
                    <span className="text-2xl">{module.badge.icon}</span>
                  </div>
                  <p className="text-sm opacity-90 mt-1">{module.description}</p>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      {moduleTopicsCompleted}/{module.topics.length} sujets
                    </span>
                    <span className="text-sm font-medium">{Math.round(moduleProgress)}%</span>
                  </div>
                  <Progress value={moduleProgress} className="h-2" />
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {module.topics.reduce((acc, t) => acc + t.duration, 0)} min
                    </div>
                    <ChevronRight className={cn(
                      "w-5 h-5 transition-transform",
                      selectedModule?.id === module.id && "rotate-90"
                    )} />
                  </div>
                </div>

                {/* Expanded Topics */}
                {selectedModule?.id === module.id && (
                  <div className="border-t border-border p-4 space-y-2 bg-muted/30">
                    {module.topics.map((topic) => {
                      const unlocked = isTopicUnlocked(topic.id, topic.prerequisites);
                      const progress = profile.topicsProgress[topic.id];
                      const completed = progress?.quizCompleted;
                      const topicStateForItem = topicStates[topic.id];
                      const hasProgress = topicStateForItem && (
                        topicStateForItem.currentLesson > 0 || 
                        topicStateForItem.step !== 'lessons' ||
                        topicStateForItem.completedExercises.length > 0
                      );

                      return (
                        <div
                          key={topic.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (unlocked) navigate(`/learning/${topic.id}`);
                          }}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-lg transition-colors",
                            unlocked ? "hover:bg-muted cursor-pointer" : "opacity-50 cursor-not-allowed",
                            completed && "bg-success/10"
                          )}
                        >
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center",
                            completed ? "bg-success text-success-foreground" : 
                            unlocked ? `bg-gradient-to-br ${topic.color} text-white` : "bg-muted"
                          )}>
                            {completed ? <CheckCircle2 className="w-5 h-5" /> :
                             unlocked ? <BookOpen className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{topic.title}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className={getDifficultyColor(topic.difficulty)}>
                                {getDifficultyLabel(topic.difficulty)}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{topic.duration} min</span>
                              {hasProgress && !completed && (
                                <Badge variant="secondary" className="text-xs">En cours</Badge>
                              )}
                            </div>
                          </div>
                          {completed && (
                            <div className="flex items-center gap-1 text-success">
                              <Zap className="w-4 h-4" />
                              <span className="text-sm font-medium">+{topic.xpReward}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Badges Section */}
        <Card className="p-6 mt-8">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            Tes Badges
          </h2>
          <div className="flex flex-wrap gap-4">
            {learningModules.map((module) => {
              const earned = profile.badges.includes(module.id);
              return (
                <div
                  key={module.id}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-xl border-2 transition-all",
                    earned ? "border-amber-500 bg-amber-500/10" : "border-muted opacity-50"
                  )}
                >
                  <span className="text-3xl">{module.badge.icon}</span>
                  <div>
                    <p className="font-medium">{module.badge.name}</p>
                    <p className="text-xs text-muted-foreground">{module.badge.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Learning;
