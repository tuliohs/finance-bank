import React, { useContext, useState } from 'react';
import { ATMCard } from 'atm-card-react';
import { Grid } from '@material-ui/core';
import StoreContext from 'contexts/StoreContext';

function CreditCard() {
    const { user } = useContext(StoreContext)
    const [number, setNumber] = useState('5498564678911486');
    const [month, setMonth] = useState(8);
    const [year, setYear] = useState(21);
    const [holder, setHolder] = useState('John Doe');
    const [cvv, setCvv] = useState('');

    return (<Grid style={{ justifyContent: "center", display: 'flex' }}>
        <ATMCard
            number={number}
            month={month}
            year={year}
            holder={holder}
            cvv={cvv}
            bgColor="#EA1D2C"
            hideDigits={true}
            system="maestro"
            //bgImage="/logo_size.jpg"
            lifted={true}
        />
    </Grid>
    )
}
export default CreditCard;