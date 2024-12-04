import './App.css';
import Title from './components/Title.js';
import { LanguageSelector } from './components/LanguageSelector.tsx';
import HideController from './components/HideController.tsx';

function App() {

  return (
    <div className="p-3 flex flex-col gap-3 w-full">
      <nav className="flex flex-row justify-between border-blue-400 border-b-2 pb-2">
        <Title />
        <div className="flex flex-row gap-2">
          <LanguageSelector/>
        </div>
      </nav>
      <div>
        <HideController/>
      </div>
    </div>
  );
}

export default App;
