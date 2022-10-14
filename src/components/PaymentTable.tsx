import React from 'react';
import {handleLoanDataChange} from "./utils";
import {formatCurrency} from "./CalculatorInput";
import styled from "styled-components";

export interface ColorProps{
    month:number
}

type DataCalculateLoan = ReturnType<typeof handleLoanDataChange>
export const PaymentTable = (props: { monthlyPayments: DataCalculateLoan }) => {
    return(
        <Container>
            <Wrapper>
            <thead>
            <tr>
                <THWrapper>Month</THWrapper>
                <THWrapper>Month Interest Paid</THWrapper>
                <THWrapper className="ToDateYearlyPayment">Total Interest Paid</THWrapper>
                <THWrapper>Month Principal Paid</THWrapper>
                <THWrapper className="ToDateYearlyPayment">Total Principal Repaid</THWrapper>
                <THWrapper>Loan Balance</THWrapper>
                <THWrapper className="ToDateYearlyPayment">Inflation by month</THWrapper>
                <THWrapper>Inflation by month</THWrapper>

            </tr>
            </thead>
            <tbody>
            {props.monthlyPayments.filter(el=>el.month >0).map((el)=>(
                <TRWrapper month={el.month} key={el.month}>
                    <TDWrapper> {el.month}</TDWrapper>
                    <TDWrapper>{formatCurrency(el.interestPaid)}</TDWrapper>
                    <TDWrapper>{formatCurrency(el.interestPaidToDate)}</TDWrapper>
                    <TDWrapper>{formatCurrency(el.principalRepaid)}</TDWrapper>
                    <TDWrapper>{formatCurrency(el.principalRepaidToDate)}</TDWrapper>
                    <TDWrapper>{formatCurrency(el.outstandingBalance)}</TDWrapper>
                    <TDWrapper>{formatCurrency(el.outstandingBalanceInflation)}</TDWrapper>
                    <TDWrapper>{formatCurrency(el.inflationByMonth)}</TDWrapper>
                </TRWrapper>
            ))}

            </tbody>
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`
  padding: 10px 50px
`
const Wrapper = styled.table`
  width: 100%;
  overflow: auto;
`
const THWrapper = styled.th`
  position: initial;
  top: 0;
  padding: 15px 5px;
`
const TRWrapper = styled.tr<ColorProps>`
 background-color: ${props=>props.month %2 ===0? '#E4E9F1' : ''};
  opacity: 0.9;
`
const TDWrapper = styled.th`
  padding: 10px 5px;
  font: inherit;
  
`