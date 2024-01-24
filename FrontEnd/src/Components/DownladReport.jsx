import convertArrayToCSV from "convert-array-to-csv";
import FormatDateTime from "./formatDateTime";

const DownloadCSVReport = async (reportData) => {
  try {
    // Extract relevant data for CSV
    const csvData = reportData.map((record) => {
      return {
        username: record.username,
        date: FormatDateTime(record.entranceTime).formattedDate,
        entranceTime: FormatDateTime(record.entranceTime).formattedTime,
        leavingTime: record.leavingTime
          ? FormatDateTime(record.leavingTime).formattedTime
          : null,
      };
    });
    // Convert array to CSV
    const csvContent = convertArrayToCSV(csvData);

    // Create a Blob with the CSV data
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a download link
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "attendance_report.csv";

    // Append the link to the body and trigger the download
    document.body.appendChild(link);
    link.click();

    // Remove the link from the body
    document.body.removeChild(link);

    // Notify user
    alert("CSV report generated successfully!");
  } catch (error) {
    console.error("Error generating CSV report", error);
  }
};

export default DownloadCSVReport;
