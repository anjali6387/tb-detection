
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DiagnosisResults() {
  const [results, setResults] = useState(null);

  useEffect(() => {
    const storedResults = localStorage.getItem("diagnosisResults");
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
  }, []);

  if (!results) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-blue-800">Diagnosis Results</h2>
        <p>No results available. Please upload an X-ray image first.</p>
        <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors">
          Go to Image Upload
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-blue-800">Diagnosis Results</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-lg">
              <strong>Patient Name:</strong> {results.patientInfo.name}
            </p>
            <p className="text-lg">
              <strong>Age:</strong> {results.patientInfo.age}
            </p>
            <p className="text-lg">
              <strong>Gender:</strong> {results.patientInfo.gender}
            </p>
          </div>
          <div>
            <p className="text-lg">
              <strong>Diagnosis:</strong> <span className="text-red-600 font-medium">{results.diagnosis}</span>
            </p>
            <p className="text-lg">
              <strong>Confidence:</strong> {(results.confidence * 100).toFixed(2)}%
            </p>
          </div>
        </div>
        <div className="relative">
          <img
            src={results.image || "/placeholder.svg"}
            alt="X-ray with highlighted areas"
            className="w-[300px] h-auto rounded-lg shadow"
          />
          {results.areas.map((area, index) => (
            <div
              key={index}
              className="absolute border-2 border-red-500 rounded-md"
              style={{
                left: `${area.x}px`,
                top: `${area.y}px`,
                width: `${area.width}px`,
                height: `${area.height}px`,
              }}
            >
              <span className="absolute top-0 left-0 bg-red-500 text-white px-1 py-0.5 text-xs rounded-tl-md rounded-br-md">
                {area.label}
              </span>
            </div>
          ))}
        </div>
        <div>
          <p className="text-lg font-medium mb-2">Affected Areas:</p>
          <ul className="list-disc list-inside">
            {results.areas.map((area, index) => (
              <li key={index} className="text-gray-700">
                {area.label}
              </li>
            ))}
          </ul>
        </div>
        {/* <div className="mt-4">
          <Link
            to="/visualization"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            View 3D Visualization
          </Link>
        </div> */}
      </div>
    </div>
  );
}

export default DiagnosisResults;
