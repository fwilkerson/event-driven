export interface EventEmitter {
  /**
   * Subscribe an event handler
   * 
   * @param eventName {string} The name of the event
   * @param handler {Function} The function to be executed when the event is emitted
   * @returns {Function} Returns the handler for easy unsubscription
  */
  on(eventName: string, handler: Function): Function;

  /**
   * Unsubscribe an event handler
   * 
   * @param eventName {string} The name of the event
   * @param handler {Function} The handler to be removed
  */
  remove(eventName: string, handler: Function): void;

  /**
   * Publish an event
   * 
   * @param eventName {string} The name of the event
   * @param event {Object} The parameter to pass to the event handlers
  */
  emit(eventName: string, event: any): void;
}

export type CollectionChangedEvent<T> = {
  type: string;
  old: Array<T>;
  new: Array<T>;
};

export type CollectionChangedEventHandler<T> = (
  e: CollectionChangedEvent<T>
) => void;

export interface Collection<T> {
  /**
   * Subscribe an event handler to be called whenever the collection is modified
   * 
   * @param handler {Function} The collection changed handler
   * @returns {Function} Returns a function that when executed will remove the collection changed handler
   */
  onCollectionChanged(handler: CollectionChangedEventHandler<T>): Function;

  /**
   * Add a value to the collection
   * 
   * @param value {T} The value to be added to the collection
   */
  add(value: T): void;

  /**
   * Add a range of values to the collection
   * 
   * @param values {Array<T>} The range of values to be added to the collection
   */
  addRange(values: Array<T>): void;

  /**
   * Remove the value from the collection
   * 
   * @param value {T} The value to be removed from the collection
   */
  remove(value: T): void;

  /**
   * Removes all items within the collection
   */
  clear(): void;

  /**
   * Returns a copy of the list in the form of an array
   * 
   * @returns {Array<T>} A copy of the collection
   */
  toList(): Array<T>;
}

/**
 * The EventEmitter factory
 * @returns {EventEmitter}
 */
export function EventEmitter(): EventEmitter {
  const events: Map<string, Array<Function>> = new Map();
  return {
    on(eventName, handler): Function {
      const eventHandlers = events.get(eventName) || [];
      events.set(eventName, eventHandlers.concat(handler));
      return handler;
    },

    remove(eventName, handler) {
      const eventHandlers = events.get(eventName) || [];
      eventHandlers.splice(eventHandlers.indexOf(handler), 1);
      events.set(eventName, eventHandlers);
    },

    emit(eventName, event) {
      const handlers = events.get(eventName) || [];
      handlers.forEach(handler => handler(event));
    }
  };
}

/**
 * The Collection factory
 * @returns {Collection<T>}
 */
export function Collection<T>(init: Array<T>): Collection<T> {
  const eventEmitter = EventEmitter();
  const collectionChangedKey = 'collectionChanged';
  const collectionChanged = eventEmitter.emit.bind(null, collectionChangedKey);
  const list = init || [];

  return {
    onCollectionChanged(handler) {
      eventEmitter.on(collectionChangedKey, handler);
      return eventEmitter.remove.bind(null, collectionChangedKey, handler);
    },

    add(value) {
      const old = list.slice();
      list.push(value);
      collectionChanged({ type: 'add', old, new: list.slice() });
    },

    addRange(values) {
      const old = list.slice();
      values.forEach(value => list.push(value));
      collectionChanged({ type: 'addRange', old, new: list.slice() });
    },

    remove(value) {
      const old = list.slice();
      const comparer = JSON.stringify(value);
      const indexToRemove = list.findIndex(x => JSON.stringify(x) === comparer);
      list.splice(indexToRemove, 1);
      collectionChanged({ type: 'remove', old, new: list.slice() });
    },

    clear() {
      const old = list.slice();
      list.splice(0, list.length);
      collectionChanged({ type: 'clear', old, new: list.slice() });
    },

    toList: () => list.slice()
  };
}
