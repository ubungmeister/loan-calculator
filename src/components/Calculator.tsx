import React, {useState} from 'react';
import {Graph} from "./Graph";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

import {handleMortgageDataChange, handleMortgageDataChangeGraph} from "./utils";
import {PaymentTable} from "./PaymentTable";
import {PaymentGraph} from "./PaymentGraph";
import {CalculatorInput} from "./CalculatorInput";

export const Calculator = () => {
    const [amountBorrow, setStateAmount] = useState<number>(0)
    const [interest, setStateMortgage] = useState<number>(0)
    const [yearPay, setStateMonth] = useState<number>(0)
    const formatDecimals = (item: number) => {
        return Number(item.toFixed(2))
    }


    //monthly annual interest
    const monthlyRate = ((interest / 100 / 12) * amountBorrow) / (1 - (Math.pow((1 + (interest / 100 / 12)),((0 - yearPay) * 12))))
    // data for table and graph
    const dataCalculateMortgage = handleMortgageDataChange(amountBorrow,interest,yearPay,monthlyRate)
    const yearPayments = handleMortgageDataChange(amountBorrow,interest,yearPay,monthlyRate)

    type DataCalculateMortgage = ReturnType<typeof handleMortgageDataChange>
    // const Charts = (props: { calculatedMortgage: DataCalculateMortgage }) => {
    //     const chartData = props.calculatedMortgage.map((item, index) => ({
    //         xAxis: { index },
    //         interestPaid: formatDecimals(item.interestPaid),
    //         principalPaid: formatDecimals(item.principalRepaid),
    //         remain: formatDecimals(item.principalRepaid),
    //     }))


        const [collapsed, setCollapsed] = useState(true)

    return (
        <div>
            <CalculatorInput amountBorrow={setStateAmount}
                             yearPay={setStateMonth}
                             interest={setStateMortgage}
                             showAmountBorrow={amountBorrow}
                             showYearToPay={yearPay}
                             showInterest={interest}
                             monthlyRate={monthlyRate}
            />
            <div>
                <Graph calculatedMortgage={dataCalculateMortgage}/>
                <PaymentTable monthlyPayments={dataCalculateMortgage}/>
            </div>
            {/*<div >*/}
            {/*    <button onClick={()=>{setCollapsed(!collapsed)}}>Show payment schedule*/}
            {/*    </button>*/}
            {/*    /!*{!collapsed && <PaymentTable monthlyPayments={calculateMortgage}/>}*!/*/}
            {/*    /!*<PaymentGraph yearPayments={yearPayments} yearPay={yearPay}/>*!/*/}
            {/*</div>*/}
            {/*<Charts calculatedMortgage={dataCalculateMortgage}/>*/}
            {/*<div>*/}
            {/*    <div>*/}
            {/*        <LineChart*/}
            {/*            width={600}*/}
            {/*            height={300}*/}
            {/*            data={chartData}*/}
            {/*            margin={{*/}
            {/*                top: 15,*/}
            {/*                right: 30,*/}
            {/*                left: 10,*/}
            {/*                bottom: 15,*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            <CartesianGrid stroke='#eee' strokeDasharray='3 3' />*/}
            {/*            <XAxis dataKey='xAxis' />*/}
            {/*            <YAxis />*/}
            {/*            <Tooltip />*/}
            {/*            <Legend />*/}
            {/*            <Line*/}
            {/*                type='monotone'*/}
            {/*                dataKey='remain'*/}
            {/*                activeDot={{ r: 8 }}*/}
            {/*            />*/}
            {/*        </LineChart>*/}
            {/*        <LineChart*/}
            {/*            width={600}*/}
            {/*            height={300}*/}
            {/*            data={chartData}*/}
            {/*            margin={{*/}
            {/*                top: 15,*/}
            {/*                right: 30,*/}
            {/*                left: 10,*/}
            {/*                bottom: 15,*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            <CartesianGrid stroke='#eee' strokeDasharray='3 3' />*/}
            {/*            <XAxis dataKey='xAxis' />*/}
            {/*            <YAxis />*/}
            {/*            <Tooltip />*/}
            {/*            <Legend />*/}
            {/*            <Line*/}
            {/*                type='monotone'*/}
            {/*                dataKey='interestPaid'*/}
            {/*                strokeWidth={1}*/}
            {/*                activeDot={{ r: 8 }}*/}
            {/*            />*/}
            {/*            <Line*/}
            {/*                type='monotone'*/}
            {/*                dataKey='principalPaid'*/}
            {/*                strokeWidth={1}*/}
            {/*                activeDot={{ r: 8 }}*/}
            {/*            />*/}
            {/*        </LineChart>*/}
            {/*    </div>*/}
            {/*    )*/}
            {/*</div>*/}
        </div>
    );
};

