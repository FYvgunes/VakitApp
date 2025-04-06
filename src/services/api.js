import axios from 'axios';

const API_BASE_URL = 'https://api.aladhan.com/v1';

// Türkiye şehirleri
const cities = [
  { id: "istanbul", name: "İstanbul", coordinates: { lat: 41.0082, lng: 28.9784 } },
  { id: "ankara", name: "Ankara", coordinates: { lat: 39.9334, lng: 32.8597 } },
  { id: "izmir", name: "İzmir", coordinates: { lat: 38.4237, lng: 27.1428 } },
  { id: "bursa", name: "Bursa", coordinates: { lat: 40.1885, lng: 29.0610 } },
  { id: "antalya", name: "Antalya", coordinates: { lat: 36.8841, lng: 30.7056 } },
  { id: "adana", name: "Adana", coordinates: { lat: 37.0000, lng: 35.3213 } }
];

export const fetchCities = async () => {
  return cities;
};

export const fetchPrayerTimes = async (cityId) => {
  try {
    const city = cities.find(c => c.id === cityId);
    if (!city) throw new Error('Şehir bulunamadı');

    const date = new Date();
    const response = await axios.get(`${API_BASE_URL}/timings/${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`, {
      params: {
        latitude: city.coordinates.lat,
        longitude: city.coordinates.lng,
        method: 13 // Diyanet İşleri metodu
      }
    });

    const times = response.data.data.timings;
    return {
      Imsak: times.Fajr,
      Gunes: times.Sunrise,
      Ogle: times.Dhuhr,
      Ikindi: times.Asr,
      Aksam: times.Maghrib,
      Yatsi: times.Isha
    };
  } catch (error) {
    console.error('API Hatası:', error);
    throw new Error('Namaz vakitleri alınamadı');
  }
}; 