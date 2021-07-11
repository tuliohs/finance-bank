import StoreContext from 'contexts/StoreContext';
import React, { useContext, useState } from 'react';
import Cards from 'react-credit-cards';
import styled from 'styled-components'

//import 'react-credit-cards/es/styles-compiled.css';
import './react-credit-cards.css';


const Styles = styled.div`  

.rccs__card--maestro > div, .rccs__card--mastercard > div {
    color: #ffffff  !important;
} 
.rccs__card__background{
    background:    linear-gradient(
        25deg
        , #DC0A28,#EA1D2C) !important;
}  
`

export default function CreditCard() {
    const { user } = useContext(StoreContext)
    const [dados, setDados] = useState({
        cvc: '',
        expiry: '08/21',
        focus: '',
        name: user?.name,
        number: '5498 **** **** 1486',
    })

    //handleInputFocus = (e) => {
    //    this.setState({ focus: e.target.name });
    //}

    //handleInputChange = (e) => {
    //    const { name, value } = e.target;

    //    this.setState({ [name]: value });
    //}

    return (
        <Styles>
            <Cards
                cvc={dados.cvc}
                expiry={dados.expiry}
                focused={dados.focus}
                name={dados.name}
                number={dados.number}
                style={{ backGroundColor: "#000000" }}
                issuer="visa"
                preview={true}
            />
        </Styles>
    )
}