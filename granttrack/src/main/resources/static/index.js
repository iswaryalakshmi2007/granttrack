const MONITORING_API =
    "http://localhost:8081/api/grant-monitoring";


async function loadGrantMonitoring() {

    const applicationId =
        document.getElementById("monitoringApplicationId").value;

    const message =
        document.getElementById("monitoringMessage");

    if (!applicationId) {
        message.innerText =
            "Please enter an Application ID.";

        return;
    }

    try {

        message.innerText = "Loading...";

        const response = await fetch(
            `${MONITORING_API}/${applicationId}`
        );

        if (!response.ok) {

            const errorData = await response.json();

            throw new Error(
                errorData.error || "Application not found"
            );
        }

        const data = await response.json();

        // Application
        document.getElementById("monitoringTitle").innerText =
            data.title || "-";

        document.getElementById("monitoringStatus").innerText =
            data.status || "-";


        // Money values
        document.getElementById("approvedAmount").innerText =
            "₹ " + Number(data.approvedAmount || 0).toLocaleString("en-IN");

        document.getElementById("totalExpenditure").innerText =
            "₹ " + Number(data.totalExpenditure || 0).toLocaleString("en-IN");

        document.getElementById("remainingAmount").innerText =
            "₹ " + Number(data.remainingAmount || 0).toLocaleString("en-IN");


        // Utilization
        document.getElementById("utilizationPercentage").innerText =
            (data.utilizationPercentage || 0) + "%";

        document.getElementById("budgetStatus").innerText =
            data.budgetStatus || "-";


        // Deadline
        document.getElementById("utilizationDeadline").innerText =
            data.utilizationDeadline || "-";

        document.getElementById("deadlineStatus").innerText =
            data.deadlineStatus || "-";


        message.innerText =
            "Grant monitoring details loaded successfully.";

    } catch (error) {

        console.error(error);

        message.innerText =
            error.message || "Failed to load grant monitoring.";
    }
}