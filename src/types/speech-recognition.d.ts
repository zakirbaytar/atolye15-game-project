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
  readonly interpretation: any;
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

type SpeechRecognitionListener = (event: ISpeechRecognitionEvent) => void;

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
    listener: EventListenerOrEventListenerObject | SpeechRecognitionListener,
  ): void;

  public removeEventListener(
    type: SpeechRecognitionEventType,
    listener: EventListenerOrEventListenerObject | SpeechRecognitionListener,
  ): void;

  [SpeechRecognitionEventHandlers]: EventListenerOrEventListenerObject | SpeechRecognitionListener;
}
