import React from 'react';
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis, PieChart, Pie, Cell, LabelList} from "recharts";
import {handleLoanDataChange} from "./utils";
import {formatCurrency} from "./CalculatorInput";
import styled from "styled-components";

const formatDecimals = (item: number) => {
    return Number(item.toFixed(2))
}

type PropsType = {
    showAmountBorrow: number
    monthlyRate: number
}


type DataCalculateLoan = ReturnType<typeof handleLoanDataChange>
export const Graph = (props: { calculatedLoan: DataCalculateLoan } & PropsType) => {
    const chartData = props.calculatedLoan.filter(el => el.month).map((el, index) => ({
        xAxis: {index},
        interestPaid: formatDecimals(el.interestPaid),
        principalPaid: formatDecimals(el.principalRepaid),
        remain: formatDecimals(el.outstandingBalance),
        outstandingBalanceInflation: formatDecimals(el.outstandingBalanceInflation),
        inflationByMonth: formatDecimals(el.inflationByMonth),
        propertyValue: formatDecimals(el.propertyValue)

    }))
    // extract amount of monthly interest paid and calculate the sum by using reducer
    const sumPrincipalTotlaPaid = props.calculatedLoan.map(el => el.interestPaid).reduce((accumulator, value) => {
        return accumulator + value
    })
    const sumPrincipalAmountPaid = props.calculatedLoan.map(el => el.principalRepaid).reduce((accumulator, value) => {
        return accumulator + value
    })
    const totalAmountPaid = sumPrincipalTotlaPaid + sumPrincipalAmountPaid
    const datas = [{name: 'Total Principal Paid', value: sumPrincipalTotlaPaid},
        {name: 'Borrowed Amount', value: props.showAmountBorrow},]
    const COLORS = ["#47A8BD", "#1E3888"]


    return (
        <Container>
            <ItemWrapper>
                <PanelWrapper>
                    <UlWrapper>
                        <LiWrapper>
                            <SpanWrapper> Monthly Payment:</SpanWrapper>
                            <SpanWrapper>{isFinite(props.monthlyRate) ? formatCurrency(props.monthlyRate) : '0'}</SpanWrapper>
                        </LiWrapper>

                        <LiWrapper>
                            <SpanWrapper>Total Principal Paid:</SpanWrapper>
                            <SpanWrapper>{formatCurrency(sumPrincipalTotlaPaid)}</SpanWrapper>
                        </LiWrapper>
                        <LiWrapper>
                            <SpanWrapper>Total Amount Paid:</SpanWrapper>
                            <SpanWrapper>{formatCurrency(totalAmountPaid)}</SpanWrapper></LiWrapper>
                    </UlWrapper>
                </PanelWrapper>
            </ItemWrapper>
            <PieWrapper>
                <PieChart
                    width={500}
                    height={300}>
                    <Pie
                        data={datas}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={90}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={(entry) => entry.name}
                    >
                        {datas.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                                fontSize={15}/>
                        ))}
                    </Pie>
                </PieChart>
            </PieWrapper>
            <GraphWrapper>
                <LineChart
                    width={600}
                    height={300}
                    data={chartData}
                    margin={{
                        top: 15,
                        right: 30,
                        left: 10,
                        bottom: 15,
                    }}
                >
                    <CartesianGrid stroke='#eee' strokeDasharray='3 3'/>
                    <XAxis dataKey='index' interval={10}/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend
                    />
                    <Line
                        type='monotone'
                        dataKey='remain'
                        fill="#47A8BD"
                        stroke="#47A8BD"
                        name='Remain to pay by Month'

                    />
                    <Line
                        type='monotone'
                        dataKey='outstandingBalanceInflation'
                        fill='#FFAD69'
                        stroke='#FFAD69'
                        name='Inflation'

                    />
                    <Line
                        type='monotone'
                        dataKey='propertyValue'
                        fill='blue'
                        stroke='blue'
                        name='Property value affected by Inflation'

                    />
                </LineChart>
            </GraphWrapper>
            <GraphWrapper>
                <LineChart
                    width={600}
                    height={300}
                    data={chartData}
                    margin={{
                        top: 15,
                        right: 30,
                        left: 10,
                        bottom: 15,

                    }}
                >
                    <CartesianGrid stroke='#eee' strokeDasharray='3 3'/>
                    <XAxis dataKey='xAxis' interval={10}/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line
                        type='monotone'
                        dataKey='interestPaid'
                        fill="#1E3888"
                        stroke="#1E3888"
                        name='Interest paid by Month'

                    />
                    <Line
                        type='monotone'
                        dataKey='principalPaid'
                        fill='#47A8BD'
                        stroke="#47A8BD"
                        name='Principal paid by Month'

                    />
                    <Line
                        type='monotone'
                        dataKey='inflationByMonth'
                        fill='#FFAD69'
                        stroke='#FFAD69'
                        name='Inflation by Month'

                    />
                </LineChart>

            </GraphWrapper>
        </Container>

    );
};

const UlWrapper = styled.ul`
  border: solid #E4E9F1;
  opacity: 0.8;
  padding-left: 5px;
  border-radius: 5px;
  box-shadow: 5px 5px 10px 0 rgb(228, 233, 241)
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  padding: 10px 50px
`
const ItemWrapper =styled.div`
  font-weight: bold;
  font-size: 1.2em;
  margin-top: 10px;
`
const PanelWrapper =styled.div`
  width: 400px;
  height: 100px;
  padding: 60px;
  line-height: 24px;
  box-sizing: content-box;
`
const LiWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  margin: 10px;
`
const SpanWrapper = styled.span`
  color: rgb(22, 33, 54);
  font-size: 22px;
  font-weight: lighter;
`
const PieWrapper =styled.div`
  display: flex;
  padding-left: 50px;
`
const GraphWrapper =styled.div`
  width: 100%;
  max-height: 600px;
  max-width: 1000px;
  margin: 10px;
`