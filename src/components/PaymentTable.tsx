import React from 'react';
import {handleLoanDataChange} from "./utils";
import {formatCurrency} from "./CalculatorInput";

type DataCalculateLoan = ReturnType<typeof handleLoanDataChange>
export const PaymentTable = (props: { monthlyPayments: DataCalculateLoan }) => {
    return(
        <table className="paymentsCalculatorTable">
            <thead>
            <tr>
                <th>Year</th>
                <th>Month Interest Paid</th>
                <th className="toDateYearlyPayment">Total Interest Paid</th>
                <th>Month Principal Paid</th>
                <th className="toDateYearlyPayment">Total Principal Repaid</th>
                <th>Loan Balance</th>
            </tr>
            </thead>
            <tbody>
            {props.monthlyPayments.map((el)=>(
                <tr key={el.month}>
                    <td> {el.month}</td>
                    <td>{formatCurrency(el.interestPaid)}</td>
                    <td>{formatCurrency(el.interestPaidToDate)}</td>
                    <td>{formatCurrency(el.principalRepaid)}</td>
                    <td>{formatCurrency(el.principalRepaidToDate)}</td>
                    <td>{formatCurrency(el.outstandingBalance)}</td>
                </tr>
            ))}

            </tbody>
        </table>
    );
}
