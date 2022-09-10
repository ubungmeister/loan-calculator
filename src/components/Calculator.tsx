import React, {useState} from 'react';
import {Graph} from "./Graph";

import {handleLoanDataChange} from "./utils";
import {PaymentTable} from "./PaymentTable";
import {CalculatorInput} from "./CalculatorInput";

export const Calculator = () => {
    const [amountBorrow, setStateAmount] = useState<number>(10000)
    const [interest, setStateMortgage] = useState<number>(5)
    const [yearPay, setStateMonth] = useState<number>(10)
    const [inflationInterest, setInflationInterest] = useState<number>(10)


    //monthly annual interest
    const monthlyRate = ((interest / 100 / 12) * amountBorrow) / (1 - (Math.pow((1 + (interest / 100 / 12)), ((0 - yearPay) * 12))))
    //monthly inflation
    const inflationMonthlyRate = (1 + (-(inflationInterest / 100))) ** (1 / 12) - 1
    // data for table and graph
    const dataCalculateMortgage = handleLoanDataChange(amountBorrow, interest, yearPay, monthlyRate, inflationMonthlyRate)


    return (

        <div>
            <div className='Div_Start'>Loan calculator</div>
            <CalculatorInput amountBorrow={setStateAmount}
                             yearPay={setStateMonth}
                             interest={setStateMortgage}
                             showAmountBorrow={amountBorrow}
                             showYearToPay={yearPay}
                             showInterest={interest}
                             monthlyRate={monthlyRate}
                             inflationInterest={setInflationInterest}
                             showInflationInterest={inflationInterest}

            />
            <div>
                <Graph calculatedMortgage={dataCalculateMortgage}
                       showAmountBorrow={amountBorrow}
                       monthlyRate={monthlyRate}
                />
                <PaymentTable monthlyPayments={dataCalculateMortgage}/>
            </div>
        </div>
    );
};

