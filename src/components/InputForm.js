import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InputForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/weather-details', { state: { city, name, email } });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-orange-500 to-pink-500">
<form
    onSubmit={handleSubmit}
    className="bg-pink-100 rounded-lg shadow-lg p-8 w-full max-w-[400px] mx-auto sm:max-w-[500px] md:max-w-[600px] lg:max-w-[500px]"
>

                <h2 className="text-center text-3xl font-semibold mb-6">Outfit Recommendation</h2>

                {/* Name Field */}
                <label className="block text-sm font-medium mb-2" htmlFor="name">Name:</label>
                <div className="flex items-center border rounded mb-4 px-3 py-2 bg-white">
                    <i className="fas fa-user text-blue-500 mr-2"></i>
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="flex-1 outline-none text-sm"
                    />
                </div>

                {/* WhatsApp Number Field */}
                <label className="block text-sm font-medium mb-2" htmlFor="email">Email:</label>
                <div className="flex items-center border rounded mb-4 px-3 py-2 bg-white">
                    <i className="fab fa-envelope text-green-500 mr-2"></i>
                    <input
                        id="email"
                        type="text"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1 outline-none text-sm"
                    />
                </div>

                {/* City Field */}
                <label className="block text-sm font-medium mb-2" htmlFor="city">City:</label>
                <div className="flex items-center border rounded mb-4 px-3 py-2 bg-white">
                    <i className="fas fa-city text-blue-500 mr-2"></i>
                    <input
                        id="city"
                        type="text"
                        placeholder="Enter your city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        className="flex-1 outline-none text-sm"
                    />
                </div>

                {/* Submit Button */}
                <button 
                    type="submit" 
                    className="w-full py-2 mt-4 text-white bg-green-600 rounded-full text-sm font-medium flex items-center justify-center hover:bg-green-700 transition duration-200"
                >
                    Get Recommendation <span className="ml-2">→</span>
                </button>
            </form>
        </div>
    );
};

export default InputForm;
