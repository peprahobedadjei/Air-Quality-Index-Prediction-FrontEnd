import React from 'react'

function Info() {
    return (
        <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
            <p className="">
                The dataset for this project integrates real-time sensor data from <strong>OpenAQ</strong>, a global open-source air quality platform.
                It includes geospatial and temporal attributes such as <strong>latitude, longitude, city, state, and date</strong>, alongside environmental variables like
                <strong> PM2.5, PM10, O₃ (ozone), NO₂ (nitrogen dioxide), temperature, humidity, and wind speed</strong>.
                These features collectively allow the AI model to perform accurate AQI predictions and visualize spatial trends in air pollution across various regions.
            </p>
        </div>
    )
}

export default Info