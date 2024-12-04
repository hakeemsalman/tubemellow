import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "@fontsource/roboto/latin-400.css"; // Defaults to weight 400

import { I18nProvider } from './packages/locale/i18nprovider.tsx';

createRoot(document.getElementById('root')!).render(
  <I18nProvider>
    <App />
  </I18nProvider>,
)
