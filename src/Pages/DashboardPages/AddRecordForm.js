import React, { useState } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function AddRecordForm({ onSave, existingRecord, setFormVisible }) {
  const [formValues, setFormValues] = useState({
    id: existingRecord?.id || '',
    name: existingRecord?.name || '',
    role: existingRecord?.role || '',
    email: existingRecord?.email || '',
    phone: existingRecord?.phone || '',
    loginUrl: existingRecord?.loginUrl || '',
    linkToTeams: existingRecord?.linkToTeams || '',
    username: existingRecord?.username || '',
    password: existingRecord?.password || '',
    notes: existingRecord?.notes || '',
    shareWith: existingRecord?.shareWith || '',
    attachFiles: null,
    setReminder: existingRecord?.setReminder || '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormValues({
      ...formValues,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValues && typeof formValues === 'object' && Object.keys(formValues).length > 0) {
      onSave(formValues);
    } else {
      console.warn("Form data is invalid:", formValues);
      toast.error("Failed to submit form. Data is invalid.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        style: { backgroundColor: 'red', color: 'white' }
      });
    }
  };

  const handleCancel = () => {
    setFormVisible(false); // Ensure this is called to hide the form
    onSave(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full record-form-custom-alignment sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={handleCancel}
        >
          <FaTimes />
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Form fields */}
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700">Role</label>
              <input
                type="text"
                name="role"
                value={formValues.role}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700">Login URL</label>
              <input
                type="url"
                name="loginUrl"
                value={formValues.loginUrl}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700">Link to Teams</label>
              <input
                type="url"
                name="linkToTeams"
                value={formValues.linkToTeams}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formValues.username}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700">Notes</label>
              <textarea
                name="notes"
                value={formValues.notes}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700">Share With</label>
              <input
                type="text"
                name="shareWith"
                value={formValues.shareWith}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700">Attach Files</label>
              <input
                type="file"
                name="attachFiles"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700">Set Reminder</label>
              <input
                type="date"
                name="setReminder"
                value={formValues.setReminder}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              <FaSave className="mr-2" />
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRecordForm;
