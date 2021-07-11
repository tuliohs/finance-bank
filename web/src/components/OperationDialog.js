import React, { useCallback, useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { formatPrice, onChangeObject } from 'utils';
import StoreContext from 'contexts/StoreContext';
import { newOperation } from 'api/opration.api';
import { getUser } from 'api/user.api';
import { Grid, InputLabel, Select } from '@material-ui/core';
const catetoriesSimulation = [
  { _id: 1, name: 'Conta de Luz' },
  { _id: 2, name: 'Recarga' },
  { _id: 3, name: 'Pagamento Boleto' },
  { _id: 4, name: 'Conta de Água' },
]


export default function OperationDialog({ setOpen, open, type }) {
  const [dados, setDados] = useState({})
  const [formDados, setFormDados] = useState({ title: '' })
  const [users, setUsers] = useState([])
  const [categories, setCategories] = useState([])

  const { user, setMessage } = useContext(StoreContext)
  const onChange = (e) => onChangeObject(e, setDados, dados)

  const handleClose = () => {
    setDados({})
    setOpen(false)
  }
  const sendOperation = async () => {
    //validation
    if (!dados?.valor)
      return setMessage({ type: "error", visible: true, text: 'O valor é obrigatório' })
    //if (formatPrice(!dados?.valor) === "R$ NaN")
    //  return setMessage({ type: "error", visible: true, text: 'Valor inválido' })
    else if (type === 'transfer' && !dados?.receiver)
      return setMessage({ type: "error", visible: true, text: 'O destinatário é obrigatório para transferências' })
    else if (type === 'pay' && !dados?.category)
      return setMessage({ type: "error", visible: true, text: 'A categoria é obrigatória para pagamentos' })

    const body = {
      ...dados, type: type, category: dados?.category,
      valor: dados.valor.replace('.', '') //salvando valores sem pontos
    }
    await newOperation(body)
      .then(c => {
        handleClose()
        setMessage({ type: 'success', text: c.data.message, visible: true })
      })
      .catch(c => setMessage({ type: "error", visible: true, text: 'error' }))
  }
  const changeFormType = () => {
    if (type === 'deposit')
      setFormDados({ ...formDados, title: 'Deposito' })
    else if (type === 'transfer')
      setFormDados({ ...formDados, title: 'Transferência' })
    else setFormDados({ ...formDados, title: 'Pagamento' })
  }

  useEffect(() => {
    getInialData()
    changeFormType()
  }, [type])

  const getInialData = async () => {
    //obtendo usuario e categorias que podem ser usadas em transações
    //if (formDados.categories?.length === 0 || formDados.users?.length === 0)
    await getUser()
      .then(c => setUsers(c.data.users))
      .catch(e => console.log('error'))
    setCategories(catetoriesSimulation)

  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{formDados?.title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="valor"
            label="Valor"
            name="valor"
            fullWidth
            value={dados?.valor}
            onChange={onChange}
          />
          {!users || type !== 'transfer' ? null : <Grid style={{
            marginTop: 10
          }}>
            <InputLabel
              style={{ fontSize: 20 }}
              shrink id={'receiver'}>
              Destinatário
            </InputLabel>
            <Select
              native
              key={'receiver'}
              labelId={'receiver'}
              //value={dados.age}
              onChange={onChange}
              fullWidth
              inputProps={{
                name: 'receiver',
                id: 'age-native-simple',
              }}
            >
              <option aria-label="None" value="" >Selecione</option>
              {users
                ?.filter(f => f._id !== user._id)
                ?.map(c => (<option value={c._id}>{c.name}</option>))}
            </Select ></Grid>}

          {!categories || type !== 'pay' ? null : <Grid style={{
            marginTop: 10
          }}>
            <InputLabel
              style={{ fontSize: 20 }}
              shrink id={'category'}>
              Categoria
            </InputLabel>
            <Select
              native
              key={'category'}
              labelId={'category'}
              //value={dados.age}
              onChange={onChange}
              fullWidth
              inputProps={{
                name: 'category',
                id: 'category',
              }}>
              <option aria-label="None" value="" >Selecione</option>
              {categories?.map(c => (<option value={c.name}>{c.name}</option>))}
            </Select ></Grid>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={sendOperation} color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}