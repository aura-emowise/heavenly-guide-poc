// src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import SkyView from './components/SkyView';
import { calculateSunsetInfo, getISSData } from './logic/simulationEngine'; // Убрали 'calculatePlanetPositions'

const LOCATIONS = {
  istanbul: { name: 'Elite World Grand İstanbul', latitude: 41.01897, longitude: 28.81055, viewAzimuth: 270 },
  florida: { name: 'Kennedy Space Center, FL', latitude: 28.5729, longitude: -80.6490, viewAzimuth: 135 },
  iceland: { name: 'Reykjavík, Iceland', latitude: 64.1466, longitude: -21.9426, viewAzimuth: 0 },
};

function App() {
  // Начинаем с 'sunset' по умолчанию
  const [activeEvent, setActiveEvent] = useState('sunset');
  const [skyObjects, setSkyObjects] = useState([]);
  
  const getCleanDate = (date) => {
    const d = new Date(date);
    return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  };
  
  const [currentDate, setCurrentDate] = useState(getCleanDate(new Date()));
  const [currentLocationKey, setCurrentLocationKey] = useState('istanbul');

  const handleDateChange = (e) => {
    if (e.target.value) {
      setCurrentDate(getCleanDate(e.target.value));
    }
  };
  
  useEffect(() => {
    const location = LOCATIONS[currentLocationKey];
    let objects = [];

    if (activeEvent === 'sunset') {
      const sunset = calculateSunsetInfo(currentDate, location);
      objects = [{ name: 'Sun', azimuth: sunset.azimuth, altitude: 0, type: 'sun' }];
    } else if (activeEvent === 'iss_pass') {
      objects = getISSData();
    }
    setSkyObjects(objects);
  }, [activeEvent, currentDate, currentLocationKey]);

  return (
    <div className="App">
      <header className="App-header"><h1>Heavenly Guide</h1><h2>Interactive Simulation Engine</h2></header>
      <div className="main-card">
        <div className="controls-panel">
          <div className="control-item">
            <label htmlFor="location-select">Select Location:</label>
            <select id="location-select" value={currentLocationKey} onChange={(e) => setCurrentLocationKey(e.target.value)}>
              {Object.keys(LOCATIONS).map(key => (
                <option key={key} value={key}>{LOCATIONS[key].name}</option>
              ))}
            </select>
          </div>
          <div className="control-item">
            <label htmlFor="date-select">Select Date:</label>
            <input type="date" id="date-select" value={currentDate.toISOString().split('T')[0]} onChange={handleDateChange} />
          </div>
        </div>
        <div className="simulation-controls">
          <div className="event-buttons">
            <button className={`event-button ${activeEvent === 'sunset' ? 'active' : ''}`} onClick={() => setActiveEvent('sunset')}>Sunset</button>
            <button className={`event-button ${activeEvent === 'iss_pass' ? 'active' : ''}`} onClick={() => setActiveEvent('iss_pass')}>ISS Pass</button>
          </div>
          <SkyView objects={skyObjects} viewAzimuth={LOCATIONS[currentLocationKey].viewAzimuth} />
        </div>
      </div>
    </div>
  );
}

export default App;