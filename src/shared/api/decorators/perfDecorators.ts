import {callOtherFn} from '../ApiCall';

export function log() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const value = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      try {
        console.log('params', ...args);
        const out = await value.apply(this, args);
        console.log('response', out);
        if (typeof out === 'object') {
          if ('data' in out) {
            console.log('response data', out.data);
          }
        }
        return out;
      } catch (e) {
        console.log('e', e);
        return e;
      }
    };
  };
}
