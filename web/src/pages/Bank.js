import { Typography } from '@material-ui/core'
import { getOperations } from 'api/opration.api'
import Layout from 'components/Layout'
import OpetationTable from 'components/OpetationTable'
import StoreContext from 'contexts/StoreContext'
import React, { useContext, useEffect, useState } from 'react'

export default function Bank() {
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
                Transações
            </Typography>
            <OpetationTable dados={dados} />
        </Layout>
    )
}