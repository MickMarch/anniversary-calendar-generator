console.log("Working");

// Variable Creations
const columnAHeader = 'Event Type'
const columnBHeader = 'Subject Name'
const columnCHeader = 'Est. Date'
const eventDropdownOptions = ["Birthday", "Anniversary"];
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();
const currentDay = currentDate.getDay();

var indexCounter = 1;

function createRow(table) {
    let colAID = `event-dropdown-0${indexCounter}`
    let colBID = `subject-name-field-0${indexCounter}`
    let colCID = `calendar-0${indexCounter}`
    let row = table.insertRow(indexCounter);
    let eventCell = row.insertCell(0);
    let subjectCell = row.insertCell(1);
    let dateCell = row.insertCell(2);

    let eventDropdown = document.createElement('select');
    eventDropdown.id = colAID;
    for (var i = 0; i < eventDropdownOptions.length; i++) {
        var option = document.createElement('option');
        option.text = eventDropdownOptions[i];
        eventDropdown.appendChild(option)
    };

    let subjectInput = document.createElement('input');
    subjectInput.id = colBID
    subjectInput.type = 'type';
    subjectInput.placeholder = 'Enter Event Subject';

    let calendarContainer = document.createElement('div');
    calendarContainer.id = colCID
    // calendarContainer.type = 'text';
    console.log('hi')
    let calendar = jSuites.calendar(calendarContainer, {
        format: 'YYYY/MM/DD'
    })

    // document.addEventListener('DOMContentLoaded', function () {
    //     let calendar = jSuites.calendar(calendarContainer, {
    //         format: 'YYYY/MM/DD'
    //     })
    // })

    dateCell.appendChild(calendarContainer)
    eventCell.appendChild(eventDropdown)
    subjectCell.appendChild(subjectInput)

    indexCounter++
}


document.addEventListener("DOMContentLoaded", function () {
    const tableContainer = document.getElementById("table-container");
    const table = document.createElement("table");
    table.id = "events-table";
    const tableHeaders = document.createElement("thead");
    tableHeaders.id = 'events-table-headers';
    tableHeaders.innerHTML = `
        <tr>
            <th>${columnAHeader}</th>
            <th>${columnBHeader}</th>
            <th>${columnCHeader}</th>
        </tr>
    `;
    tableContainer.appendChild(table)
    table.appendChild(tableHeaders)
    createRow(table)




})

