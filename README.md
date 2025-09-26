# 🌤️ WeatherWear – Personalized Outfit Recommendation Web App

---

## 💡 Introduction  

**WeatherWear** is a **React-based web application** that provides **personalized outfit recommendations** based on the **real-time weather** in your city.  

By entering your **name, city, and email**, WeatherWear will:

- ✅ Fetch **weather data** using the **OpenWeatherMap API**  
- ✅ Suggest a **suitable outfit** based on temperature, weather conditions, wind, and humidity  
- ✅ **Send the recommendation to your email** using **EmailJS**  
- ✅ Suggest **online platforms to buy your outfit**  

This guide is designed so that **any beginner** can run WeatherWear locally on their computer.

---

## 🛠️ Prerequisites

Before running WeatherWear, ensure the following are installed:

### 1️⃣ Node.js & npm
- Required to run JavaScript and manage project dependencies  
- Download: [https://nodejs.org/](https://nodejs.org/)  
- Verify installation:

```bash
node -v
npm -v
```

---

## 🛠️ Technologies Used

- **React** – Frontend library  
- **Axios** – For API requests  
- **react-router-dom** – Routing between pages  
- **EmailJS** – Sending emails from frontend  
- **CSS** – Styling  

---

## 📁 Project Structure

```
WeatherWear/
│
├─ public/
│   └─ index.html
│
├─ src/
│   ├─ components/
│   │   ├─ InputForm.js
│   │   ├─ WeatherDetails.js
│   │   └─ ShopNow.js
│   ├─ App.js
│   ├─ index.js
│   └─ styles/
│       └─ weathercomponent.css
│
├─ .env.example       # Template for environment variables
├─ package.json
└─ README.md
```

---

## 💻 Local Setup Instructions

Follow these steps to run WeatherWear on your local computer:

### 1️⃣ Clone or Download the Project

```bash
git clone https://github.com/your-username/WeatherWear.git
cd WeatherWear
```

Or download the ZIP and extract it.

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Set Up Environment Variables

1. Copy the example environment file:

```bash
cp .env.example .env   # On Windows: copy .env.example .env
```

2. Replace the placeholders with your API keys:

```
REACT_APP_OPENWEATHER_API_KEY=your_openweather_api_key
REACT_APP_EMAILJS_SERVICE_ID=your_emailjs_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
REACT_APP_EMAILJS_USER_ID=your_emailjs_user_id
```

> **Note:** If EmailJS keys are missing, the email feature will not work, but the weather functionality will still work.

---

### 4️⃣ Start the Development Server

```bash
npm start
```

- Opens the app in your browser at [http://localhost:3000](http://localhost:3000)  
- Enter a city, name, and email (optional) to view weather details and outfit recommendations.

---

### 5️⃣ Production Build (Optional)

To create an optimized production build:

```bash
npm run build
```

- This generates a `build/` folder that can be served with any static server or hosted online (e.g., GitHub Pages, Netlify).

---

## ⚡ Notes for Recruiters

- The `.env` file contains **sensitive API keys** — do **not commit** it.  
- `.env.example` is included to show required variables.  
- Restart the development server if `.env` is updated.  
- For testing purposes, mock data can be used if API keys are not available, allowing UI and workflow to be reviewed without real API calls.

---

## 👨‍💻 Author

**Datta Kale**  
[GitHub](https://github.com/your-username) | [Email](mailto:dattakale2008@gmail.com)

---

## 📝 License

MIT License. Feel free to review and test locally.

---

## 📌 Example `.env.example` File


```
REACT_APP_OPENWEATHER_API_KEY=YOUR_OPENWEATHER_API_KEY_HERE
REACT_APP_EMAILJS_SERVICE_ID=YOUR_EMAILJS_SERVICE_ID_HERE
REACT_APP_EMAILJS_TEMPLATE_ID=YOUR_EMAILJS_TEMPLATE_ID_HERE
REACT_APP_EMAILJS_USER_ID=YOUR_EMAILJS_USER_ID_HERE
```
