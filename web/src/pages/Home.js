import { Button, Grid, Typography } from '@material-ui/core'
import Layout from 'components/Layout'
import SimpleCard from 'components/SimpleCard'
import React, { useContext, useState } from 'react'
import AutorenewIcon from '@material-ui/icons/Autorenew';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import StoreContext from 'contexts/StoreContext';
import OperationDialog from 'components/OperationDialog';

export default function Home() {
    const { user } = useContext(StoreContext)
    const [open, setOpen] = useState(false);
    const [formType, setFormType] = useState('')
    const handleClickOpen = (type) => {
        setFormType(type)
        setOpen(true)
    }
    return (
        <Layout>
            <Typography variant="h5" component="h2" color="textSecondary">
                {" Welcome " + user?.name || ""}
            </Typography>
            <Typography variant="h6" component="h5" color="textSecondary">
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