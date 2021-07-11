import { Grid, makeStyles, Typography } from '@material-ui/core'
import { getOperations } from 'api/opration.api'
import Layout from 'components/Layout'
import OpetationTable from 'components/OpetationTable'
import StoreContext from 'contexts/StoreContext'
import React, { useContext, useEffect, useState } from 'react'


const useStyles = makeStyles((theme) => ({
    caption:
        { display: 'flex', justifyContent: 'space-between' }
}));
export default function Bank() {
    const classes = useStyles()
    const [dados, setDados] = useState([])
    const { token, setToken, setUser, setMessage } = useContext(StoreContext)

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
    return (
        <Layout>
            <Typography variant="h5" component="h2" color="textSecondary">
                Transações de todos os usuários
            </Typography>
            <Grid container justifyContent="flex-end" style={{ display: 'flex', padding: 30 }}>
                <Grid item>
                    <Grid item className={classes.caption}><img src="https://img.icons8.com/material-sharp/24/000000/resize-horizontal.png" />
                        Transações de Outros Usuários</Grid>
                    <Grid item className={classes.caption}><img src="https://img.icons8.com/ios-filled/24/fa314a/sort-down.png" />
                        Saídas da sua Conta</Grid>
                    <Grid item className={classes.caption}>  <img src="https://img.icons8.com/ios-filled/24/26e07f/sort-up.png" />
                        Entradas na sua Conta</Grid>
                </Grid>
            </Grid>
            <OpetationTable dados={dados} />
        </Layout >
    )
}