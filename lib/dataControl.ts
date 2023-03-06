import { events } from './data';

export const Data = () => {
  let b = [];
  for (let i = 0; i < events.length; i++) {
    const item = events[i];
    if (item['extendedProps']['locationName'] === 'オペレーターMさん')
      b.push(item);
  }
  console.log(b);
  return b;
};
