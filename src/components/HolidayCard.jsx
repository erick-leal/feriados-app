// src/components/HolidayCard.jsx
export default function HolidayCard({ holiday }) {
    if (!holiday) return <p>No se encontraron feriados próximos.</p>;
  
    const target = new Date(`${holiday.date}T00:00:00`);
    const diffDays = Math.ceil((target - new Date()) / (1000 * 60 * 60 * 24));
  
    return (
      <div style={{ background:'#f4f4f4', padding:20, borderRadius:8, textAlign:'center' }}>
        <h2>{holiday.localName}</h2>
        <p>{holiday.name}</p>
        <p>{holiday.date}</p>
        <h3>Faltan {diffDays} día{diffDays === 1 ? '' : 's'}</h3>
      </div>
    );
  }
  