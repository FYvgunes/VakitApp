export const calculateRemainingTime = (prayerTime) => {
  if (!prayerTime) return '';

  const now = new Date();
  const [hours, minutes] = prayerTime.split(':').map(Number);
  const prayerDate = new Date();
  prayerDate.setHours(hours, minutes, 0, 0);

  // Eğer vakit geçmişse, sonraki güne ayarla
  if (prayerDate < now) {
    prayerDate.setDate(prayerDate.getDate() + 1);
  }

  const diff = prayerDate - now;
  const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
  const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secondsLeft = Math.floor((diff % (1000 * 60)) / 1000);

  let remainingText = '';
  if (hoursLeft > 0) {
    remainingText += `${hoursLeft} saat `;
  }
  if (minutesLeft > 0 || hoursLeft > 0) {
    remainingText += `${minutesLeft} dakika `;
  }
  remainingText += `${secondsLeft} saniye`;

  return remainingText;
};

export const getNextPrayer = (prayerTimes) => {
  if (!prayerTimes) return { name: '', time: '' };

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTotalMinutes = currentHour * 60 + currentMinute;

  const prayers = [
    { name: 'İmsak', time: prayerTimes.Imsak },
    { name: 'Güneş', time: prayerTimes.Gunes },
    { name: 'Öğle', time: prayerTimes.Ogle },
    { name: 'İkindi', time: prayerTimes.Ikindi },
    { name: 'Akşam', time: prayerTimes.Aksam },
    { name: 'Yatsı', time: prayerTimes.Yatsi }
  ];

  // Her vaktin toplam dakikasını hesapla
  const prayerMinutes = prayers.map(prayer => {
    const [hours, minutes] = prayer.time.split(':').map(Number);
    return {
      ...prayer,
      totalMinutes: hours * 60 + minutes
    };
  });

  // Şu anki vakitten sonraki ilk vakti bul
  const nextPrayer = prayerMinutes.find(prayer => prayer.totalMinutes > currentTotalMinutes);

  // Eğer tüm vakitler geçmişse, yarının ilk vakti
  return nextPrayer || prayers[0];
};

export const getCurrentPrayer = (prayerTimes) => {
  if (!prayerTimes) return null;

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTotalMinutes = currentHour * 60 + currentMinute;

  const prayers = [
    { name: 'İmsak', time: prayerTimes.Imsak },
    { name: 'Güneş', time: prayerTimes.Gunes },
    { name: 'Öğle', time: prayerTimes.Ogle },
    { name: 'İkindi', time: prayerTimes.Ikindi },
    { name: 'Akşam', time: prayerTimes.Aksam },
    { name: 'Yatsı', time: prayerTimes.Yatsi }
  ];

  // Her vaktin dakika cinsinden değerini hesapla
  const prayerMinutes = prayers.map(prayer => {
    const [hours, minutes] = prayer.time.split(':').map(Number);
    return {
      ...prayer,
      totalMinutes: hours * 60 + minutes
    };
  });

  // Şu anki vakti bul
  let currentPrayer = prayerMinutes[prayerMinutes.length - 1]; // Varsayılan olarak Yatsı

  for (let i = 0; i < prayerMinutes.length; i++) {
    const currentPrayerTime = prayerMinutes[i].totalMinutes;
    const nextPrayerTime = prayerMinutes[i + 1]?.totalMinutes || 24 * 60;

    if (currentTotalMinutes >= currentPrayerTime && 
        (i === prayerMinutes.length - 1 || currentTotalMinutes < nextPrayerTime)) {
      currentPrayer = prayerMinutes[i];
      break;
    }
  }

  // Gece yarısından sonra, imsak öncesi için özel durum
  const imsakMinutes = prayerMinutes[0].totalMinutes;
  const yatsiMinutes = prayerMinutes[prayerMinutes.length - 1].totalMinutes;

  if (currentTotalMinutes < imsakMinutes || currentTotalMinutes >= yatsiMinutes) {
    currentPrayer = prayerMinutes[prayerMinutes.length - 1]; // Yatsı
  }

  return currentPrayer;
};