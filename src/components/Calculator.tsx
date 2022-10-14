import React, {useState} from 'react';
import {Graph} from "./Graph";

import {handleLoanDataChange} from "./utils";
import {PaymentTable} from "./PaymentTable";
import {CalculatorInput} from "./CalculatorInput";
import styled from "styled-components";

export const Calculator = () => {
    const [amountBorrow, setStateAmount] = useState<number>(10000)
    const [interest, setStateLoan] = useState<number>(5)
    const [yearPay, setStateMonth] = useState<number>(10)
    const [inflationInt, setInflationInt] = useState<number>(10)


    //monthly annual interest
    const monthlyRate = ((interest / 100 / 12) * amountBorrow) / (1 - (Math.pow((1 + (interest / 100 / 12)), ((0 - yearPay) * 12))))
    //monthly inflation
    const inflationRateByMonth = (1 + (-(inflationInt / 100))) ** (1 / 12) - 1
    // data for table and graph
    const dataCalculateLoan = handleLoanDataChange(amountBorrow, interest, yearPay, monthlyRate, inflationRateByMonth,inflationInt)


    return (

        <>
            <DivWrapper>Loan calculator</DivWrapper>
            <CalculatorInput amountBorrow={setStateAmount}
                             yearPay={setStateMonth}
                             interest={setStateLoan}
                             showAmountBorrow={amountBorrow}
                             showYearToPay={yearPay}
                             showInterest={interest}
                             monthlyRate={monthlyRate}
                             inflationInterest={setInflationInt}
                             showInflationInterest={inflationInt}

            />
                <Graph calculatedLoan={dataCalculateLoan}
                       showAmountBorrow={amountBorrow}
                       monthlyRate={monthlyRate}
                />
                <PaymentTable monthlyPayments={dataCalculateLoan}/>

        </>
    );
};

const DivWrapper = styled.div`
  font-size: 40px;
  line-height: 56px;
`
