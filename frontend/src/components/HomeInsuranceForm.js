import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import API_BASE_URL from "../config/config";
import { FileUpload } from "primereact/fileupload";

const HomeInsuranceForm = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    policyHolderName: "",
    propertyAddress: "",
    coverageType: "",
    premiumAmount: "",
    houseImage: "",
    policyNumber: "",
  });
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      console.log(userData);
      // Set user details in the form data
      setFormData((prevFormData) => ({
        ...prevFormData,
        userId: userData.userId,
        // Include other user details as needed
      }));
    }
    if (id) {
      // Fetch insurance data by ID if ID exists
      fetchInsuranceById(id);
    }
  }, [id]);

  const fetchInsuranceById = async (id) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/homeinsurance/${id}`
      );
      const insuranceData = response.data;
      // Populate form with fetched data
      setFormData(insuranceData);
      const fileName = insuranceData.houseImage.fileName
      setFileName(fileName);
    } catch (error) {
      console.error("Error fetching insurance data by ID:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Call update API if ID exists
        await axios.put(`${API_BASE_URL}/api/homeinsurance/${id}`, formData);
        navigate("/homeinsurancelist");
      } else {
        // Call create API if ID does not exist
        await axios.post(`${API_BASE_URL}/api/homeinsurance/add`, formData);
        navigate("/homeinsurancelist");
      }
  
      // Call the upload API if a file is selected
      if (formData.houseImage) {
        const file = dataURItoBlob(formData.houseImage);
        const formDataWithFile = new FormData();
        formDataWithFile.append('file', file, 'houseImage.jpg'); // You can adjust the file name as needed
        await axios.post(`${API_BASE_URL}   /upload`, formDataWithFile, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
      navigate("/homeinsurancelist");
    } catch (error) {
      console.error("Error submitting home insurance form:", error);
    }
  };
  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}
  const handleCancel = () => {
    // Navigate to the insurance list page
    navigate("/homeinsurancelist");
  };
  return (
    <div className="p-grid p-justify-center p-mt-4">
      <div
        className="p-col-8"
        style={{ marginLeft: "25%", marginRight: "25%" }}
      >
        <Card
          title={id ? "Edit New User" : "Add New User"}
          className="p-mb-2 p-p-3"
          style={{ margin: "20%" }}
        >
          <form onSubmit={handleSubmit} className="p-fluid">
            <div className="p-field p-mb-2">
              <div
                className="p-d-block p-mb-2"
                style={{
                  marginBottom: "1rem",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                Policy Holder Name
              </div>
              <InputText
                id="policyHolderName"
                type="text"
                name="policyHolderName"
                value={formData.policyHolderName}
                onChange={handleChange}
                style={{ marginBottom: "1.5rem" }}
                required
              />
            </div>
            <div className="p-field p-mb-2">
              <div
                className="p-d-block"
                style={{
                  marginBottom: "1rem",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                Property Address
              </div>
              <InputText
                id="propertyAddress"
                type="text"
                name="propertyAddress"
                value={formData.propertyAddress}
                onChange={handleChange}
                style={{ marginBottom: "1.5rem" }}
                required
              />
            </div>
            <div className="p-field p-mb-2">
              <div
                className="p-d-block"
                style={{
                  marginBottom: "1rem",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                Coverage Type
              </div>
              <InputText
                id="coverageType"
                type="text"
                name="coverageType"
                value={formData.coverageType}
                onChange={handleChange}
                style={{ marginBottom: "1.5rem" }}
                required
              />
            </div>
            <div className="p-field p-mb-2">
              <div
                className="p-d-block"
                style={{
                  marginBottom: "1rem",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                Premium Amount
              </div>
              <InputText
                id="premiumAmount"
                type="number"
                name="premiumAmount"
                value={formData.premiumAmount}
                onChange={handleChange}
                style={{ marginBottom: "1.5rem" }}
                required
              />
            </div>

            <div className="p-field p-mb-2">
              <div
                className="p-d-block"
                style={{
                  marginBottom: "1rem",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                Policy Number
              </div>
              <InputText
                id="policyNumber"
                type="number"
                name="policyNumber"
                value={formData.policyNumber}
                onChange={handleChange}
                style={{ marginBottom: "1.5rem" }}
                required
              />
            </div>
            <div className="p-field p-mb-2">
              <div
                className="p-d-block"
                style={{
                  marginBottom: "1rem",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                House Image
              </div>
              <FileUpload
                name="houseImage"
                accept="image/*"
                chooseLabel="Choose"
                uploadLabel="Upload"
                cancelLabel="Cancel"
                mode="basic"
                auto
                maxFileSize={10000000} // 1MB
                onSelect={(e) => {
                  const file = e.files[0];
                  if (file) {
                    setFileName(file.name); // Update the file name
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setFormData({ ...formData, houseImage: { data: reader.result, fileName: file.name } });

                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {fileName && (
                <div style={{ marginTop: "0.5rem", fontSize: "1rem" }}>
                  {fileName}
                </div>
              )}
            </div>
            <div style={{ marginTop: "2rem", textAlign: "center" }}>
              <Button
                type="submit"
                label="Submit"
                className="p-button-success"
                style={{ width: "30%", marginRight: "1rem" }}
              />
              <Button
                type="button"
                label="Cancel"
                className="p-button-secondary"
                style={{ width: "30%" }}
                onClick={handleCancel}
              />
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default HomeInsuranceForm;
