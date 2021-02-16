const arrCompare = (x, y) => {
  if (x.length !== y.length) {
    return false;
  }

  for (let i = 0; i < x.length; i += 1) {
    if (x[i] !== y[i]) {
      return false;
    }
  }

  return true;
};

Object.assign(My$, { arrCompare });
