import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { PageId } from './data/researchData';
import { HomePage } from './pages/HomePage';
import { ProtocolPage } from './pages/ProtocolPage';
import { StatisticsPage } from './pages/StatisticsPage';
import { StudiesPage } from './pages/StudiesPage';
import { UniversityPage } from './pages/UniversityPage';

const VALID_PAGES: PageId[] = ['forschung', 'studien', 'statistiken', 'universitaet', 'protokoll'];

function getInitialPage(): PageId {
  const hash = window.location.hash.replace('#', '') as PageId;
  return VALID_PAGES.includes(hash) ? hash : 'forschung';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (VALID_PAGES.includes(hash)) {
        setCurrentPage(hash);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    if (window.location.hash !== `#${page}`) {
      window.location.hash = page;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#181715]">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="flex-1">
        {currentPage === 'forschung' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'studien' && <StudiesPage onNavigate={handleNavigate} />}
        {currentPage === 'statistiken' && <StatisticsPage />}
        {currentPage === 'universitaet' && <UniversityPage />}
        {currentPage === 'protokoll' && <ProtocolPage />}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
