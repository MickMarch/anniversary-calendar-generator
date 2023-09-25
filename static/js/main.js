console.log("Working");

// Import Dependencies
// import * as ICS from 'ics-js'

// Variable Creations
const eventTypeHeader = 'Event Type';
const subjectNameHeader = 'Subject Name';
const calendarHeader = 'Est. Date';
const previewHeader = 'Calendar Title Preview';
const removeRowHeader = "Remove Row?";
const occurrencesHeader = "# of Occurrences from Today"
const eventDropdownOptions = ["Birthday", "Anniversary"];
const newRowButtonID = "new-row-button";
const exportToICSButtonID = "export-to-ics-button";

var eventData = {}
var rowCounter = 0;
var indexCounter = 0;

function generateResult(eventType, subjectName, dateValue, occValue) {
    if (!subjectName || !dateValue) {
        return 'N/A';
    }
    else if (eventType === "Birthday") {
        return `${subjectName}'s ${eventType} (Age Here) x${occValue}`;
    }
    else if (eventType === "Anniversary") {
        return `${subjectName} ${eventType} (Amt of Years Here) x${occValue}`;
    };
};

function destroyRow(row) {
    let rowIndex = row.rowIndex;
    row.remove()
    --indexCounter
}

// Function that creates rows
function createRow(table) {
    let rowRef = rowCounter
    let eventDataID = `event-${rowRef}`
    eventData[eventDataID] = {}
    let eventTypeID = `event-dropdown-0${rowRef}`
    let subjectNameID = `subject-name-input-0${rowRef}`
    let calendarID = `calendar-0${rowRef}`
    let occDropdownID = `occ-dropdown-0${rowRef}`
    let previewID = `preview-0${rowRef}`
    let deleteButtonID = `delete-button-0${rowRef}`
    let row = table.insertRow(indexCounter);
    let eventCell = row.insertCell(0);
    let subjectCell = row.insertCell(1);
    let dateCell = row.insertCell(2);
    let occCell = row.insertCell(3)
    let previewCell = row.insertCell(4)
    let deleteCell = row.insertCell(5)

    let eventDropdown = document.createElement('select');
    eventDropdown.id = eventTypeID;
    for (var i = 0; i < eventDropdownOptions.length; i++) {
        var option = document.createElement('option');
        option.text = eventDropdownOptions[i];
        eventDropdown.appendChild(option)
    };

    let subjectInput = document.createElement('input');
    subjectInput.id = subjectNameID
    subjectInput.type = 'type';
    subjectInput.placeholder = 'Enter Event Subject';

    let calendarContainer = document.createElement('div');
    calendarContainer.id = `container-${calendarID}`
    let calendarInput = document.createElement('input')
    calendarInput.id = `input-${calendarID}`
    calendarInput.type = 'text';
    calendarContainer.appendChild(calendarInput)
    let calendar = jSuites.calendar(calendarInput, {
        format: 'YYYY/MM/DD'
    })
    calendar.id = calendarID

    let occDropdown = document.createElement('select')
    occDropdown.id = occDropdownID
    for (var i = 1; i <= 100; i++) {
        var option = document.createElement('option');
        option.text = i.toString();
        occDropdown.appendChild(option)
    };
    occDropdown.value = 50

    let previewItem = document.createElement("p")
    previewItem.id = previewID

    row.addEventListener("change", function () {
        let date = calendar.getValue()
        let dateValue = date.toString().slice(0, 10)
        eventData[eventDataID]['date'] = date
        eventData[eventDataID]['eventType'] = eventDropdown.value
        eventData[eventDataID]['subjectName'] = subjectInput.value
        eventData[eventDataID]['occurrences'] = occDropdown.value

        previewItem.textContent = generateResult(
            eventDropdown.value,
            subjectInput.value,
            dateValue,
            occDropdown.value
        )
    })
    calendarContainer.addEventListener("click", function () {
        let date = calendar.getValue()
        let dateValue = date.toString().slice(0, 10)
        eventData[eventDataID]['date'] = date
        eventData[eventDataID]['eventType'] = eventDropdown.value
        eventData[eventDataID]['subjectName'] = subjectInput.value
        eventData[eventDataID]['occurrences'] = occDropdown.value
        previewItem.textContent = generateResult(
            eventDropdown.value,
            subjectInput.value,
            dateValue,
            occDropdown.value
        )
    })

    let deleteButtonContainer = document.createElement("div")
    let deleteButton = document.createElement("button")
    deleteButtonContainer.appendChild(deleteButton)
    deleteButton.id = deleteButtonID
    deleteButton.textContent = "Delete Row!"
    deleteButton.addEventListener("click", function () { destroyRow(row) })

    dateCell.appendChild(calendarContainer)
    eventCell.appendChild(eventDropdown)
    subjectCell.appendChild(subjectInput)
    occCell.appendChild(occDropdown)
    previewCell.appendChild(previewItem)
    deleteCell.appendChild(deleteButtonContainer)

    ++rowCounter
    ++indexCounter
}

function exportToICS(table) {
    alert("TODO - Export to ICS")
    console.log(eventData)
}


document.addEventListener("DOMContentLoaded", function () {
    const tableContainer = document.getElementById("table-container");
    const table = document.createElement("table");
    table.id = "events-table";
    const tableHeaders = document.createElement("thead");
    tableHeaders.id = 'events-table-headers';
    tableHeaders.innerHTML = `
    <tr>
        <th>${eventTypeHeader}</th>
        <th>${subjectNameHeader}</th>
        <th>${calendarHeader}</th>
        <th>${occurrencesHeader}</th>
        <th>${previewHeader}</th>
        <th>${removeRowHeader}</th>
    </tr>
    `;
    const tableBody = document.createElement("tbody");
    tableBody.id = 'events-table-body';
    tableContainer.appendChild(table)
    table.appendChild(tableHeaders)
    table.appendChild(tableBody)
    createRow(tableBody)

    const newRowButtonContainer = document.getElementById("new-row-button-container");
    const newRowButton = document.createElement("button");
    newRowButton.id = newRowButtonID;
    newRowButton.textContent = "New Entry";
    newRowButton.addEventListener("click", function () { createRow(tableBody) });
    newRowButtonContainer.appendChild(newRowButton);

    const exportToICSButtonContainer = document.getElementById("export-to-ics-button-container");
    const exportToICSButton = document.createElement("button");
    exportToICSButton.id = exportToICSButtonID
    exportToICSButton.textContent = "Export Calendar Events";
    exportToICSButton.addEventListener("click", function () { exportToICS(tableBody) })
    exportToICSButtonContainer.appendChild(exportToICSButton)


})

