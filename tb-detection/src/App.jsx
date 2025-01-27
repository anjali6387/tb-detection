import { lazy, Suspense } from "react";
import Home from "./pages/Home";
import DiagnosisPage from "./pages/DiagnosisPage";
import VisualizationPage from "./pages/VisualizationPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// const Home = lazy(() => import("./pages/Home"));
// const DiagnosisPage = lazy(() => import("./pages/DiagnosisPage"));
// const VisualizationPage = lazy(() => import("./pages/VisualizationPage"));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/diagnosis" element={<DiagnosisPage />} />
              <Route path="/visualization" element={<VisualizationPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
