// src/components/SkyView.js
import React from 'react';
import './SkyView.css';

// ИСПРАВЛЕНИЕ ДЛЯ ГОРИЗОНТА: Эта функция переводит градусы в буквы (N, E, S, W)
const getDirectionLabel = (azimuth) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(((azimuth % 360) / 45)) % 8;
  return directions[index];
};

const SkyView = ({ objects, viewAzimuth, fieldOfView = 90 }) => {
  
  // ИСПРАВЛЕНИЕ ДЛЯ ГОРИЗОНТА: Рассчитываем метки динамически
  const leftLabel = getDirectionLabel(viewAzimuth - fieldOfView / 2);
  const centerLabel = getDirectionLabel(viewAzimuth);
  const rightLabel = getDirectionLabel(viewAzimuth + fieldOfView / 2);
  
  const renderObject = (obj, index) => {
    const viewMin = viewAzimuth - fieldOfView / 2;
    const viewMax = viewAzimuth + fieldOfView / 2;
    if (obj.azimuth < viewMin || obj.azimuth > viewMax) return null;
    const leftPercent = ((obj.azimuth - viewMin) / fieldOfView) * 100;
    const bottomPercent = (obj.altitude / 90) * 100;
    const style = { left: `${leftPercent}%`, bottom: `${bottomPercent}%` };

    // ИСПРАВЛЕНИЕ ДЛЯ СОЛНЦА: Добавляем специальный класс, если это Солнце
    const objectClass = obj.type === 'sun' ? 'sky-object sun' : 'sky-object';

    return (
      <div key={index} className={objectClass} style={style} title={obj.name}>
        <span className="object-label">{obj.name}</span>
      </div>
    );
  };

  return (
    <div className="sky-view-container">
      <div className="sky-view-window">{objects.map(renderObject)}</div>
      <div className="horizon-line">
        {/* ИСПРАВЛЕНИЕ ДЛЯ ГОРИЗОНТА: Используем динамические метки */}
        <span>{leftLabel}</span>
        <span>{centerLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
};

export default SkyView;