import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import emailjs from 'emailjs-com';
import ShopNow from './ShopNow';
import '../styles/weathercomponent.css';

const WeatherDetails = () => {
    const location = useLocation();
    const { city, name, email } = location.state || { city: '', name: '', email: '' };
    const [weatherData, setWeatherData] = useState(null);
    const [emailStatus, setEmailStatus] = useState('');
    const [safetyTips, setSafetyTips] = useState('');
    const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY; // OpenWeatherMap key
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

    useEffect(() => {
        const fetchWeather = async () => {
            if (city) {
                try {
                    const response = await axios.get(`${apiUrl}${city}&appid=${apiKey}`);
                    setWeatherData(response.data);
                    sendEmail(response.data); // Send email after fetching weather data
                } catch (error) {
                    console.error("Error fetching weather data", error);
                }
            }
        };

        fetchWeather();
    }, [city]);

    const isValidEmail = (email) => {
        // Basic email validation regex
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
    const sendEmail = (weatherData) => {
        // Validate the user email
        if (!isValidEmail(email)) {
            setEmailStatus('Please enter a valid email address.');
            return;
        }

        const templateParams = {
            name: name, // User's name
            to_email: email, // User's email
            from_name: "Datta Kale", // Your name
            from_email: "dattakale2008@gmail.com", // Your email (this can be omitted if using default)
            reply_to: email, // Set to the user's email input
            city: city,
            temperature: weatherData.main.temp,
            humidity: weatherData.main.humidity,
            pressure: weatherData.main.pressure,
            wind_speed: weatherData.wind.speed,
            description: weatherData.weather[0].description,
            outfit_recommendation: getOutfitRecommendation(weatherData),
            safety_tips: getSafetyTips(getOutfitRecommendation(weatherData)) // Pass the outfit recommendation correctly
        };

        emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, templateParams, process.env.REACT_APP_EMAILJS_USER_ID)
            .then((response) => {
                setEmailStatus('Email sent successfully!');
                console.log("Email sent to:", email);
            })
            .catch((err) => {
                console.error("Email send error:", err); // Log the error
                setEmailStatus('Failed to send email. Please try again.');
            });

        console.log("Sending email to:", email);
    };

    const getSafetyTips = (recommendation) => {
        const tips = [];
        if (recommendation.includes("sun")) {
            tips.push("Wear sunscreen, sunglasses, and a hat to protect from UV rays.");
            tips.push("Stay hydrated by drinking plenty of water.");
            tips.push("Avoid staying outdoors during peak sun hours (10 am - 4 pm).");
        } else if (recommendation.includes("rain")) {
            tips.push("Carry an umbrella or wear a raincoat to stay dry.");
            tips.push("Wear waterproof footwear to avoid slipping.");
            tips.push("Drive carefully as roads may be slippery.");
        } else if (recommendation.includes("cold")) {
            tips.push("Dress in warm layers, including a scarf, gloves, and hat.");
            tips.push("Avoid prolonged exposure to cold to prevent frostbite.");
            tips.push("Stay indoors during extremely low temperatures.");
        } else if (recommendation.includes("wind")) {
            tips.push("Wear a windbreaker or jacket to protect from wind chills.");
            tips.push("Secure loose items if you're carrying any, as they may blow away.");
            tips.push("Avoid standing near tall structures or trees in high winds.");
        } else if (recommendation.includes("humidity")) {
            tips.push("Wear breathable fabrics to stay cool and comfortable.");
            tips.push("Drink water regularly to stay hydrated.");
            tips.push("Use anti-perspirant products to reduce sweating.");
        } else if (recommendation.includes("fog")) {
            tips.push("Drive slowly and use low-beam headlights in foggy conditions.");
            tips.push("Wear bright or reflective clothing if outdoors.");
            tips.push("Avoid outdoor activities with low visibility for safety.");
        } else {
            tips.push("Dress comfortably based on the weather.");
            tips.push("Stay aware of changing weather conditions.");
            tips.push("Prioritize your safety in extreme conditions.");
        }
        return tips;
    };
    
    const getOutfitRecommendation = (weatherData) => {
        if (!weatherData) return null;
    
        const temperature = weatherData.main.temp;
        const humidity = weatherData.main.humidity;
        const description = weatherData.weather[0].description.toLowerCase();
        const windSpeed = weatherData.wind.speed;
    
        let recommendation = '';
    
        // Outfit recommendations based on temperature
        if (temperature < -30) {
            recommendation = "It's extremely cold! Wear heavy winter clothes, thermal layers, warm boots, and a face mask.";
        } else if (temperature < -20) {
            recommendation = "It's very cold! Dress in layers with a thick winter coat, thermal underwear, and warm gloves.";
        } else if (temperature < -10) {
            recommendation = "It's cold! Wear a winter jacket, a hat, gloves, and warm boots.";
        } else if (temperature < 0) {
            recommendation = "It's chilly! You need a warm coat, scarf, and gloves.";
        } else if (temperature < 10) {
            recommendation = "It's cool! A jacket or sweater with long pants would be good.";
        } else if (temperature < 15) {
            recommendation = "It's mild! A long-sleeve shirt with a light jacket is advisable.";
        } else if (temperature < 20) {
            recommendation = "It's pleasant! A t-shirt and jeans or shorts will be fine.";
        } else if (temperature < 25) {
            recommendation = "It's warm! Wear shorts and a short-sleeve shirt.";
        } else if (temperature < 30) {
            recommendation = "It's hot! Choose light clothes like shorts, t-shirts, and sandals.";
        } else if (temperature < 35) {
            recommendation = "It's very hot! Wear light fabrics, shorts, and a hat to stay cool.";
        } else {
            recommendation = "It's extremely hot! Wear minimal clothing like a tank top and shorts, and drink lots of water.";
        }
    
        // Additional advice based on weather description
        if (description.includes('rain')) {
            recommendation += " Don't forget an umbrella or a waterproof jacket!";
        }
        if (description.includes('snow')) {
            recommendation += " Wear waterproof boots and a snow jacket. Layer your clothes!";
        }
        if (description.includes('windy')) {
            recommendation += " A windbreaker or heavy jacket will help keep you warm.";
        }
        if (description.includes('fog')) {
            recommendation += " Dress warmly and wear reflective gear if you're going outside, as it may be hard to see.";
        }
        if (description.includes('sunny') || description.includes('clear')) {
            recommendation += " Protect yourself from the sun with sunglasses, sunscreen, and a hat.";
        }
        if (description.includes('thunderstorm') || description.includes('storm')) {
            recommendation += " Stay indoors if you can. If you must go out, wear a waterproof jacket and sturdy shoes.";
        }
        if (description.includes('cloudy')) {
            recommendation += " Layer your clothes. A light jacket over a t-shirt is a good choice.";
        }
        if (description.includes('humid')) {
            recommendation += " Wear lightweight and breathable fabrics to stay comfortable.";
        }
    
        // Wind speed considerations
        if (windSpeed > 20) {
            recommendation += " It's quite windy; consider wearing a windbreaker.";
        }
    
        // Humidity considerations
        if (humidity > 80) {
            recommendation += " High humidity can make it feel hotter; choose light and breathable clothes.";
        }
    
        // Fallback recommendation for mild weather
        if (recommendation === '') {
            recommendation = "Dress comfortably based on the weather.";
        }
    
        return recommendation;
    };
    

    if (!weatherData) {
        return (
            <div className="loader">
                <div className="spinner"></div>
                <div className="spinner"></div>
                <div className="spinner"></div>
            </div>);
    }

    const outfitRecommendation = getOutfitRecommendation(weatherData);
    return (
        <div>
            <h1>Weather Details</h1>
            <div className="weather-table-container">
                <table className="weather-table">
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Temperature</td>
                            <td>{weatherData.main.temp} °C</td>
                        </tr>
                        <tr>
                            <td>Humidity</td>
                            <td>{weatherData.main.humidity} %</td>
                        </tr>
                        <tr>
                            <td>Pressure</td>
                            <td>{weatherData.main.pressure} hPa</td>
                        </tr>
                        <tr>
                            <td>Wind Speed</td>
                            <td>{weatherData.wind.speed} m/s</td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>{weatherData.weather[0].description}</td>
                        </tr>
                    </tbody>
                </table>
            </div>


            <h2>Outfit Recommendation</h2>
            <p className="outfit-recommendation" id="strong">{outfitRecommendation}</p>

            <p className="outfit-recommendation" >Hello {name}, here are the details of the weather in {city} and our outfit recommendation for you.</p>

            {emailStatus && <p className="outfit-recommendation" >{emailStatus}</p>}
        
            <div>
                <h2>Safety Tips</h2>
                <p className="safety-tips">
                    {getSafetyTips(outfitRecommendation).map((tip, index) => (
                        <span key={index}>{tip}<br /></span>
                    ))}
                </p>
                <h2>Shop Now</h2>
                <ShopNow />
            </div>

            <footer className="footer bg-gray-800 text-white w-full h-12">
                <p id="foot" className="text-center">
                    Copyright © 2024 WeatherWear. All rights reserved |
                    <span style={{ margin: '0 5px' }}>Developed with ❤️ by Datta.</span>
                </p>
            </footer>
        </div>
    );
}

export default WeatherDetails;
