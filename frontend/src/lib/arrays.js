export const getPartialBySize = (arr, chunkSize) =>
  arr.concat.apply(
    [],
    arr.map((elem, i) => (i % chunkSize ? [] : [arr.slice(i, i + chunkSize)]))
  );

export const getPartialBySizes = (
  arr, // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  chunkSizes, // [1, 2, 3, 4]
) => {
  var newArr = [];

  while (arr.length) {
    if (!chunkSizes.length) {
        newArr.push(arr.splice(0, arr.length))
    } else {
      newArr.push(arr.splice(0, chunkSizes.splice(0, 1)))
    }
  }

  return newArr;
};
