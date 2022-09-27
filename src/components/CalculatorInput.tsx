import React from 'react';

export const formatCurrency = (value: number) => {
    return Intl.NumberFormat('CZ', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(value)
}

export type PropsType = {
    showAmountBorrow: number
    showInterest: number
    showYearToPay: number
    amountBorrow: (amountBorrow: number) => void
    interest: (interest: number) => void
    yearPay: (yearPay: number) => void
    monthlyRate: number
    inflationInterest: (inflationInterest: number) => void
    showInflationInterest: number

}

export const CalculatorInput = (props: PropsType) => {
    return (
        <div className='DivGridContainer'>
            <div className="DivGridItem">
                <span className="SpanGridItemHeader">{formatCurrency(props.showAmountBorrow)}</span>
                <input value={Math.max(0, props.showAmountBorrow)}
                       className="InputGridItemRangeSlider"
                       type="range"
                       min="1000"
                       max="150000"
                       step="1000"
                       onChange={(e) => props.amountBorrow(+e.currentTarget.value)}

                />
                <label className='LabelGridItemLabel'>Amount to borrow</label>
                <span className="SpanGridItemHeader">{props.showYearToPay} Years</span>
                <input value={Math.max(0, props.showYearToPay)}
                       className="InputGridItemRangeSlider"
                       type='range'
                       min="5"
                       max="35"
                       step="1"
                       onChange={(e) => props.yearPay(+e.currentTarget.value)}
                />
                <label className='LabelGridItemLabel'>Loan term</label>
            </div>
            <div className="DivGridItem">
                <span className="SpanGridItemHeader">{props.showInterest}%</span>
                <input value={Math.max(0, props.showInterest)}
                       className="InputGridItemRangeSlider"
                       type='range'
                       min='0.1'
                       max='20'
                       step='0.1'
                       onChange={(e) => props.interest(+e.currentTarget.value)}
                />
                <label
                    className='LabelGridItemLabel'
                    htmlFor="points">Interest rate</label>
                <span className="SpanGridItemHeader">{props.showInflationInterest}%</span>
                <input value={Math.max(0, props.showInflationInterest)}
                       className="InputGridItemRangeSlider"
                       type='range'
                           min='0.1'
                           max='20'
                       step='0.1'
                       onChange={(e) => props.inflationInterest(+e.currentTarget.value)}
                />
                <label
                    className='LabelGridItemLabel'
                    htmlFor="points">Inflation rate</label>
            </div>
        </div>


    );
};

