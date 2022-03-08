import { useEffect, useRef, useState } from 'react';
import { SpeechRecognitionOptions, SpeechRecognizer } from '../utils/SpeechRecognizer';
import useEventCallback from './useEventCallback';

interface UseSpeechRecognitionOptions {
  onResult: (transcript: string) => void;
  onError?: (error: Error) => void;
}

const defaultOptions = {
  onResult: () => {},
  onError: () => {},
};

const defaultListenOptions = {
  lang: 'tr-TR',
  interimResults: true,
  maxAlternatives: 1,
  continuous: false,
};

interface SpeechRecognitionContext {
  listen: (options?: Partial<SpeechRecognitionOptions>) => void;
  stopListening: () => void;
  supported: boolean;
  listening: boolean;
}

const useSpeechRecognition = (options: UseSpeechRecognitionOptions): SpeechRecognitionContext => {
  const recognition = useRef<SpeechRecognizer | null>(null);
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);

  const { onResult, onError } = { ...defaultOptions, ...options };

  const listen = useEventCallback(
    (listenOptions: SpeechRecognitionOptions) => {
      if (listening || !supported) return;

      const mergedOptions = { ...defaultListenOptions, ...listenOptions };

      recognition.current?.listen(mergedOptions);
      recognition.current?.subscribe('result', onResult);
      recognition.current?.subscribe('error', onError);
      setListening(true);
    },
    [recognition, listening, supported],
  );

  const stopListening = useEventCallback(() => {
    if (!listening || !supported) return;

    recognition.current?.stop();
    setListening(false);
  }, [listening, supported, recognition]);

  useEffect(() => {
    try {
      recognition.current = new SpeechRecognizer();
      setSupported(true);
    } catch (error) {
      if (error instanceof Error) onError?.(error);
    }

    return () => {
      recognition.current?.unsubscribeAll();
      recognition.current = null;
    };
  }, [onError]);

  return {
    listening,
    supported,
    listen,
    stopListening,
  };
};

export default useSpeechRecognition;
