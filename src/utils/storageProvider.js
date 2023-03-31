const local_storage_key = "zenskar-assignment";

export const getLocalData = () => {
  return JSON.parse(localStorage.getItem(local_storage_key));
};

export const setLocalData = (data) => {
  localStorage.setItem(local_storage_key, JSON.stringify(data));
};
