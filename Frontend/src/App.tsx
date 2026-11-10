import { useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { NavigationTab } from './components/layout/NavigationRail';
import { DashboardView } from './views/Dashboard/DashboardView';
import { LessonRunnerView } from './views/Lesson/LessonRunnerView';
import { CatalogView } from './views/Catalog/CatalogView';
import { StoreView } from './views/Store/StoreView';
import { ProfileView } from './views/Profile/ProfileView';
import { MOCK_LESSON_DEMO } from './services/api/lessonService';

export function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [isInLessonMode, setIsInLessonMode] = useState<boolean>(false);

  const handleStartLesson = () => {
    setIsInLessonMode(true);
  };

  const handleExitLesson = () => {
    setIsInLessonMode(false);
    setActiveTab('dashboard');
  };

  const handleLessonComplete = (totalXp: number) => {
    alert(`[SISTEMA]: Reto completado con éxito. +${totalXp} XP acreditados a tu cuenta.`);
    setIsInLessonMode(false);
    setActiveTab('dashboard');
  };

  // Modo inmersivo de lección / ejecución de retos
  if (isInLessonMode || activeTab === 'lesson') {
    return (
      <LessonRunnerView
        lesson={MOCK_LESSON_DEMO}
        onExit={handleExitLesson}
        onComplete={handleLessonComplete}
      />
    );
  }

  return (
    <AppLayout activeTab={activeTab} onSelectTab={setActiveTab}>
      {activeTab === 'dashboard' && <DashboardView onStartLesson={handleStartLesson} />}
      {activeTab === 'catalog' && <CatalogView />}
      {activeTab === 'store' && <StoreView />}
      {activeTab === 'profile' && <ProfileView />}
    </AppLayout>
  );
}

export default App;
