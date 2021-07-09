import { Grid, Typography } from '@material-ui/core'
import Layout from 'components/Layout'
import SimpleCard from 'components/SimpleCard'
import React, { useContext } from 'react'
import AutorenewIcon from '@material-ui/icons/Autorenew';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import StoreContext from 'contexts/StoreContext';

export default function Home() {
    const { user } = useContext(StoreContext)
    return (
        <Layout>
            <Typography variant="h5" component="h2">
                {" Welcome " + user?.nome || ""}
            </Typography>

            {/*  Cards Operações*/}
            <Grid direction="row" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: "wrap" }}>
                <SimpleCard title="Transferir"
                    type="Saída"
                    icon={<ReceiptIcon fontSize='large' color="primary" />} />
                <SimpleCard title="Pagar"
                    type="Saída"
                    icon={<AutorenewIcon fontSize='large' color="primary" />} />
                <SimpleCard title="Depositar"
                    type="Entrada"
                    icon={<AccountBalanceWalletIcon fontSize='large' color="primary" />} />
            </Grid>
        </Layout>
    )
}