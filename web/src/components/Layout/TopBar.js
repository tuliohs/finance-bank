import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Apps from '@material-ui/icons/Apps';
import MoreVert from '@material-ui/icons/MoreVert';
import VideoCall from '@material-ui/icons/VideoCall';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import useSettings from 'utils/hooks/useSettings';
import { THEMES } from 'utils/constants';
import { useContext } from 'react';
import StoreContext from 'contexts/StoreContext';
import { useHistory } from 'react-router-dom';
import PowerSettingsNewSharpIcon from '@material-ui/icons/PowerSettingsNewSharp'
import Img from 'components/Img';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.default,
  },
  toolbar: {
    minHeight: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    cursor: 'pointer',
    height: 18,
    marginLeft: theme.spacing(3),
  },
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    height: 35,
    width: 700,
  },
  input: {
    flex: 1,
  },
}));

function TopBar({ handleNavOpen, mobileView }) {
  const classes = useStyles();
  const history = useHistory()
  const { token, user, setUser, removeToken } = useContext(StoreContext)
  const { settings, saveSettings } = useSettings();
  const signIn = () => {

  }

  const handleLogOutBtn = () => {
    removeToken('token')
    setUser({})
    history.push('/')
  }
  return (
    <AppBar className={classes.root} color="default">
      <Toolbar className={classes.toolbar}>
        <Box display="flex" alignItems="center">
          {/*{!mobileView ? null :*/}
          <IconButton onClick={handleNavOpen}>
            <MenuIcon />
          </IconButton>
          {/*//}*/}
          <img
            src={
              '/logo_size_invert.jpg'
            }
            alt="logo"
            className={classes.logo}
          />
        </Box>

        <Box display="flex">
          <IconButton className={classes.icons}>
            {settings?.theme === THEMES.DARK ? (
              <Brightness7Icon
                onClick={() => saveSettings({ theme: THEMES.LIGHT })}
              />
            ) : (
              <Brightness4Icon
                onClick={() => saveSettings({ theme: THEMES.DARK })}
              />
            )}
          </IconButton>

          {/*<IconButton className={classes.icons}>
            <MoreVert />
          </IconButton>*/}
          {!token ? (
            <Button
              color="secondary"
              component="a"
              variant="outlined"
              startIcon={<AccountCircle />}
              onClick={() => signIn()}
            >
              Fazer Login
            </Button>
          ) : (
            <Box display="flex" alignItems="center">

              <IconButton className={classes.icons}
                onClick={() => handleLogOutBtn()}
              >
                <PowerSettingsNewSharpIcon />
              </IconButton>
              <Img src={user?.image} isAvatar={true}
                className={classes.icons}
                alt={user?.name} isExternal={true} />
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
