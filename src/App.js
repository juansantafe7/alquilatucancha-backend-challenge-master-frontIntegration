import React, { useState } from 'react';
import { searchAvailability } from './services/api';

function App() {
  const [placeId, setPlaceId] = useState('');
  const [date, setDate] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await searchAvailability(placeId, date);
      setResults(response.data); // Guardar los resultados de la API
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };

  return (
    <div>
      <h1>Buscar Disponibilidad de Canchas</h1>
      <form onSubmit={handleSearch}>
        <label>
          Place ID:
          <input
            type="text"
            value={placeId}
            onChange={(e) => setPlaceId(e.target.value)}
            required
          />
        </label>
        <label>
          Fecha:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <button type="submit">Buscar</button>
      </form>

      <h2>Resultados:</h2>
      <div>
        {results.length > 0 ? (
          results.map((club, index) => (
            <div key={index}>
              <h3>{club.name}</h3>
              <p>Atributos: {club.attributes.join(', ')}</p>
              {club.courts.map((court, idx) => (
                <div key={idx}>
                  <h4>{court.name}</h4>
                  <p>Horarios Disponibles:</p>
                  <ul>
                    {court.available.map((slot, i) => (
                      <li key={i}>
                        {slot.start} - {slot.end} (${slot.price})
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>No hay resultados para mostrar.</p>
        )}
      </div>
    </div>
  );
}

export default App;
