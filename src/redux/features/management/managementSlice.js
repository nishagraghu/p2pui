import { createSlice } from "@reduxjs/toolkit";

export const managementSlice = createSlice({
  name: "management",
  initialState: {
    unsavedChanges: false,
    onlyActive: true,
    editUser: null,
    addUser: false,
  },
  reducers: {
    setUnsavedChanges: (state, action) => {
      state.unsavedChanges = action.payload;
    },
    setOnlyActive: (state, action) => {
      state.onlyActive = action.payload;
    },
    setEditUser: (state, action) => {
      state.editUser = action.payload;
    },
    setAddUser: (state, action) => {
      state.addUser = action.payload;
    },
  },
});

export const { setUnsavedChanges, setOnlyActive, setEditUser, setAddUser } =
  managementSlice.actions;

export default managementSlice.reducer;
