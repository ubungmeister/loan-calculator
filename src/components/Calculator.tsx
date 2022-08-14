import React, {ChangeEvent, useEffect, useState} from 'react';
import {FcHome} from 'react-icons/fc'

export const Calculator = () => {
    const [amount, setStateAmount] = useState<number>(0)
    const [interest, setStateMortgage] = useState<number>(0)
    const [year, setStateMonth] = useState<number>(0)
    const [result,setResult] = useState(0)
    const[error,setError]=useState<string|null>(null)
    useEffect(()=>{ CalculatorHandler()},[amount,interest,year])

    const onAmountChangeHandler =(event:ChangeEvent<HTMLInputElement>)=>{
        setStateAmount(+event.currentTarget.value)
    }
    const onMortgageRateHandler =(event:ChangeEvent<HTMLInputElement>)=>{
        setStateMortgage(+event.currentTarget.value)
    }
    const onYearsChangeHandler =(event:ChangeEvent<HTMLInputElement>)=>{
        setStateMonth(+event.currentTarget.value)
    }
    const CalculatorHandler =()=>{
       let inputAmount = Number(amount)
        let inputInterest = Number(interest)
        let inputYear = Number(year)
        const rate = inputAmount * (inputInterest/12/100)/(1-(1+(inputInterest/12/100))**-(inputYear*12))
        setResult(+rate.toFixed(2))
    }


    return (
        <div className='calculator'>
            <div className={'form'}>
            <h4>
            <FcHome /> Loan calculator
            </h4>
                <div className={'form-items'}>
                    <div>
                    <label id='label'>Amount:</label>
            <input value={amount >= 0? amount : 0} type={"number"}
                onChange={onAmountChangeHandler}
                   className={'input'}
            />
                    </div>
                    <div>
                        <label id='label'>Interest:</label>
                        <input value={interest >= 0? interest : 0} type={"number"}
                               onChange={onMortgageRateHandler}
                        />
                    </div>
                    <div>
                        <label id='label'>Years:</label>
            <input value={year >= 0? year : 0} type={"number"}
                onChange={onYearsChangeHandler}
            />
                    </div>
                <div>
                    <label id='label'>Monthly Payment:</label>
                    <input type={'text'}
                           disabled={true}
                    value={isFinite(result)? result : ''}/>
                </div>
                </div>

        </div>
        </div>
    );
};

