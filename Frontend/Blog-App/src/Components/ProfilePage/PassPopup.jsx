import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PassPopup = ({ setPassPopup }) => {
    const params = useParams();
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const updatePass = async () => {
        try {
            const result = await axios.get(`http://localhost:5000/update/${params.id}`);
            if (result) {
                if (result.data.password === password) {
                    try {
                        const response = await axios.put(`http://localhost:5000/update/${params.id}`, { password: newPassword });
                        if (response.data) {
                            alert('Password updated successfully!');
                            setPassPopup(false);
                        } else {
                            alert('Failed to update password.');
                        }
                    } catch (error) {
                        console.error('Error updating password:', error);
                        alert('Error updating password.');
                    }
                }
                else {
                    alert("Your current password is incorrect")
                }
            } else {
                alert('Unable to fetch data');
            }
        } catch (error) {
            console.error('Error fetching email:', error);
        }
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md mx-auto sm:w-96 relative">
                {/* Update Button */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-2">
                        Enter Old Password
                    </label>
                    <input
                        // type="password"  
                        placeholder="Enter your old password"
                        className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-2">
                        Enter New Password
                    </label>
                    <input
                        type="password"
                        placeholder="Enter your new password"
                        className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        onChange={(e) => { setNewPassword(e.target.value) }}
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                        onClick={updatePass}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PassPopup
