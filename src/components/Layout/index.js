import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core';

import TopBar from './TopBar';
import NavBar from './NavBar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    width: '100vw',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
  },
}));

function Layout({ children, title }) {
  const classes = useStyles();


  //---------------------------Drawer INICIO-------------------
  const [navOpen, setNavOpen] = useState(true);
  const handleNavOpen = () => setNavOpen(!navOpen)
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  })
  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {

      if (window.innerWidth < 1120) {
        setNavOpen(false)
        setState((prevState) => ({ ...prevState, mobileView: true }))
      }
      else {
        setState((prevState) => ({ ...prevState, mobileView: false }))
        setNavOpen(true)
      }
    }
    setResponsiveness()
    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    }
  }, [])
  //---------------------------Drawer  END-------------------

  return (
    <>
      <div className={classes.root}>
        <TopBar handleNavOpen={handleNavOpen} mobileView={mobileView} />
        <NavBar navOpen={navOpen} mobileView={mobileView} />
        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
