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

interface SpeechGrammar {
  src: string;
  weight: number;
}

type Callback = (...args: any[]) => void;

interface ISpeechGrammarList {
  new (): ISpeechGrammarList;
  readonly length: number;

  public [index: number]: SpeechGrammar;
  public addFromString(string: string, weight?: number): void;
  public addFromURI(src: string, weight?: number): void;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;

  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  readonly length: number;

  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent {
  readonly emma: Document | null;
  readonly interpretation: any;
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

type SpeechRecognitionListener = (event: SpeechRecognitionEvent) => void;

interface ISpeechRecognition extends EventTarget {
  new (): ISpeechRecognition;

  grammars: SpeechGrammarList;
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
    options?: boolean | AddEventListenerOptions,
  ): void;

  public removeEventListener(
    type: SpeechRecognitionEventType,
    listener: EventListenerOrEventListenerObject | SpeechRecognitionListener,
    options?: boolean | EventListenerOptions,
  ): void;
}

declare var webkitSpeechRecognition: SpeechRecognition;
declare var SpeechRecognition: SpeechRecognizer;
declare var webkitSpeechGrammarList: ISpeechGrammarList;
declare var SpeechGrammarList: ISpeechGrammarList;
