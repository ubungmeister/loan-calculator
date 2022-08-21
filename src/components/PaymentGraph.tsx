import React from 'react';
import {Bar, Line } from 'react-chartjs-2';


type graphDataType ={
    labels:Array<any>
    datasets:Array<any>
}
const graphData:graphDataType = {
    labels: [],
    datasets: [{
        label: 'Mortgage Balance',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(0,140,255,0.4)',
        borderColor: 'rgba(0,140,255,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(0,140,255,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(0,140,255,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: []
    },
        {
            label: 'Interest Paid',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(249,31,116,0.4)',
            borderColor: 'rgba(249,31,116,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(249,31,116,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(249,31,116,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
        },
        {
            label: 'Principal Repaid',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
        }
    ]
};
const graphOption = {
    // scales: {
    //     yAxes: [{
    //         ticks: {
    //             callback: function(value, index, values) {
    //                 if (value === 0) {
    //                     return value;
    //                 }
    //                 return '£' + (value / 1000) + 'K';
    //
    //             }
    //         }
    //     }]
    // },
    legend: {
        position: 'bottom'
    },
    // tooltips: {
    //     callbacks: {
    //         label: function(tooltipItems, data, index) {
    //             return parseFloat(tooltipItems.value).toLocaleString('en-GB', {style:'currency', currency:'GBP'}) + ' ' + data.datasets[tooltipItems.datasetIndex].label;
    //         }
    //     }
    // }
}

type barGraphDataType ={
    datasets:any
    labels:any
}
const barGraphData:barGraphDataType = {
    datasets: [{
        label: 'Principal Repaid',
        backgroundColor: 'rgba(75,192,192,0.4)',
        data: []
    },
        {
            label: 'Interest Paid',
            backgroundColor: 'rgba(249,31,116,0.4)',
            data: []
        }],
    labels: []
}

export type PaymentTableType = {
    year: number
    outstandingBalance: number
    interestPaid: number
    interestPaidToDate: number
    principalRepaid: number
    principalRepaidToDate :number
}

export type PropsType = {
    yearPayments: PaymentTableType[]
    yearPay:number
}

export const PaymentGraph =(props:PropsType)=> {
    graphData.labels = [];
    graphData.datasets[0].data = [];
    graphData.datasets[1].data = [];
    graphData.datasets[2].data = [];
    barGraphData.labels = [];
    barGraphData.datasets[0].data = [];
    barGraphData.datasets[1].data = [];
    for(let i = 0; i <= props.yearPay; i++) {
        graphData.labels.push(i);
        graphData.datasets[0].data.push(props.yearPayments[i].outstandingBalance);
        graphData.datasets[1].data.push(props.yearPayments[i].interestPaidToDate);
        graphData.datasets[2].data.push(props.yearPayments[i].principalRepaidToDate);
        if (i > 0) { //Stops year 0 with no money paid from appearing on bar chart
            barGraphData.labels.push(i);
            barGraphData.datasets[0].data.push(props.yearPayments[i].principalRepaid);
            barGraphData.datasets[1].data.push(props.yearPayments[i].interestPaid);
        }
    }
    return(
        <div>
            <div className="graph-container">
                <Line
                    data={graphData}
                    // options={graphOption}
                />
            </div>
            <div className="graph-container">
                <Bar
                    data={barGraphData}
                    // options={graphOption}
                />
            </div>
        </div>
    )
}