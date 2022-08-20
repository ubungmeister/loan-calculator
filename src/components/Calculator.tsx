import React, {ChangeEvent, useEffect, useState} from 'react';
import {FcHome} from 'react-icons/fc'
import {handleMortgageDataChange, mortgageCalculation} from "./utils";
import {PaymentTable} from "./PaymentTable";

export const Calculator = () => {
    const [amountBorrow, setStateAmount] = useState<number>(0)
    const [interest, setStateMortgage] = useState<number>(0)
    const [yearPay, setStateMonth] = useState<number>(0)
    const [monthlyRate, setMonthlyRate] = useState<number>(0)


    const onAmountChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setStateAmount(+event.currentTarget.value)

    }
    const onMortgageRateHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setStateMortgage(+event.currentTarget.value)
    }
    const onYearsChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setStateMonth(+event.currentTarget.value)
    }
    //  const CalculatorHandler = () => {
    //     const monthlyRate = amountBorrow * (interest / 12 / 100) / (1 - (1 + (interest / 12 / 100)) ** -(yearPay * 12))
    //      setMonthlyRate(+monthlyRate.toFixed(2))
    //     return (+monthlyRate.toFixed(2))
    // }
    const calculatorHandler =()=>{
        return +mortgageCalculation(amountBorrow,interest,yearPay).toFixed(2)
        setMonthlyRate(+mortgageCalculation)
    }
    const monthlyPayments =()=>{
        return handleMortgageDataChange(amountBorrow,interest,yearPay,monthlyRate)
    }



    return (
        <div className='calculator'>
            <div className={'form'}>
                <h4>
                    <FcHome/> Loan calculator
                </h4>
                <div className={'form-items'}>
                    <div>
                        <label id='label'>Amount:</label>
                        <input value={Math.max(0, amountBorrow)} type={"number"}
                               onChange={onAmountChangeHandler}
                               className={'input'}
                        />
                    </div>
                    <div>
                        <label id='label'>Interest:</label>
                        <input value={Math.max(0, interest)} type={"number"}
                               onChange={onMortgageRateHandler}
                        />
                    </div>
                    <div>
                        <label id='label'>Years:</label>
                        <input value={Math.max(0, yearPay)} type={"number"}
                               onChange={onYearsChangeHandler}
                        />
                    </div>
                    <div>
                        <label id='label'>Monthly Payment:</label>
                        <input type={'text'}
                               disabled={true}
                               value={isFinite(calculatorHandler()) ? calculatorHandler() : ''}/>
                    </div>

                </div>

            </div>
            <PaymentTable amountBorrow={amountBorrow} monthlyPayments={monthlyPayments}/>
        </div>
    );
};

