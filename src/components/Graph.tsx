import React from 'react';
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis, PieChart, Pie, Cell} from "recharts";
import {handleLoanDataChange} from "./utils";
import {formatCurrency} from "./CalculatorInput";

const formatDecimals = (item: number) => {
    return Number(item.toFixed(2))}

type PropsType = {
    showAmountBorrow:number
    monthlyRate:number
}

type DataCalculateLoan = ReturnType<typeof handleLoanDataChange>
export const Graph = (props: { calculatedMortgage: DataCalculateLoan} & PropsType ) => {
        const chartData = props.calculatedMortgage.filter(el=>el.month).map((el, index) => ({
            xAxis: {index},
            interestPaid: formatDecimals(el.interestPaid),
            principalPaid: formatDecimals(el.principalRepaid),
            remain: formatDecimals(el.outstandingBalance),
            outstandingBalanceInflation:formatDecimals(el.outstandingBalanceInflation),
            inflationByMonth:formatDecimals(el.inflationByMonth),

        }))
        // extract amount of monthly interest paid and calculate the sum by using reducer
        const sumPrincipalTotlaPaid = props.calculatedMortgage.map(el=>el.interestPaid).reduce((accumulator, value)=>{
            return accumulator + value
        })
        const sumPrincipalAmountPaid = props.calculatedMortgage.map(el=>el.principalRepaid).reduce((accumulator, value)=>{
        return accumulator + value
    })
        const totalAmountPaid = sumPrincipalTotlaPaid + sumPrincipalAmountPaid
        const data = [{name: 'Total Principal Paid', value:sumPrincipalTotlaPaid},
                    {name: 'Borrowed Amount', value:props.showAmountBorrow},]
        const COLORS = ["#0088FE", "#00C49F"]



        return (
        <div className='Div_GridContainer' >
            <div>
                <div className="Span_GridItemHeader">Monthly Payment:
                            {isFinite(props.monthlyRate) ? formatCurrency(props.monthlyRate) : '0'}</div>
                <div className="Span_GridItemHeader">Total Principal Paid: {formatCurrency(sumPrincipalTotlaPaid)}</div>
                <div className="Span_GridItemHeader">Total Amount Paid: {formatCurrency(totalAmountPaid)}</div>
            </div>
            <div className='graphContainer'>
                <PieChart
                    width={600}
                    height={300}>
                    <Pie
                        data={data}
                        cx={300}
                        cy={100}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={(entry) => entry.name}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))}
                    </Pie>
                </PieChart>
            </div>
                <div className='graphContainer' >
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
                        <CartesianGrid stroke='#eee' strokeDasharray='3 3' />
                        <XAxis dataKey='index' interval={10}/>
                        <YAxis/>
                        <Tooltip />
                        <Legend
                        />
                        <Line
                            type='monotone'
                            dataKey='remain'
                            fill="#82ca9d"
                            stroke="#82ca9d"
                            name='Remain to pay by Month'

                        />
                        <Line
                            type='monotone'
                            dataKey='outstandingBalanceInflation'
                            stroke='red'
                            name='Inflation'

                        />
                    </LineChart>
                </div >
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
                        <CartesianGrid stroke='#eee' strokeDasharray='3 3' />
                        <XAxis dataKey='xAxis' interval={10} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type='monotone'
                            dataKey='interestPaid'
                            strokeWidth={1}
                            fill="#82ca9d"
                            stroke="#82ca9d"
                            name='Interest paid by Month'

                        />
                        <Line
                            type='monotone'
                            dataKey='principalPaid'
                            strokeWidth={1}
                            activeDot={{ r: 8 }}
                            fill="#8884d8"
                            stroke="#8884d8"
                            name='Principal paid by Month'

                        />
                        <Line
                            type='monotone'
                            dataKey='inflationByMonth'
                            strokeWidth={1}
                            activeDot={{ r: 8 }}
                            fill="#8884d8"
                            stroke='red'
                            name='Inflation by Month'

                        />
                    </LineChart>

                    </div>
                </div>

    );
};

