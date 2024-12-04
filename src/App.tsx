import './App.css';
import Title from './components/Title.js';
import { LanguageSelector } from './components/LanguageSelector.tsx';
import HideController from './components/HideController.tsx';
import Footer from './components/Footer.tsx';

function App() {

  return (
    <div className="flex flex-col justify-between h-full w-full rounded-lg">
      <nav className="flex flex-row justify-between border-blue-400 border-b-2 py-2 px-3">
        <Title />
        <div className="flex flex-row gap-2">
          <LanguageSelector/>
        </div>
      </nav>
      <div className='px-3 py-2 flex flex-col h-full justify-start'>
        <HideController/>
      </div>
      <div className='justify-end'>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
