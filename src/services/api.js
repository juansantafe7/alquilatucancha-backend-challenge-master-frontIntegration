import axios from 'axios';

// Configura la URL base de la API (backend)
const api = axios.create({
  baseURL: 'http://localhost:3000', // Cambia si tu backend usa otro puerto
});

// Función para buscar disponibilidad
export const searchAvailability = (placeId, date) => {
  return api.get(`/search`, { params: { placeId, date } });
};
