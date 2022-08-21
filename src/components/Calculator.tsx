import React, {ChangeEvent, useState} from 'react';
import {FcHome} from 'react-icons/fc'
import {handleMortgageDataChange, handleMortgageDataChangeGraph, mortgageCalculation} from "./utils";
import {PaymentTable} from "./PaymentTable";
import {PaymentGraph} from "./PaymentGraph";
import {CalculatorInput} from "./CalculatorInput";

export const Calculator = () => {
    const [amountBorrow, setStateAmount] = useState<number>(0)
    const [interest, setStateMortgage] = useState<number>(0)
    const [yearPay, setStateMonth] = useState<number>(0)
    // const [monthlyRate, setMonthlyRate] = useState<number>(0)


    const onAmountChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setStateAmount(+event.currentTarget.value)

    }
    const onMortgageRateHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setStateMortgage(+event.currentTarget.value)
    }
    const onYearsChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setStateMonth(+event.currentTarget.value)
    }
    const monthlyRate = ((interest / 100 / 12) * amountBorrow) / (1 - (Math.pow((1 + (interest / 100 / 12)),((0 - yearPay) * 12))))
    //  const CalculatorHandler = () => {
    //     const monthlyRate = amountBorrow * (interest / 12 / 100) / (1 - (1 + (interest / 12 / 100)) ** -(yearPay * 12))
    //      setMonthlyRate(+monthlyRate.toFixed(2))
    //     return (+monthlyRate.toFixed(2))
    // }
    const calculatorHandler =()=>{
        return +mortgageCalculation(amountBorrow,interest,yearPay).toFixed(2)
        // setMonthlyRate(+mortgageCalculation)
    }
    const monthlyPayments = handleMortgageDataChange(amountBorrow,interest,yearPay,monthlyRate)
    const yearPayments = handleMortgageDataChangeGraph(amountBorrow,interest,yearPay,monthlyRate)


    const [collapsed, setCollapsed] = useState(true)

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
            <div >
                <button onClick={()=>{setCollapsed(!collapsed)}}>Show payment schedule
                </button>
                {!collapsed && <PaymentTable monthlyPayments={monthlyPayments}/>}
                {/*<PaymentGraph yearPayments={yearPayments} yearPay={yearPay}/>*/}
            </div>
        </div>
    );
};

