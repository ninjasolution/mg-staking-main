import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { notifyErrors } from 'helpers/helper';
import { instance } from 'index';

export const getUserProfile = createAsyncThunk(
  'getUserProfile',
  async (token) => {
    try {
      const result = await instance.get('api/Users/view_profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (result?.status === 200) return result?.data?.data;
    } catch (error) {
      notifyErrors(error);
      throw error;
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    userProfile: null,
    walletInfo: null,
    isLoggedIn: false,
    isLoading: false,
  },
  reducers: {
    loginUserPending: (state) => {
      state.isLoading = true;
      state.user = null;
    },
    loginUserSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.user = payload;
    },
    loginUserFail: (state) => {
      state.isLoading = false;
    },
    toggleIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.userProfile = null;
    },
    toggleWalletInfo: (state, action) => {
      state.walletInfo = action?.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
        state.userProfile = null;
      })
      .addCase(getUserProfile.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userProfile = payload;
      })
      .addCase(getUserProfile.rejected, (state) => {
        state.isLoading = false;
      }),
});

export const {
  toggleIsLoggedIn,
  logoutUser,
  toggleWalletInfo,
  loginUserPending,
  loginUserSuccess,
  loginUserFail,
} = authSlice.actions;

export default authSlice.reducer;
