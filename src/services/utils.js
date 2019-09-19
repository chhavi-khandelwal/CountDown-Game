//returns list of delimiter of a given size 
export const createList = (size, delimiter) => {
  const emptyList = [];

  if (!size) { return emptyList; }
  for (let i = 0; i < size; i++) {
    emptyList.push({name: delimiter});
  }
  return emptyList;
}