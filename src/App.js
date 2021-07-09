import logo from './logo.svg';
import './App.css';
import Routes from 'routes';
import { StoreProvider } from 'contexts/StoreContext'

function App() {
  return (
    <StoreProvider>
      <Routes />
    </StoreProvider>
  );
}

export default App;
