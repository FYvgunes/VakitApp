export const getCurrentDate = () => {
  const today = new Date();
  
  // Miladi tarih
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    weekday: 'long' 
  };
  const gregorianDate = today.toLocaleDateString('tr-TR', options);

  // Hicri tarih - 2024 Ramazan başlangıcı: 11 Mart
  const ramazanStart = new Date(2024, 2, 11); // Mart ayı 2. index (0-based)
  const diffDays = Math.floor((today - ramazanStart) / (1000 * 60 * 60 * 24));
  const ramazanDay = diffDays + 1;

  return {
    gregorian: gregorianDate,
    hijri: `${ramazanDay} Ramazan 1445`
  };
}; 