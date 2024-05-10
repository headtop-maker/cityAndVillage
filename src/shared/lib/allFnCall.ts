export class AsyncFnCalls {
  allFn: {(): void}[];
  badCallFn: {(): void}[];
  status: 'open' | 'lock';

  constructor() {
    this.allFn = [];
    this.badCallFn = [];
    this.status = 'open';
  }

  recieveFn(currentFn: () => void) {
    if (this.status === 'open') {
      this.allFn.push(currentFn);
    }
  }

  async getBadCallCount() {
    return this.badCallFn.length;
  }

  getStatus() {
    return this.status;
  }

  async run() {
    this.status = 'lock';

    for await (let item of this.allFn) {
      try {
        await item();
      } catch (e) {
        this.badCallFn.push(item);
        console.log('error', 'Ошибка запроса');
      } finally {
        console.log('status - ', this.getStatus());
      }
    }
    this.allFn = [];
    this.status = 'open';
  }

  reFetch() {
    this.allFn.push(...this.badCallFn);
    this.badCallFn = [];
    this.run();
  }
}
// пример вызова
// const allFn = new AsyncFnCalls();

// async function onLog() {
//   const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
//   const result = await response.json();
//   console.log('result fn №-', result);
//   return result;
// }

// async function onLog2() {
//   const response = await fetch('https://jsonplaceholder.typicode.com/todos/2');
//   const result = await response.json();
//   console.log('result fn №-', result);
//   return result;
// }

// async function onLog3() {
//   const response = await fetch('https://jsonplaceholder.typicode.com/todos/3');
//   const result = await response.json();
//   console.log('result fn №-', result);
//   return result;
// }

// allFn.recieveFn(onLog);
// allFn.recieveFn(onLog2);
// allFn.recieveFn(onLog3);

// async function wait() {
//   await allFn.run();
//   const res = await allFn.getBadCallCount();
//   if (res !== 0) {
//     console.log('refetch');
//     setTimeout(() => allFn.reFetch(), 15000);
//   }
// }

// wait();
