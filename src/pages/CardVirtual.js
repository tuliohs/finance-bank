import { Typography } from '@material-ui/core'
import PaymentForm from 'components/CreditCard'
import Layout from 'components/Layout'
import React from 'react'

export default function CardVirtual() {
    return (
        <Layout>
            <Typography variant="h5" component="h2">
                Esse é o seu cartão virtual
            </Typography>
            <PaymentForm />
        </Layout>
    )
}