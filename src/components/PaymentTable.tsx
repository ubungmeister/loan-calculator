import React from 'react';
import {handleMortgageDataChange} from "./utils";
const localeOptions = {
    style:'currency',
    currency:'CZK',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
}


type DataCalculateMortgage = ReturnType<typeof handleMortgageDataChange>
export const PaymentTable = (props: { monthlyPayments: DataCalculateMortgage }) => {
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
            {props.monthlyPayments.map((el)=>(
                <tr key={el.month}>
                    <td> €{el.month}</td>
                    <td>{el.interestPaid.toLocaleString('en-GB', localeOptions)}</td>
                    <td>{el.interestPaidToDate.toLocaleString('en-GB', localeOptions)}</td>
                    <td>{el.principalRepaid.toLocaleString('en-GB', localeOptions)}</td>
                    <td>{el.principalRepaidToDate.toLocaleString('en-GB', localeOptions)}</td>
                    <td>{el.outstandingBalance.toLocaleString('en-GB', localeOptions)}</td>
                </tr>
            ))}

            </tbody>
        </table>
    );
}
