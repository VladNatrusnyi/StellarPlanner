import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {link} from "../helpers/asyncStorageApi";

const emptyInitialState = {
  tasks: null,
  currentTask: null,
  isLoading: false,
  isLoadingCurrentTask: true,
  error: null,
}

const initialState = emptyInitialState;


export const getCurrentTask = createAsyncThunk(
  'tasks/getCurrentTask',
  async (taskId, { dispatch,rejectWithValue }) => {
    try {
      const response = await axios.post(link, taskId);
      if (!response.data.status) {
        // dispatch(setLoadingCurrentTask(false))
        return response.data.answer;
      }
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    getTasks:  (state, action) => {
      state.tasks = action.payload
    },
    setLoadingCurrentTask:  (state, action) => {
      state.isLoadingCurrentTask = action.payload
    },

    resetState: (state, action) => {
      return emptyInitialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentTask.fulfilled, (state, action) => {
        state.isLoadingCurrentTask = false;
        state.currentTask = action.payload;
        state.isLoading = false;
      })
      .addCase(getCurrentTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isLoadingCurrentTask = false;
      });
  },
})

// Action creators are generated for each case reducer function
export const {
  getTasks,
  setLoadingCurrentTask,
  resetState
} = tasksSlice.actions

export default tasksSlice.reducer
