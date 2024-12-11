import './App.css';
import Title from './components/Title.js';
import { LanguageSelector } from './components/LanguageSelector.tsx';
import HideController from './components/HideController.tsx';
import Footer from './components/Footer.tsx';
import Accordian from './components/Accordian.tsx';
import { useTranslation } from 'react-i18next';
import NotesToggle from './components/NotesToggle.tsx';

function App() {

  const [t] = useTranslation();
  return (
    <div className="flex flex-col justify-between h-full w-full rounded-lg">
      <nav className="flex flex-row justify-between border-primary border-b-2 py-2 px-3">
        <Title />
        <div className="flex flex-row gap-2">
          <LanguageSelector />
        </div>
      </nav>
      <div className='px-3 py-1 flex flex-col h-full justify-start overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-white scrollbar-track-rounded-full scrollbar-thumb-rounded-full'>
        <Accordian title={t('common.accordianYtTitle')} id='hide-content'>
          <HideController />
        </Accordian>
        <Accordian title={t('common.notes')} id='hide-content'>
         <NotesToggle/>
        </Accordian>
      </div>
      <div className='justify-end'>
        <Footer />
      </div>
    </div>
  );
}

export default App;
