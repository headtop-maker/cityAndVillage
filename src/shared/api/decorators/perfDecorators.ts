export function log() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const value = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      try {
        const out = await value.apply(this, args);
        console.log('response', out);
        return out;
      } catch (e) {
        console.log('e', e);
        return e;
      }
    };
  };
}
