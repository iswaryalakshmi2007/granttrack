const API_URL = "http://localhost:8081/api/stages";


// Selected stage ID

let selectedStageId = null;


// =====================================
// LOAD STAGES
// =====================================

async function loadStages() {

    try {

        const response = await fetch(API_URL);


        if (!response.ok) {

            throw new Error("Failed to load stages");

        }


        const stageList = await response.json();


        const table =
            document.getElementById("stageTable");


        table.innerHTML = "";


        selectedStageId = null;


        stageList.forEach(stage => {


            const row =
                document.createElement("tr");


            const applicationId =
                stage.application
                    ? stage.application.id
                    : "-";


            row.innerHTML = `

                <td>${stage.id}</td>

                <td>${applicationId}</td>

                <td>${stage.stageName || "-"}</td>

                <td>${stage.remarks || "-"}</td>

                <td>${stage.stageDate || "-"}</td>

            `;


            // Make row clickable

            row.style.cursor = "pointer";


            row.addEventListener(
                "click",
                function () {

                    selectStage(
                        stage.id,
                        row
                    );

                }
            );


            table.appendChild(row);

        });


        document.getElementById(
            "selectionMessage"
        ).innerText =
            "Click a stage row to select it.";

    }


    catch (error) {

        console.error(error);


        document.getElementById(
            "selectionMessage"
        ).innerText =
            "Failed to load stages.";

    }

}


// =====================================
// SELECT STAGE
// =====================================

function selectStage(id, row) {


    selectedStageId = id;


    // Remove previous selection

    const rows =
        document.querySelectorAll(
            "#stageTable tr"
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
        "Selected Stage ID: " + id;

}


// =====================================
// ADD / UPDATE STAGE
// =====================================

document.getElementById(
    "stageForm"
).addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        // ID used during UPDATE

        const editId =
            this.dataset.editId;


        // =================================
        // GET STAGE ID
        // =================================

        const stageId =
            parseInt(
                document.getElementById("id").value
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
        // CREATE STAGE OBJECT
        // =================================

        const stage = {

            id: stageId,


            stageName:
            document.getElementById(
                "stageName"
            ).value,


            remarks:
            document.getElementById(
                "remarks"
            ).value,


            stageDate:
                document.getElementById(
                    "stageDate"
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
                            JSON.stringify(stage)

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
                            JSON.stringify(stage)

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
                        "Stage updated successfully!";

                }

                else {

                    document.getElementById(
                        "message"
                    ).innerText =
                        "Stage added successfully!";

                }


                // Clear form

                this.reset();


                // Remove edit ID

                delete this.dataset.editId;


                // Change button

                document.getElementById(
                    "submitButton"
                ).innerText =
                    "Add Stage";


                // Clear selected stage

                selectedStageId = null;


                // Reload table

                loadStages();

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
// UPDATE SELECTED STAGE
// =====================================

async function updateSelectedStage() {


    if (selectedStageId === null) {

        alert(
            "Please select a stage first."
        );

        return;

    }


    try {


        const response =
            await fetch(
                `${API_URL}/${selectedStageId}`
            );


        if (!response.ok) {

            throw new Error(
                "Stage not found"
            );

        }


        const stage =
            await response.json();


        // =================================
        // STAGE ID
        // =================================

        document.getElementById(
            "id"
        ).value =
            stage.id;


        // =================================
        // APPLICATION ID
        // =================================

        document.getElementById(
            "applicationId"
        ).value =
            stage.application
                ? stage.application.id
                : "";


        // =================================
        // STAGE NAME
        // =================================

        document.getElementById(
            "stageName"
        ).value =
            stage.stageName || "";


        // =================================
        // REMARKS
        // =================================

        document.getElementById(
            "remarks"
        ).value =
            stage.remarks || "";


        // =================================
        // STAGE DATE
        // =================================

        document.getElementById(
            "stageDate"
        ).value =
            stage.stageDate || "";


        // =================================
        // STORE ID FOR UPDATE
        // =================================

        document.getElementById(
            "stageForm"
        ).dataset.editId =
            selectedStageId;


        // =================================
        // CHANGE BUTTON
        // =================================

        document.getElementById(
            "submitButton"
        ).innerText =
            "Update Stage";


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
            "Edit the details and click Update Stage.";

    }


    catch (error) {

        console.error(error);


        alert(
            "Failed to load stage details."
        );

    }

}


// =====================================
// DELETE SELECTED STAGE
// =====================================

async function deleteSelectedStage() {


    if (selectedStageId === null) {

        alert(
            "Please select a stage first."
        );

        return;

    }


    const confirmDelete =
        confirm(
            "Are you sure you want to delete Stage ID " +
            selectedStageId +
            "?"
        );


    if (!confirmDelete) {

        return;

    }


    try {


        const response =
            await fetch(
                `${API_URL}/${selectedStageId}`,
                {

                    method: "DELETE"

                }
            );


        if (response.ok) {


            document.getElementById(
                "message"
            ).innerText =
                "Stage deleted successfully!";


            selectedStageId = null;


            loadStages();

        }


        else {


            const data =
                await response.json();


            document.getElementById(
                "message"
            ).innerText =
                data.error ||
                "Failed to delete stage.";

        }

    }


    catch (error) {

        console.error(error);


        document.getElementById(
            "message"
        ).innerText =
            "Server error while deleting stage.";

    }

}


// =====================================
// INITIAL LOAD
// =====================================

loadStages();