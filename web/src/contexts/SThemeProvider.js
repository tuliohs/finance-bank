import { ThemeProvider } from '@material-ui/core/styles';
import { createTheme } from 'utils/theme';
import useSettings from 'utils/hooks/useSettings';
import { defaultTheme } from 'utils/constants';

function SThemeProvider({ children }) {
  const { settings } = useSettings();
  const theme = createTheme({ theme: settings?.theme || defaultTheme });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default SThemeProvider;
