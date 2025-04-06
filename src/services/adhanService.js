class AdhanService {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
    this.isAutoplayAllowed = false;
  }

  async init() {
    try {
      // Autoplay politikasını kontrol et
      this.audio = new Audio('/adhan.mp3');
      this.audio.volume = 0;
      const playResult = await this.audio.play();
      if (playResult !== undefined) {
        await playResult;
        this.isAutoplayAllowed = true;
      }
    } catch (error) {
      this.isAutoplayAllowed = false;
    } finally {
      if (this.audio) {
        this.audio.pause();
        this.audio = null;
      }
    }
  }

  async play() {
    try {
      // Mobil cihazlarda kullanıcı etkileşimi gerekiyor
      if (!this.isAutoplayAllowed && !this.hasUserInteraction()) {
        console.log('Ezan çalmak için kullanıcı etkileşimi gerekiyor');
        return false;
      }

      // Önceki ezanı durdur
      if (this.isPlaying) {
        this.stop();
      }

      // Yeni ezan çal
      this.audio = new Audio('/adhan.mp3');
      
      // Ses seviyesini platform ve saat durumuna göre ayarla
      const hour = new Date().getHours();
      this.audio.volume = this.getAppropriateVolume(hour);

      // Ses yüklenmesini bekle
      await new Promise((resolve) => {
        this.audio.oncanplaythrough = resolve;
        this.audio.load();
      });

      await this.audio.play();
      this.isPlaying = true;

      // Ezan bittiğinde
      this.audio.onended = () => {
        this.isPlaying = false;
        this.audio = null;
      };

      return true;
    } catch (error) {
      console.error('Ezan çalınamadı:', error);
      this.isPlaying = false;
      this.audio = null;
      return false;
    }
  }

  stop() {
    if (this.audio && this.isPlaying) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
      this.audio = null;
    }
  }

  // Kullanıcı etkileşimini kontrol et
  hasUserInteraction() {
    return document.documentElement.hasAttribute('data-user-interacted');
  }

  // Saate göre uygun ses seviyesini belirle
  getAppropriateVolume(hour) {
    // Gece yarısı ile sabah 7 arası düşük ses
    if (hour >= 0 && hour < 7) {
      return 0.3;
    }
    // Akşam 22'den sonra orta ses
    else if (hour >= 22) {
      return 0.5;
    }
    // Diğer saatlerde normal ses
    return 0.8;
  }
}

export const adhanService = new AdhanService();

// Kullanıcı etkileşimini kaydet
document.addEventListener('click', () => {
  document.documentElement.setAttribute('data-user-interacted', 'true');
}); 