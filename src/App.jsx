import { useEffect, useState } from "react";
import { getNextHoliday } from "./api";
import HolidayCard from "./components/HolidayCard";

function App() {
  const [holiday, setHoliday] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getNextHoliday('CL')
      .then(setHoliday)
      .catch(e => setError(e.message));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Próximo feriado en Chile</h1>
      {error ? <p style={{color:'red'}}>{error}</p> : <HolidayCard holiday={holiday} />}
    </div>
  );
}

export default App;
