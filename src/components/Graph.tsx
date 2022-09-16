import React from 'react';
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis, PieChart, Pie, Cell} from "recharts";
import {handleLoanDataChange} from "./utils";
import {formatCurrency} from "./CalculatorInput";

const formatDecimals = (item: number) => {
    return Number(item.toFixed(2))
}

type PropsType = {
    showAmountBorrow: number
    monthlyRate: number
}

type DataCalculateLoan = ReturnType<typeof handleLoanDataChange>
export const Graph = (props: { calculatedMortgage: DataCalculateLoan } & PropsType) => {
    const chartData = props.calculatedMortgage.filter(el => el.month).map((el, index) => ({
        xAxis: {index},
        interestPaid: formatDecimals(el.interestPaid),
        principalPaid: formatDecimals(el.principalRepaid),
        remain: formatDecimals(el.outstandingBalance),
        outstandingBalanceInflation: formatDecimals(el.outstandingBalanceInflation),
        inflationByMonth: formatDecimals(el.inflationByMonth),
        propertyValue: formatDecimals(el.propertyValue)

    }))
    // extract amount of monthly interest paid and calculate the sum by using reducer
    const sumPrincipalTotlaPaid = props.calculatedMortgage.map(el => el.interestPaid).reduce((accumulator, value) => {
        return accumulator + value
    })
    const sumPrincipalAmountPaid = props.calculatedMortgage.map(el => el.principalRepaid).reduce((accumulator, value) => {
        return accumulator + value
    })
    const totalAmountPaid = sumPrincipalTotlaPaid + sumPrincipalAmountPaid
    const data = [{name: 'Total Principal Paid', value: sumPrincipalTotlaPaid},
        {name: 'Borrowed Amount', value: props.showAmountBorrow},]
    const COLORS = ["#47A8BD", "#1E3888"]


    return (
        <div className='Div_GridContainer'>
            <div className='Span_DisplayedIteam'>
                <div className='Div_Panel'>
                    <ul className='ul_Style'>
                        <li className='li_Style'>
                            <span className='result_Style'> Monthly Payment:</span>
                            <span
                                className='result_Style'>{isFinite(props.monthlyRate) ? formatCurrency(props.monthlyRate) : '0'}</span>
                        </li>

                        <li className='li_Style'>
                            <span className='result_Style'>Total Principal Paid:</span>
                            <span className='result_Style'>
                    {formatCurrency(sumPrincipalTotlaPaid)}</span>
                        </li>
                        <li className='li_Style'>
                            <span className='result_Style'>Total Amount Paid:</span>
                            <span className='result_Style'>{formatCurrency(totalAmountPaid)}</span></li>
                    </ul>
                </div>
            </div>
            <div className='pieContainer'>
                <PieChart
                    width={500}
                    height={300}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={90}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={(entry) => entry.name}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} fontSize={15}/>
                        ))}
                    </Pie>
                </PieChart>
            </div>
            <div className='graphContainer'>
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
                        fill= 'blue'
                        stroke='blue'
                        name='Property value affected by Inflation'

                    />
                </LineChart>
            </div>
            <div className='graphContainer'>
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

            </div>
        </div>

    );
};

