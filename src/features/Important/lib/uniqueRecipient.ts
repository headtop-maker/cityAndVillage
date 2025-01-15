import {CounterState} from '../../../shared/models/types';

export const getUniqueRecipient = (important: CounterState['important']) => {
  return important.reduce((acc: {email: string; name: string}[], current) => {
    const findFrom = acc.find(it => it.email === current.author);

    if (!findFrom) {
      acc.push({
        email: current.author,
        name: current.authorName,
      });
    }

    return acc;
  }, []);
};
