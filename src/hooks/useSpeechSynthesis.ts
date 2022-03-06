import { useEffect, useState, useCallback } from 'react';

interface UseSpeechSynthesisOptions {
  language: string;
  onEnd?: Callback;
}

const useSpeechSynthesis = (options: UseSpeechSynthesisOptions) => {
  const { language, onEnd } = options;
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);

  const setDefaultVoiceFrom = useCallback(
    (voices: SpeechSynthesisVoice[]) => {
      if (!voices.length) return;

      const voice = voices.find((voice) => voice.lang === language);
      if (voice) setVoice(voice);
    },
    [language, setVoice],
  );

  const handleEnd = (text: string) => {
    setSpeaking(false);
    onEnd?.(text);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSupported(true);

      const voices = window.speechSynthesis.getVoices();
      setDefaultVoiceFrom(voices);

      window.speechSynthesis.onvoiceschanged = (event: any) => {
        const voices = event.target.getVoices();
        setDefaultVoiceFrom(voices);
      };
    }
  }, []);

  const speak = (text: string) => {
    if (!supported) return;
    setSpeaking(true);

    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.addEventListener('end', () => handleEnd(text));
    window.speechSynthesis.speak(utterance);
  };

  const cancel = () => {
    if (!supported) return;
    setSpeaking(false);
    window.speechSynthesis.cancel();
  };

  return {
    supported,
    speak,
    speaking,
    cancel,
  };
};

export default useSpeechSynthesis;
