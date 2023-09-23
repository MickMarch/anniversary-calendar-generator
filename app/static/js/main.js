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

function createRow(index, table) {
    let row = table.insertRow(index);
    let eventCell = row.insertCell(0);
    let subjectCell = row.insertCell(1);
    let dateCell = row.insertCell(2);

    let dropdown = document.createElement('select');
    dropdown.id = `event-dropdown-0${index}`;
    for (var i = 0; i < eventDropdownOptions.length; i++) {
        var option = document.createElement('option');
        option.text = eventDropdownOptions[i];
    };

    let input = document.createElement('input');
    input.type = 'type';
    input.placeholder = 'Enter Event Subject';
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


})

// document.addEventListener("DOMContentLoaded", function () {
//     const button = document.createElement("button");
//     button.id = "myButton";
//     button.onclick = function () {
//         alert("Button Clicked!");
//     };
//     const container = document.getElementById("hello");
//     console.log(container);
//     container.appendChild(button);

//     // Sample data for the dropdowns


//     // Function to create a table row
//     function createRow(index) {
//         let colAID = `event-dropdown-0${index}`
//         let colBID = `subject-name-field-0${index}`
//         let colCID = `calendar-option-0${index}`
//         const row = document.createElement("tr");
//         row.className = "data-row";
//         row.innerHTML = `
//             <td>
//                 <select id='${colAID}'>
//                     ${eventDropdownOptions.map(option => `<option>${option}</option>`).join('')}
//                 </select>
//             </td>
//             <td>
//                 <input id='${colBID}' type="text" placeholder="Enter text">
//             </td>
//             <td id='${colCID}'>
//                     ${jSuites.calendar(document.getElementById(colCID), {
//             format: 'DD/MM/YYYY'
//         })}
//             </td>
//         `;
//         let calendarContainer = row.createElement('div')
//         calendarContainer.id = colCID

//         return row;
//     }

//     // Function to toggle the visibility of the data rows
//     function toggleRows() {
//         const rows = document.querySelectorAll(".data-row");
//         rows.forEach(row => {
//             row.style.display = row.style.display === "none" ? "table-row" : "none";
//         });
//     }

//     // Create the table
//     const tableContainer = document.getElementById("table-container");
//     const table = document.createElement("table");
//     const tableHeaders = document.createElement("thead");
//     tableHeaders.innerHTML = `
//         <tr>
//             <th onclick="toggleRows()">${columnAHeader}</th>
//             <th>${columnBHeader}</th>
//             <th>${columnCHeader}</th>
//         </tr>
//     `;
//     table.appendChild(tableHeaders);
//     table.appendChild(createRow(1)); // Initially create one row
//     tableContainer.appendChild(table);
// })
