import React from 'react';

export type PropsType = {
    showAmountBorrow:number
    showInterest:number
    showYearToPay:number
    amountBorrow: (amountBorrow:number)=>void
    interest:(interest:number)=>void
    yearPay:(yearPay:number)=>void
    monthlyRate:number

}

export const CalculatorInput = (props:PropsType) => {
    return (
            <div className="grid__container">
                <div className="grid__item">
                    <div>
                        <span className="grid__item--header">Amount:</span>
                        <input value={Math.max(0, props.showAmountBorrow)} type={"number"}
                               onChange={(e)=>props.amountBorrow(+e.currentTarget.value)}

                        />
                    </div>
                    <div>
                        <label id='label'>Interest:</label>
                        <input value={Math.max(0, props.showInterest)} type={"number"}
                               onChange={(e)=>props.interest(+e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        <label id='label'>Years:</label>
                        <input value={Math.max(0, props.showYearToPay)} type={"number"}
                               onChange={(e)=>props.yearPay(+e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        <label id='label'>Monthly Payment:</label>
                        <input type={'text'}
                               disabled={true}
                               value={isFinite(props.monthlyRate) ? props.monthlyRate.toFixed(2) : ''}/>
                    </div>
                </div>
                <div>
                </div>
            </div>
    );
};

