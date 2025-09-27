import React, { useContext, useState } from 'react';
import { Store } from '../../Context/Store';
import { useNavigate } from 'react-router-dom';

// const API_BASE_URL = 'http://localhost:3000/api/users'; // Target API URL for registration

const Register = () => {
    // --- State Management ---
    const [form, setForm] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
    });
    const [avatarFile, setAvatarFile] = useState(null);
    const [coverImageFile, setCoverImageFile] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const storeData = useContext(Store)
    const API_BASE_URL = storeData.Backend_API
    const navigate = useNavigate()
    
    console.log("backend : ", API_BASE_URL);

    // --- Input Handlers ---
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e, fileType) => {
        if (fileType === 'avatar') {
            setAvatarFile(e.target.files[0]);
        } else if (fileType === 'coverImage') {
            setCoverImageFile(e.target.files[0]);
        }
    };

    // --- Form Submission Handler (Simulating POST /register) ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        const formData = new FormData();
        formData.append('fullname', form.fullName);
        formData.append('username', form.username);
        formData.append('email', form.email);
        formData.append('password', form.password);

        // Append files if they exist (expected fields: 'avatar', 'coverImage')
        if (avatarFile) formData.append('avatar', avatarFile);
        if (coverImageFile) formData.append('coverImage', coverImageFile);

        try {
            // WARNING: This API call will likely fail in this sandbox environment 
            // because it cannot reach a local API server (http://localhost).
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                // Note: fetch automatically sets the Content-Type to multipart/form-data
                // when a FormData object is provided as the body.
                body: formData, 
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(`Registration SUCCESS! Token received: ${data.data?.accessToken?.substring(0, 30)}...`);
                navigate('/')
            } else {
                throw new Error(data.message || `API Error: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            const networkErrorMsg = error.message.includes('Failed to fetch') 
                ? `Connection Error: Cannot reach the API server at ${API_BASE_URL}. Ensure your backend is running.` 
                : error.message;
            
            console.error('Registration Failed:', networkErrorMsg);
            setMessage(`Error: ${networkErrorMsg}`);
        } finally {
            setLoading(false);
        }
    };


    // --- Render ---
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

            <div className="w-full max-w-lg bg-white p-8 sm:p-10 rounded-2xl shadow-2xl transition duration-300 hover:shadow-3xl">
                
                <header className="mb-6 border-b pb-4">
                    <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight">
                        Register Account
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Endpoint: <span className="font-mono text-indigo-500">POST /register</span>
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Full Name */}
                    <input
                        type="text" name="fullName" placeholder="Full Name (req. body)"
                        value={form.fullName} onChange={handleInputChange} required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"
                    />

                    {/* Username */}
                    <input
                        type="text" name="username" placeholder="Full Name (req. body)"
                        value={form.username} onChange={handleInputChange} required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"
                    />
                    
                    {/* Email */}
                    <input
                        type="email" name="email" placeholder="Email"
                        value={form.email} onChange={handleInputChange} required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"
                    />
                    
                    {/* Password */}
                    <input
                        type="password" name="password" placeholder="Password"
                        value={form.password} onChange={handleInputChange} required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"
                    />

                    {/* Avatar File Upload */}
                    <div className="pt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Avatar (Field: `avatar`)</label>
                        <input 
                            type="file" name="avatar" onChange={(e) => handleFileChange(e, 'avatar')}
                            className="w-full p-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition duration-150"
                        />
                    </div>

                    {/* Cover Image File Upload */}
                    <div className="pt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Cover Image (Field: `coverImage`)</label>
                        <input 
                            type="file" name="coverImage" onChange={(e) => handleFileChange(e, 'coverImage')}
                            className="w-full p-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition duration-150"
                        />
                    </div>
                    
                    {/* Submission Button */}
                    <button
                        type="submit" disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-300 disabled:bg-indigo-300 flex items-center justify-center space-x-2"
                    >
                        {loading && (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        <span>{loading ? 'Registering...' : 'Register and Get Token'}</span>
                    </button>
                </form>

                {/* Message Display */}
                {message && (
                    <div className={`mt-6 p-4 rounded-lg font-medium text-sm ${message.startsWith('Error') ? 'bg-red-100 text-red-700 border border-red-400' : 'bg-green-100 text-green-700 border border-green-400'}`}>
                        {message}
                    </div>
                )}
                
                {/* Simulated Route Navigation */}
                <button
                    // This button simulates navigating to the login route in your application
                    onClick={() => navigate('/')}
                    className="mt-4 text-indigo-500 hover:text-indigo-700 transition duration-150 text-sm w-full"
                >
                    Already have an account? Login here.
                </button>

            </div>
        </div>
    );
};

export default Register;