import { useContext } from 'react';
import {
  makeStyles,
  Hidden,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/MonetizationOn';
import CreditCard from '@material-ui/icons/CreditCard';

import HomeIcon from '@material-ui/icons/Home';
//import history from 'utils/history'

import StoreContext from 'contexts/StoreContext';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 240,
  },
  desktopDrawer: {
    width: 240,
    top: 56,
    height: 'calc(100% - 64px)',
    borderRight: 'none',
  },
  avatar: {
    cursor: 'pointer',
    width: 24,
    height: 24,
  },
  listItem: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: theme.spacing(3),
  },
  listItemText: {
    fontSize: 14,
  },
}));

const primaryMenu = [
  { id: 1, label: 'Início', path: '/home', icon: HomeIcon },
  { id: 2, label: 'SenseBank', path: '/bank', icon: AttachMoneyIcon },
  { id: 3, label: 'SenseCard', path: '/card', icon: CreditCard },
];

const secondaryManu = [
  //{ id: 1, label: '', icon:  },

];

function NavBar({ navOpen, mobileView }) {
  const classes = useStyles();

  const { token } = useContext(StoreContext)
  const history = useHistory();
  const isSelected = (item) => history.location.pathname === item.path;
  const changePage = (path) => {
    console.log('change', path)
    history.push(path)
  }
  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <List>
        {primaryMenu.map((item) => {
          const Icon = item.icon;
          return (
            <ListItem
              key={item.id}
              button
              classes={{ root: classes.listItem }}
              selected={isSelected(item)}
              onClick={() => changePage(item.path)}
            >
              <ListItemIcon >
                <Icon
                  style={{ color: isSelected(item) && '#f44336' }} />
              </ListItemIcon>

              <ListItemText
                classes={{
                  primary: classes.listItemText,
                }}
                primary={item.label}
              />
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List>
        {secondaryManu.map((item) => {
          const Icon = item.icon;
          return (
            <ListItem
              key={item.id}
              button
              classes={{ root: classes.listItem }}
              selected={isSelected(item)}
            >
              <ListItemIcon>
                <Icon style={{ color: isSelected(item) && '#f44336' }} />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.listItemText,
                }}
                primary={item.label}
              />
            </ListItem>
          )
        })}
      </List>
      <Divider />
      {/*<Box>
        {token ?null:
          <Box mx={4} my={2}>
            <Typography variant="body2">
              Faça login para curtur vídeos, comentar e se inscrever.
            </Typography>
            <Box mt={2}>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<AccountCircle />}
              >
                Fazer login
              </Button>
            </Box>
          </Box>}
      </Box>*/}
    </Box>
  );

  return (
    <>{
      mobileView ?
        (<  >
          <Drawer
            anchor="left"
            classes={{ paper: classes.desktopDrawer }}
            open={navOpen}
            variant="persistent"
          >
            {content}
          </Drawer>
        </ >) : (<Hidden mdDown >
          <Drawer
            anchor="left"
            classes={{ paper: classes.desktopDrawer }}
            open={navOpen}
            variant="persistent"
          >
            {content}
          </Drawer>
        </Hidden>)

    }
    </>
  );




}

export default NavBar;
