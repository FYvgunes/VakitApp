class AdhanService {
  constructor() {
    this.audio = new Audio('/assets/adhan.mp3');
    this.isPlaying = false;
    this.volume = 1;

    // Ezan bitince state'i güncelle
    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
    });
  }

  async play() {
    try {
      if (!this.isPlaying) {
        this.audio.volume = this.volume;
        await this.audio.play();
        this.isPlaying = true;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error playing adhan:', error);
      return false;
    }
  }

  stop() {
    if (this.isPlaying) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
      return true;
    }
    return false;
  }

  setVolume(value) {
    this.volume = Math.max(0, Math.min(1, value));
    this.audio.volume = this.volume;
  }

  getState() {
    return {
      isPlaying: this.isPlaying,
      volume: this.volume,
      currentTime: this.audio.currentTime,
      duration: this.audio.duration
    };
  }
}

export const adhanService = new AdhanService(); 