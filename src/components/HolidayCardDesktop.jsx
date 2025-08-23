import { useEffect, useState } from 'react';
import '../styles/HolidayCardDesktop.css';

export default function HolidayCardDesktop({ holiday }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [holiday]);

  function calculateTimeLeft() {
    if (!holiday) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    
    const target = new Date(`${holiday.date}T00:00:00`);
    const now = new Date();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  const getProgressColor = () => {
    const { days } = timeLeft;
    if (days === 0) return '#ff4444';
    if (days <= 7) return '#ffbb33';
    return '#00C851';
  };

  if (!holiday) {
    return (
      <div className="desktop-container">
        <p className="holiday-empty">Cargando próximos feriados...</p>
      </div>
    );
  }
    
  return (
    <div className="desktop-card" style={{ '--progress-color': getProgressColor() }}>
        <div className="countdown-section">
          <div className="countdown-wrapper">
            <h2>Faltan:</h2>
            <div className="countdown">
              <div className="countdown-item">
                <span className="countdown-value">{timeLeft.days}</span>
                <span className="countdown-label">días</span>
              </div>
              <div className="countdown-separator">:</div>
              <div className="countdown-item">
                <span className="countdown-value">{timeLeft.hours.toString().padStart(2, '0')}</span>
                <span className="countdown-label">horas</span>
              </div>
              <div className="countdown-separator">:</div>
              <div className="countdown-item">
                <span className="countdown-value">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                <span className="countdown-label">min</span>
              </div>
              <div className="countdown-separator">:</div>
              <div className="countdown-item">
                <span className="countdown-value">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                <span className="countdown-label">seg</span>
              </div>
            </div>
          </div>
        </div>
        <div className="holiday-info">
          <div className="holiday-content">
            <h1 className="holiday-name">{holiday.localName}</h1>
            <div className="holiday-date">
              {new Date(holiday.date).toLocaleDateString('es-CL', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>
      </div>
  );
}
