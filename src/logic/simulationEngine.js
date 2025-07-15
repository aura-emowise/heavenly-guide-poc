// src/logic/simulationEngine.js
import SunCalc from 'suncalc';

export function calculateSunsetInfo(date, location) {
  const times = SunCalc.getTimes(date, location.latitude, location.longitude);
  const sunPosition = SunCalc.getPosition(times.sunset, location.latitude, location.longitude);
  const azimuthDegrees = sunPosition.azimuth * (180 / Math.PI) + 180;
  return { time: times.sunset.toLocaleTimeString(), azimuth: azimuthDegrees };
}

export function getISSData() {
  return [
    { name: 'ISS Start', azimuth: 225, altitude: 10 },
    { name: 'ISS Peak', azimuth: 270, altitude: 45 },
    { name: 'ISS End', azimuth: 315, altitude: 10 },
  ];
}