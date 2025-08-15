// src/components/HolidayCard.jsx
import "../styles/HolidayCard.css";

export default function HolidayCard({ holiday }) {
  if (!holiday) return <p className="holiday-empty">No se encontraron feriados próximos.</p>;

  const target = new Date(`${holiday.date}T00:00:00`);
  const today  = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const diffDays = Math.ceil((target - today) / msPerDay);

  return (
    <div className="holiday-card" role="article" aria-label="Próximo feriado">
      <h2 className="holiday-title">{holiday.localName}</h2>
      <p className="holiday-subtitle">{holiday.name}</p>
      <p className="holiday-date">{holiday.date}</p>
      <h3 className="holiday-count">
        {diffDays >= 0
          ? <>Faltan {diffDays} día{diffDays === 1 ? "" : "s"}</>
          : <>Pasaron {Math.abs(diffDays)} día{Math.abs(diffDays) === 1 ? "" : "s"}</>}
      </h3>
    </div>
  );
}
