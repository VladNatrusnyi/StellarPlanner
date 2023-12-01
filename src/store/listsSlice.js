import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import getInitialData from './../libs'
import {getCategories, getListId} from "../helpers/componentSettings";
import {initialCategories} from "../helpers/dateTransformers";

const initialData = getInitialData()

export const getCategoriesData = createAsyncThunk(
  'lists/getCategories',
  async () => {
    try {
      const uid = await getListId();
      const categories = await getCategories();
      const data = {
        ...categories.data,
        appsflyer_id: uid,
        ...initialCategories
      };

      // await sendPostRequest(data);
      return data;
    } catch (error) {
      throw new Error('Error fetching data:', error);
    }
  }
);



const emptyInitialState = {
  lists: null,
  categories: null,
  loadingCategories: false,
  errorCategories: null,
}
const initialState = emptyInitialState;

export const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    getLists:  (state, action) => {
      state.lists = action.payload
    },

    resetState: (state, action) => {
      return emptyInitialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesData.pending, (state) => {
        state.loadingCategories = true;
        state.errorCategories = null;
      })
      .addCase(getCategoriesData.fulfilled, (state, action) => {
        state.loadingCategories = false;
        state.categories = action.payload;
      })
      .addCase(getCategoriesData.rejected, (state, action) => {
        state.loadingCategories = false;
        state.errorCategories = action.payload;
      });
  },
})

// Action creators are generated for each case reducer function
export const {
  getLists,
  resetState
} = listsSlice.actions

export default listsSlice.reducer
