'use strict';
class MyPromise {
    constructor(executor) {
        this._state = 'pending';
        this._value = undefined;
        this._handlers = [];

        try {
            executor(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error);
        }
    }

    resolve(value) {
        if (this._state === 'pending') {
            this._state = 'fulfilled';
            this._value = value;
            // this._handlers.forEach((handler) => handler.onFulfilled(value));
            // setTimeout(() => this._handlers.forEach((handler) => handler.onFulfilled(value)), 0);
            queueMicrotask(() => this._handlers.forEach((handler) => handler.onFulfilled(value)));
        }
    }

    reject(reason) {
        if (this._state === 'pending') {
            this._state = 'rejected';
            this._value = reason;
            // this._handlers.forEach((handler) => handler.onRejected(reason));
            // setTimeout(() => this._handlers.forEach((handler) => handler.onRejected(reason)), 0);
            queueMicrotask(() => this._handlers.forEach((handler) => handler.onRejected(reason)));
        }
    }

    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            const resolveWrapper = (value) => {
                try {
                    if (typeof onFulfilled === 'function') {
                        const result = onFulfilled(value);
                        if (result instanceof MyPromise) {
                            result.then(resolve, reject);
                        } else {
                            resolve(result);
                        }
                    } else {
                        resolve(value);
                    }
                } catch (error) {
                    reject(error);
                }
            };

            const rejectWrapper = (reason) => {
                try {
                    if (typeof onRejected === 'function') {
                        const result = onRejected(reason);
                        if (result instanceof MyPromise) {
                            result.then(resolve, reject);
                        } else {
                            resolve(result);
                        }
                    } else {
                        reject(reason);
                    }
                } catch (error) {
                    reject(error);
                }
            };

            if (this._state === 'fulfilled') {
                resolveWrapper(this._value);
            } else if (this._state === 'rejected') {
                rejectWrapper(this._value);
            } else {
                this._handlers.push({
                    onFulfilled: resolveWrapper,
                    onRejected: rejectWrapper
                });
            }
        });
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }

    finally(onFinally) {
        return this.then(
            (value) => {
                return MyPromise.resolve(onFinally()).then(() => value);
            },
            (reason) => {
                return MyPromise.resolve(onFinally()).then(() => {
                    throw reason;
                });
            }
        );
    }

    static all(promises) {
        return new MyPromise((resolve, reject) => {
            const results = [];
            let count = 0;

            promises.forEach((promise, index) => {
                promise
                    .then((value) => {
                        results[index] = value;
                        count++;

                        if (count === promises.length) {
                            resolve(results);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        });
    }

    static allSettled(promises) {
        return new MyPromise((resolve, reject) => {
            const results = [];
            let count = 0;

            promises.forEach((promise, index) => {
                promise
                    .then((value) => {
                        results[index] = { status: 'fulfilled', value: value };
                        count++;

                        if (count === promises.length) {
                            resolve(results);
                        }
                    })
                    .catch((error) => {
                        results[index] = { status: 'rejected', reason: error };
                        count++;

                        if (count === promises.length) {
                            resolve(results);
                        }
                    });
            });
        });
    }
    static race(promises) {
        return new MyPromise((resolve, reject) => {
            promises.forEach((promise) => {
                promise
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        });
    }

    static resolve(value) {
        if (value instanceof MyPromise) return value;

        return new MyPromise((resolve) => resolve(value));
    }

    static reject(reason) {
        return new MyPromise((resolve, reject) => reject(reason));
    }
}

// //--------------------------------------------
// const p = new MyPromise((r, j) => {
//     r('aboba');
// });
// p.catch((v) => console.log(v));
// p.then((v) => console.log(v));
// p.then((v) => console.log(v));
// p.then((v) => console.log(v));
// p.then((v) => console.log(v));

// //--------------------------------------------
// const p = new MyPromise((r, j) => {
//     setTimeout(() => r('aboba'), 1000);
// });

// setTimeout(() => {
//     p.then((v) => console.log(v));
//     p.then((v) => console.log(v));
//     p.then((v) => console.log(v));
//     p.then((v) => console.log(v));
// }, 3000);

// //--------------------------------------------
// const p = new MyPromise((r, j) => {
//     r('aboba');
// });
// console.log(p);

// //--------------------------------------------
// let a = new MyPromise((res, rej) => {});
// console.log(a === MyPromise.resolve(a));

// //--------------------------------------------
// new MyPromise(function (resolve, reject) {
//     setTimeout(() => {
//         resolve(1);
//         reject(Error('Lox'));
//         resolve(222);
//     }, 1000);
// })
//     .then(function (result) {
//         console.log(result); // 1

//         return new MyPromise((resolve, reject) => {
//             setTimeout(() => resolve(result * 2), 1000);
//         });
//     })
//     .then(function (result) {
//         console.log(result); // 2

//         return new MyPromise((resolve, reject) => {
//             setTimeout(() => resolve(result * 2), 1000);
//         });
//     })
//     .then(function (result) {
//         console.log(result); // 4
//     })
//     .catch(console.log);

// //--------------------------------------------
// new MyPromise((res, rej) => {
//     setTimeout(() => {
//         if (0) {
//             res('aboba');
//         } else {
//             rej(Error('not aboba'));
//         }
//     }, 1000);
// })
//     .then((data) => data)
//     .then((item) => console.log(item + '---'))
//     .catch(console.log)
//     .finally(() => console.log('-_-'));

// //--------------------------------------------
// const promise1 = new MyPromise((resolve) => {
//     setTimeout(() => {
//         resolve(1);
//     }, 4000);
// });

// const promise2 = new MyPromise((resolve) => {
//     setTimeout(() => {
//         resolve(2);
//     }, 1000);
// });

// const promise3 = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         reject(Error('твоя мать ...'));
//         resolve(3);
//     }, 5000);
// });

// MyPromise.allSettled([promise1, promise2, promise3])
//     .then((results) => {
//         console.log(results);
//     })
//     .catch((error) => {
//         console.error(error);
//     });

// MyPromise.race([promise1, promise2, promise3])
//     .then((results) => {
//         console.log(results);
//     })
//     .catch((error) => {
//         console.error(error);
//     });

// //-----------------------------------------------
// let promise = new Promise(function (resolve, reject) {
//     setTimeout(() => resolve(1), 1000);
// });

// promise.then(function (result) {
//     console.log(result); // 1
//     return result * 2;
// });

// promise.then(function (result) {
//     console.log(result); // 1
//     return result * 2;
// });

// promise.then(function (result) {
//     console.log(result); // 1
//     return result * 2;
// });

// // -----------------------------------------------
// const prom1 = new MyPromise((res) => {});
// const prom2 = prom1.then(() => {});

// console.log(prom1 === prom2);

// //--------------------------------------------
// const prom1 = new Promise((res) => {
//     setTimeout(() => {
//         res();
//     }, 1000);
// });

// const prom2 = prom1
//     .then(() => {
//         console.log(2);
//     })
//     .then(() => {
//         console.log(10);
//     });

// prom1
//     .then(() => {
//         console.log(3);
//     })
//     .then(() => {
//         console.log(20);
//     });
