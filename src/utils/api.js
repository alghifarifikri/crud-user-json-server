import axios from "axios";

export const fetchUserApi = async () => {
  try {
    const response = await axios.get("http://localhost:3001/api/users");
    return response?.data;
  } catch (err) {
    console.log({ err });
    return err;
  }
};

export const postUserApi = async (payload) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/users",
      payload
    );
    return response?.data;
  } catch (err) {
    console.log({ err });
    return err;
  }
};

export const updateUserApi = async (payload) => {
  try {
    const response = await axios.put(
      `http://localhost:3001/api/users/${payload.id}`,
      payload
    );
    return response?.data;
  } catch (err) {
    console.log({ err });
    return err;
  }
};

export const deleteUserApi = async (payload) => {
  try {
    await axios.delete(`http://localhost:3001/api/users/${payload.id}`);
    return payload;
  } catch (err) {
    console.log({ err });
    return err;
  }
};
