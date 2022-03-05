export class Observable<T> {
  protected listeners = new Map<T, Callback>();

  public subscribe(type: T, callback: Callback) {
    this.listeners.set(type, callback);
    return () => this.unsubscribe(type);
  }

  public unsubscribe(type: T) {
    if (this.listeners.has(type)) {
      this.listeners.delete(type);
    }
  }

  public notify(type: T, data: any) {
    const callback = this.listeners.get(type);
    callback?.(data);
  }

  public unsubscribeAll() {
    this.listeners.clear();
  }
}
