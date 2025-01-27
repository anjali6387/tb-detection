import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

const ReportGenerator = () => {
  const [results, setResults] = useState(null);

  useEffect(() => {
    const storedResults = localStorage.getItem("diagnosisResults");
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
  }, []);

  const generatePDF = () => {
    if (!results) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Add hospital logo
    doc.addImage("/hospital_logo.jpg", "JPEG", 10, 10, 30, 30);

    // Add title
    doc.setFontSize(22);
    doc.setTextColor(0, 48, 87); // Dark blue color
    doc.text("TB Detection AI Report", pageWidth / 2, 30, { align: "center" });

    // Add patient information
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black color
    doc.text(`Patient Name: ${results.patientInfo.name}`, 20, 50);
    doc.text(`Age: ${results.patientInfo.age}`, 20, 60);
    doc.text(`Gender: ${results.patientInfo.gender}`, 20, 70);

    // Add diagnosis results
    doc.setFontSize(16);
    doc.setTextColor(0, 48, 87); // Dark blue color
    doc.text("Diagnosis Results", 20, 90);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black color
    doc.text(`Diagnosis: ${results.diagnosis}`, 30, 105);
    doc.text(`Confidence: ${(results.confidence * 100).toFixed(2)}%`, 30, 115);

    // Add affected areas
    doc.setFontSize(14);
    doc.setTextColor(0, 48, 87); // Dark blue color
    doc.text("Affected Areas:", 20, 135);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black color
    results.areas.forEach((area, index) => {
      doc.text(`- ${area.label}`, 30, 150 + index * 10);
    });

    // Add X-ray image
    if (results.image) {
      doc.addImage(results.image, "JPEG", 20, 180, 170, 170 * 0.75);
    }

    // Add timestamp
    const timestamp = new Date().toLocaleString();
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128); // Gray color
    doc.text(`Report generated on: ${timestamp}`, 20, pageHeight - 10);

    // Save the PDF
    doc.save("TB_Detection_Report.pdf");
  };

  if (!results) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-blue-800">Report Generator</h2>
        <p>No results available. Please upload an X-ray image first.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-blue-800">Report Generator</h2>
      <p className="mb-4">Generate a detailed PDF report of the diagnosis results.</p>
      <button
        onClick={generatePDF}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
      >
        Generate PDF Report
      </button>
    </div>
  );
};

export default ReportGenerator;
