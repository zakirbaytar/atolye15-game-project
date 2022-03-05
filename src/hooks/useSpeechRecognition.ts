import { useEffect, useRef, useState } from 'react';
import { SpeechRecognitionOptions, SpeechRecognizer } from '../utils/SpeechRecognizer';
import { useEventCallback } from './useEventCallback';

interface UseSpeechRecognitionOptions {
  onResult: (transcript: string) => void;
  onError: (error: any) => void;
}

const defaultOptions = {
  onResult: () => {},
  onError: () => {},
};

const useSpeechRecognition = (options: UseSpeechRecognitionOptions = defaultOptions) => {
  const recognition = useRef<SpeechRecognizer | null>(null);
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);

  const { onResult, onError } = options;

  const listen = useEventCallback(
    (options: SpeechRecognitionOptions) => {
      if (listening || !supported) return;

      recognition.current?.listen(options);
      recognition.current?.subscribe('result', onResult!);
      recognition.current?.subscribe('error', onError!);
      setListening(true);
    },
    [recognition, listening, supported],
  );

  const stop = useEventCallback(() => {
    if (!listening || !supported) return;

    recognition.current?.stop();
    setListening(false);
  }, [listening, supported, recognition]);

  useEffect(() => {
    try {
      if (SpeechRecognizer.isSupported()) {
        setSupported(true);
        recognition.current = new SpeechRecognizer();
      }
    } catch (error: any) {
      onError?.(error);
    }

    return () => {
      recognition.current?.unsubscribeAll();
      recognition.current = null;
    };
  }, []);

  return {
    listening,
    supported,
    listen,
    stop,
  };
};

export default useSpeechRecognition;
