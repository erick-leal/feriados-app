// src/api.js
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

export async function getNextHoliday(country = 'CL') {
  const now = new Date();
  const y = now.getFullYear();

  const [thisYear, nextYear] = await Promise.all([
    fetchHolidays(y, country),
    fetchHolidays(y + 1, country),
  ]);

  const all = [...thisYear, ...nextYear];
  const upcoming = all
    .map(h => ({ ...h, _date: parseYMD(h.date) })) // Nager usa "date", "localName", "name", etc.
    .filter(h => h._date >= new Date(now.toDateString())) // ignora los ya pasados (hoy cuenta)
    .sort((a, b) => a._date - b._date)[0];

  return upcoming || null;
}
