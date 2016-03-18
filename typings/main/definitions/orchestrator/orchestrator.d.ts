// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/typed-typings/npm-es6-promise/fb04188767acfec1defd054fc8024fafa5cd4de7/dist/es6-promise.d.ts
declare module 'orchestrator~es6-promise/dist/es6-promise' {
export interface Thenable <R> {
  then <U> (onFulfilled?: (value: R) => U | Thenable<U>, onRejected?: (error: any) => U | Thenable<U>): Thenable<U>;
  then <U> (onFulfilled?: (value: R) => U | Thenable<U>, onRejected?: (error: any) => void): Thenable<U>;
}

export class Promise <R> implements Thenable <R> {
  /**
   * If you call resolve in the body of the callback passed to the constructor,
   * your promise is fulfilled with result object passed to resolve.
   * If you call reject your promise is rejected with the object passed to resolve.
   * For consistency and debugging (eg stack traces), obj should be an instanceof Error.
   * Any errors thrown in the constructor callback will be implicitly passed to reject().
   */
  constructor (callback: (resolve : (value?: R | Thenable<R>) => void, reject: (error?: any) => void) => void);

  /**
   * onFulfilled is called when/if "promise" resolves. onRejected is called when/if "promise" rejects.
   * Both are optional, if either/both are omitted the next onFulfilled/onRejected in the chain is called.
   * Both callbacks have a single parameter , the fulfillment value or rejection reason.
   * "then" returns a new promise equivalent to the value you return from onFulfilled/onRejected after being passed through Promise.resolve.
   * If an error is thrown in the callback, the returned promise rejects with that error.
   *
   * @param onFulfilled called when/if "promise" resolves
   * @param onRejected called when/if "promise" rejects
   */
  then <U> (onFulfilled?: (value: R) => U | Thenable<U>, onRejected?: (error: any) => U | Thenable<U>): Promise<U>;
  then <U> (onFulfilled?: (value: R) => U | Thenable<U>, onRejected?: (error: any) => void): Promise<U>;

  /**
   * Sugar for promise.then(undefined, onRejected)
   *
   * @param onRejected called when/if "promise" rejects
   */
  catch <U> (onRejected?: (error: any) => U | Thenable<U>): Promise<U>;

  /**
   * Make a new promise from the thenable.
   * A thenable is promise-like in as far as it has a "then" method.
   */
  static resolve (): Promise<void>;
  static resolve <R> (value: R | Thenable<R>): Promise<R>;

  /**
   * Make a promise that rejects to obj. For consistency and debugging (eg stack traces), obj should be an instanceof Error
   */
  static reject <R> (error: any): Promise<R>;

  /**
   * Make a promise that fulfills when every item in the array fulfills, and rejects if (and when) any item rejects.
   * the array passed to all can be a mixture of promise-like objects and other objects.
   * The fulfillment value is an array (in order) of fulfillment values. The rejection value is the first rejection value.
   */
  static all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [T1 | Thenable<T1>, T2 | Thenable<T2>, T3 | Thenable<T3>, T4 | Thenable <T4>, T5 | Thenable<T5>, T6 | Thenable<T6>, T7 | Thenable<T7>, T8 | Thenable<T8>, T9 | Thenable<T9>, T10 | Thenable<T10>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
  static all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [T1 | Thenable<T1>, T2 | Thenable<T2>, T3 | Thenable<T3>, T4 | Thenable <T4>, T5 | Thenable<T5>, T6 | Thenable<T6>, T7 | Thenable<T7>, T8 | Thenable<T8>, T9 | Thenable<T9>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
  static all<T1, T2, T3, T4, T5, T6, T7, T8>(values: [T1 | Thenable<T1>, T2 | Thenable<T2>, T3 | Thenable<T3>, T4 | Thenable <T4>, T5 | Thenable<T5>, T6 | Thenable<T6>, T7 | Thenable<T7>, T8 | Thenable<T8>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8]>;
  static all<T1, T2, T3, T4, T5, T6, T7>(values: [T1 | Thenable<T1>, T2 | Thenable<T2>, T3 | Thenable<T3>, T4 | Thenable <T4>, T5 | Thenable<T5>, T6 | Thenable<T6>, T7 | Thenable<T7>]): Promise<[T1, T2, T3, T4, T5, T6, T7]>;
  static all<T1, T2, T3, T4, T5, T6>(values: [T1 | Thenable<T1>, T2 | Thenable<T2>, T3 | Thenable<T3>, T4 | Thenable <T4>, T5 | Thenable<T5>, T6 | Thenable<T6>]): Promise<[T1, T2, T3, T4, T5, T6]>;
  static all<T1, T2, T3, T4, T5>(values: [T1 | Thenable<T1>, T2 | Thenable<T2>, T3 | Thenable<T3>, T4 | Thenable <T4>, T5 | Thenable<T5>]): Promise<[T1, T2, T3, T4, T5]>;
  static all<T1, T2, T3, T4>(values: [T1 | Thenable<T1>, T2 | Thenable<T2>, T3 | Thenable<T3>, T4 | Thenable <T4>]): Promise<[T1, T2, T3, T4]>;
  static all<T1, T2, T3>(values: [T1 | Thenable<T1>, T2 | Thenable<T2>, T3 | Thenable<T3>]): Promise<[T1, T2, T3]>;
  static all<T1, T2>(values: [T1 | Thenable<T1>, T2 | Thenable<T2>]): Promise<[T1, T2]>;
  static all<T1>(values: [T1 | Thenable<T1>]): Promise<[T1]>;
  static all<TAll>(values: Array<TAll | Thenable<TAll>>): Promise<TAll[]>;

  /**
   * Make a Promise that fulfills when any item fulfills, and rejects if any item rejects.
   */
  static race <R> (promises: (R | Thenable<R>)[]): Promise<R>;
}

/**
 * The polyfill method will patch the global environment (in this case to the Promise name) when called.
 */
export function polyfill (): void;
}
declare module 'orchestrator~es6-promise' {
export * from 'orchestrator~es6-promise/dist/es6-promise';
}

// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/typed-typings/npm-orchestrator/bd916c96d6d8e946bc73772fc3854accd5860aa4/orchestrator.d.ts
declare module 'orchestrator/orchestrator' {
// Type definitions for Orchestrator
// Project: https://github.com/orchestrator/orchestrator
// Definitions by: Qubo <https://github.com/tkQubo>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

import { Promise } from 'orchestrator~es6-promise';

type Strings = string | string[];

class Orchestrator {
  add: Orchestrator.AddMethod;
  /**
   * Have you defined a task with this name?
   * @param name The task name to query
   */
  hasTask(name: string): boolean;
  start: Orchestrator.StartMethod;
  stop(): void;

  /**
   * Listen to orchestrator internals
   * @param event Event name to listen to:
   * <ul>
   *   <li>start: from start() method, shows you the task sequence
   *   <li>stop: from stop() method, the queue finished successfully
   *   <li>err: from stop() method, the queue was aborted due to a task error
   *   <li>task_start: from _runTask() method, task was started
   *   <li>task_stop: from _runTask() method, task completed successfully
   *   <li>task_err: from _runTask() method, task errored
   *   <li>task_not_found: from start() method, you're trying to start a task that doesn't exist
   *   <li>task_recursion: from start() method, there are recursive dependencies in your task list
   * </ul>
   * @param cb Passes single argument: e: event details
   */
  on(event: string, cb: (e: Orchestrator.OnCallbackEvent) => any): Orchestrator;

  /**
   * Listen to all orchestrator events from one callback
   * @param cb Passes single argument: e: event details
   */
  onAll(cb: (e: Orchestrator.OnAllCallbackEvent) => any): void;
}

namespace Orchestrator {
  interface AddMethodCallback {
    /**
     * Accept a callback
     * @param callback
     */
    (callback?: Function): any;
    /**
     * Return a promise
     */
    (): Promise<any>;
    /**
     * Return a stream: (task is marked complete when stream ends)
     */
    (): any; //TODO: stream type should be here e.g. map-stream
  }

  /**
   * Define a task
   */
  interface AddMethod {
    /**
     * Define a task
     * @param name The name of the task.
     * @param deps An array of task names to be executed and completed before your task will run.
     * @param fn The function that performs the task's operations. For asynchronous tasks, you need to provide a hint when the task is complete:
     * <ul>
     *     <li>Take in a callback</li>
     *     <li>Return a stream or a promise</li>
     * </ul>
     */
    (name: string, deps?: string[], fn?: AddMethodCallback | Function): Orchestrator;
    /**
     * Define a task
     * @param name The name of the task.
     * @param fn The function that performs the task's operations. For asynchronous tasks, you need to provide a hint when the task is complete:
     * <ul>
     *     <li>Take in a callback</li>
     *     <li>Return a stream or a promise</li>
     * </ul>
     */
    (name: string, fn?: AddMethodCallback | Function): Orchestrator;
  }

  /**
   * Start running the tasks
   */
  interface StartMethod {
    /**
     * Start running the tasks
     * @param tasks Tasks to be executed. You may pass any number of tasks as individual arguments.
     * @param cb Callback to call after run completed.
     */
    (tasks: Strings, cb?: (error?: any) => any): Orchestrator;
    /**
     * Start running the tasks
     * @param tasks Tasks to be executed. You may pass any number of tasks as individual arguments.
     * @param cb Callback to call after run completed.
     */
    (...tasks: Strings[]/*, cb?: (error: any) => any */): Orchestrator;
    //TODO: TypeScript 1.5.3 cannot express varargs followed by callback as a last argument...
    (task1: Strings, task2: Strings, cb?: (error?: any) => any): Orchestrator;
    (task1: Strings, task2: Strings, task3: Strings, cb?: (error?: any) => any): Orchestrator;
    (task1: Strings, task2: Strings, task3: Strings, task4: Strings, cb?: (error?: any) => any): Orchestrator;
    (task1: Strings, task2: Strings, task3: Strings, task4: Strings, task5: Strings, cb?: (error?: any) => any): Orchestrator;
    (task1: Strings, task2: Strings, task3: Strings, task4: Strings, task5: Strings, task6: Strings, cb?: (error?: any) => any): Orchestrator;
  }

  interface OnCallbackEvent {
    message: string;
    task: string;
    err: any;
    duration?: number;
  }

  interface OnAllCallbackEvent extends OnCallbackEvent {
    src: string;
  }

}

export = Orchestrator;
}
declare module 'orchestrator' {
import main = require('orchestrator/orchestrator');
export = main;
}