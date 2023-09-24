console.log("Working");

// Variable Creations
const columnAHeader = 'Event Type'
const columnBHeader = 'Subject Name'
const columnCHeader = 'Est. Date'
const columnDHeader = 'Preview'
const eventDropdownOptions = ["Birthday", "Anniversary"];
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();
const currentDay = currentDate.getDay();
const buttonID = "new-row-button"

var indexCounter = 1;

function generateResult(eventType, subjectName, dateValue) {
    if (!subjectName || !dateValue) {
        return 'Please enter Subject and Date field'
    }
    else if (eventType === "Birthday") {
        return `${subjectName}'s ${eventType} - ${dateValue}`
    }
    else if (eventType === "Anniversary") {
        return `${subjectName} ${eventType} - ${dateValue}`
    }
}

// Function that creates rows
function createRow(table) {
    let colAID = `event-dropdown-0${indexCounter}`
    let colBID = `subject-name-field-0${indexCounter}`
    let colCID = `calendar-0${indexCounter}`
    let colDID = `preview-0${indexCounter}`
    let row = table.insertRow(indexCounter);
    let eventCell = row.insertCell(0);
    let subjectCell = row.insertCell(1);
    let dateCell = row.insertCell(2);
    let previewCell = row.insertCell(3)

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
    // calendarContainer.id = colCID
    let calendarInput = document.createElement('input')
    calendarInput.id = colCID
    calendarInput.type = 'text';
    calendarContainer.appendChild(calendarInput)
    let calendar = jSuites.calendar(calendarInput, {
        format: 'YYYY/MM/DD'
    })

    let previewItem = document.createElement("plaintext")
    previewItem.id = colDID

    row.addEventListener("change", function () {
        let date = calendar.getValue()
        let dateValue = date.toString().slice(0, 10)
        previewItem.textContent = generateResult(
            eventDropdown.value,
            subjectInput.value,
            dateValue
        )
    })
    calendarContainer.addEventListener("click", function () {
        let date = calendar.getValue()
        let dateValue = date.toString().slice(0, 10)
        previewItem.textContent = generateResult(
            eventDropdown.value,
            subjectInput.value,
            dateValue
        )
    })

    dateCell.appendChild(calendarContainer)
    eventCell.appendChild(eventDropdown)
    subjectCell.appendChild(subjectInput)
    previewCell.appendChild(previewItem)

    indexCounter = indexCounter + 1
}


document.addEventListener("DOMContentLoaded", function () {
    const tableContainer = document.getElementById("table-container");
    const table = document.createElement("table");
    table.id = "events-table";
    const tableHeaders = document.createElement("thead");
    const tableBody = document.createElement("tbody");
    tableHeaders.id = 'events-table-headers';
    tableHeaders.innerHTML = `
        <tr>
            <th>${columnAHeader}</th>
            <th>${columnBHeader}</th>
            <th>${columnCHeader}</th>
            <th>${columnDHeader}</th>
        </tr>
    `;
    tableContainer.appendChild(table)
    table.appendChild(tableHeaders)
    table.appendChild(tableBody)
    createRow(table)

    const newRowButtonContainer = document.getElementById("new-row-button-container");
    const newRowButton = document.createElement("button");
    newRowButton.id = buttonID;
    newRowButton.textContent = "New Entry";
    newRowButton.addEventListener("click", function () { createRow(table) });
    newRowButtonContainer.appendChild(newRowButton);





})

