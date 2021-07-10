import { Button, Grid, Typography } from '@material-ui/core'
import Layout from 'components/Layout'
import SimpleCard from 'components/SimpleCard'
import React, { useContext, useEffect, useState } from 'react'
import AutorenewIcon from '@material-ui/icons/Autorenew';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import StoreContext from 'contexts/StoreContext';
import OperationDialog from 'components/OperationDialog';
import { getOperations } from 'api/opration.api';
import { formatPrice } from 'utils';

export default function Home() {
    const { user, setMessage } = useContext(StoreContext)

    const [open, setOpen] = useState(false)
    const [dados, setDados] = useState([])

    const [formType, setFormType] = useState('')
    const handleClickOpen = (type) => {
        setFormType(type)
        setOpen(true)
    }
    const obterOperacoes = async () => {
        await getOperations()
            .then(c => {
                setDados(c.data.operations)
            })
            .catch(e => setMessage({ type: "error", visible: true, text: 'error' }))
    }
    useEffect(() => {
        obterOperacoes()
    }, [])


    var total = dados?.reduce(function (tot, el) {
        var numero = el.valor.split('.').join('').split(',').join('.');
        if (el?.receiver?._id === user._id)
            return tot + Number(numero)
        else if (el?.sender?._id === user._id)
            return tot - Number(numero)
    }, 0);


    return (
        <Layout>
            <Typography variant="h5" component="h2" color="textSecondary">
                {" Welcome " + user?.name || ""}
            </Typography>
            <Typography variant="h4" component="h4" color="textSecondary">
                Saldo {formatPrice(total)}
            </Typography>
            <Typography component="h5" color="textSecondary">
                Selecione uma das operações abaixo
            </Typography>
            {/*  Cards Operações*/}
            <Grid direction="row" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: "wrap" }}>
                <SimpleCard title="Transferir" onClick={() => handleClickOpen('transfer')}
                    type="Saída"
                    icon={<ReceiptIcon fontSize='large' color="primary" />} />
                <SimpleCard title="Pagar" onClick={() => handleClickOpen('pay')}
                    type="Saída"
                    icon={<AutorenewIcon fontSize='large' color="primary" />} />
                <SimpleCard title="Depositar" onClick={() => handleClickOpen('deposit')}
                    type="Entrada"
                    icon={<AccountBalanceWalletIcon fontSize='large' color="primary" />} />
            </Grid>
            <OperationDialog setOpen={setOpen} open={open} type={formType} />
        </Layout>
    )
}