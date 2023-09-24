console.log("Working");

// Variable Creations
const columnAHeader = 'Event Type';
const columnBHeader = 'Subject Name';
const columnCHeader = 'Est. Date';
const columnDHeader = 'Calendar Title Preview';
const columnEHeader = "Remove Row?";
const eventDropdownOptions = ["Birthday", "Anniversary"];
const newRowButtonID = "new-row-button";
const exportToICSButtonID = "export-to-ics-button";

var rowCounter = 0;
var indexCounter = 0;

function generateResult(eventType, subjectName, dateValue) {
    if (!subjectName || !dateValue) {
        return 'N/A';
    }
    else if (eventType === "Birthday") {
        return `${subjectName}'s ${eventType} (x Years)`;
    }
    else if (eventType === "Anniversary") {
        return `${subjectName} ${eventType} (x Years)`;
    };
};

function destroyRow(row) {
    let rowIndex = row.rowIndex;
    row.remove()
    --indexCounter
}

// Function that creates rows
function createRow(table) {
    let eventTypeID = `event-dropdown-0${rowCounter}`
    let subjectNameID = `subject-name-field-0${rowCounter}`
    let calendarID = `calendar-0${rowCounter}`
    let previewID = `preview-0${rowCounter}`
    let deleteButtonID = `delete-button-0${rowCounter}`
    let row = table.insertRow(indexCounter);
    let eventCell = row.insertCell(0);
    let subjectCell = row.insertCell(1);
    let dateCell = row.insertCell(2);
    let previewCell = row.insertCell(3)
    let deleteCell = row.insertCell(4)

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

    let previewItem = document.createElement("p")
    previewItem.id = previewID

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

    let deleteButtonContainer = document.createElement("div")
    let deleteButton = document.createElement("button")
    deleteButtonContainer.appendChild(deleteButton)
    deleteButton.id = deleteButtonID
    deleteButton.textContent = "Delete Row!"
    deleteButton.addEventListener("click", function () { destroyRow(row) })

    dateCell.appendChild(calendarContainer)
    eventCell.appendChild(eventDropdown)
    subjectCell.appendChild(subjectInput)
    previewCell.appendChild(previewItem)
    deleteCell.appendChild(deleteButtonContainer)

    ++rowCounter
    ++indexCounter
}

function parseRows() {
    // This will go through each existing row and gather the information into an Object
}

function cleanParsedRows(parsedRows) {
    // This will clean up any empty/incomplete rows. This will also remove any duplicate rows
}

function exportToICS() {
    alert("TODO - Export to ICS")
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
    <th>${columnDHeader}</th>
    <th>${columnEHeader}</th>
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
    exportToICSButton.addEventListener("click", function () { exportToICS() })
    exportToICSButtonContainer.appendChild(exportToICSButton)


})

