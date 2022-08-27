export const handleLoanDataChange=(amountBorrow:number,
                                   interest:number,
                                   yearPay:number,
                                   monthlyRate:number,
                                   inflationMonthlyRate:number)=>{
    //Set initial values for loop to calculate monthly figures
    let monthDataObject = [{
        month: 0,
        outstandingBalance: amountBorrow,
        interestPaid: 0,
        interestPaidToDate: 0,
        principalRepaid: 0,
        principalRepaidToDate: 0,
        outstandingBalanceInflation:0,
        inflationByMonth:0,
        amountBorrow:0
    }];
    let outstandingBalance = amountBorrow;
    let interestPaidToDate = 0;
    let principalRepaidToDate = 0;
    let outstandingBanalceInflation = 0
    let inflationByMonth = 0
    let previousOutstandingBanalceInflation =amountBorrow

    let inflationCoefficient = 1
    yearPay = yearPay*12

    //Loop each year of the mortgage term
    for(let i = 1; i <= yearPay; i++) {
        let u = 0

        // inflation by month decreasing
        inflationCoefficient = inflationCoefficient*(1+inflationMonthlyRate)
        outstandingBanalceInflation = amountBorrow*inflationCoefficient
        inflationByMonth = previousOutstandingBanalceInflation - outstandingBanalceInflation
        previousOutstandingBanalceInflation = outstandingBanalceInflation



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

        //There's always around $10 left at the end which forces the graph to go into minus. This just rounds the last figure off at $0.00.
        if(i === yearPay) {
            outstandingBalance = 0;
        }

        monthDataObject.push({
            month: i,
            outstandingBalance: parseFloat(outstandingBalance.toFixed(2)),
            interestPaid: parseFloat(monthInterestPaid.toFixed(2)),
            interestPaidToDate: parseFloat(interestPaidToDate.toFixed(2)),
            principalRepaid: parseFloat(monthPrincipalPaid.toFixed(2)),
            principalRepaidToDate: parseFloat(principalRepaidToDate.toFixed(2)),
            outstandingBalanceInflation: parseFloat(outstandingBanalceInflation.toFixed(2)),
            inflationByMonth:parseFloat(inflationByMonth.toFixed(2)),
            amountBorrow:amountBorrow
        });
    }
    return monthDataObject


}
