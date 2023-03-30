const local_storage_key = "zenskar-assignment";

const getLocalData = () => {
  return JSON.parse(localStorage.getItem(local_storage_key));
};

const setLocalData = (data) => {
  localStorage.setItem(local_storage_key, JSON.stringify(data));
};
