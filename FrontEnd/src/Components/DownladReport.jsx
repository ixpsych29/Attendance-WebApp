import convertArrayToCSV from "convert-array-to-csv";

const DownloadCSVReport = async (reportData) => {
  //formatting date & time
  const formatDateTime = (date) => {
    const time = new Date(date);
    //format date
    const formattedDate = time.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });

    //format Time
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    const formattedTime = `${hours}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;
    return { formattedDate, formattedTime };
  };
  try {
    // Extract relevant data for CSV
    const csvData = reportData.map((record) => {
      return {
        username: record.username,
        date: formatDateTime(record.date).formattedDate,
        entranceTime: formatDateTime(record.entranceTime).formattedTime,
        leavingTime: formatDateTime(record.leavingTime).formattedTime,
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
