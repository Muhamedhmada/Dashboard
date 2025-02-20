import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch data using the token
export const fetchDataWithToken = createAsyncThunk(
  "data/fetchDataWithToken",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://test.shaarapp.com/api/admin/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const TokenSlice = createSlice({
  name: "token",
  initialState: {
    token: localStorage.getItem("token") || "", // Fetch token from localStorage on page load
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    saveToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload); // Save token to localStorage
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem("token"); // Remove token from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataWithToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataWithToken.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDataWithToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { saveToken, clearToken } = TokenSlice.actions;
export default TokenSlice.reducer;
