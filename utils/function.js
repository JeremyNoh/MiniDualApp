export const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};

export const getRandomInt = () => {
  return Math.floor(Math.random() * Math.floor(1000));
};

export const RandomElementInArray = arr =>
  arr[Math.floor(Math.random() * arr.length)];
