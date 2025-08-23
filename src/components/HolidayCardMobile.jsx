import { useEffect, useState } from 'react';
import '../styles/HolidayCardMobile.css';

export default function HolidayCardMobile({ holiday, country }) {
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
    if (days === 0) return '#ff4444'; // Rojo para el día del evento
    if (days <= 7) return '#ffbb33';  // Amarillo para menos de una semana
    return '#00C851';                 // Verde para más de una semana
  };

  if (!holiday) {
    return (
      <div className="mobile-container">
        <p className="holiday-empty">Cargando próximos feriados...</p>
      </div>
    );
  }
  
  // Asegurar que siempre tengamos un objeto de país con valores por defecto
  const countryData = country || { 
    name: 'Chile', 
    code: 'CL'
  };
  
  // URL para la bandera del país usando el código de país en minúsculas
  const flagUrl = `https://flagcdn.com/48x36/${countryData.code.toLowerCase()}.png`;
  
  return (
    <div className="mobile-container" style={{ '--progress-color': getProgressColor() }}>
      <div className="countdown-container">
        <div style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          margin: '0 0 0.5rem 0',
          color: 'var(--text-color)'
        }}>Faltan:</div>
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
      <div className="holiday-info">
        <p className="holiday-name">{holiday.localName}</p>
        <p className="holiday-date">
          {new Date(holiday.date).toLocaleDateString('es-CL', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>
    </div>
  );
}
