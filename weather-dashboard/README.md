🌦️ Weather Dashboard
A sleek and responsive Weather Dashboard built with React + TailwindCSS — featuring real-time weather data, forecast, search suggestions, and user search history.

✨ Features

🌤 Live Weather Data — Get current temperature, humidity, and conditions.

📅 5-Day Forecast — View upcoming weather trends.

🔍 Smart Search Bar — City suggestions as you type.

🕘 Recent Searches — Saves your last five cities locally.

⚠️ Error & Loading Handling — Graceful UI feedback with a loader.

📱 Responsive Design — Looks beautiful on all screen sizes.

🧠 Tech Stack
Tech	Description
⚛️ React	Front-end framework
🎨 Tailwind CSS	Utility-first CSS styling
☁️ OpenWeatherMap API	Weather data source
⚡ Vite	Fast development build tool
💾 LocalStorage	Saves user search history
🗂 Folder Structure
src/
│
├── components/
│   ├── WeatherCard.jsx
│   ├── ForecastList.jsx
│   ├── SearchBar.jsx
│   ├── ErrorBoundary.jsx
│   ├── Loader.jsx
│   └── WeatherIcon.jsx
     |--- Weathercard.jsx
|___servises/
     |
     | __Weatherservices.js
│
├── pages/
│   └── Dashboard.jsx
│
├── App.jsx
└── main.jsx

⚙️ Setup & Installation
1️⃣ Clone the Repo
git clone https://github.com/yourusername/weather-dashboard.git
cd weather-dashboard

2️⃣ Install Dependencies
npm install

3️⃣ Add Environment Variables

Create a file named .env in your root directory:

VITE_WEATHER_API_KEY=your_openweathermap_api_key


Then in your Dashboard.jsx, replace any hardcoded key with:

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

4️⃣ Run the Project
npm run dev


Visit ➜ http://localhost:5173

🔑 OpenWeatherMap API Setup Guide

Go to https://openweathermap.org/api
.

Create a free account or sign in.

Navigate to My API keys in your profile.

Click Generate Key — give it a name like WeatherDashboard.

Copy your new key and paste it into your .env file as:

VITE_WEATHER_API_KEY=your_generated_api_key


Wait about 10–15 minutes for your key to activate.

🌍 API Endpoints Used
Type	Endpoint	Description
Current Weather	https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric	Fetches live weather data
Forecast	https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric	Fetches 5-day forecast data
🌍 Deployment (Vercel)

Go to Vercel
.

Click New Project → Import your GitHub repo.

Add the environment variable:

VITE_WEATHER_API_KEY = your_api_key_here

Click Deploy 🚀

Done! Your live weather dashboard is online.

🧩 Components Overview
Component	Purpose
Dashboard.jsx	Main page and data fetching
SearchBar.jsx	Input box with live city suggestions
WeatherCard.jsx	Displays current weather info
ForecastList.jsx	Renders 5-day forecast cards
WeatherIcon.jsx	Icon logic for weather conditions
ErrorBoundary.jsx	Prevents app crashes
Loader.jsx	Shows a spinner during fetches
Weatherservises  responsible for handling all interactions with the OpenWeather API.
🧱 Future Enhancements (optional)

 🌐 Geolocation support (detect current city automatically)

 🌑 Dark mode toggle

 💨 Air Quality Index (AQI) data

 📊 Hourly forecast view

🖼️ Preview

Add your screenshot here:

![Weather Dashboard Preview](./public/preview.png)

🧑‍💻 Author

Your Name
🌍 Built with ❤️ using React and TailwindCSS
📧 your.email@example.com

🔗 GitHub Profile

🪪 License

This project is licensed under the MIT License — free to use and modify.

Would you like me to include an optional "Reflection Section" (accomplishments, challenges, next steps) formatted for your ALX submission Google Doc — so you can just copy-paste it there too?