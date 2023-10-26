export const addContactData = (arr, contact) => {
  arr.push(contact);
};
  // ! - задание 1
export const getStorage = (key = 'phoneBook') =>
  (localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : []);
  // ! - задание 2
export const setStorage = (obj, key = 'phoneBook') => {
  localStorage.setItem(key, JSON.stringify(obj));
};
  // ! - Задание 3
export const removeStorage = num => {
  const currentStorage = getStorage();
  const sortedStorage = currentStorage.filter(obj =>
    obj.phone !== num);
  setStorage(sortedStorage);
};
