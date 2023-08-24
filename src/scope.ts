interface WatcherFn {
  (arg: Scope): any;
}

interface ListenerFn {
  (newValue: any, oldValue: any, scope: Scope): any;
}

interface Watcher {
  watchFn: WatcherFn;
  listenerFn: ListenerFn;
  last: any;
}

export class Scope {
  private $$watchers: Set<Watcher> = new Set();

  public $watch(watchFn: WatcherFn, listenerFn: ListenerFn) {
    this.$$watchers.add({
      watchFn,
      listenerFn,
      last: Symbol(undefined), // or function as in original
    });
  }

  public $digest() {
    this.$$watchers.forEach((watcher) => {
      const newValue = watcher.watchFn(this);
      const oldValue = watcher.last;

      watcher.watchFn(this);

      if (newValue !== oldValue) {
        watcher.last = newValue;
        watcher.listenerFn(newValue, oldValue, this);
      }
    });
  }
}
