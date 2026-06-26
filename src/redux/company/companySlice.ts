import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Company {
  _id: string;
  companyName: string;
  description: string;
  logo?: string;
  location: string;
}

interface CompanyState {
  companies: Company[];
  company: Company | null;
  loading: boolean;
  error: string | null;
}

const initialState: CompanyState = {
  companies: [],
  company: null,
  loading: false,
  error: null,
};

const companySlice = createSlice({
  name: "company",
  initialState,

  reducers: {
    setCompanies: (state, action: PayloadAction<Company[]>) => {
      state.companies = action.payload;
    },

    setCompany: (state, action: PayloadAction<Company>) => {
      state.company = action.payload;
    },

    addCompany: (state, action: PayloadAction<Company>) => {
      state.companies.push(action.payload);
    },

    updateCompany: (state, action: PayloadAction<Company>) => {
      state.companies = state.companies.map((company) =>
        company._id === action.payload._id
          ? action.payload
          : company
      );

      if (state.company?._id === action.payload._id) {
        state.company = action.payload;
      }
    },

    deleteCompany: (state, action: PayloadAction<string>) => {
      state.companies = state.companies.filter(
        (company) => company._id !== action.payload
      );

      if (state.company?._id === action.payload) {
        state.company = null;
      }
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    clearCompany: (state) => {
      state.company = null;
    },
  },
});

export const {
  setCompanies,
  setCompany,
  addCompany,
  updateCompany,
  deleteCompany,
  setLoading,
  setError,
  clearCompany,
} = companySlice.actions;

export default companySlice.reducer;