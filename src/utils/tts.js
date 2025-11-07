
const synth = window.speechSynthesis;

export const speak = (text, lang) => {
  if (synth.speaking) {
    console.error('speechSynthesis.speaking');
    return;
  }
  if (text !== '') {
    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.lang = lang;
    synth.speak(utterThis);
  }
};

export const stop = () => {
  synth.cancel();
};

export const isSupported = () => {
  return 'speechSynthesis' in window;
};
