export const findNearbyMosques = async (latitude, longitude) => {
  try {
    const radius = 5000; // 5km yarıçap
    
    // Overpass API sorgusu
    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="mosque"](around:${radius},${latitude},${longitude});
        way["amenity"="mosque"](around:${radius},${latitude},${longitude});
      );
      out body;
      >;
      out skel qt;
    `.trim();

    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `data=${encodeURIComponent(query)}`
    });

    if (!response.ok) {
      throw new Error('API yanıt vermedi');
    }

    const data = await response.json();
    
    // Cami verilerini düzenle
    const mosques = data.elements
      .filter(element => element.tags && element.tags.name) // İsmi olan camileri filtrele
      .map(element => ({
        id: element.id,
        name: element.tags.name || 'İsimsiz Cami',
        vicinity: element.tags['addr:street'] || 'Adres bilgisi yok',
        latitude: element.lat,
        longitude: element.lon,
        distance: calculateDistance(latitude, longitude, element.lat, element.lon)
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 10); // En yakın 10 camiyi göster

    return mosques;

  } catch (error) {
    console.error('Camiler bulunamadı:', error);
    throw new Error('Camiler bulunamadı: ' + error.message);
  }
};

// Mesafe hesaplama (Haversine formülü)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Dünya'nın yarıçapı (km)
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function toRad(value) {
  return value * Math.PI / 180;
}

function calculateBoundingBox(latitude, longitude, radius) {
  const R = 6371;
  const dLat = (radius / R) * (180 / Math.PI);
  const dLon = (radius / R) * (180 / Math.PI) / Math.cos(latitude * Math.PI / 180);

  return {
    north: latitude + dLat,
    south: latitude - dLat,
    east: longitude + dLon,
    west: longitude - dLon
  };
} 