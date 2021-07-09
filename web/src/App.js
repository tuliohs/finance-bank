import logo from './logo.svg';
import './App.css';
import Routes from 'routes';
import { StoreProvider } from 'contexts/StoreContext'
import SThemeProvider from 'contexts/SThemeProvider'

function App() {
  return (
    <StoreProvider>
      <SThemeProvider>
        <Routes />
      </SThemeProvider>
    </StoreProvider>
  );
}

export default App;
