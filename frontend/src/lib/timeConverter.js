export const getHoursMinutesSecondsByMS = (ms) => {
  const dt = new Date(ms);

  const hrs = dt.getHours() < 10 ? `0${dt.getHours()}` : dt.getHours();
  const mins = dt.getMinutes() < 10 ? `0${dt.getMinutes()}` : dt.getMinutes();
  const secds = dt.getSeconds() < 10 ? `0${dt.getSeconds()}` : dt.getSeconds();
  const msds = dt.getMilliseconds() < 10
    ? `00${dt.getMilliseconds()}`
    : dt.getMilliseconds() >= 10 && dt.getMilliseconds() < 100
      ? `0${dt.getMilliseconds()}`
      : dt.getMilliseconds() >= 100 && dt.getMilliseconds() < 1000
        ? `${dt.getMilliseconds()}`
        : dt.getMilliseconds();

  return `${hrs}:${mins}:${secds}.${msds}`;
};
