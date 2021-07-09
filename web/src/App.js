import logo from './logo.svg';
import './App.css';
import Routes from 'routes';
import { StoreProvider } from 'contexts/StoreContext'
import SThemeProvider from 'contexts/SThemeProvider'
import CustomSnackbar from 'components/CustomSnackbar';

function App() {
  return (
    <StoreProvider>
      <SThemeProvider>
        <Routes />
        <CustomSnackbar />
      </SThemeProvider>
    </StoreProvider>
  );
}

export default App;
