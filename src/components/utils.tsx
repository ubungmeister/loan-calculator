export const handleLoanDataChange = (amountBorrow: number,
                                     interest: number,
                                     yearPay: number,
                                     monthlyRate: number,
                                     inflationRateByMonth: number,
                                     inflationInt:number,) => {
    //Set initial values for loop to calculate monthly figures
    let monthObject = [{
        month: 0,
        outstandingBalance: amountBorrow,
        interestPaid: 0,
        interestPaidToDate: 0,
        principalRepaid: 0,
        principalRepaidToDate: 0,
        outstandingBalanceInflation: 0,
        inflationByMonth: 0,
        propertyValue:0
    }];
    let outstandingBalance = amountBorrow;
    let interestPaidToDate = 0;
    let principalRepaidToDate = 0;
    let outstandingBanalceInflation = 0
    let inflationByMonth = 0
    let propertyValue = amountBorrow

    let inflationCoefficient = 1
    yearPay = yearPay * 12

    //Loop each year of the loan term
    for (let i = 1; i <= yearPay; i++) {

        let monthInterestPaid = outstandingBalance * (interest / 100 / 12)
        let monthPrincipalPaid = monthlyRate - monthInterestPaid
        outstandingBalance = outstandingBalance - monthPrincipalPaid

        // inflation by month decreasing
        outstandingBanalceInflation = outstandingBalance * inflationCoefficient
        inflationByMonth = monthInterestPaid * inflationCoefficient
        inflationCoefficient = inflationCoefficient * (1 + inflationRateByMonth)

        //accumulative monthly interest paid
        interestPaidToDate = interestPaidToDate + monthInterestPaid;

        //accumulative monthly principal
        principalRepaidToDate = principalRepaidToDate + monthPrincipalPaid

        //increased property value tell us how would possibly increase borrowed amount in case we buy a property on this money
        propertyValue = propertyValue +(propertyValue*(inflationInt/100/12))

        //There's always around $10 left at the end which forces the graph to go into minus. This just rounds the last figure off at $0.00.
        if (i === yearPay) {
            outstandingBalance = 0;
        }

        monthObject.push({
            month: i,
            outstandingBalance: parseFloat(outstandingBalance.toFixed(2)),
            interestPaid: parseFloat(monthInterestPaid.toFixed(2)),
            interestPaidToDate: parseFloat(interestPaidToDate.toFixed(2)),
            principalRepaid: parseFloat(monthPrincipalPaid.toFixed(2)),
            principalRepaidToDate: parseFloat(principalRepaidToDate.toFixed(2)),
            outstandingBalanceInflation: parseFloat(outstandingBanalceInflation.toFixed(2)),
            inflationByMonth: parseFloat(inflationByMonth.toFixed(2)),
            propertyValue:propertyValue
        });
    }
    return monthObject
}

