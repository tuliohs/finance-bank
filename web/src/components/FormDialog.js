import React, { useCallback, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog({ setOpen, open, type }) {
  const [dados, setDados] = useState({})

  const handleClose = () => {
    setOpen(false)
  }

  const changeFormType = () => {
    if (type === 'deposit') {
      setDados({ title: 'Deposito', })
    } else if (type === 'transfer') {
      setDados({ title: 'Transferência' })
    }
    else {
      setDados({ title: 'Pagamento' })
    }
  }

  useEffect(() => {
    changeFormType()
  }, [type])

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{dados?.title}</DialogTitle>
        <DialogContent>
          {/*<DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>*/}
          <TextField
            autoFocus
            margin="dense"
            id="valor"
            label="Valor"
            type="valor"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}