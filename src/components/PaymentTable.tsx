import React from 'react';
import {handleLoanDataChange} from "./utils";
import {formatCurrency} from "./CalculatorInput";

type DataCalculateLoan = ReturnType<typeof handleLoanDataChange>
export const PaymentTable = (props: { monthlyPayments: DataCalculateLoan }) => {
    return(
        <table className="PaymentsCalculatorTable">
            <thead>
            <tr>
                <th>Month</th>
                <th>Month Interest Paid</th>
                <th className="ToDateYearlyPayment">Total Interest Paid</th>
                <th>Month Principal Paid</th>
                <th className="ToDateYearlyPayment">Total Principal Repaid</th>
                <th>Loan Balance</th>
                <th className="ToDateYearlyPayment">Inflation by month</th>
                <th>Inflation by month</th>

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
                    <td>{formatCurrency(el.outstandingBalanceInflation)}</td>
                    <td>{formatCurrency(el.inflationByMonth)}</td>
                </tr>
            ))}

            </tbody>
        </table>
    );
}
