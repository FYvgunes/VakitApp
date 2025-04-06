const GOOGLE_TTS_API = 'https://texttospeech.googleapis.com/v1/text:synthesize';
const API_KEY = 'YOUR_GOOGLE_API_KEY'; // Google Cloud API anahtarı gerekiyor

export const playAudio = async (dua) => {
  try {
    // Önceki sesi durdur
    window.responsiveVoice.cancel();

    // Yeni sesi çal
    window.responsiveVoice.speak(dua.meaning, "Turkish Male", {
      pitch: 0.9,
      rate: 0.9,
      volume: 1,
      onend: () => {
        // Ses bittiğinde event trigger
        const event = new CustomEvent('audioEnded');
        window.dispatchEvent(event);
      }
    });

    // Kontrol için bir audio-like nesne döndür
    return {
      pause: () => window.responsiveVoice.cancel(),
      ended: false,
      addEventListener: (event, callback) => {
        if (event === 'ended') {
          window.addEventListener('audioEnded', callback);
        }
      },
      removeEventListener: (event, callback) => {
        if (event === 'ended') {
          window.removeEventListener('audioEnded', callback);
        }
      }
    };
  } catch (error) {
    console.error('Ses dosyası çalınamadı:', error);
    throw error;
  }
};

export const stopAudio = (audio) => {
  if (audio) {
    audio.pause();
  }
  window.responsiveVoice.cancel();
}; 