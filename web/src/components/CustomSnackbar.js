import React, { useContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import StoreContext from 'contexts/StoreContext';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomSnackbar() {
  const { message, setMessage } = useContext(StoreContext)
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setMessage({ ...message, visible: false });
  }
  return (
    <div className={classes.root}>
      <Snackbar open={message.visible} autoHideDuration={(message.timeExpire || 4) * 1000} onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: "left" }}
        key={'bottom' + 'left'}
      >
        <>
          <Alert onClose={handleClose} severity={message.type || 'null'}>
            {message.action?.text ? (
              <Button onClick={message.action.on}
                variant="contained"
                color="default"
              >
                Ver Carrinho
              </Button>) : null}
            {message.text}
          </Alert>
        </>
      </Snackbar>
    </div>
  );
}