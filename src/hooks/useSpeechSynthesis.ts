import { useEffect, useState, useCallback } from 'react';

interface UseSpeechSynthesisOptions {
  language: string;
  onEnd?: Callback;
}

interface SpeechSynthesisContext {
  supported: boolean;
  speak: (text: string) => void;
  speaking: boolean;
  cancel: () => void;
}

const useSpeechSynthesis = (options: UseSpeechSynthesisOptions): SpeechSynthesisContext => {
  const { language, onEnd } = options;
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);

  const setDefaultVoiceFrom = useCallback(
    (voices: SpeechSynthesisVoice[]) => {
      if (!voices.length) return;

      const foundVoice = voices.find((existingVoice) => existingVoice.lang === language);
      if (foundVoice) setVoice(foundVoice);
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

      window.speechSynthesis.onvoiceschanged = (event: Event) => {
        const fetchedVoices = (event.target as SpeechSynthesis).getVoices();
        setDefaultVoiceFrom(fetchedVoices);
      };
    }
  }, [setDefaultVoiceFrom]);

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
