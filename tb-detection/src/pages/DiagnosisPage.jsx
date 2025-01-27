import React from "react"
import DiagnosisResults from "../components/DiagnosisResult"
import ReportGenerator from "../components/ReportGenerator"

function DiagnosisPage() {
  return (
    <div className="space-y-8">
      <DiagnosisResults />
      <ReportGenerator />
    </div>
  )
}

export default DiagnosisPage

