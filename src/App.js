// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import SkyView from './components/SkyView';
import { calculateSunriseInfo, calculateSunsetInfo, getLaunchTrajectory } from './logic/simulationEngine';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const FAKE_WEATHER_REPORTS = [
  { temp: "72°F", cloud: "Clear Sky (0%)", wind: "5 mph NW", precip: "0%" },
  { temp: "68°F", cloud: "Light Clouds (15%)", wind: "8 mph W", precip: "5%" },
  { temp: "75°F", cloud: "Broken Clouds (60%)", wind: "2 mph S", precip: "10%" },
];
const DEMO_LOCATIONS = {
  vegas: { id: 'vegas', name: 'Palms Casino, Las Vegas', eventType: 'Sunrise', icon: '☀️', coords: { lat: 36.1147, lng: -115.1947, viewAzimuth: 90 }, photoUrl: '/vegas-sunrise.jpg', award: { icon: '🎰', title: 'Vegas Dawn', description: 'Witnessed a sunrise over the city of lights.' }},
  monica: { id: 'monica', name: 'Santa Monica Pier, CA', eventType: 'Sunset', icon: '🌅', coords: { lat: 34.0104, lng: -118.4967, viewAzimuth: 270 }, photoUrl: '/monica-sunset.jpg', award: { icon: '🎡', title: 'Pacific Sunset', description: 'Watched the sun dip into the Pacific Ocean.' }},
  vandenberg: { id: 'vandenberg', name: 'Vandenberg SFB, CA', eventType: 'Rocket Launch', icon: '🚀', coords: { lat: 34.7420, lng: -120.5724, viewAzimuth: 180 }, photoUrl: '/vandenberg-launch.jpg', award: { icon: '🛰️', title: 'Rocket Chaser', description: 'Tracked a Falcon 9 on its journey to orbit.' }}
};

const MapComponent = ({ location }) => {
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }); // !!!  !!!
  const mapContainerStyle = { width: '100%', height: '250px', borderRadius: '8px' };
  return isLoaded ? (<GoogleMap mapContainerStyle={mapContainerStyle} center={location.coords} zoom={14}><Marker position={location.coords} /></GoogleMap>) : <p>Loading Map...</p>;
};

const AwardPopup = ({ award, onClose }) => (
  <div className="award-popup" onClick={onClose}>
    <span className="award-icon">{award.icon}</span>
    <div className="award-details">
      <h4>Achievement Unlocked!</h4>
      <p><b>{award.title}:</b> {award.description}</p>
    </div>
  </div>
);

function App() {
  const [currentView, setCurrentView] = useState('menu');
  const [activeTour, setActiveTour] = useState(null);
  const [tourLog, setTourLog] = useState([]);
  const [isSimComplete, setIsSimComplete] = useState(false);
  const [showAward, setShowAward] = useState(false);
  
  const startTour = (locationId) => {
    const tourInfo = DEMO_LOCATIONS[locationId];
    setIsSimComplete(false);
    setShowAward(false);
    setTourLog([`Goal: Plan a perfect ${tourInfo.eventType} in ${tourInfo.name}.`]);
    setActiveTour({ ...tourInfo, weather: FAKE_WEATHER_REPORTS[Math.floor(Math.random() * FAKE_WEATHER_REPORTS.length)], skyObjects: [] });
    setCurrentView('dashboard');
  };

  useEffect(() => {
    if (!activeTour || isSimComplete) return;
    const tourSteps = [
      () => setTourLog(prev => [...prev, `> Location locked: ${activeTour.coords.lat}° N, ${activeTour.coords.lng}° W ✓`]),
      () => setTourLog(prev => [...prev, `> Checking local weather forecast... ${activeTour.weather.cloud} ✓`]),
      () => setTourLog(prev => [...prev, `> Calculating ${activeTour.eventType.toLowerCase()} trajectory... ✓`]),
      () => {
        const simulation = activeTour.eventType === 'Sunrise' ? calculateSunriseInfo(new Date(), activeTour.coords) : activeTour.eventType === 'Sunset' ? calculateSunsetInfo(new Date(), activeTour.coords) : getLaunchTrajectory();
        const objects = Array.isArray(simulation) ? simulation : [{ name: 'Sun', azimuth: simulation.azimuth, altitude: 0, type: 'sun' }];
        setActiveTour(prev => ({...prev, skyObjects: objects}));
        setTourLog(prev => [...prev, `> Rendering simulation... ✓`]);
      },
      () => {
        setIsSimComplete(true);
        setShowAward(true); 
      },
    ];
    let currentStep = tourLog.length - 1;
    if(currentStep < tourSteps.length) {
      const timer = setTimeout(tourSteps[currentStep], 2200);
      return () => clearTimeout(timer);
    }
  }, [tourLog, activeTour, isSimComplete]);

  const resetApp = () => { setCurrentView('menu'); setActiveTour(null); setShowAward(false); };
  
  const RenderView = () => {
    if (currentView === 'dashboard') {
      const bookUrl = `https://www.google.com/travel/hotels/${encodeURIComponent(activeTour.name)}`;
      return (
        <div className="results-dashboard">
          <div className="main-content">
            {isSimComplete ? (
              <div className="comparison-container animate-fade-in">
                <h3>Simulation Complete</h3>
                <div className="comparison-view">
                  <div className="image-box"><h4>Actual Photo</h4><img src={activeTour.photoUrl} alt={activeTour.name} /></div>
                  <div className="image-box"><h4>Our Simulation</h4><SkyView objects={activeTour.skyObjects} viewAzimuth={activeTour.coords.viewAzimuth} /></div>
                </div>
              </div>
            ) : <div className="placeholder"><h3>Planning your experience...</h3></div>}
            <div className={`supplementary-info-grid ${isSimComplete ? 'animate-fade-in' : ''}`}>
              <div className="sidebar-widget"><h4>Conditions</h4><p><strong>Temperature:</strong><span>{activeTour.weather.temp}</span></p><p><strong>Cloud Cover:</strong><span>{activeTour.weather.cloud}</span></p><p><strong>Wind:</strong><span>{activeTour.weather.wind}</span></p><p><strong>Precipitation:</strong><span>{activeTour.weather.precip}</span></p></div>
              <div className="sidebar-widget"><h4>Map</h4><MapComponent location={activeTour} /></div>
            </div>
          </div>
          <div className="sidebar">
            <div className="sidebar-widget"><h4>Process Log</h4><div className="process-log-content">{tourLog.map((text, index) => <p key={index} className="status-line">{text}</p>)}</div></div>
            {isSimComplete && (
              <div className="animate-fade-in sidebar-content-wrapper">
                <div className="sidebar-widget">
                  <h4>Event Details</h4><p><strong>Location:</strong><span>{activeTour.name}</span></p><p><strong>Event:</strong><span>{activeTour.eventType}</span></p>
                  <a href={bookUrl} target="_blank" rel="noopener noreferrer" className="book-now-button">Book on Google Hotels</a>
                </div>
                <button className="cta-button" onClick={resetApp}>Start New Plan</button>
              </div>
            )}
          </div>
        </div>
      );
    }
    return (
      <>
        <h2 className="subtitle">Select a curated experience to begin v2</h2>
        <div className="tour-selection-container">
          {Object.values(DEMO_LOCATIONS).map(loc => (<div key={loc.id} className="menu-card" onClick={() => startTour(loc.id)}><span className="menu-card-icon">{loc.icon}</span><h3>{loc.eventType}</h3><p>{loc.name}</p></div>))}
        </div>
      </>
    );
  };
  return (<div className="App"><header className="App-header"><h1>Heavenly Guide</h1></header><main><RenderView /></main>{isSimComplete && showAward && <AwardPopup award={activeTour.award} onClose={() => setShowAward(false)} />}</div>);
}
export default App;