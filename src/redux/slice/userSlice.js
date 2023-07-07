import { createSlice } from "@reduxjs/toolkit";
import {
  deleteUserApi,
  fetchUserApi,
  postUserApi,
  updateUserApi,
} from "../../utils/api";

export const fetchUsers = () => async (dispatch) => {
  dispatch(started());
  try {
    const response = await fetchUserApi();
    if (response) {
      dispatch(getUserSuccess(response));
    }
  } catch (err) {
    console.log({ err });
    dispatch(failed(err));
  }
};

export const postUser = (payload) => async (dispatch) => {
  dispatch(started());
  try {
    const response = await postUserApi(payload);
    if (response) {
      dispatch(addUserSuccess(response));
    }
  } catch (err) {
    console.log({ err });
    dispatch(failed(err.message));
  }
};

export const updateUser = (payload) => async (dispatch) => {
  dispatch(started());
  try {
    const response = await updateUserApi(payload);
    if (response) {
      dispatch(updateUserSuccess(response));
    }
  } catch (err) {
    console.log({ err });
    dispatch(failed(err.message));
  }
};

export const deleteUser = (payload) => async (dispatch) => {
  dispatch(started());
  try {
    const response = await deleteUserApi(payload);
    if (response) {
      dispatch(deleteUserSuccess(response));
    }
  } catch (err) {
    console.log({ err });
    dispatch(failed(err.message));
  }
};

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    started: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUserSuccess: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    addUserSuccess: (state, action) => {
      state.users.push(action.payload);
      state.loading = false;
      state.success = true;
    },
    updateUserSuccess: (state, action) => {
      const {
        firstname,
        lastname,
        username,
        email,
        groupAccess,
        expiredDate,
        password,
        confirmPassword,
      } = action.payload;
      const user = state.users.find((user) => user.id === action.payload.id);
      if (user) {
        user.firstname = firstname;
        user.lastname = lastname;
        user.username = username;
        user.email = email;
        user.groupAccess = groupAccess;
        user.expiredDate = expiredDate;
        user.password = password;
        user.confirmPassword = confirmPassword;
      }
      state.loading = false;
      state.success = true;
    },
    deleteUserSuccess: (state, action) => {
      const user = state.users.filter((user) => {
        return user.id !== action.payload.id;
      });
      state.users = user;
      state.loading = false;
      state.success = true;
    },
    failed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clear: (state) => {
      state.error = null;
      state.success = null;
    },
  },
});

export const {
  started,
  getUserSuccess,
  addUserSuccess,
  updateUserSuccess,
  deleteUserSuccess,
  failed,
  clear,
} = userSlice.actions;
export default userSlice.reducer;
