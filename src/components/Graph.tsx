import React from 'react';
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {handleLoanDataChange} from "./utils";

const formatDecimals = (item: number) => {
    return Number(item.toFixed(2))}

type DataCalculateLoan = ReturnType<typeof handleLoanDataChange>
export const Graph = (props: { calculatedMortgage: DataCalculateLoan }) => {
        const chartData = props.calculatedMortgage.filter(el=>el.month).map((el, index) => ({
            xAxis: {index},
            interestPaid: formatDecimals(el.interestPaid),
            principalPaid: formatDecimals(el.principalRepaid),
            remain: formatDecimals(el.outstandingBalance),
        }))

        return (
        <div className='Div_GridContainer' >
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
                        <XAxis dataKey='xAxis' interval={10}/>
                        <YAxis/>
                        <Tooltip />
                        <Legend
                        />
                        <Line
                            type='monotone'
                            dataKey='remain'
                            fill="#82ca9d"
                            stroke="#82ca9d"
                            name='Remain to pay by Year'

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
                            name='Interest paid by Year'

                        />
                        <Line
                            type='monotone'
                            dataKey='principalPaid'
                            strokeWidth={1}
                            activeDot={{ r: 8 }}
                            fill="#8884d8"
                            stroke="#8884d8"
                            name='Principal paid by Year'

                        />
                    </LineChart>
                    </div>
                </div>

    );
};

