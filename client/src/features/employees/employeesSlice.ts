import { Employee, User } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { authApi } from "../../app/services/auth/auth";
import { employeesApi } from "../../app/services/employees/employees";

interface InitialState {
  employees: Employee[] | null;
}

const initialState: InitialState = {
  employees: null,
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      employeesApi.endpoints.getAllEmployees.matchFulfilled,
      (state, action) => {
        state.employees = action.payload;
      }
    );
  },
});

export const { logout } = employeesSlice.actions;
export default employeesSlice.reducer;

export const selectEmployees = (state: RootState) => state.employees;
