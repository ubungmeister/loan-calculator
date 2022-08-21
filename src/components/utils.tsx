export const mortgageCalculation = (amount: number, interest: number, year: number) => {
    return (amount * (interest / 12 / 100)) / (1 - (1 + interest / 12 / 100) ** -(year * 12))
}


export const handleMortgageDataChange=(amountBorrow:number,interest:number,yearPay:number,monthlyRate:number)=>{
    //Set initial values for loop to calculate yearly figures
    let monthDataObject = [{
        month: 0,
        outstandingBalance: amountBorrow,
        interestPaid: 0,
        interestPaidToDate: 0,
        principalRepaid: 0,
        principalRepaidToDate: 0
    }];
    let outstandingBalance = amountBorrow;
    let interestPaidToDate = 0;
    let principalRepaidToDate = 0;
    yearPay = yearPay*12

    //Loop each year of the mortgage term
    for(let i = 1; i <= yearPay; i++) {

    //monthly interest paid
        const getMonthInterestPaid = (interest:number,outstandingBalance:number)=>{
            return outstandingBalance * interest / 100 / 12
        }
        let monthInterestPaid = getMonthInterestPaid(interest,outstandingBalance)
    //accumulative monthly interest paid
        interestPaidToDate = interestPaidToDate + monthInterestPaid;
    //monthly principal
        const getMonthPrincipalPaid = (monthlyRate:number,monthInterestPaid:number)=>{
            return monthlyRate - monthInterestPaid
        }
        let monthPrincipalPaid = getMonthPrincipalPaid(monthlyRate,monthInterestPaid)
    //accumulative monthly principal
        principalRepaidToDate = principalRepaidToDate + monthPrincipalPaid
    //loan left to pay
        outstandingBalance = outstandingBalance -monthPrincipalPaid

        //There's always around £10 left at the end which forces the fraph to go into minus. This just rounds the last figure off at £0.00.
        if(i === yearPay) {
            outstandingBalance = 0;
        }
        monthDataObject.push({
            month: i,
            outstandingBalance: parseFloat(outstandingBalance.toFixed(2)),
            interestPaid: parseFloat(monthInterestPaid.toFixed(2)),
            interestPaidToDate: parseFloat(interestPaidToDate.toFixed(2)),
            principalRepaid: parseFloat(monthPrincipalPaid.toFixed(2)),
            principalRepaidToDate: parseFloat(principalRepaidToDate.toFixed(2))
        });
    }
    return monthDataObject
}





export const handleMortgageDataChangeGraph = (amountBorrow:number,interest:number,yearPay:number,monthlyRate:number) => {

    //Set initial values for loop to calculate yearly figures
    let yearDataObject = [{
        year: 0,
        outstandingBalance: amountBorrow,
        interestPaid: 0,
        interestPaidToDate: 0,
        principalRepaid: 0,
        principalRepaidToDate: 0
    }];
    let outstandingBalance = amountBorrow;
    let interestPaidToDate = 0;
    let principalRepaidToDate = 0;

    //Loop each year of the mortgage term
    for(let i = 1; i <= yearPay; i++) {

        let monthInterestPaid = 0;
        let interestPaidMonthlyToYearlyIncrementer = 0;
        let monthPrincipalPaid = 0;
        let monthlyPrincipalRepaidToYearlyIncrementer = 0;

        //loop each month of the year as interest is calculated monthly
        for(let j = 0; j < 12; j++) {
            monthInterestPaid = outstandingBalance * interest / 100 / 12;
            interestPaidMonthlyToYearlyIncrementer = interestPaidMonthlyToYearlyIncrementer + monthInterestPaid;
            monthPrincipalPaid = monthlyRate - monthInterestPaid;
            monthlyPrincipalRepaidToYearlyIncrementer = monthlyPrincipalRepaidToYearlyIncrementer + monthPrincipalPaid;
            outstandingBalance = outstandingBalance - monthPrincipalPaid;
        }

        interestPaidToDate = interestPaidToDate + interestPaidMonthlyToYearlyIncrementer;
        principalRepaidToDate = principalRepaidToDate + monthlyPrincipalRepaidToYearlyIncrementer;

        //There's always around £10 left at the end which forces the fraph to go into minus. This just rounds the last figure off at £0.00.
        if(i === yearPay) {
            outstandingBalance = 0;
        }

        yearDataObject.push({
            year: i,
            outstandingBalance: parseFloat(outstandingBalance.toFixed(2)),
            interestPaid: parseFloat(interestPaidMonthlyToYearlyIncrementer.toFixed(2)),
            interestPaidToDate: parseFloat(interestPaidToDate.toFixed(2)),
            principalRepaid: parseFloat(monthlyPrincipalRepaidToYearlyIncrementer.toFixed(2)),
            principalRepaidToDate: parseFloat(principalRepaidToDate.toFixed(2))
        });
    }
    return yearDataObject
}