const API_URL = "http://localhost:8081/api/faculties";


// Store selected faculty ID
let selectedFacultyId = null;


// ===============================
// LOAD FACULTY
// ===============================

async function loadFaculty() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {

            throw new Error("Failed to load faculty");

        }

        const facultyList = await response.json();

        const table = document.getElementById("facultyTable");

        table.innerHTML = "";

        selectedFacultyId = null;


        facultyList.forEach(faculty => {

            const row = document.createElement("tr");


            row.innerHTML = `

                <td>${faculty.id}</td>

                <td>${faculty.name}</td>

                <td>${faculty.email}</td>

                <td>${faculty.department}</td>

            `;


            // Make row clickable

            row.style.cursor = "pointer";


            row.addEventListener("click", function () {

                selectFaculty(faculty.id, row);

            });


            table.appendChild(row);

        });


        document.getElementById("selectionMessage").innerText =
            "Click a faculty row to select it.";

    }

    catch (error) {

        console.error(error);

        document.getElementById("selectionMessage").innerText =
            "Failed to load faculty.";

    }

}


// ===============================
// SELECT FACULTY
// ===============================

function selectFaculty(id, row) {

    selectedFacultyId = id;


    // Remove selection from all rows

    const rows =
        document.querySelectorAll("#facultyTable tr");


    rows.forEach(r => {

        r.classList.remove("selected-row");

    });


    // Highlight selected row

    row.classList.add("selected-row");


    document.getElementById("selectionMessage").innerText =
        "Selected Faculty ID: " + id;

}


// ===============================
// ADD / UPDATE FACULTY
// ===============================

document.getElementById("facultyForm")
    .addEventListener("submit", async function (event) {

        event.preventDefault();


        // ID used only when updating

        const editId = this.dataset.editId;


        // Get user-entered Faculty ID

        const facultyId =
            parseInt(
                document.getElementById("id").value
            );


        // Create faculty object

        const faculty = {

            id: facultyId,

            name:
            document.getElementById("name").value,

            email:
            document.getElementById("email").value,

            department:
            document.getElementById("department").value

        };


        try {

            let response;


            // ===============================
            // UPDATE
            // ===============================

            if (editId) {

                response = await fetch(
                    `${API_URL}/${editId}`,
                    {

                        method: "PUT",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(faculty)

                    }
                );

            }


                // ===============================
                // ADD
            // ===============================

            else {

                response = await fetch(
                    API_URL,
                    {

                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(faculty)

                    }
                );

            }


            // ===============================
            // SUCCESS
            // ===============================

            if (response.ok) {


                if (editId) {

                    document.getElementById("message").innerText =
                        "Faculty updated successfully!";

                }

                else {

                    document.getElementById("message").innerText =
                        "Faculty added successfully!";

                }


                // Clear form

                this.reset();


                // Remove edit ID

                delete this.dataset.editId;


                // Change button back

                document.getElementById("submitButton").innerText =
                    "Add Faculty";


                // Clear selected faculty

                selectedFacultyId = null;


                // Reload table

                loadFaculty();

            }


                // ===============================
                // ERROR
            // ===============================

            else {

                const data = await response.json();


                document.getElementById("message").innerText =
                    data.error || "Operation failed.";

            }

        }

        catch (error) {

            console.error(error);


            document.getElementById("message").innerText =
                "Server error.";

        }

    });


// ===============================
// UPDATE SELECTED FACULTY
// ===============================

async function updateSelectedFaculty() {


    if (selectedFacultyId === null) {

        alert("Please select a faculty first.");

        return;

    }


    try {

        const response = await fetch(
            `${API_URL}/${selectedFacultyId}`
        );


        if (!response.ok) {

            throw new Error("Faculty not found");

        }


        const faculty = await response.json();


        // Put Faculty ID into form

        document.getElementById("id").value =
            faculty.id;


        // Put faculty name into form

        document.getElementById("name").value =
            faculty.name;


        // Put email into form

        document.getElementById("email").value =
            faculty.email;


        // Put department into form

        document.getElementById("department").value =
            faculty.department;


        // Store ID for update

        document.getElementById("facultyForm")
            .dataset.editId = selectedFacultyId;


        // Change button text

        document.getElementById("submitButton").innerText =
            "Update Faculty";


        // Scroll to form

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });


        document.getElementById("message").innerText =
            "Edit the details and click Update Faculty.";

    }

    catch (error) {

        console.error(error);

        alert("Failed to load faculty details.");

    }

}


// ===============================
// DELETE SELECTED FACULTY
// ===============================

async function deleteSelectedFaculty() {


    if (selectedFacultyId === null) {

        alert("Please select a faculty first.");

        return;

    }


    const confirmDelete = confirm(
        "Are you sure you want to delete Faculty ID " +
        selectedFacultyId +
        "?"
    );


    if (!confirmDelete) {

        return;

    }


    try {

        const response = await fetch(
            `${API_URL}/${selectedFacultyId}`,
            {
                method: "DELETE"
            }
        );


        if (response.ok) {

            document.getElementById("message").innerText =
                "Faculty deleted successfully!";


            selectedFacultyId = null;


            loadFaculty();

        }

        else {

            const data = await response.json();


            document.getElementById("message").innerText =
                data.error || "Failed to delete faculty.";

        }

    }

    catch (error) {

        console.error(error);


        document.getElementById("message").innerText =
            "Server error while deleting faculty.";

    }

}


// ===============================
// INITIAL LOAD
// ===============================

loadFaculty();