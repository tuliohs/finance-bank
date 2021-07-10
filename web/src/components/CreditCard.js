import React, { useContext, useState } from 'react';
import { ATMCard } from 'atm-card-react';
import { Grid } from '@material-ui/core';
import StoreContext from 'contexts/StoreContext';
import './card.css'
function CreditCard() {
    const { user } = useContext(StoreContext)
    const [number, setNumber] = useState('5498564678911486');
    const [month, setMonth] = useState(8);
    const [year, setYear] = useState(21);
    const [holder, setHolder] = useState('John Doe');
    const [cvv, setCvv] = useState('');

    return (<Grid style={{ justifyContent: "center", display: 'flex' }}>
        {/*<ATMCard
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
        />*/}
        <div class='card'>
            <img
                src={
                    '/favicon.ico'
                }
                alt="logo"
                style={{ height: '30px' }}
            />
            <div class='card-content'>
                <h6>{user.name}</h6>
                <h6 id='label-cardnumber'>5498 5646 7891 1486</h6>
                <h5>Expiration<span>CVC</span></h5>
                <h6 id='label-cardexpiration'>08 / 21<span>{"        " + 179}</span></h6>
            </div>
            <div class='wave'></div>
        </div>
    </Grid>
    )
}
export default CreditCard;