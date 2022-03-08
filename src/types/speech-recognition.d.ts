type SpeechRecognitionEventType =
  | 'audiostart'
  | 'audioend'
  | 'end'
  | 'error'
  | 'nomatch'
  | 'result'
  | 'soundstart'
  | 'soundend'
  | 'speechstart'
  | 'speechend'
  | 'start';

type SpeechRecognitionErrorEventType =
  | 'no-speech'
  | 'aborted'
  | 'audio-capture'
  | 'network'
  | 'not-allowed'
  | 'service-not-allowed'
  | 'bad-grammar'
  | 'language-not-supported';

type SpeechRecognitionEventHandlers = `on${SpeechRecognitionEventType}`;

interface ISpeechGrammar {
  src: string;
  weight: number;
}

interface ISpeechGrammarList {
  new (): ISpeechGrammarList;
  readonly length: number;

  public [index: number]: ISpeechGrammar;
  public addFromString(string: string, weight?: number): void;
  public addFromURI(src: string, weight?: number): void;
}

interface ISpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface ISpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;

  [index: number]: ISpeechRecognitionAlternative;
}

interface ISpeechRecognitionResultList {
  readonly length: number;

  [index: number]: ISpeechRecognitionResult;
}

interface ISpeechRecognitionEvent {
  readonly emma: Document | null;
  readonly interpretation: unknown;
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

type SpeechRecognitionListener =
  | EventListenerOrEventListenerObject
  | ((event: ISpeechRecognitionEvent) => void)
  | ((event: SpeechRecognitionErrorEvent) => void);

type SpeechRecognitionErrorEvent = Event & {
  readonly error: SpeechRecognitionErrorEventType;
  readonly message: string;
};

interface ISpeechRecognition extends EventTarget {
  new (): ISpeechRecognition;

  grammars: ISpeechGrammarList;
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;

  public abort(): void;
  public start(): void;
  public stop(): void;

  public addEventListener(
    type: SpeechRecognitionEventType,
    listener: SpeechRecognitionListener,
  ): void;

  public removeEventListener(
    type: SpeechRecognitionEventType,
    listener: SpeechRecognitionListener,
  ): void;

  [SpeechRecognitionEventHandlers]: SpeechRecognitionListener;
}
