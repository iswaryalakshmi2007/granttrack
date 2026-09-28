const API_URL = "http://localhost:8081/api/expenditures";


// Selected expenditure ID

let selectedExpenditureId = null;


// =====================================
// LOAD EXPENDITURES
// =====================================

async function loadExpenditures() {

    try {

        const response = await fetch(API_URL);


        if (!response.ok) {

            throw new Error(
                "Failed to load expenditures"
            );

        }


        const expenditureList =
            await response.json();


        const table =
            document.getElementById(
                "expenditureTable"
            );


        table.innerHTML = "";


        selectedExpenditureId = null;


        expenditureList.forEach(expenditure => {


            const row =
                document.createElement("tr");


            const applicationId =
                expenditure.application
                    ? expenditure.application.id
                    : "-";


            row.innerHTML = `

                <td>${expenditure.id}</td>

                <td>${applicationId}</td>

                <td>${expenditure.description || "-"}</td>

                <td>₹ ${expenditure.amount || 0}</td>

                <td>${expenditure.expenseDate || "-"}</td>

            `;


            // Make row clickable

            row.style.cursor = "pointer";


            row.addEventListener(
                "click",
                function () {

                    selectExpenditure(
                        expenditure.id,
                        row
                    );

                }
            );


            table.appendChild(row);

        });


        document.getElementById(
            "selectionMessage"
        ).innerText =
            "Click an expenditure row to select it.";

    }


    catch (error) {

        console.error(error);


        document.getElementById(
            "selectionMessage"
        ).innerText =
            "Failed to load expenditures.";

    }

}


// =====================================
// SELECT EXPENDITURE
// =====================================

function selectExpenditure(id, row) {


    selectedExpenditureId = id;


    // Remove previous selection

    const rows =
        document.querySelectorAll(
            "#expenditureTable tr"
        );


    rows.forEach(r => {

        r.classList.remove(
            "selected-row"
        );

    });


    // Highlight selected row

    row.classList.add(
        "selected-row"
    );


    document.getElementById(
        "selectionMessage"
    ).innerText =
        "Selected Expenditure ID: " + id;

}


// =====================================
// ADD / UPDATE EXPENDITURE
// =====================================

document.getElementById(
    "expenditureForm"
).addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        // ID used during UPDATE

        const editId =
            this.dataset.editId;


        // =================================
        // GET EXPENDITURE ID
        // =================================

        const expenditureId =
            parseInt(
                document.getElementById(
                    "id"
                ).value
            );


        // =================================
        // GET APPLICATION ID
        // =================================

        const applicationId =
            parseInt(
                document.getElementById(
                    "applicationId"
                ).value
            );


        // =================================
        // GET AMOUNT
        // =================================

        const amount =
            parseFloat(
                document.getElementById(
                    "amount"
                ).value
            );


        // =================================
        // CREATE EXPENDITURE OBJECT
        // =================================

        const expenditure = {

            id: expenditureId,


            description:
            document.getElementById(
                "description"
            ).value,


            amount: amount,


            expenseDate:
                document.getElementById(
                    "expenseDate"
                ).value || null,


            application: {

                id: applicationId

            }

        };


        try {

            let response;


            // =================================
            // UPDATE
            // =================================

            if (editId) {


                response = await fetch(
                    `${API_URL}/${editId}`,
                    {

                        method: "PUT",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify(
                                expenditure
                            )

                    }
                );

            }


                // =================================
                // ADD
            // =================================

            else {


                response = await fetch(
                    API_URL,
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify(
                                expenditure
                            )

                    }
                );

            }


            // =================================
            // SUCCESS
            // =================================

            if (response.ok) {


                if (editId) {

                    document.getElementById(
                        "message"
                    ).innerText =
                        "Expenditure updated successfully!";

                }

                else {

                    document.getElementById(
                        "message"
                    ).innerText =
                        "Expenditure added successfully!";

                }


                // Clear form

                this.reset();


                // Remove edit ID

                delete this.dataset.editId;


                // Change button

                document.getElementById(
                    "submitButton"
                ).innerText =
                    "Add Expenditure";


                // Clear selected expenditure

                selectedExpenditureId = null;


                // Reload table

                loadExpenditures();

            }


                // =================================
                // ERROR
            // =================================

            else {


                const data =
                    await response.json();


                document.getElementById(
                    "message"
                ).innerText =
                    data.error ||
                    "Operation failed.";

            }

        }


        catch (error) {

            console.error(error);


            document.getElementById(
                "message"
            ).innerText =
                "Server error.";

        }

    }
);


// =====================================
// UPDATE SELECTED EXPENDITURE
// =====================================

async function updateSelectedExpenditure() {


    if (selectedExpenditureId === null) {

        alert(
            "Please select an expenditure first."
        );

        return;

    }


    try {


        const response =
            await fetch(
                `${API_URL}/${selectedExpenditureId}`
            );


        if (!response.ok) {

            throw new Error(
                "Expenditure not found"
            );

        }


        const expenditure =
            await response.json();


        // =================================
        // EXPENDITURE ID
        // =================================

        document.getElementById(
            "id"
        ).value =
            expenditure.id;


        // =================================
        // APPLICATION ID
        // =================================

        document.getElementById(
            "applicationId"
        ).value =
            expenditure.application
                ? expenditure.application.id
                : "";


        // =================================
        // DESCRIPTION
        // =================================

        document.getElementById(
            "description"
        ).value =
            expenditure.description || "";


        // =================================
        // AMOUNT
        // =================================

        document.getElementById(
            "amount"
        ).value =
            expenditure.amount || "";


        // =================================
        // EXPENSE DATE
        // =================================

        document.getElementById(
            "expenseDate"
        ).value =
            expenditure.expenseDate || "";


        // =================================
        // STORE ID FOR UPDATE
        // =================================

        document.getElementById(
            "expenditureForm"
        ).dataset.editId =
            selectedExpenditureId;


        // =================================
        // CHANGE BUTTON
        // =================================

        document.getElementById(
            "submitButton"
        ).innerText =
            "Update Expenditure";


        // =================================
        // SCROLL TO FORM
        // =================================

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });


        document.getElementById(
            "message"
        ).innerText =
            "Edit the details and click Update Expenditure.";

    }


    catch (error) {

        console.error(error);


        alert(
            "Failed to load expenditure details."
        );

    }

}


// =====================================
// DELETE SELECTED EXPENDITURE
// =====================================

async function deleteSelectedExpenditure() {


    if (selectedExpenditureId === null) {

        alert(
            "Please select an expenditure first."
        );

        return;

    }


    const confirmDelete =
        confirm(
            "Are you sure you want to delete Expenditure ID " +
            selectedExpenditureId +
            "?"
        );


    if (!confirmDelete) {

        return;

    }


    try {


        const response =
            await fetch(
                `${API_URL}/${selectedExpenditureId}`,
                {

                    method: "DELETE"

                }
            );


        if (response.ok) {


            document.getElementById(
                "message"
            ).innerText =
                "Expenditure deleted successfully!";


            selectedExpenditureId = null;


            loadExpenditures();

        }


        else {


            const data =
                await response.json();


            document.getElementById(
                "message"
            ).innerText =
                data.error ||
                "Failed to delete expenditure.";

        }

    }


    catch (error) {

        console.error(error);


        document.getElementById(
            "message"
        ).innerText =
            "Server error while deleting expenditure.";

    }

}


// =====================================
// INITIAL LOAD
// =====================================

loadExpenditures();