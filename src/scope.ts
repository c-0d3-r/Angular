interface WatcherFn {
  (...args: any[]): keyof Scope;
}

interface ListenerFn {
  (...args: any[]): any;
}

interface Watcher {
  watchFn: WatcherFn;
  listenerFn: ListenerFn;
}

export class Scope {
  private $$watchers: Set<Watcher> = new Set();

  public $watch(watchFn: WatcherFn, listenerFn: ListenerFn) {
    this.$$watchers.add({
      watchFn,
      listenerFn,
    });
  }

  public $digest() {
    this.$$watchers.forEach((watcher) => watcher.listenerFn());
  }
}
