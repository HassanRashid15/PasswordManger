import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaEdit, FaTrash } from 'react-icons/fa';
import AddRecordForm from './AddRecordForm';
import { db } from "./../../FirbaseAuth/Config"; 
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'; 
import { FaPlus } from "react-icons/fa6";
import { collection, addDoc, onSnapshot, updateDoc, doc, deleteDoc, query, where, getDocs } from "firebase/firestore";

function DashboardRecord() {
  const [records, setRecords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "records"), (snapshot) => {
      const recordsList = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setRecords(recordsList);
    });
    return () => unsubscribe();
  }, []);

  const checkForDuplicate = async (field, value) => {
    const q = query(collection(db, "records"), where(field, "==", value));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleSaveRecord = async (newRecord) => {
    if (newRecord && typeof newRecord === 'object' && Object.keys(newRecord).length > 0) {
      if (isEditing && currentIndex !== null) {
        const recordId = records[currentIndex].id;
        const recordRef = doc(db, "records", recordId);
        try {
          await updateDoc(recordRef, newRecord);
          setRecords(records.map((record, index) => (index === currentIndex ? { ...newRecord, id: recordId } : record)));
          // toast.success("Success message!", {
          //   position: toast.POSITION.TOP_RIGHT,
          //   autoClose: 3000,
          //   style: { backgroundColor: 'green', color: 'white' }
          // });
          
        } catch (error) {
          console.error("Error updating record:", error);
        }
      } else {
        try {
          const docRef = await addDoc(collection(db, "records"), newRecord);
          setRecords([...records, { ...newRecord, id: docRef.id }]);
          setCurrentIndex(records.length);
          // toast.success("Record added successfully!", {
          //   position: toast.POSITION.TOP_RIGHT,
          //   autoClose: 3000,
          //   style: { backgroundColor: 'green', color: 'white' }
          // });
        } catch (error) {
          console.error("Error adding record:", error);
        }
      }

      setFormVisible(false);
      setIsEditing(false);
    } else {
      console.warn("Invalid record data:", newRecord);
      // toast.error("Failed to save record. Data is invalid.", {
      //   position: toast.POSITION.TOP_RIGHT,
      //   autoClose: 3000,
      //   style: { backgroundColor: 'red', color: 'white' }
      // });
    }
  };

  const handleEditRecord = (updatedRecord) => {
    setFormVisible(true);
    setIsEditing(true);
    setCurrentIndex(records.findIndex(record => record.id === updatedRecord.id));
  };

  const handleRemoveRecord = async () => {
    if (currentIndex !== null && records[currentIndex]) {
      const recordId = records[currentIndex].id;
      const recordRef = doc(db, "records", recordId);
      await deleteDoc(recordRef);
      const updatedRecords = records.filter((_, index) => index !== currentIndex);
      setRecords(updatedRecords);
      setCurrentIndex(updatedRecords.length > 0 ? (currentIndex % updatedRecords.length) : null);
    }
  };

  const currentRecord = records[currentIndex];

  return (
    <div className="flex flex-col lg:flex-row h-screen record-form-parent bg-gray-100">
      <div className="w-full lg:w-1/4 bg-white shadow-md p-4 lg:sticky rounded-lg lg:top-0 lg:h-screen border-r border-gray-200">
      <div className='flex record-first-container'>
        <h2 className="text-xl font-semibold ">Records</h2>
        <button
            className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            onClick={() => {
              setFormVisible(true);
              setIsEditing(false);
            }}
          >
       <FaPlus className='text-white mx-auto' />
          </button>
          </div>
        <div className="mb-4 record-second-container  overflow-y-auto">
          <ul className="space-y-2">
            {records.length === 0 ? (
              <li className="text-gray-600">No records available</li>
            ) : (
              records.map((record, index) => (
                <li
                  key={record.id}
                  className={`cursor-pointer p-2 rounded-lg ${index === currentIndex ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
                  onClick={() => setCurrentIndex(index)}
                >
                  <div className="font-semibold">{record.name}</div>
                  <div className="text-sm text-gray-600">{record.role}</div>
                </li>
              ))
            )}
          </ul>
          {/* <button
            className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all mt-4"
            onClick={() => {
              setFormVisible(true);
              setIsEditing(false);
            }}
          >
            Add New Record
          </button> */}
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto record-main-content-area">
        {currentRecord ? (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
<div style={{ borderBottom: '1px solid #ccc' }} className="flex items-center pb-4">
              <img
                src="https://via.placeholder.com/150"
                alt="User Avatar"
                className="rounded-full w-16 h-16 mr-4"
              />
              <div>
                <h2 className="text-xl font-semibold">{currentRecord.name} ({currentRecord.initials})</h2>
                <p className="text-gray-600">{currentRecord.role}</p>
              </div>
              <button className="ml-auto text-blue-500 hover:text-blue-700" onClick={() => handleEditRecord(currentRecord)}>
                <FaEdit />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
              <div className="space-y-4">
                <p className="text-gray-600 break-all"><strong>Email:</strong> {currentRecord.email}</p>
                <p className="text-gray-600"><strong>Phone:</strong> {currentRecord.phone}</p>
                <p className="text-gray-600">
                  <strong>Login URL:</strong> 
                  <a 
                    href={currentRecord.loginUrl} 
                    className="text-blue-500 hover:underline break-all" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {currentRecord.loginUrl}
                  </a>
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600"><strong>Link to Teams:</strong> {currentRecord.linkToTeams}</p>
                <p className="text-gray-600 flex items-center">
                  <strong>Password:</strong> 
                  <span className="ml-2">{showPassword ? currentRecord.password : '••••••••'}</span>
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-600 ml-2"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </p>
                <p className="text-gray-600"><strong>Reminder:</strong> {currentRecord.setReminder}</p>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                className=" text-red-500 transition-all "
                onClick={handleRemoveRecord}
                disabled={currentRecord === undefined}
              >
                <FaTrash className="" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600 text-center">Select a record to view details</p>
          </div>
        )}

{isFormVisible && (
        <AddRecordForm
          onSave={handleSaveRecord}
          existingRecord={isEditing ? currentRecord : null}
          setFormVisible={setFormVisible} // Pass the function here
        />
      )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default DashboardRecord;
