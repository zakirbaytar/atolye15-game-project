class Observable<T> {
  protected listeners = new Map<T, Callback>();

  public subscribe(type: T, callback: Callback): () => void {
    this.listeners.set(type, callback);
    return () => this.unsubscribe(type);
  }

  public unsubscribe(type: T): void {
    if (this.listeners.has(type)) {
      this.listeners.delete(type);
    }
  }

  public notify(type: T, data: unknown): void {
    const callback = this.listeners.get(type);
    callback?.(data);
  }

  public unsubscribeAll(): void {
    this.listeners.clear();
  }
}

export default Observable;
