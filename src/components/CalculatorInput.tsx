import React from 'react';
import styled from "styled-components";

export const formatCurrency = (value: number) => {
    return Intl.NumberFormat('de-EU', {
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
        <Container>
            <Wrapper>
                <HeaderWrapper>{formatCurrency(props.showAmountBorrow)}</HeaderWrapper>
                <InputSliderWrapper value={Math.max(0, props.showAmountBorrow)}
                                    type="range"
                                    min="1000"
                                    max="150000"
                                    step="1000"
                                    onChange={(e) => props.amountBorrow(+e.currentTarget.value)}

                />
                <LabelSliderWrapper>Amount to borrow</LabelSliderWrapper>
                <HeaderWrapper>{props.showYearToPay} Years</HeaderWrapper>
                <InputSliderWrapper value={Math.max(0, props.showYearToPay)}
                                    type='range'
                                    min="5"
                                    max="35"
                                    step="1"
                                    onChange={(e) => props.yearPay(+e.currentTarget.value)}
                />
                <LabelSliderWrapper>Loan term</LabelSliderWrapper>
            </Wrapper>
            <Wrapper>
                <HeaderWrapper>{props.showInterest}%</HeaderWrapper>
                <InputSliderWrapper value={Math.max(0, props.showInterest)}
                                    type='range'
                                    min='0.1'
                                    max='20'
                                    step='0.1'
                                    onChange={(e) => props.interest(+e.currentTarget.value)}
                />
                <LabelSliderWrapper htmlFor="points">Interest rate</LabelSliderWrapper>
                <HeaderWrapper>{props.showInflationInterest}%</HeaderWrapper>
                <InputSliderWrapper value={Math.max(0, props.showInflationInterest)}
                                    type='range'
                                    min='0.1'
                                    max='20'
                                    step='0.1'
                                    onChange={(e) => props.inflationInterest(+e.currentTarget.value)}
                />
                <LabelSliderWrapper htmlFor="points">Inflation rate</LabelSliderWrapper>
            </Wrapper>
        </Container>


    );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  padding: 10px 50px
`
const Wrapper = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  text-align: center;
`
const HeaderWrapper = styled.div`
  font-weight: bold;
  font-size: 1.2em;
  margin-top: 10px;
`
const InputSliderWrapper = styled.input`
  margin-bottom: 10px;
`
const LabelSliderWrapper = styled.label`
  font-size: 14px;
`