import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
function ImageUpload() {
  const [image, setImage] = useState(null);
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    age: "",
    gender: "",
    medicalHistory: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPatientInfo = localStorage.getItem("patientInfo");
    if (storedPatientInfo) {
      setPatientInfo(JSON.parse(storedPatientInfo));
    }
    const storedImage = localStorage.getItem("xrayImage");
    if (storedImage) {
      setImage(storedImage);
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
    const fileName = file.name.split('.')[0];
    localStorage.setItem("fileName", fileName );

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        setImage(imageData);
        localStorage.setItem("xrayImage", imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {  
    const { name, value } = e.target;
    setPatientInfo((prev) => {
      const newInfo = { ...prev, [name]: value };
      localStorage.setItem("patientInfo", JSON.stringify(newInfo));
      return newInfo;
    });
  };

  const handleGenerateResult = async () => {
    setIsLoading(true);
    console.log(localStorage.getItem("fileName"));
    const uploadedFile = localStorage.getItem("fileName");
    try{
      const response = await axios.post("https://tb-detection-backend.onrender.com/api/fetch-data", {
        imageName: uploadedFile,
      });

      console.log("Fetched data:", response.data);

      const results = {
        patientInfo,
        diagnosis: response.data.diagnosis,
        confidence: response.data.confidence,
        areas: response.data.areas,
        image: image,
      };

      localStorage.setItem("diagnosisResults", JSON.stringify(results));
      setIsLoading(false);
      navigate("/diagnosis");

    }catch(error){
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-blue-800">Patient Information & X-ray Upload</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={patientInfo.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={patientInfo.age}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={patientInfo.gender}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="medicalHistory" className="block text-sm font-medium text-gray-700">
            Medical History
          </label>
          <textarea
            id="medicalHistory"
            name="medicalHistory"
            value={patientInfo.medicalHistory}
            onChange={handleInputChange}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          ></textarea>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="image-upload" className="block mb-2 text-sm font-medium text-gray-700">
          Upload X-ray Image
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>
      {image && (
        <div className="mt-4 space-y-4">
          <h3 className="text-lg font-medium mb-2 text-gray-700">Preview:</h3>
          <img
            src={image || "/placeholder.svg"}
            alt="X-ray preview"
            className="max-w-full h-auto rounded-lg shadow"
          />
          <button
            onClick={handleGenerateResult}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors disabled:bg-blue-300"
          >
            {isLoading ? "Generating..." : "Generate Result"}
          </button>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
