import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/config";
import { Tooltip } from 'primereact/tooltip';

import { Card } from "primereact/card";


const HomeInsuranceList = () => {
  const [homeInsuranceData, setHomeInsuranceData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [userId, setUserId] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const showImagePreview = (imageSrc) => {
    setPreviewImage(imageSrc);
  };

  const hideImagePreview = () => {
    setPreviewImage(null);
  };
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setUserId(userData.userId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchHomeInsuranceData();
    }
  }, [userId]);

  const fetchHomeInsuranceData = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/homeinsurance`, {
        userId: userId,
      });
      setHomeInsuranceData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching home insurance data:", error);
    }
  };
  const navigate = useNavigate();

  const handleCreateUserClick = () => {
    navigate("/homeinsuranceform");
  };

  const handleEditClick = (rowData) => {
    navigate(`/homeinsuranceform/${rowData._id}`);
  };

  const handleDeleteClick = (rowData) => {
    console.log(rowData);
    setSelectedRowData(rowData);
    setDeleteConfirmationVisible(true);
  };
  const deleteInsurance = async () => {
    try {
      // Extract the ID of the selected row
      const insuranceId = selectedRowData._id;
      // Call your delete API with the insurance ID
      await axios.delete(`${API_BASE_URL}/api/homeinsurance/${insuranceId}`);
      // After successful deletion, close the confirmation dialog
      setDeleteConfirmationVisible(false);
      // Optionally, you can update the state to reflect the changes in the UI
      // For example, you can refetch the insurance data to update the table
      fetchHomeInsuranceData();
    } catch (error) {
      console.error("Error deleting home insurance:", error);
    }
  };

  const confirmDelete = () => {
    setDeleteConfirmationVisible(true);
  };

  const cancelDelete = () => {
    setDeleteConfirmationVisible(false);
  };

  const buttontemplate = (rowData) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        {/* Edit Button with Tooltip */}
        <Tooltip target=".edit-button" position="top" mouseTrack>
          Edit
        </Tooltip>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-warning edit-button"
          style={{ marginRight: '0.5rem' }}
          onClick={() => handleEditClick(rowData)}
        />
  
        {/* Delete Button with Tooltip */}
        <Tooltip target=".delete-button" position="top" mouseTrack>
          Delete
        </Tooltip>
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger delete-button"
          onClick={() => handleDeleteClick(rowData)}
        />
      </div>
    );
  };
  

  const deleteConfirmationFooter = (
    <div>
      <Button
        label="Yes"
        icon="pi pi-check"
        onClick={deleteInsurance}
        className="p-button-danger"
      />
      <Button
        label="No"
        icon="pi pi-times"
        onClick={cancelDelete}
        className="p-button-secondary"
      />
    </div>
  );
  const renderImage = (rowData) => {
    if (rowData.houseImage) {
      return (
        <div title="Click to Preview">
          <img
            src={rowData.houseImage.data}
            alt="House"
            style={{ width: "50px", borderRadius: "50%", cursor: "pointer" }}
            onClick={() => showImagePreview(rowData.houseImage.data)}
          />
        </div>
      );
    } else {
      return (
        <img
          src="placeholder.jpg"
          alt="No Image"
          style={{ width: "50px", borderRadius: "50%" }}
        />
      );
    }
  };
  
  return (
    <div
      className="p-mt-2 p-mx-2"
      style={{ position: "relative", margin: "100px" }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Insurance Holders
      </h2>
      <Button
        label="Create New User"
        onClick={handleCreateUserClick}
        className="p-button-success"
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          marginTop: "10px",
          marginRight: "10px",
          marginBottom: "10px",
        }}
      />
      <Card>
      <DataTable value={homeInsuranceData} rows={5} paginator>
        <Column field="policyHolderName" header="Policy Holder Name" />
        <Column field="propertyAddress" header="Property Address" />
        <Column field="coverageType" header="Coverage Type" />
        <Column field="premiumAmount" header="Premium Amount" />
        <Column
          header="House Image"
          body={renderImage}
          
        />
        <Column
          header="Actions"
          body={(rowData) => buttontemplate(rowData)}
          style={{ textAlign: "center", width: "6em" }}
        />

        {/* <Column
          body={(rowData) => (
            <Button
              icon="pi pi-trash"
              className="p-button-rounded p-button-danger"
              onClick={() => handleDeleteClick(rowData)}
            />
          )}
          style={{ textAlign: "center", width: "6em" }}
        /> */}
      </DataTable>
      
      </Card>
      <Dialog
        visible={deleteConfirmationVisible}
        onHide={cancelDelete}
        header="Confirmation"
        footer={deleteConfirmationFooter}
        className="p-fluid"
      >
        <div>Are you sure you want to delete this insurance?</div>
      </Dialog>
      <Dialog
        visible={previewImage !== null}
        onHide={hideImagePreview}
        header="Image Preview"
        style={{ width: "50%" }}
      >
        <img src={previewImage} alt="Preview" style={{ width: "100%" }} />
      </Dialog>
    </div>
  );
};

export default HomeInsuranceList;
