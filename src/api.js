const API = 'https://date.nager.at/api/v3/PublicHolidays';

async function fetchHolidays(year, country = 'CL') {
  const res = await fetch(`${API}/${year}/${country}`);
  if (!res.ok) throw new Error(`Error API ${res.status}`);
  return res.json();
}

function parseYMD(ymd) {
  // Evita problemas de zona horaria sumando la "T00:00:00"
  return new Date(`${ymd}T00:00:00`);
}

export async function getNextHoliday(country = 'CL', dateString = null) {
  const now = dateString ? new Date(dateString) : new Date();
  const y = now.getFullYear();

  const [thisYear, nextYear] = await Promise.all([
    fetchHolidays(y, country).catch(() => []),
    fetchHolidays(y + 1, country).catch(() => []),
  ]);

  const all = [...thisYear, ...nextYear];
  const upcoming = all
    .map(h => ({ ...h, _date: parseYMD(h.date) }))
    .filter(h => h._date >= new Date(now.toDateString()))
    .sort((a, b) => a._date - b._date)[0];

  console.log('Buscando feriados después de:', now.toISOString().split('T')[0]);
  console.log('Próximo feriado encontrado:', upcoming);
  
  return upcoming || null;
}
