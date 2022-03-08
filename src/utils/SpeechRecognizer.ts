import Observable from './Observable';

export interface SpeechRecognitionOptions {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  grammars?: string;
}

const SpeechRecognition =
  (window as GlobalWindow).webkitSpeechRecognition || (window as GlobalWindow).SpeechRecognition;

const GrammarList =
  (window as GlobalWindow).webkitSpeechGrammarList || (window as GlobalWindow).SpeechGrammarList;

export class SpeechRecognizer extends Observable<SpeechRecognitionEventType> {
  private recognition: ISpeechRecognition;

  private listening = false;

  constructor() {
    super();
    if (!SpeechRecognition || !GrammarList) {
      throw new Error('Speech recognition is not supported in this environment');
    }

    this.recognition = new SpeechRecognition();
  }

  private handleResult = (event: ISpeechRecognitionEvent) => {
    const transcript = Array.from(event.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join('');

    if (event.results[0].isFinal) {
      this.notify('result', transcript);
    }
  };

  private handleError = (event: SpeechRecognitionErrorEvent) => {
    if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
      this.recognition.removeEventListener('end', this.handleEnd.bind(this));
      this.listening = false;
    }

    this.notify('error', event);
  };

  private handleEnd = () => {
    this.recognition.start();
  };

  public listen = (options: SpeechRecognitionOptions): void => {
    if (this.listening || !SpeechRecognition || !GrammarList) return;

    const { lang, interimResults, continuous, maxAlternatives, grammars } = options;

    this.recognition.lang = lang;
    this.recognition.interimResults = interimResults;
    this.recognition.continuous = continuous;
    this.recognition.maxAlternatives = maxAlternatives;

    if (grammars) {
      const speechGrammarList = new GrammarList();
      speechGrammarList.addFromString(grammars, 1);
      this.recognition.grammars = speechGrammarList;
    }

    this.recognition.addEventListener('result', this.handleResult);
    this.recognition.addEventListener('error', this.handleError);
    this.recognition.addEventListener('end', this.handleEnd);

    this.recognition.start();
    this.listening = true;
  };

  public stop = (): void => {
    if (!this.listening) return;

    this.recognition.stop();

    this.recognition.removeEventListener('result', this.handleResult);
    this.recognition.removeEventListener('error', this.handleError);
    this.recognition.removeEventListener('end', this.handleEnd);
    this.unsubscribeAll();

    this.listening = false;
  };
}
