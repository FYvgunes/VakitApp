const islamicHolidays = [
  {
    id: 1,
    name: "Regaib Kandili",
    date: "2025-01-23",
    description: "Üç ayların başlangıcı ve mübarek kandil gecesi",
    type: "religious",
    importance: "medium"
  },
  {
    id: 2,
    name: "Miraç Kandili",
    date: "2025-02-24",
    description: "Hz. Muhammed'in miracı ve mübarek kandil gecesi",
    type: "religious",
    importance: "medium"
  },
  {
    id: 3,
    name: "Berat Kandili",
    date: "2025-03-24",
    description: "Günahların affedildiği mübarek gece",
    type: "religious",
    importance: "medium"
  },
  {
    id: 4,
    name: "Ramazan Başlangıcı",
    date: "2025-03-01",
    description: "Ramazan ayının ilk günü ve oruç ibadeti başlangıcı",
    type: "religious",
    importance: "high"
  },
  {
    id: 5,
    name: "Kadir Gecesi",
    date: "2025-03-27",
    description: "Kur'an'ın indirildiği ve bin aydan hayırlı olan mübarek gece",
    type: "religious",
    importance: "high"
  },
  {
    id: 6,
    name: "Ramazan Bayramı",
    date: "2025-03-30",
    description: "Ramazan ayının sona ermesiyle kutlanan mübarek bayram",
    type: "holiday",
    importance: "high",
    duration: 3
  },
  {
    id: 7,
    name: "Kurban Bayramı",
    date: "2025-06-06",
    description: "Hz. İbrahim'in oğlu Hz. İsmail'i kurban etme hadisesinin anısına kutlanan mübarek bayram",
    type: "holiday",
    importance: "high",
    duration: 4
  },
  {
    id: 8,
    name: "Hicri Yılbaşı",
    date: "2025-07-29",
    description: "1447 Hicri yılının başlangıcı",
    type: "religious",
    importance: "medium"
  },
  {
    id: 9,
    name: "Aşure Günü",
    date: "2025-08-07",
    description: "Muharrem ayının 10. günü ve Hz. Nuh'un gemisinin karaya oturduğu gün",
    type: "religious",
    importance: "medium"
  },
  {
    id: 10,
    name: "Mevlid Kandili",
    date: "2025-09-04",
    description: "Hz. Muhammed'in doğum günü ve mübarek kandil gecesi",
    type: "religious",
    importance: "high"
  }
];

export const getIslamicHolidays = () => {
  return islamicHolidays;
};

export const getUpcomingHolidays = (count = 3) => {
  const today = new Date();
  return islamicHolidays
    .filter(holiday => new Date(holiday.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, count);
};

export const formatHolidayDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}; 