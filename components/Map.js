import React, { useEffect, useState } from 'react';
import states from '@/json/states.json';

function Dashboard() {
  const [LMap, setLMap] = useState(null);

  useEffect(() => {
    // Import Leaflet styles
    import('leaflet/dist/leaflet.css');
    // Dynamically import components for client-side only
    import('react-leaflet').then(({ MapContainer, TileLayer, CircleMarker, Popup }) => {
      setLMap(() => ({ MapContainer, TileLayer, CircleMarker, Popup }));
    });
  }, []);

  const handlePopupClick = (state) => {
    // Update localStorage with state data
    localStorage.setItem('selectedStateData', JSON.stringify(state));
    // Navigate to /details
    window.location.href = '/details';
  };

  if (!LMap) return <div>Loading map...</div>;

  const { MapContainer, TileLayer, CircleMarker, Popup } = LMap;

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
      <MapContainer
        center={[22.9734, 78.6569]}
        zoom={5}
        style={{ height: '70vh', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {states.map((state, idx) => (
          <CircleMarker
            key={idx}
            center={[state.Latitude, state.Longitude]}
            radius={8}
            pathOptions={{
              color: 'teal',
              fillColor: 'teal',
              fillOpacity: 0.7,
            }}
          >
            <Popup>
              <div className="space-y-1">
                <p><strong>{state.State}</strong></p>
                <p>Lat: {state.Latitude.toFixed(4)}</p>
                <p>Lng: {state.Longitude.toFixed(4)}</p>
                <button
                  onClick={() => handlePopupClick(state)}
                  className="text-teal-600 underline text-sm mt-1"
                >
                  View Details
                </button>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Dashboard;
