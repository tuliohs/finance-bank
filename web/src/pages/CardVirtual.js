import { Grid, Typography } from '@material-ui/core'
import CreditCard from 'components/CreditCard'
import Layout from 'components/Layout'
import React from 'react'
import QRCode from 'qrcode.react'
import { URL } from 'utils/constants'

export default function CardVirtual() {
    return (
        <Layout>
            <Typography variant="h5" component="h2" color="textSecondary">
                Esse é o seu cartão virtual
            </Typography>
            <Grid style={{
                marginTop: 20,
                display: 'flex',
                direction: 'row',
                justifyContent: "space-around"
            }}>
                <CreditCard />
                <QRCode
                    style={{
                        //position: "absolute",
                        display: 'flex',
                        //right: 15,
                        marginTop: 30,
                        //float: "right",
                        width: 160,
                        height: 160
                    }}
                    value={URL.WEB} />
            </Grid>
        </Layout>
    )
}