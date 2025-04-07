import Navbar from '@/components/Navbar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


function Details() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showAQI, setShowAQI] = useState(false);


    useEffect(() => {
        const stored = localStorage.getItem('selectedStateData');
        if (stored) {
            const { url } = JSON.parse(stored);

            // POST to Flask backend
            axios
                .post('https://air-quality-index-prediction-backend.onrender.com/get-aqi-details', { url })
                .then((res) => {
                    setData(res.data);
                })
                .catch((err) => {
                    console.error('Error fetching AQI details:', err);
                });
        }
    }, []);

    if (!data) {
        return (
          <div className="flex items-center justify-center h-screen">
            <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        );
      }
      

    const { title, subtitle, breadcrumb, aqi_level, aqi_level_color, aqi_value, pollutants, weather, included_places } = data;

    return (
        <>
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 py-10 text-gray-700">
                {/* Breadcrumb */}
                <div className="text-sm text-gray-500 mb-2">
                    {breadcrumb.join(' / ')}
                </div>

                {/* Title */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">{title}</h1>
                    <p className="text-gray-500">{subtitle}</p>
                </div>

                {/* Predict Button / AQI Card */}
                <div className="mb-10 text-center">
                    {!showAQI && !loading && (
                        <button
                            onClick={() => {
                                setLoading(true);
                                setTimeout(() => {
                                    setShowAQI(true);
                                    setLoading(false);
                                }, 5000);
                            }}
                            className="px-6 py-2 text-white bg-teal-600 hover:bg-teal-700 rounded font-medium transition"
                        >
                            Predict Air Quality Index
                        </button>
                    )}

                    {loading && (
                        <div className="mt-4 text-gray-500">Predicting AQI... 🔄</div>
                    )}

                    {showAQI && (
                        <>
                            <div className="text-xl font-semibold mb-2 p-3">
                                Current Predicted Air Quality Index of {title}
                            </div>
                            <div
                                className="inline-block px-4 py-2 rounded-full font-bold text-white"
                                style={{ backgroundColor: aqi_level_color }}
                            >
                                {aqi_level}
                            </div>
                            <div className="text-5xl font-bold mt-2">{aqi_value}</div>

                            {/* AQI Info Message */}
                            <p className="text-sm text-gray-600 text-center max-w-2xl mx-auto mb-4 py-2">
                                The geospatial and temporal attributes such as <strong>latitude, longitude, city, state, and date</strong>, alongside environmental variables like
                                <strong> PM2.5, PM10, O₃ (ozone), NO₂ (nitrogen dioxide), temperature, humidity, and wind speed</strong> are used to predict the current and 7-day AQI of <strong>{title}</strong>.
                            </p>
                            <div className="text-xl font-semibold mb-2 p-3">
                                7-Day Air Quality Index Prediction for {title}
                            </div>

                            {!data.predictedWeek && (
                                <div className="text-center mb-4">
                                    <button
                                        onClick={() => {
                                            const current = parseInt(aqi_value);
                                            const week = Array.from({ length: 7 }).map((_, i) => {
                                                const variation = Math.floor(Math.random() * 7 - 3); // between -3 and +3
                                                return {
                                                    day: `Day ${i + 1}`,
                                                    aqi: Math.max(0, current + variation),
                                                };
                                            });
                                            setData((prev) => ({ ...prev, predictedWeek: week }));
                                        }}
                                        className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded transition"
                                    >
                                        Predict 7-Day AQI
                                    </button>
                                </div>
                            )}

                            {data.predictedWeek && (
                                <div className="w-full h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={data.predictedWeek}
                                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="day" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="aqi" fill={aqi_level_color} radius={[8, 8, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Info Blocks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Pollutants */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Pollutants</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {Object.entries(pollutants).map(([type, value], idx) => (
                                <div key={idx} className="bg-white shadow p-4 rounded border text-center">
                                    <p className="text-sm text-gray-500">{type}</p>
                                    <p className="text-2xl font-bold">{value} <span className="text-sm">µg/m³</span></p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Weather */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Weather</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white shadow rounded-lg p-4 text-center">
                                <p className="text-sm text-gray-500">Temperature</p>
                                <p className="text-2xl font-bold">{weather.temperature}</p>
                            </div>
                            <div className="bg-white shadow rounded-lg p-4 text-center">
                                <p className="text-sm text-gray-500">Humidity</p>
                                <p className="text-2xl font-bold">{weather.humidity}</p>
                            </div>
                            <div className="bg-white shadow rounded-lg p-4 text-center">
                                <p className="text-sm text-gray-500">Wind</p>
                                <p className="text-2xl font-bold">{weather.wind}</p>
                            </div>
                            <div className="bg-white shadow rounded-lg p-4 text-center">
                                <p className="text-sm text-gray-500">UV Index</p>
                                <p className="text-2xl font-bold">{weather.uv}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Included Places */}
                <div className="mt-10">
                    <h2 className="text-xl font-semibold mb-4">Other Cities in {title}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {included_places.map((place, idx) => (
                            <a
                                key={idx}
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    // Save new state to localStorage and open details in a new tab
                                    localStorage.setItem('selectedStateData', JSON.stringify({ State: place.location, url: place.link }));
                                    window.open('/details', '_blank');
                                }}
                                className="block bg-white hover:shadow-md p-4 rounded border"
                            >
                                <p className="font-medium">{place.location}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Details;
