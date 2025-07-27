// src/logic/simulationEngine.js
import SunCalc from 'suncalc';

// --- Sunrise & Sunset Calculation ---
export function calculateSunriseInfo(date, location) {
  const times = SunCalc.getTimes(date, location.latitude, location.longitude);
  const sunPosition = SunCalc.getPosition(times.sunrise, location.latitude, location.longitude);
  const azimuthDegrees = sunPosition.azimuth * (180 / Math.PI) + 180;
  return { time: times.sunrise.toLocaleTimeString(), azimuth: azimuthDegrees };
}
export function calculateSunsetInfo(date, location) {
  const times = SunCalc.getTimes(date, location.latitude, location.longitude);
  const sunPosition = SunCalc.getPosition(times.sunset, location.latitude, location.longitude);
  const azimuthDegrees = sunPosition.azimuth * (180 / Math.PI) + 180;
  return { time: times.sunset.toLocaleTimeString(), azimuth: azimuthDegrees };
}

// --- Weather API Integration ---
export async function getWeatherInfo(location) {
  const { latitude, longitude } = location;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}¤t=weather_code`;
  try {
    const response = await fetch(url);
    if (!response.ok) return "Data unavailable";
    const data = await response.json();
    return interpretWeatherCode(data.current.weather_code);
  } catch (error) {
    return "Network error";
  }
}
function interpretWeatherCode(code) {
  if (code === 0) return "Clear sky";
  if (code >= 1 && code <= 3) return "Partly cloudy";
  if (code >= 45 && code <= 48) return "Foggy";
  if (code >= 51 && code <= 67) return "Rainy";
  return "Cloudy";
}

// --- NEW: Rocket Launch Simulation ---
// In a real app, this data would come from a specialized API
export function getLaunchTrajectory() {
  // A simple south-bound trajectory from Vandenberg
  return [
    { name: 'Liftoff', azimuth: 180, altitude: 5, type: 'rocket' },
    { name: 'Max-Q', azimuth: 180, altitude: 25, type: 'rocket' },
    { name: 'MECO', azimuth: 180, altitude: 60, type: 'rocket' } // Main Engine Cut-Off
  ];
}