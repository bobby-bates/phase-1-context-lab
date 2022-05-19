function createEmployeeRecord([firstName, familyName, title, payPerHour]){
    // Array destructuring with the arguments above ^^
    // console.log('~~~this arr: ' + this)
    return {
        // firstName: firstName,
        // familyName: familyName,
        // title: title,
        // payPerHour: payPerHour,
        // timeInEvents: [],
        // timeOutEvents: []

        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrOfArrs){
    // return arrOfArrs.map(arr => createEmployeeRecord(arr))
    // Can be simplified to:
    return arrOfArrs.map(createEmployeeRecord)
}

function createTimeInEvent(timeStamp){
    let newbpRecord = this
    const dateObj = {
        type: 'TimeIn',
        hour: parseInt(timeStamp.substring(11)),
        date: timeStamp.substring(0, 10)
    }
    newbpRecord.timeInEvents.push(dateObj)
    // console.log('~~~'+JSON.stringify(newbpRecord, null, 2))
    // console.log('***'+JSON.stringify(newbpRecord.timeInEvents[0], null, 2))
    return newbpRecord
}

function createTimeOutEvent(timeStamp){
    let newbpRecord = this
    const dateObj = {
        type: 'TimeOut',
        hour: parseInt(timeStamp.substring(11)),
        date: timeStamp.substring(0, 10)
    }
    newbpRecord.timeOutEvents.push(dateObj)
    return newbpRecord
}

function hoursWorkedOnDate(date){
    // console.log('~~~'+JSON.stringify(this, null, 2))
    // console.log(date)
    const timeInIndex = this.timeInEvents.findIndex(obj => obj.date === date)
    const timeOutIndex = this.timeOutEvents.findIndex(obj => obj.date === date)
    let hours = this.timeOutEvents[timeOutIndex].hour - this.timeInEvents[timeInIndex].hour
    hours = parseInt(hours.toString().replace(/([0])+/g, ''))
    return hours
}

function wagesEarnedOnDate(timeStamp){
    return hoursWorkedOnDate.call(this, timeStamp) * this.payPerHour
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(emp => emp.firstName === firstName)

}

function calculatePayroll(empArr){
    console.log(JSON.stringify(empArr, null, 2))
    // console.log(JSON.stringify(empArr[0], null, 2))
    // console.log('~~~'+allWagesFor.call(empArr[0]))

    return empArr.reduce((pVal, cVal) => allWagesFor.call(cVal) + pVal, 0)
}
