export const convertDate = (d: Date | undefined) => {
  if (!d) {
    return '';
  }
  const datestring =
    d.getDate() +
    '.' +
    (d.getMonth() + 1) +
    '.' +
    d.getFullYear() +
    ' ' +
    d.getHours() +
    ':' +
    d.getMinutes();

  return datestring;
};
