import React, {useState} from 'react';
import {Graph} from "./Graph";

import {handleMortgageDataChange} from "./utils";
import {PaymentTable} from "./PaymentTable";
import {CalculatorInput} from "./CalculatorInput";

export const Calculator = () => {
    const [amountBorrow, setStateAmount] = useState<number>(0)
    const [interest, setStateMortgage] = useState<number>(0)
    const [yearPay, setStateMonth] = useState<number>(0)

    //monthly annual interest
    const monthlyRate = ((interest / 100 / 12) * amountBorrow) / (1 - (Math.pow((1 + (interest / 100 / 12)),((0 - yearPay) * 12))))
    // data for table and graph
    const dataCalculateMortgage = handleMortgageDataChange(amountBorrow,interest,yearPay,monthlyRate)


    return (
        <div>
            <CalculatorInput amountBorrow={setStateAmount}
                             yearPay={setStateMonth}
                             interest={setStateMortgage}
                             showAmountBorrow={amountBorrow}
                             showYearToPay={yearPay}
                             showInterest={interest}
                             monthlyRate={monthlyRate}
            />
            <div>
                <Graph calculatedMortgage={dataCalculateMortgage}/>
                <PaymentTable monthlyPayments={dataCalculateMortgage}/>
            </div>
        </div>
    );
};

