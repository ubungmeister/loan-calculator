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
        <div className='Div_GridContainer'>
            <div className="Div_GridItem">
                <span className="Span_GridItemHeader">{formatCurrency(props.showAmountBorrow)}</span>
                <input value={Math.max(0, props.showAmountBorrow)}
                       className="Input_GridItemRangeSlider"
                       type="range"
                       min="1000"
                       max="150000"
                       step="1000"
                       onChange={(e) => props.amountBorrow(+e.currentTarget.value)}

                />
                <label className='Label_GridItemLabel'>Amount to borrow</label>
                <span className="Span_GridItemHeader">{props.showYearToPay} Years</span>
                <input value={Math.max(0, props.showYearToPay)}
                       className="Input_GridItemRangeSlider"
                       type='range'
                       min="5"
                       max="35"
                       step="1"
                       onChange={(e) => props.yearPay(+e.currentTarget.value)}
                />
                <label className='Label_GridItemLabel'>Loan term</label>
            </div>
            <div className="Div_GridItem">
                <span className="Span_GridItemHeader">{props.showInterest}%</span>
                <input value={Math.max(0, props.showInterest)}
                       className="Input_GridItemRangeSlider"
                       type='range'
                       min='0.1'
                       max='20'
                       step='0.1'
                       onChange={(e) => props.interest(+e.currentTarget.value)}
                />
                <label
                    className='Label_GridItemLabel'
                    htmlFor="points">Interest rate</label>
                <span className="Span_GridItemHeader">{props.showInflationInterest}%</span>
                <input value={Math.max(0, props.showInflationInterest)}
                       className="Input_GridItemRangeSlider"
                       type='range'
                       min='0.1'
                       max='20'
                       step='0.1'
                       onChange={(e) => props.inflationInterest(+e.currentTarget.value)}
                />
                <label
                    className='Label_GridItemLabel'
                    htmlFor="points">Inflation rate</label>
            </div>
        </div>


    );
};

