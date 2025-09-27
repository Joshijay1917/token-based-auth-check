import React, { useContext, useState } from 'react';
import { Store } from '../../Context/Store';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    // --- State Management ---
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const storeData = useContext(Store)
    const API_BASE_URL = storeData.Backend_API
    const { setCurretnUser, curretnUser } = storeData
    const navigate = useNavigate()

    // --- Input Handler ---
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    // --- Form Submission Handler (POST /login) ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        setToken('');

        try {
            // WARNING: This API call will likely fail in this sandbox environment 
            // because it cannot reach a local API server (http://localhost).
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok) {
                // Assuming the token is returned in data.data.accessToken or data.accessToken
                const receivedToken = data.data?.accessToken || data.accessToken;
                
                if (receivedToken) {
                    setToken(receivedToken);
                    setCurretnUser(data.data.user)
                    setMessage(`Login SUCCESS! Token received: ${receivedToken.substring(0, 30)}...`);
                    setTimeout(() => {
                        navigate('/home')
                    }, 2000);
                    // In a real app, you would save the token to localStorage or state management
                } else {
                    setMessage(`Login SUCCESS but no access token was returned.`);
                }
            } else {
                throw new Error(data.message || `API Error: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            const networkErrorMsg = error.message.includes('Failed to fetch') 
                ? `Connection Error: Cannot reach the API server at ${API_BASE_URL}. Ensure your backend is running.` 
                : error.message;
            
            console.error('Login Failed:', networkErrorMsg);
            setMessage(`Error: ${networkErrorMsg}`);
        } finally {
            setLoading(false);
        }
    };


    // --- Render ---
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            {curretnUser && navigate('/home')}
            <div className="w-full max-w-lg bg-white p-8 sm:p-10 rounded-2xl shadow-2xl transition duration-300 hover:shadow-3xl">
                
                <header className="mb-6 border-b pb-4">
                    <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight">
                        User Login
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Endpoint: <span className="font-mono text-indigo-500">POST /login</span>
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-4">
                    
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
                        <span>{loading ? 'Logging In...' : 'Login'}</span>
                    </button>
                </form>

                {/* Message Display */}
                {message && (
                    <div className={`mt-6 p-4 rounded-lg font-medium text-sm ${message.startsWith('Error') ? 'bg-red-100 text-red-700 border border-red-400' : 'bg-green-100 text-green-700 border border-green-400'}`}>
                        {message}
                    </div>
                )}
                
                {/* Display Token */}
                {token && (
                    <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-mono break-all">
                        <span className="font-semibold text-gray-700">Token:</span> {token}
                    </div>
                )}

                {/* Simulated Route Navigation */}
                <button
                    // This button simulates navigating to the registration route in your application
                    onClick={() => navigate('/register')}
                    className="mt-4 text-indigo-500 hover:text-indigo-700 transition duration-150 text-sm w-full"
                >
                    Don't have an account? Register now.
                </button>

            </div>
        </div>
    );
};

export default Login;