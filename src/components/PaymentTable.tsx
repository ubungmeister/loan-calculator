import React from 'react';
const localeOptions = {
    style:'currency',
    currency:'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
}

export type PaymentTableType = {
    amountBorrow: number
    monthlyPayments: Array<{
        interestPaidToDate: number,
        year: number, principalRepaidToDate: number,
        principalRepaid: number,
        outstandingBalance: number, interestPaid: number
    }>
}

export const PaymentTable = (props:PaymentTableType) => {
    let paymentMonthsArr = [];
    for(let i = 0; i < props.monthlyPayments.length; i++) {
        paymentMonthsArr.push(
            <tr key={props.monthlyPayments[i].year}>
                <td>{props.monthlyPayments[i].year}</td>
                <td>{props.monthlyPayments[i].interestPaid.toLocaleString('en-GB', localeOptions)}</td>
                <td className="to-date-yearly-payment">{props.monthlyPayments[i].interestPaidToDate.toLocaleString('en-GB', localeOptions)}</td>
                <td>{props.monthlyPayments[i].principalRepaid.toLocaleString('en-GB', localeOptions)}</td>
                <td className="to-date-yearly-payment">{props.monthlyPayments[i].principalRepaidToDate.toLocaleString('en-GB', localeOptions)}</td>
                <td>{props.monthlyPayments[i].outstandingBalance.toLocaleString('en-GB', localeOptions)}</td>
            </tr>
        );
    }

    return(
        <table className="paymentsCalculatorTable">
            <thead>
            <tr>
                <th>Year</th>
                <th>Month Interest Paid</th>
                <th className="to-date-yearly-payment">Total Interest Paid</th>
                <th>Month Principal Repaid</th>
                <th className="to-date-yearly-payment">Total Principal Repaid</th>
                <th>Mortgage Balance</th>
            </tr>
            </thead>
            <tbody>
            {paymentMonthsArr}
            </tbody>
        </table>
    );
}
