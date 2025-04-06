import { adhanService } from './adhanService';

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error('Bildirim izni alınamadı:', error);
    return false;
  }
};

export const sendPrayerNotification = async (prayerName, isUpcoming = false) => {
  if (!('Notification' in window)) {
    console.log('Bu tarayıcı bildirim desteği sunmuyor');
    return;
  }

  if (Notification.permission === 'granted') {
    const message = isUpcoming 
      ? `${prayerName} vaktine 5 dakika kaldı.`
      : `${prayerName} vakti girdi. Allah kabul etsin.`;

    try {
      // Bildirim gönder
      const notification = new Notification('Namaz Vakti', {
        body: message,
        icon: '/logo192.png',
        badge: '/logo192.png',
        vibrate: [200, 100, 200],
        tag: isUpcoming ? 'upcoming-prayer' : 'prayer-time',
        renotify: true,
        silent: false // Sistem bildirim sesini kullan
      });

      notification.onclick = function() {
        window.focus();
        notification.close();
      };

      // Vakit girdiyse ve mobil değilse ezan çal
      if (!isUpcoming && !isMobileDevice()) {
        await adhanService.play();
      }
    } catch (error) {
      console.error('Bildirim gönderilemedi:', error);
    }
  }
};

// Mobil cihaz kontrolü
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const checkPrayerTime = (prayerTimes) => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;

  Object.entries(prayerTimes).forEach(([name, time]) => {
    // Vakit girdiğinde bildirim ve ezan
    if (time === currentTime) {
      sendPrayerNotification(name);
    }

    // 5 dakika öncesi için kontrol
    const [hour, minute] = time.split(':').map(Number);
    const prayerMinutes = hour * 60 + minute;
    const currentMinutes = currentHour * 60 + currentMinute;
    
    // Vakit girmesine 5 dakika kala bildirim
    if (prayerMinutes - currentMinutes === 5) {
      sendPrayerNotification(name, true);
    }
  });
};

// Test fonksiyonu - Geliştirme aşamasında kullanmak için
export const testNotification = (prayerTimes) => {
  const now = new Date();
  const testTime = new Date(now.getTime() + 2 * 60000); // 2 dakika sonrası
  const testHour = testTime.getHours();
  const testMinute = testTime.getMinutes();
  
  console.log('Test bildirimi için vakit:', `${testHour}:${testMinute}`);
  
  Object.entries(prayerTimes).forEach(([name, time]) => {
    const [hour, minute] = time.split(':').map(Number);
    if (hour === testHour && minute === testMinute) {
      console.log(`${name} vakti için test bildirimi gönderilecek`);
      sendPrayerNotification(name, true);
    }
  });
}; 