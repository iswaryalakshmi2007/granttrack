const API_URL = "http://localhost:8081/api/applications";


// Selected application ID

let selectedApplicationId = null;


// =====================================
// LOAD APPLICATIONS
// =====================================

async function loadApplications() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {

            throw new Error("Failed to load applications");

        }

        const applicationList = await response.json();

        const table =
            document.getElementById("applicationTable");

        table.innerHTML = "";

        selectedApplicationId = null;


        applicationList.forEach(application => {

            const row = document.createElement("tr");


            const facultyId =
                application.faculty
                    ? application.faculty.id
                    : "-";


            row.innerHTML = `

                <td>${application.id}</td>

                <td>${facultyId}</td>

                <td>${application.title || "-"}</td>

                <td>₹ ${application.requestedAmount || 0}</td>

                <td>₹ ${application.approvedAmount || 0}</td>

                <td>${application.status || "-"}</td>

                <td>${application.submissionDate || "-"}</td>

                <td>${application.utilizationDeadline || "-"}</td>

            `;


            // Make row clickable

            row.style.cursor = "pointer";


            row.addEventListener("click", function () {

                selectApplication(
                    application.id,
                    row
                );

            });


            table.appendChild(row);

        });


        document.getElementById(
            "selectionMessage"
        ).innerText =
            "Click an application row to select it.";

    }

    catch (error) {

        console.error(error);

        document.getElementById(
            "selectionMessage"
        ).innerText =
            "Failed to load applications.";

    }

}


// =====================================
// SELECT APPLICATION
// =====================================

function selectApplication(id, row) {

    selectedApplicationId = id;


    // Remove previous selection

    const rows =
        document.querySelectorAll(
            "#applicationTable tr"
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
        "Selected Application ID: " + id;

}


// =====================================
// ADD / UPDATE APPLICATION
// =====================================

document.getElementById(
    "applicationForm"
).addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        // ID used during UPDATE

        const editId =
            this.dataset.editId;


        // =================================
        // GET APPLICATION ID
        // =================================

        const applicationId =
            parseInt(
                document.getElementById("id").value
            );


        // =================================
        // GET FACULTY ID
        // =================================

        const facultyId =
            parseInt(
                document.getElementById("facultyId").value
            );


        // =================================
        // CREATE APPLICATION OBJECT
        // =================================

        const application = {

            id: applicationId,


            title:
            document.getElementById(
                "title"
            ).value,


            requestedAmount:
                parseFloat(
                    document.getElementById(
                        "requestedAmount"
                    ).value
                ),


            approvedAmount:
                parseFloat(
                    document.getElementById(
                        "approvedAmount"
                    ).value
                ) || 0,


            abstractText:
            document.getElementById(
                "abstractText"
            ).value,


            status:
            document.getElementById(
                "status"
            ).value,


            submissionDate:
                document.getElementById(
                    "submissionDate"
                ).value || null,


            utilizationDeadline:
                document.getElementById(
                    "utilizationDeadline"
                ).value || null,


            faculty: {

                id: facultyId

            }

        };


        try {

            let response;


            // =================================
            // UPDATE APPLICATION
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
                                application
                            )

                    }
                );

            }


                // =================================
                // ADD APPLICATION
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
                                application
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
                        "Application updated successfully!";

                }

                else {

                    document.getElementById(
                        "message"
                    ).innerText =
                        "Application added successfully!";

                }


                // Clear form

                this.reset();


                // Remove edit ID

                delete this.dataset.editId;


                // Change button

                document.getElementById(
                    "submitButton"
                ).innerText =
                    "Add Application";


                // Clear selected application

                selectedApplicationId = null;


                // Reload table

                loadApplications();

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
// UPDATE SELECTED APPLICATION
// =====================================

async function updateSelectedApplication() {


    if (selectedApplicationId === null) {

        alert(
            "Please select an application first."
        );

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/${selectedApplicationId}`
            );


        if (!response.ok) {

            throw new Error(
                "Application not found"
            );

        }


        const application =
            await response.json();


        // =================================
        // APPLICATION ID
        // =================================

        document.getElementById(
            "id"
        ).value =
            application.id;


        // =================================
        // FACULTY ID
        // =================================

        document.getElementById(
            "facultyId"
        ).value =
            application.faculty
                ? application.faculty.id
                : "";


        // =================================
        // TITLE
        // =================================

        document.getElementById(
            "title"
        ).value =
            application.title || "";


        // =================================
        // REQUESTED AMOUNT
        // =================================

        document.getElementById(
            "requestedAmount"
        ).value =
            application.requestedAmount || "";


        // =================================
        // APPROVED AMOUNT
        // =================================

        document.getElementById(
            "approvedAmount"
        ).value =
            application.approvedAmount || 0;


        // =================================
        // ABSTRACT
        // =================================

        document.getElementById(
            "abstractText"
        ).value =
            application.abstractText || "";


        // =================================
        // STATUS
        // =================================

        document.getElementById(
            "status"
        ).value =
            application.status || "SUBMITTED";


        // =================================
        // SUBMISSION DATE
        // =================================

        document.getElementById(
            "submissionDate"
        ).value =
            application.submissionDate || "";


        // =================================
        // UTILIZATION DEADLINE
        // =================================

        document.getElementById(
            "utilizationDeadline"
        ).value =
            application.utilizationDeadline || "";


        // =================================
        // STORE ID FOR UPDATE
        // =================================

        document.getElementById(
            "applicationForm"
        ).dataset.editId =
            selectedApplicationId;


        // =================================
        // CHANGE BUTTON
        // =================================

        document.getElementById(
            "submitButton"
        ).innerText =
            "Update Application";


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
            "Edit the details and click Update Application.";

    }

    catch (error) {

        console.error(error);

        alert(
            "Failed to load application details."
        );

    }

}


// =====================================
// DELETE SELECTED APPLICATION
// =====================================

async function deleteSelectedApplication() {


    if (selectedApplicationId === null) {

        alert(
            "Please select an application first."
        );

        return;

    }


    const confirmDelete =
        confirm(
            "Are you sure you want to delete Application ID " +
            selectedApplicationId +
            "?"
        );


    if (!confirmDelete) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/${selectedApplicationId}`,
                {

                    method: "DELETE"

                }
            );


        if (response.ok) {

            document.getElementById(
                "message"
            ).innerText =
                "Application deleted successfully!";


            selectedApplicationId = null;


            loadApplications();

        }

        else {

            const data =
                await response.json();


            document.getElementById(
                "message"
            ).innerText =
                data.error ||
                "Failed to delete application.";

        }

    }

    catch (error) {

        console.error(error);


        document.getElementById(
            "message"
        ).innerText =
            "Server error while deleting application.";

    }

}


// =====================================
// INITIAL LOAD
// =====================================

loadApplications();