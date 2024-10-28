import React from 'react';
import { Route, Routes } from 'react-router-dom';
import InputForm from './components/InputForm'; 
import WeatherDetails from './components/WeatherDetails'; 
import ErrorBoundary from './ErrorBoundary'; 

function App() {
    return (
        <ErrorBoundary>
            <Routes>
                <Route path="/" element={<InputForm />} />
                <Route path="/weather-details" element={<WeatherDetails />} />
            </Routes>
        </ErrorBoundary>
    );
}

export default App;
